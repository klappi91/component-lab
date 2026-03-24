"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Space_Grotesk } from "next/font/google";

gsap.registerPlugin(ScrollTrigger);

/* ======================================================================
   hero-v016-a: METAMORPHIC — Interactive 3D Morphing Blob

   Second WebGL hero. A living, breathing 3D form made from
   IcosahedronGeometry with vertex displacement via 3D simplex noise.
   Three-point Blinn-Phong lighting, Fresnel rim glow, iridescence.

   Progression (500vh scroll):
   BREATHE  (0-20%)   Gentle breathing, dark form emerges
   AWAKEN   (20-40%)  Chaos builds, form becomes wild
   STORM    (40-60%)  Peak chaos, text appears through turmoil
   REFINE   (60-80%)  Sudden calm — the creative breakthrough
   REVEAL   (80-100%) Nearly smooth sphere, brand materializes

   Signature moment: The STORM -> REFINE snap. Chaos drops to calm
   over just 10% of scroll. The creative process crystallized.

   Inspiration: Lusion, Immersive Garden (WebGL 3D as core identity)
   Tech: react-three-fiber, custom GLSL vertex+fragment shader,
         GSAP ScrollTrigger (scrub), Lenis smooth scroll
   ====================================================================== */

const MetamorphicScene = dynamic(
  () =>
    import("./MetamorphicScene").then((m) => ({
      default: m.MetamorphicScene,
    })),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0" style={{ background: "#0A0A0A" }} />,
  },
);

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "700"],
  variable: "--font-space",
});

const ORANGE = "#FF6B00";

export default function HeroV016A() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  /* Text refs */
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

    /* Lenis smooth scroll */
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

    /* Text choreography timeline */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    /* Scroll indicator fades out early */
    tl.to(scrollIndicatorRef.current, {
      opacity: 0, y: -20, duration: 0.08, ease: "power2.in",
    }, 0.05);

    /* "WIR" appears during storm build (32-40%) */
    tl.fromTo(word0Ref.current,
      { opacity: 0, y: 60, filter: "blur(20px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.08, ease: "expo.out", immediateRender: false },
      0.32,
    );

    /* "GESTALTEN" appears (38-46%) */
    tl.fromTo(word1Ref.current,
      { opacity: 0, x: 80, filter: "blur(15px)" },
      { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.08, ease: "expo.out", immediateRender: false },
      0.38,
    );

    /* "ERLEBNISSE" slams in at peak chaos (44-55%) */
    tl.fromTo(word2Ref.current,
      { opacity: 0, scale: 1.4, filter: "blur(30px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.11, ease: "expo.out", immediateRender: false },
      0.44,
    );

    /* All words fade out during REFINE snap (60-68%) */
    tl.to(word0Ref.current, { opacity: 0, y: -30, duration: 0.06 }, 0.60);
    tl.to(word1Ref.current, { opacity: 0, x: -30, duration: 0.06 }, 0.62);
    tl.to(word2Ref.current, { opacity: 0, scale: 0.9, filter: "blur(10px)", duration: 0.06 }, 0.64);

    /* Brand reveal in RESOLVE phase (80-88%) */
    tl.fromTo(brandRef.current,
      { opacity: 0, letterSpacing: "0.6em" },
      { opacity: 1, letterSpacing: "0.3em", duration: 0.08, ease: "expo.out", immediateRender: false },
      0.80,
    );

    /* Services bar (86-92%) */
    tl.fromTo(servicesRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.06, ease: "power2.out", immediateRender: false },
      0.86,
    );

    return () => {
      gsap.ticker.remove(tickerCb);
      st.kill();
      tl.kill();
      lenis.destroy();
    };
  }, []);

  /* --- Mouse / Touch tracking --- */
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
      style={{ height: "500vh", background: "#0A0A0A" }}
    >
      {/* WebGL Scene */}
      {mounted && <MetamorphicScene progress={progress} mouse={mouse} />}

      {/* --- Text Overlay --- */}
      <div className="fixed inset-0 z-10 pointer-events-none" style={{ fontFamily: "var(--font-space)" }}>

        {/* WIR — top left, light weight */}
        <div
          ref={word0Ref}
          className="absolute"
          style={{
            top: "22%", left: "10%", opacity: 0,
            fontSize: "clamp(3rem, 8vw, 8rem)",
            fontWeight: 300, color: "#f5f5f5",
            letterSpacing: "0.1em",
            lineHeight: 1,
          }}
        >
          WIR
        </div>

        {/* GESTALTEN — right side */}
        <div
          ref={word1Ref}
          className="absolute"
          style={{
            top: "48%", right: "8%", opacity: 0,
            fontSize: "clamp(2rem, 5vw, 5rem)",
            fontWeight: 700, color: "#f5f5f5",
            letterSpacing: "0.05em",
            lineHeight: 1,
          }}
        >
          GESTALTEN
        </div>

        {/* ERLEBNISSE — center, huge, orange = THE moment */}
        <div
          ref={word2Ref}
          className="absolute"
          style={{
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0,
            fontSize: "clamp(3.5rem, 11vw, 11rem)",
            fontWeight: 700, color: ORANGE,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          ERLEBNISSE
        </div>

        {/* Brand — bottom center */}
        <div
          ref={brandRef}
          className="absolute"
          style={{
            bottom: "20%", left: "50%",
            transform: "translateX(-50%)",
            opacity: 0,
            fontSize: "clamp(0.9rem, 1.8vw, 1.8rem)",
            fontWeight: 300, color: "#f5f5f5",
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
            bottom: "12%", left: "50%",
            transform: "translateX(-50%)",
            opacity: 0,
          }}
        >
          {["WEBDESIGN", "KI-INTEGRATION", "CREATIVE DEV"].map((s) => (
            <span
              key={s}
              style={{
                fontSize: "clamp(0.6rem, 0.75vw, 0.85rem)",
                color: "rgba(255,255,255,0.45)",
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
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.2em",
          }}
        >
          SCROLL
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>

      {/* Grain overlay */}
      <div className="fixed inset-0 z-20 pointer-events-none opacity-[0.035]">
        <svg width="100%" height="100%">
          <filter id="grain16a">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain16a)" />
        </svg>
      </div>

      {/* Vignette */}
      <div
        className="fixed inset-0 z-[5] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </div>
  );
}
