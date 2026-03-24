"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════════
   NOISE FIELD — Full-viewport living noise background

   A breathing, organic noise field that responds to:
   - Time (always alive, never static)
   - Scroll progress (amplitude decreases → chaos becomes calm)
   - Mouse position (ripple displacement)

   Colors: Orange embers (#FF6B00) on dark (#0A0A0A)
   ═══════════════════════════════════════════════════════════ */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uProgress;    // 0 = full chaos, 1 = calm/dark
  uniform vec2 uMouse;        // normalized mouse position
  uniform vec2 uResolution;

  varying vec2 vUv;

  /* ─── Simplex 2D Noise (Ashima Arts) ─── */
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  /* ─── FBM (Fractal Brownian Motion) ─── */
  float fbm(vec2 p, float t) {
    float val = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    for (int i = 0; i < 5; i++) {
      val += amp * snoise(p * freq + t * 0.3 * float(i + 1));
      freq *= 2.1;
      amp *= 0.5;
    }
    return val;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = vec2(uv.x * aspect, uv.y);

    /* ─── Scroll-driven amplitude ─── */
    // progress 0 → full chaos, progress 1 → calm
    float chaosAmp = mix(1.0, 0.0, smoothstep(0.0, 0.8, uProgress));

    /* ─── Mouse ripple ─── */
    vec2 mouseP = vec2(uMouse.x * aspect, uMouse.y);
    float mouseDist = distance(p, mouseP);
    float mouseRipple = smoothstep(0.5, 0.0, mouseDist) * 0.15;

    /* ─── Primary noise field ─── */
    float t = uTime * 0.15;
    float n1 = fbm(p * 2.0 + mouseRipple * 2.0, t);
    float n2 = fbm(p * 3.0 + vec2(5.2, 1.3), t * 0.7);
    float n3 = snoise(p * 1.5 + t * 0.4);

    /* ─── Combine noise layers ─── */
    float noise = (n1 * 0.5 + n2 * 0.3 + n3 * 0.2) * chaosAmp;

    /* ─── Mouse glow ─── */
    float mouseGlow = smoothstep(0.4, 0.0, mouseDist) * 0.3 * (1.0 - uProgress * 0.5);

    /* ─── Color mapping ─── */
    // Dark base
    vec3 dark = vec3(0.039, 0.039, 0.039); // #0A0A0A
    // Orange embers
    vec3 orange = vec3(1.0, 0.42, 0.0);    // #FF6B00
    // Hot white core
    vec3 hot = vec3(1.0, 0.85, 0.6);

    // Noise → color: negative = dark, positive = orange/hot
    float intensity = smoothstep(-0.2, 0.6, noise) * chaosAmp;
    float hotSpot = smoothstep(0.4, 0.8, noise) * chaosAmp;

    vec3 color = dark;
    color = mix(color, orange, intensity * 0.6 + mouseGlow);
    color = mix(color, hot, hotSpot * 0.3);

    /* ─── Vignette ─── */
    float vignette = 1.0 - smoothstep(0.3, 1.2, length(uv - 0.5) * 1.5);
    color *= mix(0.7, 1.0, vignette);

    /* ─── Final alpha: fade out as progress increases ─── */
    float alpha = mix(1.0, 0.05, smoothstep(0.6, 1.0, uProgress));

    gl_FragColor = vec4(color, alpha);
  }
`;

/* ─── Fullscreen Shader Plane ─── */
function NoisePlane({
  progressRef,
  mouseRef,
}: {
  progressRef: React.RefObject<{ value: number }>;
  mouseRef: React.RefObject<{ x: number; y: number }>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = clock.getElapsedTime();
    mat.uniforms.uProgress.value = progressRef.current?.value ?? 0;
    mat.uniforms.uMouse.value.set(
      mouseRef.current?.x ?? 0.5,
      mouseRef.current?.y ?? 0.5,
    );
    mat.uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

/* ─── Exported Canvas Component ─── */
export function NoiseField({
  progressRef,
  mouseRef,
}: {
  progressRef: React.RefObject<{ value: number }>;
  mouseRef: React.RefObject<{ x: number; y: number }>;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: false }}
      camera={{ position: [0, 0, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <NoisePlane progressRef={progressRef} mouseRef={mouseRef} />
    </Canvas>
  );
}
