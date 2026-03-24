"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* =====================================================================
   GPGPU Particle System — FBO Ping-Pong

   16,384 particles with positions computed on GPU via FBO ping-pong.
   Simulation shader: curl noise turbulence + morph force.
   Render shader: Points with FBO texture lookup.
   ===================================================================== */

const SIZE = 128; // 128x128 = 16384 particles

/* ── Simplex 3D Noise (Ashima Arts) ── */
const NOISE_GLSL = /* glsl */ `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0/7.0;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

vec3 snoiseVec3(vec3 x){
  return vec3(
    snoise(vec3(x)),
    snoise(vec3(x.y - 19.1, x.z + 33.4, x.x + 47.2)),
    snoise(vec3(x.z + 74.2, x.x - 124.5, x.y + 99.4))
  );
}

vec3 curlNoise(vec3 p){
  const float e = 0.1;
  vec3 dx = vec3(e, 0.0, 0.0);
  vec3 dy = vec3(0.0, e, 0.0);
  vec3 dz = vec3(0.0, 0.0, e);
  vec3 px0 = snoiseVec3(p - dx);
  vec3 px1 = snoiseVec3(p + dx);
  vec3 py0 = snoiseVec3(p - dy);
  vec3 py1 = snoiseVec3(p + dy);
  vec3 pz0 = snoiseVec3(p - dz);
  vec3 pz1 = snoiseVec3(p + dz);
  float x = py1.z - py0.z - pz1.y + pz0.y;
  float y = pz1.x - pz0.x - px1.z + px0.z;
  float z = px1.y - px0.y - py1.x + py0.x;
  return normalize(vec3(x, y, z) / (2.0 * e));
}
`;

/* ── Simulation Fragment Shader ── */
const simulationFrag = /* glsl */ `
precision highp float;

uniform sampler2D uPositions;
uniform sampler2D uTarget;
uniform float uProgress;
uniform float uTime;
uniform vec2 uMouse;

${NOISE_GLSL}

void main() {
  vec2 uv = gl_FragCoord.xy / vec2(${SIZE}.0, ${SIZE}.0);
  vec4 posData = texture2D(uPositions, uv);
  vec3 pos = posData.xyz;
  vec3 target = texture2D(uTarget, uv).xyz;

  float turbulence = mix(0.012, 0.0008, smoothstep(0.0, 0.7, uProgress));
  vec3 curl = curlNoise(pos * 1.2 + uTime * 0.12) * turbulence;

  vec3 dir = target - pos;
  float dist = length(dir);
  float morphBase = smoothstep(0.0, 0.4, uProgress) * 0.035;
  float morphForce = morphBase * (1.0 + dist * 0.8);
  vec3 morph = dir * morphForce;

  vec3 mouseWorld = vec3((uMouse.x - 0.5) * 6.0, (uMouse.y - 0.5) * -6.0, 0.0);
  vec3 toParticle = pos - mouseWorld;
  float mouseDist = length(toParticle);
  vec3 mouseRepel = normalize(toParticle) * 0.02 / (mouseDist * mouseDist + 0.3);

  float orbitStrength = smoothstep(0.5, 0.9, uProgress) * 0.003;
  vec3 orbit = vec3(-pos.z, 0.0, pos.x) * orbitStrength;

  pos += curl + morph + mouseRepel + orbit;
  float vel = length(curl + morph);

  gl_FragColor = vec4(pos, vel);
}
`;

/* ── Render Vertex Shader ── */
const renderVert = /* glsl */ `
precision highp float;
uniform sampler2D uPositions;
uniform float uPointSize;
attribute vec2 reference;
varying float vVelocity;
varying float vDepth;

void main() {
  vec4 posData = texture2D(uPositions, reference);
  vec3 pos = posData.xyz;
  vVelocity = posData.w;

  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPos;
  vDepth = -mvPos.z;

  gl_PointSize = uPointSize * (40.0 / max(-mvPos.z, 0.5));
}
`;

/* ── Render Fragment Shader ── */
const renderFrag = /* glsl */ `
precision highp float;
varying float vVelocity;
varying float vDepth;
uniform float uProgress;

void main() {
  float d = length(gl_PointCoord - vec2(0.5));
  if (d > 0.5) discard;
  float alpha = 1.0 - smoothstep(0.15, 0.5, d);

  vec3 orange = vec3(1.0, 0.42, 0.0);
  vec3 hot = vec3(1.0, 0.85, 0.6);
  vec3 cool = vec3(0.7, 0.25, 0.05);

  float vf = clamp(vVelocity * 40.0, 0.0, 1.0);
  vec3 color = mix(cool, orange, 0.5 + vf * 0.5);
  color = mix(color, hot, vf * 0.4);

  float depthFade = smoothstep(12.0, 2.0, vDepth);
  alpha *= depthFade * 0.4;

  color += smoothstep(0.4, 1.0, uProgress) * 0.15;

  gl_FragColor = vec4(color, alpha);
}
`;

/* ================================================================== */

const COUNT = SIZE * SIZE;

function createFBO() {
  return new THREE.WebGLRenderTarget(SIZE, SIZE, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
    depthBuffer: false,
    stencilBuffer: false,
  });
}

function fillDataTexture(tex: THREE.DataTexture, fn: (i: number) => [number, number, number, number]) {
  const d = tex.image.data as Float32Array;
  for (let i = 0; i < SIZE * SIZE; i++) {
    const [x, y, z, w] = fn(i);
    d[i * 4] = x;
    d[i * 4 + 1] = y;
    d[i * 4 + 2] = z;
    d[i * 4 + 3] = w;
  }
  tex.needsUpdate = true;
}

function createDataTexture(): THREE.DataTexture {
  const tex = new THREE.DataTexture(
    new Float32Array(SIZE * SIZE * 4),
    SIZE, SIZE,
    THREE.RGBAFormat,
    THREE.FloatType,
  );
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.needsUpdate = true;
  return tex;
}

/* ── Main GPGPU Particle Component ── */
function Particles({
  progress,
  mouse,
}: {
  progress: React.RefObject<number>;
  mouse: React.RefObject<{ x: number; y: number }>;
}) {
  const { gl, viewport } = useThree();
  const pingPong = useRef(0);
  const initDone = useRef(false);

  /* FBO render targets */
  const fboA = useMemo(() => createFBO(), []);
  const fboB = useMemo(() => createFBO(), []);

  /* Initial positions (random sphere) */
  const initialPositions = useMemo(() => {
    const tex = createDataTexture();
    fillDataTexture(tex, () => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.0 + Math.random() * 5.0; // spread 2–7 for wider nebula
      return [
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
        0,
      ];
    });
    return tex;
  }, []);

  /* Target positions (tight sphere) */
  const targetPositions = useMemo(() => {
    const tex = createDataTexture();
    fillDataTexture(tex, () => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.8 + Math.random() * 0.4;
      return [
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
        1,
      ];
    });
    return tex;
  }, []);

  /* Simulation scene: fullscreen quad + ortho camera */
  const simSetup = useMemo(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uPositions: { value: initialPositions },
        uTarget: { value: targetPositions },
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      },
      vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
      fragmentShader: simulationFrag,
      depthTest: false,
      depthWrite: false,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);
    return { scene, camera, material };
  }, [initialPositions, targetPositions]);

  /* Points geometry with reference UVs */
  const pointsGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const refs = new Float32Array(COUNT * 2);
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      refs[i * 2] = (i % SIZE + 0.5) / SIZE;
      refs[i * 2 + 1] = (Math.floor(i / SIZE) + 0.5) / SIZE;
    }
    geo.setAttribute("reference", new THREE.BufferAttribute(refs, 2));
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 100);
    return geo;
  }, []);

  /* Render material */
  const renderMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uPositions: { value: initialPositions },
          uPointSize: { value: 1.8 },
          uProgress: { value: 0 },
        },
        vertexShader: renderVert,
        fragmentShader: renderFrag,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [initialPositions],
  );

  /* ── Frame loop ── */
  useFrame(({ clock }) => {
    const { scene: simScene, camera: simCam, material: simMat } = simSetup;

    const read = pingPong.current === 0 ? fboA : fboB;
    const write = pingPong.current === 0 ? fboB : fboA;

    /* First frame: write initial positions to both FBOs */
    if (!initDone.current) {
      /* Use initial positions as input (already set in simMat) */
      simMat.uniforms.uPositions.value = initialPositions;
      simMat.uniforms.uProgress.value = 0;
      simMat.uniforms.uTime.value = 0;

      gl.setRenderTarget(fboA);
      gl.clear();
      gl.render(simScene, simCam);

      gl.setRenderTarget(fboB);
      gl.clear();
      gl.render(simScene, simCam);

      gl.setRenderTarget(null);
      initDone.current = true;

      /* Set render material to use FBO output */
      renderMat.uniforms.uPositions.value = fboA.texture;
      return;
    }

    /* Simulation pass */
    simMat.uniforms.uPositions.value = read.texture;
    simMat.uniforms.uProgress.value = progress.current ?? 0;
    simMat.uniforms.uTime.value = clock.elapsedTime;
    const m = mouse.current ?? { x: 0.5, y: 0.5 };
    simMat.uniforms.uMouse.value.set(m.x, m.y);

    gl.setRenderTarget(write);
    gl.clear();
    gl.render(simScene, simCam);
    gl.setRenderTarget(null);

    /* Update render material */
    renderMat.uniforms.uPositions.value = write.texture;
    renderMat.uniforms.uProgress.value = progress.current ?? 0;

    pingPong.current = 1 - pingPong.current;
  });

  return <points geometry={pointsGeo} material={renderMat} frustumCulled={false} />;
}

/* ── Exported Scene wrapper ── */
export function ParticleScene({
  progress,
  mouse,
}: {
  progress: React.RefObject<number>;
  mouse: React.RefObject<{ x: number; y: number }>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        /* preserveDrawingBuffer only for debug */
      }}
      dpr={[1, 1.5]}
      style={{ background: "transparent" }}
    >
      <Particles progress={progress} mouse={mouse} />
    </Canvas>
  );
}
