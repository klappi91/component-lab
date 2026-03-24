"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ======================================================================
   METAMORPHIC — 3D Morphing Blob with Vertex Displacement Shader

   Living, breathing 3D form. 3 octaves of 3D simplex noise displace
   IcosahedronGeometry vertices. Blinn-Phong three-point lighting with
   orange key (follows mouse), cool fill, white rim. Fresnel glow +
   subtle iridescence. Scroll controls chaos level.

   Progression: BREATHE -> AWAKEN -> STORM -> REFINE -> REVEAL
   ====================================================================== */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAmplitude;
  uniform float uFrequency;
  uniform float uSpeed;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewDir;
  varying float vDisplacement;

  /* --- 3D Simplex Noise (Ashima Arts / Stefan Gustavson) --- */
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise3(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
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
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 xv = x_ * ns.x + ns.yyyy;
    vec4 yv = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(xv) - abs(yv);
    vec4 b0 = vec4(xv.xy, yv.xy);
    vec4 b1 = vec4(xv.zw, yv.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  float getDisplacement(vec3 p, float t) {
    float n1 = snoise3(p * uFrequency + t * uSpeed);
    float n2 = snoise3(p * uFrequency * 2.0 + t * uSpeed * 1.3 + 100.0) * 0.5;
    float n3 = snoise3(p * uFrequency * 4.0 + t * uSpeed * 0.7 + 200.0) * 0.25;
    return (n1 + n2 + n3) * uAmplitude;
  }

  void main() {
    float t = uTime;
    float d = getDisplacement(position, t);
    vDisplacement = d;

    vec3 nrm = normalize(position);
    vec3 newPos = position + nrm * d;

    /* Displaced normal via finite differences */
    float eps = 0.01;
    vec3 ref = abs(nrm.y) < 0.999 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
    vec3 T = normalize(cross(nrm, ref));
    vec3 B = cross(nrm, T);

    vec3 pT = position + T * eps;
    vec3 pB = position + B * eps;
    vec3 newPT = pT + normalize(pT) * getDisplacement(pT, t);
    vec3 newPB = pB + normalize(pB) * getDisplacement(pB, t);

    vec3 displacedNormal = normalize(cross(newPT - newPos, newPB - newPos));

    vNormal = normalize(mat3(modelMatrix) * displacedNormal);
    vPosition = (modelMatrix * vec4(newPos, 1.0)).xyz;
    vViewDir = normalize(cameraPosition - vPosition);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec3 uLightPos;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewDir;
  varying float vDisplacement;

  const vec3 ORANGE = vec3(1.0, 0.42, 0.0);
  const vec3 COOL = vec3(0.15, 0.3, 0.65);

  vec3 calcLight(vec3 lPos, vec3 lCol, vec3 N, vec3 V, float shin) {
    vec3 L = normalize(lPos - vPosition);
    float diff = max(dot(N, L), 0.0);
    vec3 H = normalize(L + V);
    float spec = pow(max(dot(N, H), 0.0), shin);
    return lCol * (diff * 0.4 + spec * 1.5);
  }

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewDir);

    /* Fresnel rim */
    float fresnel = pow(1.0 - max(dot(N, V), 0.0), 3.5);

    /* Base color: displacement maps valleys=dark, peaks=warm */
    float dn = clamp(vDisplacement * 2.5 + 0.5, 0.0, 1.0);
    vec3 baseColor = mix(vec3(0.02, 0.02, 0.03), vec3(0.12, 0.06, 0.01), dn);

    /* Subtle iridescence */
    float iri = dot(N, V);
    vec3 iriColor = vec3(
      0.5 + 0.5 * sin(iri * 6.28 + uTime * 0.3),
      0.5 + 0.5 * sin(iri * 6.28 + uTime * 0.3 + 2.094),
      0.5 + 0.5 * sin(iri * 6.28 + uTime * 0.3 + 4.189)
    );

    /* Three-point lighting */
    vec3 lit = vec3(0.0);
    lit += calcLight(uLightPos, ORANGE * 1.8, N, V, 80.0);
    lit += calcLight(vec3(-3.0, -1.0, 3.0), COOL * 0.6, N, V, 40.0);
    lit += calcLight(vec3(0.0, 3.0, -3.0), vec3(0.7), N, V, 120.0);

    /* Compose */
    vec3 color = baseColor * 0.12;
    color += baseColor * lit;
    color += ORANGE * fresnel * 0.55;
    color += iriColor * fresnel * 0.1;

    /* Reinhard tonemap + gamma */
    color = color / (color + 1.0);
    color = pow(color, vec3(1.0 / 2.2));

    gl_FragColor = vec4(color, 1.0);
  }
`;

/* --- Smoothstep utility --- */
function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/* --- Morphing Blob --- */
interface BlobProps {
  progress: React.RefObject<number>;
  mouse: React.RefObject<{ x: number; y: number }>;
}

function MorphingBlob({ progress, mouse }: BlobProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const smoothMouse = useRef({ x: 0.5, y: 0.5 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmplitude: { value: 0.12 },
      uFrequency: { value: 1.5 },
      uSpeed: { value: 0.3 },
      uLightPos: { value: new THREE.Vector3(3, 2, 4) },
    }),
    [],
  );

  useFrame((state) => {
    if (!materialRef.current || !meshRef.current) return;
    const u = materialRef.current.uniforms;
    const t = state.clock.elapsedTime;
    const p = progress.current ?? 0;

    u.uTime.value = t;

    /* Scroll-driven parameter curves */
    const breathe = 1 - smoothstep(0.15, 0.25, p);
    const chaos = smoothstep(0.2, 0.35, p) * (1 - smoothstep(0.55, 0.65, p));
    const refine = smoothstep(0.6, 0.75, p) * (1 - smoothstep(0.82, 0.92, p));
    const resolve = smoothstep(0.82, 0.95, p);

    /* Breathing: subtle pulsing even when still */
    const breathing = Math.sin(t * 1.2) * 0.015 + Math.sin(t * 0.7) * 0.01;

    u.uAmplitude.value =
      breathe * 0.12 +
      chaos * 0.55 +
      refine * 0.06 +
      resolve * 0.025 +
      breathing;

    u.uFrequency.value =
      breathe * 1.5 +
      chaos * 3.0 +
      refine * 2.0 +
      resolve * 1.2;

    u.uSpeed.value =
      breathe * 0.3 +
      chaos * 0.7 +
      refine * 0.35 +
      resolve * 0.15;

    /* Mouse -> light position (smooth follow) */
    const lerpF = 0.05;
    smoothMouse.current.x +=
      ((mouse.current?.x ?? 0.5) - smoothMouse.current.x) * lerpF;
    smoothMouse.current.y +=
      ((mouse.current?.y ?? 0.5) - smoothMouse.current.y) * lerpF;
    const lx = (smoothMouse.current.x - 0.5) * 8;
    const ly = -(smoothMouse.current.y - 0.5) * 6;
    u.uLightPos.value.set(lx, ly, 4);

    /* Auto-rotation */
    meshRef.current.rotation.y += 0.003;
    meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 6]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

/* --- Scene Export --- */
interface SceneProps {
  progress: React.RefObject<number>;
  mouse: React.RefObject<{ x: number; y: number }>;
}

export function MetamorphicScene({ progress, mouse }: SceneProps) {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
      }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#0A0A0A"]} />
      <Suspense fallback={null}>
        <MorphingBlob progress={progress} mouse={mouse} />
      </Suspense>
    </Canvas>
  );
}
