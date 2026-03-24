"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Space_Grotesk } from "next/font/google";

gsap.registerPlugin(ScrollTrigger);

/* ======================================================================
   hero-v019-a: STUDIO — AI-Generated 3D Laptop Hero

   FIRST hero with a REAL AI-generated 3D object (Meshy AI).
   A laptop floats in darkness. As you scroll, its screen ignites
   with creative energy, transforming it into a beacon of craft.

   The object is MEANINGFUL — a laptop IS the creative tool.
   Not abstract geometry, but the actual instrument of creation.

   Narrative: "From darkness, the tool awakens. From the tool,
   creation flows. From creation, the brand emerges."

   Tech: Meshy AI Text-to-3D → gltf-transform optimization (21MB→1.4MB)
         → useGLTF → custom materials → GSAP ScrollTrigger → Lenis
   ====================================================================== */

const LaptopScene = dynamic(
  () =>
    import("./LaptopScene").then((m) => ({
      default: m.LaptopScene,
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

export default function HeroV019A() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  /* Text refs */
  const phaseRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

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

    /* Scroll indicator fades quickly */
    tl.to(
      scrollIndicatorRef.current,
      { opacity: 0, y: -20, duration: 0.05, ease: "power2.in" },
      0.03,
    );

    /* Phase label — "DAS WERKZEUG" (8-18%) */
    tl.fromTo(
      phaseRef.current,
      { opacity: 0, x: -30, filter: "blur(10px)" },
      {
        opacity: 0.5,
        x: 0,
        filter: "blur(0px)",
        duration: 0.06,
        ease: "expo.out",
        immediateRender: false,
      },
      0.08,
    );
    tl.to(
      phaseRef.current,
      { opacity: 0, x: 30, duration: 0.04, ease: "power2.in" },
      0.20,
    );

    /* "WIR GESTALTEN" — appears during IGNITE (25-33%) */
    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 60, filter: "blur(20px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.08,
        ease: "expo.out",
        immediateRender: false,
      },
      0.25,
    );

    /* "ERLEBNISSE" — bold, larger, right-aligned (32-40%) */
    tl.fromTo(
      sublineRef.current,
      { opacity: 0, x: 80, filter: "blur(15px)" },
      {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 0.08,
        ease: "expo.out",
        immediateRender: false,
      },
      0.32,
    );

    /* Both words move apart and fade during RADIATE (50-58%) */
    tl.to(headlineRef.current, { opacity: 0, y: -40, duration: 0.06 }, 0.50);
    tl.to(sublineRef.current, { opacity: 0, x: -50, duration: 0.06 }, 0.52);

    /* Tagline — "Digital. Mutig. Unvergesslich." center fade in (55-68%) */
    tl.fromTo(
      taglineRef.current,
      { opacity: 0, scale: 0.9, filter: "blur(12px)" },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.10,
        ease: "expo.out",
        immediateRender: false,
      },
      0.55,
    );
    tl.to(
      taglineRef.current,
      { opacity: 0, scale: 1.05, filter: "blur(6px)", duration: 0.05 },
      0.70,
    );

    /* Brand reveal — "PIXINTCREATORS" (76-86%) */
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
      0.76,
    );

    /* Services bar (84-92%) */
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
      0.84,
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
      {mounted && <LaptopScene progress={progress} mouse={mouse} />}

      {/* --- Text Overlay --- */}
      <div
        className="fixed inset-0 z-10 pointer-events-none"
        style={{ fontFamily: "var(--font-space)" }}
      >
        {/* Phase label — "DAS WERKZEUG" */}
        <div
          ref={phaseRef}
          className="absolute"
          style={{
            top: "18%",
            left: "8%",
            opacity: 0,
            fontSize: "clamp(0.65rem, 0.9vw, 0.9rem)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.25em",
            textTransform: "uppercase" as const,
          }}
        >
          DAS WERKZEUG
        </div>

        {/* "WIR GESTALTEN" — left side, light weight */}
        <div
          ref={headlineRef}
          className="absolute"
          style={{
            top: "22%",
            left: "8%",
            opacity: 0,
            fontSize: "clamp(2rem, 5.5vw, 5.5rem)",
            fontWeight: 300,
            color: "#f5f5f5",
            letterSpacing: "0.06em",
            lineHeight: 1.1,
          }}
        >
          WIR GESTALTEN
        </div>

        {/* "ERLEBNISSE" — right side, bold, orange accent */}
        <div
          ref={sublineRef}
          className="absolute"
          style={{
            top: "50%",
            right: "8%",
            opacity: 0,
            fontSize: "clamp(2.5rem, 7vw, 7rem)",
            fontWeight: 700,
            color: ORANGE,
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          ERLEBNISSE
        </div>

        {/* Tagline — center, smaller */}
        <div
          ref={taglineRef}
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0,
            fontSize: "clamp(1rem, 2vw, 2rem)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.7)",
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          Digital · Mutig · Unvergesslich
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
          <filter id="grain19a">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain19a)" />
        </svg>
      </div>

      {/* Vignette */}
      <div
        className="fixed inset-0 z-[5] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.65) 100%)",
        }}
      />
    </div>
  );
}
