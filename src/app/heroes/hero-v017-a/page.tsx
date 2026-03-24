"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Space_Grotesk } from "next/font/google";

gsap.registerPlugin(ScrollTrigger);

/* ======================================================================
   hero-v017-a: PRISM — Transmissive Glass Diamond

   Third WebGL hero. First TRANSPARENT object — glass refraction,
   chromatic aberration, visible THROUGH the surface.

   Narrative: "A raw idea, polished with creative force, becomes
   a brilliant experience." The diamond IS the metaphor.

   Progression (500vh scroll):
   RAW      (0-25%)    Heavy distortion — raw, uncut stone
   CUTTING  (25-55%)   Distortion clears, facets catch light
   CLARITY  (55-80%)   Crystal clear — prismatic refractions explode
   REVEAL   (80-100%)  Perfect gem, brand materializes

   Signature moment: The distortion clearing — chaotic refractions
   suddenly snap into prismatic clarity. The creative breakthrough.

   Inspiration: Glass/crystal materials from Lusion, Active Theory
   Tech: react-three-fiber, MeshTransmissionMaterial (drei),
         GSAP ScrollTrigger, Lenis smooth scroll
   ====================================================================== */

const DiamondScene = dynamic(
  () =>
    import("./DiamondScene").then((m) => ({
      default: m.DiamondScene,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0" style={{ background: "#050505" }} />
    ),
  },
);

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-space",
});

const ORANGE = "#FF6B00";

export default function HeroV017A() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  /* Text refs */
  const phaseLabel0 = useRef<HTMLDivElement>(null);
  const word0Ref = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLDivElement>(null);
  const word2Ref = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);

  /* --- Lenis + GSAP + Timeline --- */
  useEffect(() => {
    setMounted(true);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    const tickerCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    /* Scroll progress for WebGL */
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });

    /* Text choreography */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    /* Scroll indicator fades */
    tl.to(
      scrollIndicatorRef.current,
      { opacity: 0, y: -20, duration: 0.06, ease: "power2.in" },
      0.04,
    );

    /* Phase label "ROHE IDEE" (8-18%) */
    tl.fromTo(
      phaseLabel0.current,
      { opacity: 0, x: -40, filter: "blur(12px)" },
      {
        opacity: 0.6,
        x: 0,
        filter: "blur(0px)",
        duration: 0.06,
        ease: "expo.out",
        immediateRender: false,
      },
      0.08,
    );
    tl.to(
      phaseLabel0.current,
      { opacity: 0, x: 40, duration: 0.04, ease: "power2.in" },
      0.22,
    );

    /* "KREATIVE" appears during cutting (30-38%) */
    tl.fromTo(
      word0Ref.current,
      { opacity: 0, y: 50, filter: "blur(20px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.08,
        ease: "expo.out",
        immediateRender: false,
      },
      0.30,
    );

    /* "KRAFT" appears (36-44%) */
    tl.fromTo(
      word1Ref.current,
      { opacity: 0, x: 60, filter: "blur(15px)" },
      {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 0.08,
        ease: "expo.out",
        immediateRender: false,
      },
      0.36,
    );

    /* Words fade during clarity phase (52-58%) */
    tl.to(word0Ref.current, { opacity: 0, y: -30, duration: 0.05 }, 0.52);
    tl.to(word1Ref.current, { opacity: 0, x: -30, duration: 0.05 }, 0.54);

    /* "BRILLANZ" slams in at clarity peak (58-70%) — THE moment */
    tl.fromTo(
      word2Ref.current,
      { opacity: 0, scale: 1.6, filter: "blur(30px)" },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.12,
        ease: "expo.out",
        immediateRender: false,
      },
      0.58,
    );

    /* "BRILLANZ" fades for brand reveal (76-82%) */
    tl.to(
      word2Ref.current,
      { opacity: 0, scale: 0.95, filter: "blur(8px)", duration: 0.05 },
      0.76,
    );

    /* Brand reveal (82-90%) */
    tl.fromTo(
      brandRef.current,
      { opacity: 0, letterSpacing: "0.8em" },
      {
        opacity: 1,
        letterSpacing: "0.3em",
        duration: 0.08,
        ease: "expo.out",
        immediateRender: false,
      },
      0.82,
    );

    /* Services bar (88-94%) */
    tl.fromTo(
      servicesRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.06,
        ease: "power2.out",
        immediateRender: false,
      },
      0.88,
    );

    return () => {
      gsap.ticker.remove(tickerCb);
      st.kill();
      tl.kill();
      lenis.destroy();
    };
  }, []);

  /* Mouse / Touch tracking */
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
    };
    const handleTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) {
        mouse.current.x = t.clientX / window.innerWidth;
        mouse.current.y = t.clientY / window.innerHeight;
      }
    };
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("touchmove", handleTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("touchmove", handleTouch);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${spaceGrotesk.variable} relative`}
      style={{ height: "500vh", background: "#050505" }}
    >
      {/* WebGL Scene */}
      {mounted && <DiamondScene progress={progress} mouse={mouse} />}

      {/* --- Text Overlay --- */}
      <div
        className="fixed inset-0 z-10 pointer-events-none"
        style={{ fontFamily: "var(--font-space)" }}
      >
        {/* Phase label — "ROHE IDEE" */}
        <div
          ref={phaseLabel0}
          className="absolute"
          style={{
            top: "18%",
            left: "8%",
            opacity: 0,
            fontSize: "clamp(0.7rem, 1vw, 1rem)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.25em",
            textTransform: "uppercase" as const,
          }}
        >
          ROHE IDEE
        </div>

        {/* "KREATIVE" — left, light */}
        <div
          ref={word0Ref}
          className="absolute"
          style={{
            top: "24%",
            left: "8%",
            opacity: 0,
            fontSize: "clamp(2.5rem, 7vw, 7rem)",
            fontWeight: 300,
            color: "#f5f5f5",
            letterSpacing: "0.08em",
            lineHeight: 1,
          }}
        >
          KREATIVE
        </div>

        {/* "KRAFT" — right, bold */}
        <div
          ref={word1Ref}
          className="absolute"
          style={{
            top: "50%",
            right: "8%",
            opacity: 0,
            fontSize: "clamp(2.5rem, 7vw, 7rem)",
            fontWeight: 700,
            color: "#f5f5f5",
            letterSpacing: "0.02em",
            lineHeight: 1,
          }}
        >
          KRAFT
        </div>

        {/* "BRILLANZ" — center, huge, orange = THE moment */}
        <div
          ref={word2Ref}
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0,
            fontSize: "clamp(3rem, 10vw, 10rem)",
            fontWeight: 700,
            color: ORANGE,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          BRILLANZ
        </div>

        {/* Brand — bottom center */}
        <div
          ref={brandRef}
          className="absolute"
          style={{
            bottom: "22%",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: 0,
            fontSize: "clamp(0.85rem, 1.6vw, 1.6rem)",
            fontWeight: 300,
            color: "#f5f5f5",
            letterSpacing: "0.3em",
            textTransform: "uppercase" as const,
          }}
        >
          PixIntCreators
        </div>

        {/* Services bar */}
        <div
          ref={servicesRef}
          className="absolute flex gap-8"
          style={{
            bottom: "14%",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: 0,
          }}
        >
          {["WEBDESIGN", "KI-INTEGRATION", "CREATIVE DEV"].map((s) => (
            <span
              key={s}
              style={{
                fontSize: "clamp(0.55rem, 0.7vw, 0.8rem)",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.15em",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span
          style={{
            fontFamily: "var(--font-space)",
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.2em",
          }}
        >
          SCROLL
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </div>

      {/* Grain overlay */}
      <div className="fixed inset-0 z-20 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%">
          <filter id="grain17a">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain17a)" />
        </svg>
      </div>

      {/* Vignette */}
      <div
        className="fixed inset-0 z-[5] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.7) 100%)",
        }}
      />
    </div>
  );
}
