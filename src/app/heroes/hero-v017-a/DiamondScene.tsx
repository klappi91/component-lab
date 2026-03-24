"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  MeshTransmissionMaterial,
  Environment,
  Float,
} from "@react-three/drei";
import * as THREE from "three";

/* ======================================================================
   hero-v017-a: PRISM — Transmissive 3D Diamond

   A faceted glass diamond with MeshTransmissionMaterial. First transparent
   WebGL hero — refraction, chromatic aberration, iridescence visible
   THROUGH the object.

   Scroll drives "raw → polished" material transition:
   - Raw (0%): Heavy distortion, noise, rough surface
   - Cutting (30-60%): Distortion clears, facets catch light
   - Brilliant (60-100%): Crystal clarity, prismatic refractions

   Signature moment: The distortion clearing reveals prismatic rainbow
   refractions catching light — the "creative breakthrough."

   Tech: react-three-fiber, @react-three/drei MeshTransmissionMaterial,
         Environment HDRI, GSAP ScrollTrigger (via parent), Lenis
   ====================================================================== */

interface Props {
  progress: React.RefObject<number>;
  mouse: React.RefObject<{ x: number; y: number }>;
}

/* Diamond silhouette — LatheGeometry gives proper crown/pavilion shape */
function useDiamondGeometry() {
  return useMemo(() => {
    const pts = [
      new THREE.Vector2(0, -1.35),    // pavilion point (bottom)
      new THREE.Vector2(0.15, -1.1),  // pavilion facet
      new THREE.Vector2(0.85, -0.08), // girdle (widest)
      new THREE.Vector2(0.6, 0.22),   // crown facet
      new THREE.Vector2(0.3, 0.38),   // upper crown
      new THREE.Vector2(0, 0.42),     // table (top flat)
    ];
    const geo = new THREE.LatheGeometry(pts, 8);
    geo.computeVertexNormals();
    return geo;
  }, []);
}

function Diamond({ progress, mouse }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const matRef = useRef<any>(null);
  const geometry = useDiamondGeometry();

  useFrame((state, delta) => {
    if (!meshRef.current || !matRef.current) return;
    const p = progress.current ?? 0;
    const mx = mouse.current?.x ?? 0.5;
    const my = mouse.current?.y ?? 0.5;

    /* Mouse-driven rotation (subtle, lerped) */
    meshRef.current.rotation.y +=
      ((mx - 0.5) * 1.0 - meshRef.current.rotation.y) * 0.025;
    meshRef.current.rotation.x +=
      ((my - 0.5) * 0.4 - meshRef.current.rotation.x) * 0.025;

    /* Constant slow spin */
    meshRef.current.rotation.y += delta * 0.1;

    /* Scroll-driven material transition: raw → polished */
    const mat = matRef.current;
    const ease = Math.pow(p, 0.6); // faster initial change

    mat.distortion = THREE.MathUtils.lerp(3.0, 0.02, ease);
    mat.chromaticAberration = THREE.MathUtils.lerp(1.5, 0.08, ease);
    mat.temporalDistortion = THREE.MathUtils.lerp(0.6, 0.01, ease);
    mat.thickness = THREE.MathUtils.lerp(0.2, 3.5, ease);
    mat.roughness = THREE.MathUtils.lerp(0.45, 0.01, ease);
    mat.envMapIntensity = THREE.MathUtils.lerp(0.5, 4.0, ease);

    /* Breathing scale */
    const breath = Math.sin(state.clock.elapsedTime * 0.7) * 0.015;
    const baseScale = THREE.MathUtils.lerp(1.05, 1.35, p);
    meshRef.current.scale.setScalar(baseScale + breath);
  });

  return (
    <Float speed={0.8} rotationIntensity={0.06} floatIntensity={0.12}>
      <mesh ref={meshRef} geometry={geometry}>
        <MeshTransmissionMaterial
          ref={matRef}
          backside
          samples={6}
          resolution={256}
          thickness={1.5}
          roughness={0.25}
          chromaticAberration={1.0}
          anisotropy={0.4}
          distortion={2.5}
          distortionScale={0.35}
          temporalDistortion={0.4}
          ior={2.33}
          color="#FF6B00"
          attenuationColor="#FF4500"
          attenuationDistance={0.6}
          envMapIntensity={1.5}
          toneMapped={false}
        />
      </mesh>
    </Float>
  );
}

/* Orange ember particles orbiting the diamond */
function Embers({ progress }: { progress: React.RefObject<number> }) {
  const count = 80;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.8 + Math.random() * 2.0;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.0015;
    ref.current.rotation.x += 0.0008;
    const p = progress.current ?? 0;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = THREE.MathUtils.lerp(0.12, 0.65, p);
    mat.size = THREE.MathUtils.lerp(0.012, 0.03, p);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#FF6B00"
        transparent
        opacity={0.2}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/* Subtle light ring around the diamond */
function LightRing({ progress }: { progress: React.RefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null);
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const matRef = useRef<any>(null);

  useFrame((state) => {
    if (!ref.current || !matRef.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.15;
    const p = progress.current ?? 0;
    matRef.current.opacity = THREE.MathUtils.lerp(0.0, 0.4, p);
  });

  return (
    <mesh ref={ref} rotation={[Math.PI * 0.5, 0, 0]}>
      <torusGeometry args={[2.2, 0.008, 8, 128]} />
      <meshBasicMaterial
        ref={matRef}
        color="#FF6B00"
        transparent
        opacity={0.0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

export function DiamondScene({ progress, mouse }: Props) {
  return (
    <Canvas
      className="!fixed inset-0"
      camera={{ position: [0, 0, 5.5], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
    >
      <color attach="background" args={["#050505"]} />

      <Suspense fallback={null}>
        <Diamond progress={progress} mouse={mouse} />
        <Embers progress={progress} />
        <LightRing progress={progress} />
        <Environment
          preset="city"
          environmentIntensity={0.4}
        />
      </Suspense>

      <ambientLight intensity={0.08} />
      <pointLight position={[5, 4, 6]} intensity={4} color="#FF6B00" />
      <pointLight position={[-4, -3, -4]} intensity={1.5} color="#3366CC" />
      <pointLight position={[0, 5, 0]} intensity={1} color="#ffffff" />
    </Canvas>
  );
}
