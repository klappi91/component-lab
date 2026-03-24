"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Space_Grotesk } from "next/font/google";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   hero-v015-a: LIQUID GLASS — WebGL Image Distortion

   Erster WebGL-Shader-Hero im Lab.
   Ein hochwertiges Bild hinter "fluessigem Glas".
   Mouse erzeugt Ripples. Scroll klaert die Sicht.
   Das Bild ist IMMER lebendig.

   Choreografie:
   DISTORTION  (0-30%)  — Volle Verzerrung, lebende Textur
   EMERGENCE   (30-60%) — Bild klaert sich, "WIR CODIEREN" erscheint
   CLARITY     (60-90%) — Fast klar, "ERLEBNISSE" schlaegt ein
   RESOLVE     (90-100%) — Kristallklar, Brand-Statement komplett

   Technik: react-three-fiber + custom GLSL fragment shader
   Simplex noise displacement, chromatic aberration,
   mouse ripple interaction, scroll-driven progress.

   Inspiration: Lusion, Immersive Garden — WebGL als Signature
   ═══════════════════════════════════════════════════════════ */

const LiquidGlassScene = dynamic(
  () =>
    import("./LiquidGlassScene").then((m) => ({
      default: m.LiquidGlassScene,
    })),
  { ssr: false },
);

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-space",
});

const ORANGE = "#FF6B00";

export default function HeroV015A() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  /* Text refs */
  const headlineRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ─── Mouse tracking ─── */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = {
        x: e.clientX / window.innerWidth,
        y: 1.0 - e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /* ─── Touch tracking ─── */
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouse.current = {
          x: touch.clientX / window.innerWidth,
          y: 1.0 - touch.clientY / window.innerHeight,
        };
      }
    };
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => window.removeEventListener("touchmove", handleTouchMove);
  }, []);

  /* ─── GSAP Scroll Choreografie ─── */
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      /* Master scroll progress → shader */
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });

      /* Scroll indicator fades out */
      tl.to(
        scrollIndicatorRef.current,
        { opacity: 0, y: 20, duration: 0.1, ease: "power2.in" },
        0,
      );

      /* Phase 2: "WIR CODIEREN" emerges */
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 60, filter: "blur(20px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.15,
          ease: "expo.out",
        },
        0.25,
      );

      /* Phase 3: "ERLEBNISSE" slams in */
      tl.fromTo(
        sublineRef.current,
        { opacity: 0, y: 80, scale: 0.9, filter: "blur(12px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.15,
          ease: "expo.out",
        },
        0.5,
      );

      /* Services appear */
      tl.fromTo(
        servicesRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
        0.7,
      );

      /* Brand bar */
      tl.fromTo(
        brandRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.1, ease: "power2.out" },
        0.8,
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className={spaceGrotesk.variable}
      style={{ background: "#0A0A0A", color: "#fff" }}
    >
      {/* Scroll container — 400vh gives plenty of room */}
      <div ref={containerRef} style={{ height: "400vh", position: "relative" }}>
        {/* WebGL Canvas (fixed, behind everything) */}
        {mounted && <LiquidGlassScene progress={progress} mouse={mouse} />}

        {/* Fixed overlay — text content */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 10,
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Top nav */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              padding: "2rem 3rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              ref={brandRef}
              style={{
                fontFamily: "var(--font-space), sans-serif",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                opacity: 0,
              }}
            >
              PixIntCreators
            </span>
          </div>

          {/* Center text block */}
          <div
            style={{
              textAlign: "center",
              fontFamily: "var(--font-space), sans-serif",
            }}
          >
            {/* WIR CODIEREN */}
            <div
              ref={headlineRef}
              style={{
                fontSize: "clamp(1.2rem, 3vw, 2.5rem)",
                fontWeight: 300,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.9)",
                marginBottom: "0.5rem",
                opacity: 0,
              }}
            >
              WIR CODIEREN
            </div>

            {/* ERLEBNISSE */}
            <div
              ref={sublineRef}
              style={{
                fontSize: "clamp(3rem, 12vw, 12rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 0.9,
                color: ORANGE,
                textTransform: "uppercase",
                opacity: 0,
              }}
            >
              ERLEBNISSE
            </div>
          </div>

          {/* Services bar */}
          <div
            ref={servicesRef}
            style={{
              position: "absolute",
              bottom: "6rem",
              display: "flex",
              gap: "3rem",
              fontFamily: "var(--font-space), sans-serif",
              fontSize: "0.7rem",
              fontWeight: 400,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              opacity: 0,
            }}
          >
            <span>Webdesign</span>
            <span style={{ color: "rgba(255,107,0,0.5)" }}>·</span>
            <span>KI-Integration</span>
            <span style={{ color: "rgba(255,107,0,0.5)" }}>·</span>
            <span>Creative Dev</span>
          </div>

          {/* Scroll indicator */}
          <div
            ref={scrollIndicatorRef}
            style={{
              position: "absolute",
              bottom: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-space), sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            <span>Scroll</span>
            <svg
              width="16"
              height="24"
              viewBox="0 0 16 24"
              fill="none"
              style={{
                animation: "scrollBounce 2s ease-in-out infinite",
              }}
            >
              <path
                d="M8 4L8 18M8 18L2 12M8 18L14 12"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes scrollBounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
        }

        /* Hide scrollbar for cleaner experience */
        body::-webkit-scrollbar {
          display: none;
        }
        body {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
