"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════════
   LIQUID GLASS — WebGL Image Distortion Shader

   A full-viewport shader that distorts a hero image through
   "liquid glass". Mouse creates ripples. Scroll clears the
   distortion. The image is ALWAYS alive.
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

  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uProgress;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform vec2 uImageSize;

  varying vec2 vUv;

  /* ─── Simplex 2D Noise (Ashima Arts / Stefan Gustavson) ─── */
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
    );
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
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

  /* ─── Cover UV (background-size: cover) ─── */
  vec2 coverUV(vec2 uv, vec2 screenSize, vec2 imageSize) {
    float sa = screenSize.x / screenSize.y;
    float ia = imageSize.x / imageSize.y;
    vec2 result = uv;
    if (sa > ia) {
      float f = ia / sa;
      result.y = uv.y * f + (1.0 - f) * 0.5;
    } else {
      float f = sa / ia;
      result.x = uv.x * f + (1.0 - f) * 0.5;
    }
    return result;
  }

  void main() {
    vec2 uv = coverUV(vUv, uResolution, uImageSize);

    /* Distortion intensity — exponential falloff with scroll */
    float dist = 1.0 - uProgress;
    float distPow = dist * dist;

    /* Layer 1: Large, slow liquid movement */
    float n1x = snoise(vUv * 2.5 + vec2(uTime * 0.15, 0.0));
    float n1y = snoise(vUv * 2.5 + vec2(0.0, uTime * 0.12));

    /* Layer 2: Medium, slightly faster turbulence */
    float n2x = snoise(vUv * 6.0 + vec2(uTime * 0.25, 3.14));
    float n2y = snoise(vUv * 6.0 + vec2(1.57, uTime * 0.20));

    /* Layer 3: Fine grain, fast shimmer (subtle) */
    float n3x = snoise(vUv * 12.0 + vec2(uTime * 0.4, 6.28));
    float n3y = snoise(vUv * 12.0 + vec2(4.71, uTime * 0.35));

    vec2 distortion = vec2(
      n1x * 0.06 + n2x * 0.025 + n3x * 0.008,
      n1y * 0.06 + n2y * 0.025 + n3y * 0.008
    ) * distPow;

    /* Mouse ripple — smooth radial displacement */
    vec2 mouseDir = vUv - uMouse;
    float mouseDist = length(mouseDir);
    float ripple = smoothstep(0.35, 0.0, mouseDist);
    float mouseAmt = ripple * 0.04 * (0.2 + dist * 0.8);
    distortion += normalize(mouseDir + 0.0001) * mouseAmt;

    /* Apply distortion to UV */
    vec2 finalUV = uv + distortion;

    /* Chromatic aberration — RGB channel separation */
    float chrAb = distPow * 0.012 + ripple * 0.004;
    vec2 redOffset = vec2(chrAb, chrAb * 0.5);
    vec2 blueOffset = vec2(-chrAb, -chrAb * 0.5);

    float r = texture2D(uTexture, finalUV + redOffset).r;
    float g = texture2D(uTexture, finalUV).g;
    float b = texture2D(uTexture, finalUV + blueOffset).b;

    vec3 color = vec3(r, g, b);

    /* Warm tint at high distortion (more orange/amber) */
    vec3 warmTint = color * vec3(1.12, 0.95, 0.82);
    color = mix(color, warmTint, distPow * 0.4);

    /* Vignette */
    float vig = 1.0 - smoothstep(0.4, 1.5, length((vUv - 0.5) * 2.0));
    color *= mix(0.5, 1.0, vig);

    /* Subtle grain */
    float grain = (snoise(vUv * 500.0 + uTime * 10.0) * 0.5 + 0.5) * 0.03;
    color += grain * distPow;

    gl_FragColor = vec4(color, 1.0);
  }
`;

/* ─── Image Plane ─── */

interface PlaneProps {
  progress: React.RefObject<number>;
  mouse: React.RefObject<{ x: number; y: number }>;
}

function ImagePlane({ progress, mouse }: PlaneProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const smoothMouse = useRef({ x: 0.5, y: 0.5 });
  const { viewport, size } = useThree();

  const texture = useTexture("/heroes/hero-v015-a/hero-image.png");
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uImageSize: { value: new THREE.Vector2((texture.image as HTMLImageElement)?.width || 2048, (texture.image as HTMLImageElement)?.height || 1152) },
    }),
    [texture, size.width, size.height],
  );

  useFrame((state) => {
    if (!materialRef.current) return;
    const u = materialRef.current.uniforms;

    u.uTime.value = state.clock.elapsedTime;
    u.uProgress.value = progress.current ?? 0;
    u.uResolution.value.set(size.width, size.height);

    // Smooth mouse lerp — gives liquid feel
    const lerpFactor = 0.06;
    smoothMouse.current.x += ((mouse.current?.x ?? 0.5) - smoothMouse.current.x) * lerpFactor;
    smoothMouse.current.y += ((mouse.current?.y ?? 0.5) - smoothMouse.current.y) * lerpFactor;
    u.uMouse.value.set(smoothMouse.current.x, smoothMouse.current.y);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

/* ─── Scene Export ─── */

interface SceneProps {
  progress: React.RefObject<number>;
  mouse: React.RefObject<{ x: number; y: number }>;
}

export function LiquidGlassScene({ progress, mouse }: SceneProps) {
  return (
    <Canvas
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0, 1], fov: 75 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
      }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <ImagePlane progress={progress} mouse={mouse} />
      </Suspense>
    </Canvas>
  );
}
