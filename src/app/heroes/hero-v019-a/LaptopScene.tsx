"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, Float, useGLTF } from "@react-three/drei";
import * as THREE from "three";

/* ======================================================================
   hero-v019-a: STUDIO — AI-Generated 3D Laptop Hero

   First hero with a REAL AI-generated 3D object via Meshy AI.
   A laptop floating in space becomes a portal for creative energy.

   The laptop model was generated with Meshy Text-to-3D, refined with PBR,
   then optimized from 21MB to 1.4MB using gltf-transform (Draco + WebP).

   Scroll progression (500vh):
   DARK       (0-15%)   Laptop silhouette, barely visible, faint embers
   IGNITE     (15-40%)  Orange glow erupts from screen, illuminates surface
   RADIATE    (40-70%)  Full creative energy, particles stream from screen
   BRAND      (70-100%) Camera eases back, brand text materializes

   Signature moment: The ignition — when the screen blazes orange and
   the entire laptop transforms from dark object to creative beacon.

   Inspiration: Pendragon Cycle (SOTD Jan 2026) — restraint in WebGL,
   every 3D element serves the narrative.
   Tech: react-three-fiber, useGLTF (Meshy AI model), custom materials,
         GSAP ScrollTrigger, Lenis smooth scroll
   ====================================================================== */

interface Props {
  progress: React.RefObject<number>;
  mouse: React.RefObject<{ x: number; y: number }>;
}

// Preload model
useGLTF.preload("/models/laptop.glb");

function Laptop({ progress, mouse }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/laptop.glb");

  /* Clone scene so we can modify materials */
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const oldMat = mesh.material as THREE.MeshStandardMaterial;
        const newMat = new THREE.MeshStandardMaterial({
          color: oldMat.color?.clone() || new THREE.Color(0x1a1a1a),
          map: oldMat.map || null,
          normalMap: oldMat.normalMap || null,
          roughnessMap: oldMat.roughnessMap || null,
          metalnessMap: oldMat.metalnessMap || null,
          roughness: oldMat.roughness ?? 0.4,
          metalness: oldMat.metalness ?? 0.8,
          emissive: new THREE.Color(0xff6b00),
          emissiveIntensity: 0,
          envMapIntensity: 0.5,
        });
        mesh.material = newMat;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const p = progress.current ?? 0;
    const mx = mouse.current?.x ?? 0.5;
    const my = mouse.current?.y ?? 0.5;

    /* Mouse-driven rotation (subtle) */
    const targetRotY = (mx - 0.5) * 0.6;
    const targetRotX = (my - 0.5) * 0.3;
    groupRef.current.rotation.y +=
      (targetRotY - groupRef.current.rotation.y) * 0.03;
    groupRef.current.rotation.x +=
      (targetRotX + 0.1 - groupRef.current.rotation.x) * 0.03;

    /* Constant slow spin */
    groupRef.current.rotation.y += delta * 0.06;

    /* Scroll-driven Y position: subtle float up */
    groupRef.current.position.y = THREE.MathUtils.lerp(-0.3, 0.2, p);

    /* Scroll-driven scale: subtle growth, not too dominant */
    const scale = THREE.MathUtils.lerp(1.4, 1.7, p);
    groupRef.current.scale.setScalar(scale);

    /* Update emissive intensity based on scroll — subtle, not overwhelming */
    const emissiveP = p < 0.15 ? 0 : Math.min((p - 0.15) / 0.30, 1);
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        if (mat.emissive) {
          mat.emissiveIntensity = emissiveP * 0.15;
          mat.envMapIntensity = THREE.MathUtils.lerp(0.4, 1.5, p);
        }
      }
    });
  });

  return (
    <Float speed={0.6} rotationIntensity={0.04} floatIntensity={0.08}>
      <group ref={groupRef} position={[0, -0.3, 0]}>
        <primitive object={clonedScene} />
      </group>
    </Float>
  );
}

/* Screen glow — volumetric light via sprite instead of plane
   (sprites always face camera, blend better than geometry planes) */
function ScreenGlow({ progress }: { progress: React.RefObject<number> }) {
  const ref = useRef<THREE.Sprite>(null);

  /* Radial gradient texture for soft glow */
  const glowTexture = useMemo(() => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(
      size / 2, size / 2, 0,
      size / 2, size / 2, size / 2,
    );
    gradient.addColorStop(0, "rgba(255, 107, 0, 1)");
    gradient.addColorStop(0.3, "rgba(255, 107, 0, 0.5)");
    gradient.addColorStop(0.7, "rgba(255, 60, 0, 0.15)");
    gradient.addColorStop(1, "rgba(255, 40, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const p = progress.current ?? 0;
    const glowP = p < 0.12 ? 0 : Math.min((p - 0.12) / 0.25, 1);
    const pulse = Math.sin(Date.now() * 0.002) * 0.06;
    const mat = ref.current.material as THREE.SpriteMaterial;
    mat.opacity = (glowP * 0.6) + (pulse * glowP);
    /* Scale glow with scroll */
    const s = 1.5 + glowP * 1.5;
    ref.current.scale.set(s, s * 0.7, 1);
  });

  return (
    <sprite ref={ref} position={[0, 0.2, 0.3]}>
      <spriteMaterial
        map={glowTexture}
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </sprite>
  );
}

/* Rising ember particles */
function Embers({ progress }: { progress: React.RefObject<number> }) {
  const count = 120;
  const ref = useRef<THREE.Points>(null);

  const { positions, velocities, offsets } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const off = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      /* Start near screen area */
      pos[i * 3] = (Math.random() - 0.5) * 1.5;
      pos[i * 3 + 1] = Math.random() * 0.3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.0;
      /* Rising velocity with drift */
      vel[i * 3] = (Math.random() - 0.5) * 0.3;
      vel[i * 3 + 1] = 0.5 + Math.random() * 1.2;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
      off[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, velocities: vel, offsets: off };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const p = progress.current ?? 0;
    const t = state.clock.elapsedTime;

    /* Embers visible from IGNITE phase */
    const emberP = p < 0.15 ? 0 : Math.min((p - 0.15) / 0.3, 1);
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = emberP * 0.7;

    /* Animate positions */
    const geo = ref.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const cycle = ((t * 0.3 + offsets[i]) % 1);
      const x = velocities[i * 3] * Math.sin(t + offsets[i]) * 0.5;
      const y = cycle * 4.0 - 1.0;
      const z = velocities[i * 3 + 2] * Math.cos(t * 0.7 + offsets[i]) * 0.5;
      posAttr.setXYZ(
        i,
        positions[i * 3] + x,
        positions[i * 3 + 1] + y,
        positions[i * 3 + 2] + z,
      );
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.slice(), 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#FF6B00"
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/* Orbiting light ring */
function LightRing({ progress }: { progress: React.RefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (!ref.current || !matRef.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.12;
    ref.current.rotation.x = state.clock.elapsedTime * 0.05;
    const p = progress.current ?? 0;
    const ringP = p < 0.3 ? 0 : Math.min((p - 0.3) / 0.3, 1);
    matRef.current.opacity = ringP * 0.25;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[3.0, 0.006, 8, 128]} />
      <meshBasicMaterial
        ref={matRef}
        color="#FF6B00"
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/* Animated lights that respond to scroll */
function DynamicLights({ progress }: { progress: React.RefObject<number> }) {
  const keyRef = useRef<THREE.PointLight>(null);
  const fillRef = useRef<THREE.PointLight>(null);
  const screenRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    const p = progress.current ?? 0;
    if (keyRef.current) {
      keyRef.current.intensity = THREE.MathUtils.lerp(0.3, 3.0, p);
    }
    if (fillRef.current) {
      fillRef.current.intensity = THREE.MathUtils.lerp(0.15, 1.2, p);
    }
    if (screenRef.current) {
      const glowP = p < 0.12 ? 0 : Math.min((p - 0.12) / 0.25, 1);
      screenRef.current.intensity = glowP * 6.0;
    }
  });

  return (
    <>
      {/* Key light — orange, follows scroll */}
      <pointLight
        ref={keyRef}
        position={[4, 3, 5]}
        intensity={0.5}
        color="#FF6B00"
        distance={20}
      />
      {/* Fill light — cool blue */}
      <pointLight
        ref={fillRef}
        position={[-4, -2, -3]}
        intensity={0.2}
        color="#2244AA"
        distance={15}
      />
      {/* Rim light — white */}
      <pointLight position={[0, 5, -3]} intensity={1.0} color="#ffffff" distance={15} />
      {/* Screen light — intense orange from screen position */}
      <pointLight
        ref={screenRef}
        position={[0, 0.3, 0.4]}
        intensity={0}
        color="#FF6B00"
        distance={6}
      />
    </>
  );
}

export function LaptopScene({ progress, mouse }: Props) {
  return (
    <Canvas
      className="!fixed inset-0"
      camera={{ position: [0, 0.5, 5.0], fov: 38 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
    >
      <color attach="background" args={["#050505"]} />

      <Suspense fallback={null}>
        <Laptop progress={progress} mouse={mouse} />
        <ScreenGlow progress={progress} />
        <Embers progress={progress} />
        <LightRing progress={progress} />
        <DynamicLights progress={progress} />
        <Environment preset="city" environmentIntensity={0.15} />
      </Suspense>

      <ambientLight intensity={0.04} />
    </Canvas>
  );
}
