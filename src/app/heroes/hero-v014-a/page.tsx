"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   hero-v014-a: STILL POINT — Du stehst still. Kreativitaet fliegt vorbei.

   Chris-Feedback (UID 24): "ohne das Gefuehl nach unten zu scrollen,
   auf der Stelle stehen bleiben und alles fliegt vorbei"

   Konzept: Gesamter Viewport PINNED. Scrollen bewegt nicht die Seite,
   sondern treibt Elemente DURCH den Raum. Der Betrachter steht im
   Zentrum eines kreativen Sturms.

   Choreografie:
   VOID        (0-8%)   — Dunkelheit, ein orange Puls im Zentrum
   AWAKENING   (8-25%)  — Erste Worte fliegen vorbei, langsam
   STORM       (25-55%) — Peak: Worte, Formen, Linien rasen durch
   CONVERGENCE (55-78%) — Verlangsamung, Services bleiben kurz stehen
   CLARITY     (78-100%) — Stille, Brand materialisiert sich

   Technik: GSAP ScrollTrigger pin + scrub, rein DOM-basiert,
   CSS transforms, Lenis-ready. KEIN Canvas/WebGL.
   ═══════════════════════════════════════════════════════════ */

const ORANGE = "#FF6B00";

/* ─── Flying Element Data ─── */

interface FlyingWord {
  text: string;
  from: "left" | "right" | "top" | "bottom";
  speed: number; // 0.5 = slow, 2 = fast
  size: string; // tailwind text size
  weight: string;
  color: string;
  y: string; // vertical position (%)
  x: string; // horizontal position (%)
  rotation: number;
  enterAt: number; // scroll progress when it starts entering (0-1)
  duration: number; // how long (in scroll progress) it takes to cross
}

const FLYING_WORDS: FlyingWord[] = [
  // Phase 2: Awakening — slow, sparse
  { text: "PIXEL", from: "left", speed: 1, size: "text-[8vw]", weight: "font-black", color: "text-white/20", y: "30%", x: "0%", rotation: 0, enterAt: 0.08, duration: 0.18 },
  { text: "DIGITAL", from: "right", speed: 0.8, size: "text-[5vw]", weight: "font-light", color: "text-white/15", y: "60%", x: "0%", rotation: -3, enterAt: 0.10, duration: 0.20 },
  { text: "ERLEBNIS", from: "left", speed: 1.2, size: "text-[6vw]", weight: "font-bold", color: `text-[${ORANGE}]/30`, y: "45%", x: "0%", rotation: 2, enterAt: 0.14, duration: 0.16 },
  { text: "FLOW", from: "bottom", speed: 0.6, size: "text-[10vw]", weight: "font-black", color: "text-white/10", y: "0%", x: "40%", rotation: 0, enterAt: 0.18, duration: 0.22 },

  // Phase 3: Storm — fast, dense, multi-directional
  { text: "KREATIV", from: "right", speed: 2, size: "text-[7vw]", weight: "font-black", color: "text-white/25", y: "20%", x: "0%", rotation: -5, enterAt: 0.25, duration: 0.10 },
  { text: "CODE", from: "left", speed: 1.8, size: "text-[4vw]", weight: "font-mono", color: `text-[${ORANGE}]/40`, y: "70%", x: "0%", rotation: 8, enterAt: 0.27, duration: 0.12 },
  { text: "DESIGN", from: "left", speed: 2.2, size: "text-[9vw]", weight: "font-black", color: "text-white/30", y: "35%", x: "0%", rotation: -2, enterAt: 0.30, duration: 0.08 },
  { text: "MOTION", from: "right", speed: 1.5, size: "text-[5vw]", weight: "font-bold", color: "text-white/20", y: "55%", x: "0%", rotation: 4, enterAt: 0.32, duration: 0.14 },
  { text: "TRANSFORM", from: "bottom", speed: 1.3, size: "text-[6vw]", weight: "font-light", color: "text-white/15", y: "0%", x: "20%", rotation: 0, enterAt: 0.34, duration: 0.16 },
  { text: "MUTIG", from: "left", speed: 2.5, size: "text-[11vw]", weight: "font-black", color: `text-[${ORANGE}]/50`, y: "40%", x: "0%", rotation: -1, enterAt: 0.36, duration: 0.07 },
  { text: "WOW", from: "right", speed: 2.8, size: "text-[14vw]", weight: "font-black", color: "text-white/35", y: "25%", x: "0%", rotation: 3, enterAt: 0.38, duration: 0.06 },
  { text: "VISION", from: "left", speed: 1.6, size: "text-[5vw]", weight: "font-bold", color: "text-white/20", y: "75%", x: "0%", rotation: -6, enterAt: 0.40, duration: 0.12 },
  { text: "SCROLL", from: "top", speed: 1.4, size: "text-[4vw]", weight: "font-mono", color: "text-white/15", y: "0%", x: "65%", rotation: 0, enterAt: 0.42, duration: 0.14 },
  { text: "ANIMATION", from: "right", speed: 2.0, size: "text-[6vw]", weight: "font-light", color: `text-[${ORANGE}]/35`, y: "50%", x: "0%", rotation: -4, enterAt: 0.44, duration: 0.10 },
  { text: "INTERAKTION", from: "left", speed: 1.9, size: "text-[5vw]", weight: "font-bold", color: "text-white/25", y: "15%", x: "0%", rotation: 5, enterAt: 0.46, duration: 0.11 },
  { text: "3D", from: "bottom", speed: 2.3, size: "text-[12vw]", weight: "font-black", color: "text-white/20", y: "0%", x: "50%", rotation: 0, enterAt: 0.48, duration: 0.08 },
  { text: "SHADER", from: "right", speed: 2.1, size: "text-[4vw]", weight: "font-mono", color: `text-[${ORANGE}]/25`, y: "65%", x: "0%", rotation: -7, enterAt: 0.50, duration: 0.09 },
  { text: "CHOREOGRAFIE", from: "left", speed: 1.7, size: "text-[7vw]", weight: "font-bold", color: "text-white/30", y: "30%", x: "0%", rotation: 1, enterAt: 0.52, duration: 0.12 },
];

/* ─── Service keywords for convergence phase ─── */
const SERVICES = [
  { text: "WEBDESIGN", delay: 0 },
  { text: "KI-INTEGRATION", delay: 0.04 },
  { text: "CREATIVE DEV", delay: 0.08 },
];

/* ─── Geometric shapes that fly through ─── */
interface FlyingShape {
  type: "circle" | "square" | "line" | "dot-grid";
  from: "left" | "right" | "top" | "bottom";
  size: number; // px
  enterAt: number;
  duration: number;
  y: string;
  x: string;
  rotation: number;
  opacity: number;
}

const FLYING_SHAPES: FlyingShape[] = [
  { type: "circle", from: "left", size: 120, enterAt: 0.12, duration: 0.20, y: "25%", x: "0%", rotation: 0, opacity: 0.08 },
  { type: "square", from: "right", size: 80, enterAt: 0.20, duration: 0.18, y: "65%", x: "0%", rotation: 45, opacity: 0.06 },
  { type: "line", from: "left", size: 200, enterAt: 0.28, duration: 0.12, y: "40%", x: "0%", rotation: -15, opacity: 0.15 },
  { type: "circle", from: "right", size: 60, enterAt: 0.32, duration: 0.10, y: "80%", x: "0%", rotation: 0, opacity: 0.12 },
  { type: "square", from: "bottom", size: 150, enterAt: 0.35, duration: 0.14, y: "0%", x: "30%", rotation: 30, opacity: 0.05 },
  { type: "line", from: "right", size: 300, enterAt: 0.38, duration: 0.08, y: "50%", x: "0%", rotation: 5, opacity: 0.10 },
  { type: "circle", from: "left", size: 200, enterAt: 0.42, duration: 0.15, y: "15%", x: "0%", rotation: 0, opacity: 0.04 },
  { type: "dot-grid", from: "right", size: 180, enterAt: 0.45, duration: 0.16, y: "55%", x: "0%", rotation: -8, opacity: 0.08 },
  { type: "line", from: "left", size: 250, enterAt: 0.48, duration: 0.09, y: "70%", x: "0%", rotation: 20, opacity: 0.12 },
  { type: "square", from: "right", size: 100, enterAt: 0.52, duration: 0.11, y: "30%", x: "0%", rotation: -60, opacity: 0.07 },
];

/* ─── Shape Component ─── */
function ShapeElement({ shape }: { shape: FlyingShape }) {
  const style: React.CSSProperties = {
    position: "absolute",
    width: shape.size,
    height: shape.type === "line" ? 3 : shape.size,
  };

  if (shape.type === "circle") {
    return (
      <div style={style} className="rounded-full border-2 border-[#FF6B00]" />
    );
  }
  if (shape.type === "square") {
    return (
      <div style={style} className="border-2 border-white/40" />
    );
  }
  if (shape.type === "line") {
    return (
      <div style={{ ...style, width: shape.size }} className="bg-[#FF6B00]" />
    );
  }
  // dot-grid
  return (
    <div style={{ ...style, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="w-2 h-2 rounded-full bg-white/30" />
      ))}
    </div>
  );
}

/* ─── Main Component ─── */
export default function StillPointHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorPos = useRef({ x: 0, y: 0, cx: 0, cy: 0 });

  // Custom cursor
  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      cursorPos.current.x = e.clientX;
      cursorPos.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouse);

    const tick = () => {
      const p = cursorPos.current;
      p.cx += (p.x - p.cx) * 0.12;
      p.cy += (p.y - p.cy) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${p.cx - 20}px, ${p.cy - 20}px)`;
      }
      requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(raf);
    };
  }, []);

  // GSAP Scroll Animations
  useGSAP(
    () => {
      if (!containerRef.current || !pinnedRef.current) return;

      // Master pin — the ENTIRE viewport stays fixed
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: pinnedRef.current,
          scrub: 1,
        },
      });

      // ─── Phase 1: VOID — Center pulse ───
      const pulse = pinnedRef.current.querySelector(".center-pulse");
      if (pulse) {
        masterTl.fromTo(
          pulse,
          { scale: 0.3, opacity: 0 },
          { scale: 1, opacity: 1, duration: 8, ease: "power2.out" },
          0
        );
        // Pulse grows then shrinks during storm
        masterTl.to(
          pulse,
          { scale: 2.5, opacity: 0.6, duration: 30, ease: "power1.inOut" },
          8
        );
        // Pulse settles for convergence
        masterTl.to(
          pulse,
          { scale: 1.5, opacity: 0.3, duration: 20, ease: "power2.out" },
          38
        );
        // Pulse fades for clarity
        masterTl.to(
          pulse,
          { scale: 0.5, opacity: 0, duration: 22, ease: "power2.inOut" },
          58
        );
      }

      // ─── Flying Words ───
      const wordEls = pinnedRef.current.querySelectorAll(".flying-word");
      wordEls.forEach((el, i) => {
        const word = FLYING_WORDS[i];
        if (!word) return;

        const totalProgress = 100; // timeline units
        const startAt = word.enterAt * totalProgress;
        const dur = word.duration * totalProgress;

        // Calculate start and end positions based on direction
        let fromProps: gsap.TweenVars;
        let toProps: gsap.TweenVars;

        if (word.from === "left") {
          fromProps = { xPercent: -200, opacity: 0 };
          toProps = { xPercent: 200, opacity: 0 };
        } else if (word.from === "right") {
          fromProps = { xPercent: 200, opacity: 0 };
          toProps = { xPercent: -200, opacity: 0 };
        } else if (word.from === "top") {
          fromProps = { yPercent: -300, opacity: 0 };
          toProps = { yPercent: 300, opacity: 0 };
        } else {
          fromProps = { yPercent: 300, opacity: 0 };
          toProps = { yPercent: -300, opacity: 0 };
        }

        // Set initial position
        gsap.set(el, {
          ...fromProps,
          rotation: word.rotation,
        });

        // Enter: fly to center area
        masterTl.to(
          el,
          {
            xPercent: 0,
            yPercent: 0,
            opacity: 1,
            duration: dur * 0.4,
            ease: "power1.out",
          },
          startAt
        );

        // Exit: fly past to other side
        masterTl.to(
          el,
          {
            ...toProps,
            duration: dur * 0.6,
            ease: "power1.in",
          },
          startAt + dur * 0.4
        );
      });

      // ─── Flying Shapes ───
      const shapeEls = pinnedRef.current.querySelectorAll(".flying-shape");
      shapeEls.forEach((el, i) => {
        const shape = FLYING_SHAPES[i];
        if (!shape) return;

        const totalProgress = 100;
        const startAt = shape.enterAt * totalProgress;
        const dur = shape.duration * totalProgress;

        let fromProps: gsap.TweenVars;
        let toProps: gsap.TweenVars;

        if (shape.from === "left") {
          fromProps = { x: "-120vw" };
          toProps = { x: "120vw" };
        } else if (shape.from === "right") {
          fromProps = { x: "120vw" };
          toProps = { x: "-120vw" };
        } else if (shape.from === "top") {
          fromProps = { y: "-120vh" };
          toProps = { y: "120vh" };
        } else {
          fromProps = { y: "120vh" };
          toProps = { y: "-120vh" };
        }

        gsap.set(el, {
          ...fromProps,
          rotation: shape.rotation,
          opacity: shape.opacity,
        });

        masterTl.to(
          el,
          {
            x: 0,
            y: 0,
            duration: dur * 0.45,
            ease: "none",
          },
          startAt
        );

        masterTl.to(
          el,
          {
            ...toProps,
            duration: dur * 0.55,
            ease: "none",
          },
          startAt + dur * 0.45
        );
      });

      // ─── Phase 4: CONVERGENCE — Services ───
      const serviceEls = pinnedRef.current.querySelectorAll(".service-word");
      serviceEls.forEach((el, i) => {
        const svc = SERVICES[i];
        if (!svc) return;

        const startAt = 55 + svc.delay * 100;

        // Fade in from slightly offset
        gsap.set(el, { opacity: 0, y: 40, scale: 0.9 });

        masterTl.to(
          el,
          { opacity: 1, y: 0, scale: 1, duration: 6, ease: "expo.out" },
          startAt
        );
        // Hold
        masterTl.to(
          el,
          { opacity: 0, y: -30, duration: 5, ease: "power2.in" },
          startAt + 10
        );
      });

      // ─── Phase 5: CLARITY — Brand ───
      const brand = pinnedRef.current.querySelector(".brand-reveal");
      const tagline = pinnedRef.current.querySelector(".tagline-reveal");
      const cta = pinnedRef.current.querySelector(".cta-reveal");

      if (brand) {
        gsap.set(brand, { opacity: 0, scale: 0.8, letterSpacing: "0.5em" });
        masterTl.to(
          brand,
          {
            opacity: 1,
            scale: 1,
            letterSpacing: "0.15em",
            duration: 12,
            ease: "expo.out",
          },
          78
        );
      }

      if (tagline) {
        gsap.set(tagline, { opacity: 0, y: 20 });
        masterTl.to(
          tagline,
          { opacity: 0.7, y: 0, duration: 8, ease: "power2.out" },
          85
        );
      }

      if (cta) {
        gsap.set(cta, { opacity: 0, y: 15 });
        masterTl.to(
          cta,
          { opacity: 1, y: 0, duration: 6, ease: "power2.out" },
          90
        );
      }

      // ─── Ambient grain animation ───
      const grain = pinnedRef.current.querySelector(".grain-overlay");
      if (grain) {
        gsap.to(grain, {
          backgroundPosition: "50% 50%",
          duration: 0.5,
          repeat: -1,
          ease: "steps(4)",
          onRepeat: () => {
            gsap.set(grain, {
              backgroundPosition: `${Math.random() * 100}% ${Math.random() * 100}%`,
            });
          },
        });
      }

      // ─── Vignette intensity ───
      const vignette = pinnedRef.current.querySelector(".vignette");
      if (vignette) {
        masterTl.fromTo(
          vignette,
          { opacity: 0.3 },
          { opacity: 0.8, duration: 30, ease: "power1.in" },
          20
        );
        masterTl.to(
          vignette,
          { opacity: 0.4, duration: 30, ease: "power2.out" },
          55
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-10 h-10 rounded-full border border-white/40 pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={{ willChange: "transform" }}
      />

      {/* Scroll Container — 600vh tall for scroll room */}
      <div ref={containerRef} className="relative" style={{ height: "600vh" }}>
        {/* Pinned Viewport */}
        <div
          ref={pinnedRef}
          className="w-screen h-screen overflow-hidden bg-[#0A0A0A] cursor-none"
          style={{ willChange: "transform" }}
        >
          {/* ─── Grain Overlay ─── */}
          <div
            className="grain-overlay absolute inset-0 z-[60] pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />

          {/* ─── Vignette ─── */}
          <div
            className="vignette absolute inset-0 z-[55] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.9) 100%)",
            }}
          />

          {/* ─── Center Pulse (anchor point — "you are here") ─── */}
          <div className="absolute inset-0 flex items-center justify-center z-[50] pointer-events-none">
            <div
              className="center-pulse w-4 h-4 rounded-full"
              style={{
                background: `radial-gradient(circle, ${ORANGE} 0%, ${ORANGE}40 40%, transparent 70%)`,
                boxShadow: `0 0 60px ${ORANGE}40, 0 0 120px ${ORANGE}20`,
                willChange: "transform, opacity",
              }}
            />
          </div>

          {/* ─── Flying Words Layer ─── */}
          <div className="absolute inset-0 z-[30] pointer-events-none">
            {FLYING_WORDS.map((word, i) => (
              <div
                key={`word-${i}`}
                className={`flying-word absolute whitespace-nowrap ${word.size} ${word.weight} ${word.color}`}
                style={{
                  ...(word.from === "left" || word.from === "right"
                    ? { top: word.y, left: "50%", transform: "translateX(-50%)" }
                    : { left: word.x, top: "50%", transform: "translateY(-50%)" }),
                  willChange: "transform, opacity",
                  fontFamily:
                    word.weight === "font-mono"
                      ? "ui-monospace, monospace"
                      : "inherit",
                }}
              >
                {word.text}
              </div>
            ))}
          </div>

          {/* ─── Flying Shapes Layer ─── */}
          <div className="absolute inset-0 z-[20] pointer-events-none">
            {FLYING_SHAPES.map((shape, i) => (
              <div
                key={`shape-${i}`}
                className="flying-shape absolute"
                style={{
                  top:
                    shape.from === "top" || shape.from === "bottom"
                      ? "50%"
                      : shape.y,
                  left:
                    shape.from === "left" || shape.from === "right"
                      ? "50%"
                      : shape.x,
                  willChange: "transform",
                }}
              >
                <ShapeElement shape={shape} />
              </div>
            ))}
          </div>

          {/* ─── Services (Convergence Phase) ─── */}
          <div className="absolute inset-0 z-[40] flex flex-col items-center justify-center gap-6 pointer-events-none">
            {SERVICES.map((svc, i) => (
              <div
                key={`svc-${i}`}
                className="service-word text-[4vw] md:text-[3vw] font-light tracking-[0.3em] text-white/80"
                style={{ willChange: "transform, opacity" }}
              >
                {svc.text}
              </div>
            ))}
          </div>

          {/* ─── Brand Reveal (Clarity Phase) ─── */}
          <div className="absolute inset-0 z-[45] flex flex-col items-center justify-center pointer-events-none">
            <h1
              className="brand-reveal text-[6vw] md:text-[5vw] font-black text-white tracking-[0.15em]"
              style={{ willChange: "transform, opacity" }}
            >
              PIXINT
              <span style={{ color: ORANGE }}> CREATORS</span>
            </h1>
            <p
              className="tagline-reveal mt-4 text-[1.2vw] md:text-[1vw] font-light tracking-[0.4em] text-white/60 uppercase"
              style={{ willChange: "opacity" }}
            >
              Das 1% das im Kopf bleibt
            </p>
            <button
              className="cta-reveal mt-10 px-8 py-3 border border-white/30 text-white/80 text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-[#0A0A0A] transition-colors duration-300 pointer-events-auto"
              style={{ willChange: "opacity" }}
            >
              Erlebnis starten
            </button>
          </div>

          {/* ─── Scroll Indicator ─── */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[50] flex flex-col items-center gap-2 text-white/30 text-xs tracking-[0.3em] uppercase scroll-indicator">
            <span>Scroll</span>
            <div className="w-px h-8 bg-white/20 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 w-full bg-white/60"
                style={{
                  height: "40%",
                  animation: "scrollPulse 2s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Keyframes ─── */}
      <style jsx global>{`
        @keyframes scrollPulse {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(250%); }
        }

        body {
          cursor: none;
          overflow-x: hidden;
          background: #0A0A0A;
        }

        @media (max-width: 768px) {
          body { cursor: auto; }
        }
      `}</style>
    </>
  );
}
