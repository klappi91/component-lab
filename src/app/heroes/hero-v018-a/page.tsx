"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/* ======================================================================
   hero-v018-a: NEBULA — GPGPU Particle Morph

   First GPGPU/FBO hero. 16,384 particles with positions computed
   entirely on the GPU via ping-pong render targets.

   Narrative: Creation begins in chaos. Through focus and craft,
   chaos crystallizes into form. That form becomes the brand.

   Progression (500vh scroll):
   CHAOS      (0-20%)   Particles swirl in curl noise nebula
   CONVERGE   (20-55%)  Turbulence fades, particles pull toward sphere
   FORM       (55-80%)  Tight glowing sphere, slowly orbiting
   REVEAL     (80-100%) Brand text materializes, particles pulse

   Signature moment: The convergence — when 16K particles suddenly
   find structure in chaos. The creative breakthrough, visualized.

   Inspiration: Immersive Garden (SOTD 18.03.2026) — entire site
   rendered in WebGL. FBO particles from Maxime Heckel, Loopspeed.
   Tech: react-three-fiber, GPGPU FBO, curl noise, GSAP, Lenis
   ====================================================================== */

const ParticleScene = dynamic(
  () =>
    import("./ParticleScene").then((m) => ({
      default: m.ParticleScene,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0" style={{ background: "#050505" }} />
    ),
  },
);

const ORANGE = "#FF6B00";

export default function HeroV018A() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  /* Text refs */
  const chaosRef = useRef<HTMLDivElement>(null);
  const convergeRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    /* ── Lenis smooth scroll ── */
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    const tickerCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    /* ── Master ScrollTrigger ── */
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.8,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });

    /* ── Text animations ── */

    // Scroll hint fade out
    gsap.to(scrollHintRef.current, {
      opacity: 0,
      y: -20,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "5% top",
        scrub: true,
      },
    });

    // "FROM CHAOS" — appears 5-15%, fades 20-30%
    const chaosTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "5% top",
        end: "30% top",
        scrub: true,
      },
    });
    chaosTl
      .fromTo(
        chaosRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "expo.out" },
      )
      .to(chaosRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.3,
        ease: "power2.in",
      });

    // "TO CREATION" — appears 30-40%, fades 50-60%
    const convergeTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "30% top",
        end: "60% top",
        scrub: true,
      },
    });
    convergeTl
      .fromTo(
        convergeRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "expo.out" },
      )
      .to(convergeRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.3,
        ease: "power2.in",
      });

    // Brand reveal — appears 70%+
    gsap.fromTo(
      brandRef.current,
      { opacity: 0, scale: 0.9, letterSpacing: "0.5em" },
      {
        opacity: 1,
        scale: 1,
        letterSpacing: "0.25em",
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "68% top",
          end: "80% top",
          scrub: true,
        },
      },
    );

    // Tagline — appears 80%+
    gsap.fromTo(
      taglineRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "78% top",
          end: "88% top",
          scrub: true,
        },
      },
    );

    /* ── Mouse tracking ── */
    const onMouse = (e: MouseEvent) => {
      mouse.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", onMouse);

    return () => {
      st.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: "500vh", position: "relative" }}
    >
      {/* Fixed viewport — 3D scene */}
      <div className="fixed inset-0" style={{ zIndex: 0 }}>
        <div
          className="absolute inset-0"
          style={{ background: "#050505" }}
        />
        {mounted && (
          <ParticleScene progress={progress} mouse={mouse} />
        )}
      </div>

      {/* Fixed text overlay layer */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 10 }}
      >
        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          Scroll to begin
        </div>

        {/* Phase 1: CHAOS text */}
        <div
          ref={chaosRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: 0 }}
        >
          <h2
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "clamp(2rem, 8vw, 6rem)",
              fontWeight: 200,
              color: "rgba(255,255,255,0.7)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            From Chaos
          </h2>
        </div>

        {/* Phase 2: CONVERGENCE text */}
        <div
          ref={convergeRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: 0 }}
        >
          <h2
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "clamp(2rem, 8vw, 6rem)",
              fontWeight: 200,
              color: ORANGE,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            To Creation
          </h2>
        </div>

        {/* Phase 3: Brand reveal */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4"
        >
          <div
            ref={brandRef}
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "clamp(1.5rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              opacity: 0,
            }}
          >
            PixIntCreators
          </div>
          <div
            ref={taglineRef}
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "clamp(0.8rem, 2vw, 1.2rem)",
              fontWeight: 300,
              color: ORANGE,
              letterSpacing: "0.15em",
              opacity: 0,
            }}
          >
            Wir gestalten Erlebnisse
          </div>
        </div>
      </div>
    </div>
  );
}
