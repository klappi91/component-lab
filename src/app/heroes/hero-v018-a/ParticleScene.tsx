"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* =====================================================================
   GPGPU Particle System — FBO Ping-Pong

   16,384 particles with positions stored in a 128x128 float texture.
   Each frame: simulation shader reads current positions, applies
   curl noise + morph forces, writes new positions to alternate FBO.
   Render shader reads final positions and draws as Points.
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
uniform vec2 uResolution;

${NOISE_GLSL}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec4 posData = texture2D(uPositions, uv);
  vec3 pos = posData.xyz;
  vec3 target = texture2D(uTarget, uv).xyz;

  // Curl noise turbulence — fades as particles converge
  float turbulence = mix(0.012, 0.0008, smoothstep(0.0, 0.7, uProgress));
  vec3 curl = curlNoise(pos * 1.2 + uTime * 0.12) * turbulence;

  // Morph force toward target — increases with progress
  vec3 dir = target - pos;
  float dist = length(dir);
  float morphBase = smoothstep(0.0, 0.4, uProgress) * 0.035;
  // Pull harder when far away (soft spring)
  float morphForce = morphBase * (1.0 + dist * 0.8);
  vec3 morph = dir * morphForce;

  // Mouse repulsion (works in both phases)
  vec3 mouseWorld = vec3((uMouse.x - 0.5) * 6.0, (uMouse.y - 0.5) * -6.0, 0.0);
  vec3 toParticle = pos - mouseWorld;
  float mouseDist = length(toParticle);
  vec3 mouseRepel = normalize(toParticle) * 0.02 / (mouseDist * mouseDist + 0.3);

  // Slow rotation when morphed (orbit around Y)
  float orbitStrength = smoothstep(0.5, 0.9, uProgress) * 0.003;
  vec3 orbit = vec3(-pos.z, 0.0, pos.x) * orbitStrength;

  pos += curl + morph + mouseRepel + orbit;

  // Velocity magnitude stored in w (for color)
  float vel = length(curl + morph);

  gl_FragColor = vec4(pos, vel);
}
`;

/* ── Passthrough Fragment (for FBO init) ── */
const passthroughFrag = /* glsl */ `
precision highp float;
uniform sampler2D uTexture;
uniform vec2 uResolution;
void main() {
  gl_FragColor = texture2D(uTexture, gl_FragCoord.xy / uResolution);
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

  gl_PointSize = uPointSize * (250.0 / max(-mvPos.z, 0.1));
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

  // Base orange, hotter with velocity, cooler in depth
  vec3 orange = vec3(1.0, 0.42, 0.0);
  vec3 hot = vec3(1.0, 0.85, 0.6);
  vec3 cool = vec3(0.7, 0.25, 0.05);

  float vf = clamp(vVelocity * 40.0, 0.0, 1.0);
  vec3 color = mix(cool, orange, 0.5 + vf * 0.5);
  color = mix(color, hot, vf * 0.4);

  // Depth-based fade
  float depthFade = smoothstep(12.0, 2.0, vDepth);
  alpha *= depthFade * 0.85;

  // Brighten when morphed
  color += smoothstep(0.4, 1.0, uProgress) * 0.15;

  gl_FragColor = vec4(color, alpha);
}
`;

/* ── Fullscreen quad vertex (shared) ── */
const quadVert = /* glsl */ `
void main() { gl_Position = vec4(position, 1.0); }
`;

/* ================================================================== */

function createRenderTarget() {
  return new THREE.WebGLRenderTarget(SIZE, SIZE, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
  });
}

function createInitialPositions(): THREE.DataTexture {
  const data = new Float32Array(SIZE * SIZE * 4);
  for (let i = 0; i < SIZE * SIZE; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 1.5 + Math.random() * 3.5; // spread 1.5–5.0
    data[i * 4] = r * Math.sin(phi) * Math.cos(theta);
    data[i * 4 + 1] = r * Math.sin(phi) * Math.sin(theta);
    data[i * 4 + 2] = r * Math.cos(phi);
    data[i * 4 + 3] = 0;
  }
  const tex = new THREE.DataTexture(
    data, SIZE, SIZE, THREE.RGBAFormat, THREE.FloatType,
  );
  tex.needsUpdate = true;
  return tex;
}

function createTargetPositions(): THREE.DataTexture {
  /* Target: sphere r=2 with slight noise for organic feel */
  const data = new Float32Array(SIZE * SIZE * 4);
  for (let i = 0; i < SIZE * SIZE; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 1.8 + Math.random() * 0.4; // tight sphere 1.8–2.2
    data[i * 4] = r * Math.sin(phi) * Math.cos(theta);
    data[i * 4 + 1] = r * Math.sin(phi) * Math.sin(theta);
    data[i * 4 + 2] = r * Math.cos(phi);
    data[i * 4 + 3] = 1;
  }
  const tex = new THREE.DataTexture(
    data, SIZE, SIZE, THREE.RGBAFormat, THREE.FloatType,
  );
  tex.needsUpdate = true;
  return tex;
}

function createPointsGeometry(): THREE.BufferGeometry {
  const geo = new THREE.BufferGeometry();
  const refs = new Float32Array(SIZE * SIZE * 2);
  const positions = new Float32Array(SIZE * SIZE * 3);
  for (let i = 0; i < SIZE * SIZE; i++) {
    refs[i * 2] = (i % SIZE + 0.5) / SIZE;
    refs[i * 2 + 1] = (Math.floor(i / SIZE) + 0.5) / SIZE;
  }
  geo.setAttribute("reference", new THREE.BufferAttribute(refs, 2));
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  return geo;
}

/* ── Main GPGPU Particle Component ── */
function Particles({
  progress,
  mouse,
}: {
  progress: React.RefObject<number>;
  mouse: React.RefObject<{ x: number; y: number }>;
}) {
  const { gl } = useThree();
  const pingPong = useRef(0);
  const initDone = useRef(false);
  const sceneReady = useRef(false);

  /* Render targets (ping-pong) */
  const [fbo1, fbo2] = useMemo(
    () => [createRenderTarget(), createRenderTarget()],
    [],
  );

  /* Data textures */
  const initialTex = useMemo(() => createInitialPositions(), []);
  const targetTex = useMemo(() => createTargetPositions(), []);

  /* Simulation scene */
  const simScene = useMemo(() => new THREE.Scene(), []);
  const simCam = useMemo(
    () => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1),
    [],
  );

  const simMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uPositions: { value: null },
          uTarget: { value: targetTex },
          uProgress: { value: 0 },
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uResolution: { value: new THREE.Vector2(SIZE, SIZE) },
        },
        vertexShader: quadVert,
        fragmentShader: simulationFrag,
      }),
    [targetTex],
  );

  const passMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: initialTex },
          uResolution: { value: new THREE.Vector2(SIZE, SIZE) },
        },
        vertexShader: quadVert,
        fragmentShader: passthroughFrag,
      }),
    [initialTex],
  );

  /* Fullscreen quad for simulation */
  const simQuad = useMemo(() => {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), simMat);
    return mesh;
  }, [simMat]);

  /* Add quad to sim scene on mount */
  useEffect(() => {
    simScene.add(simQuad);
    sceneReady.current = true;
    return () => {
      simScene.remove(simQuad);
      sceneReady.current = false;
    };
  }, [simScene, simQuad]);

  /* Points geometry */
  const pointsGeo = useMemo(() => createPointsGeometry(), []);

  /* Render material */
  const renderMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uPositions: { value: null },
          uPointSize: { value: 2.5 },
          uProgress: { value: 0 },
        },
        vertexShader: renderVert,
        fragmentShader: renderFrag,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  /* ── Frame loop ── */
  useFrame(({ clock }) => {
    /* Wait until simulation scene is ready */
    if (!sceneReady.current) return;

    /* First frame: initialize both FBOs with random positions */
    if (!initDone.current) {
      simQuad.material = passMat;
      gl.setRenderTarget(fbo1);
      gl.render(simScene, simCam);
      gl.setRenderTarget(fbo2);
      gl.render(simScene, simCam);
      gl.setRenderTarget(null);
      simQuad.material = simMat;
      initDone.current = true;
      return;
    }

    const read = pingPong.current === 0 ? fbo1 : fbo2;
    const write = pingPong.current === 0 ? fbo2 : fbo1;

    /* Update simulation uniforms */
    simMat.uniforms.uPositions.value = read.texture;
    simMat.uniforms.uProgress.value = progress.current ?? 0;
    simMat.uniforms.uTime.value = clock.elapsedTime;
    const m = mouse.current ?? { x: 0.5, y: 0.5 };
    simMat.uniforms.uMouse.value.set(m.x, m.y);

    /* Run simulation */
    gl.setRenderTarget(write);
    gl.render(simScene, simCam);
    gl.setRenderTarget(null);

    /* Feed result to render material */
    renderMat.uniforms.uPositions.value = write.texture;
    renderMat.uniforms.uProgress.value = progress.current ?? 0;

    /* Swap */
    pingPong.current = 1 - pingPong.current;
  });

  return <points geometry={pointsGeo} material={renderMat} />;
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
      }}
      dpr={[1, 1.5]}
      style={{ background: "transparent" }}
    >
      <Particles progress={progress} mouse={mouse} />
    </Canvas>
  );
}
