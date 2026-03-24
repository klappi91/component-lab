"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   hero-v010-a: CREATIVE VELOCITY — Horizontal Scroll Journey

   ERSTER horizontal-scroll Hero. Fundamentally anders als
   alle bisherigen (alle vertikal).

   Story: IDEE → CHAOS → ORDNUNG → ERLEBNIS → MARKE

   5 Panels, pinned horizontal scroll. Jedes Panel hat
   eigene Animations-Choreografie via containerAnimation.

   Signature Moments:
   1. "IDEE" zoom-through (Panel 1 → 2 Uebergang)
   2. Design-Fragmente die aus dem Nichts einfliegen (Chaos)
   3. Grid-Linien die sich zeichnen, Worte die sich ordnen
   4. Clip-path Circle Reveal (ERLEBNIS Panel)
   5. Brand-Landung mit pulsierendem CTA

   Choreografie-Easings (Constitution v14):
   - expo.out     → Text Reveals
   - power4.inOut → Clip-path Wipes, Grid Lines
   - power2.out   → Fades, Parallax
   - power2.in    → Exit-Animations
   ═══════════════════════════════════════════════════════════ */

/* ─── Brand ─── */
const ORANGE = "#FF6B00";
const DARK = "#0A0A0A";

/* ─── Design Fragments fuer CHAOS Panel ─── */
interface Fragment {
  text: string;
  x: string;
  y: string;
  size: string;
  weight: number;
  color: string;
  rotation: number;
}

const FRAGMENTS: Fragment[] = [
  // Grosse Woerter — Brand-Vokabular
  { text: "PIXEL", x: "8%", y: "12%", size: "6vw", weight: 900, color: ORANGE, rotation: -12 },
  { text: "DESIGN", x: "38%", y: "68%", size: "5.5vw", weight: 800, color: "#fff", rotation: 8 },
  { text: "CODE", x: "62%", y: "18%", size: "4.5vw", weight: 700, color: "#4A9EFF", rotation: -5 },
  { text: "MOTION", x: "82%", y: "58%", size: "5vw", weight: 900, color: "#FF3366", rotation: 15 },
  { text: "BRAND", x: "22%", y: "42%", size: "4vw", weight: 700, color: "#fff", rotation: -20 },
  // Mittlere Woerter — Craft
  { text: "FLOW", x: "52%", y: "82%", size: "3.5vw", weight: 600, color: ORANGE, rotation: 10 },
  { text: "GRID", x: "72%", y: "32%", size: "3vw", weight: 600, color: "#666", rotation: -8 },
  { text: "TYPE", x: "15%", y: "78%", size: "3.5vw", weight: 700, color: "#888", rotation: 22 },
  { text: "SPACE", x: "48%", y: "12%", size: "3vw", weight: 500, color: "#555", rotation: -15 },
  { text: "FORM", x: "90%", y: "75%", size: "3vw", weight: 600, color: "#4A9EFF", rotation: 5 },
  // Kleine Woerter — Detail
  { text: "KONTRAST", x: "32%", y: "28%", size: "2vw", weight: 400, color: "#444", rotation: -3 },
  { text: "RHYTHMUS", x: "58%", y: "48%", size: "2.2vw", weight: 500, color: "#555", rotation: 12 },
  { text: "DETAIL", x: "78%", y: "8%", size: "2vw", weight: 400, color: "#333", rotation: -18 },
  { text: "FARBE", x: "12%", y: "55%", size: "2.5vw", weight: 500, color: ORANGE, rotation: 7 },
  { text: "TIEFE", x: "92%", y: "42%", size: "2vw", weight: 400, color: "#444", rotation: -10 },
  // Geometrische Symbole
  { text: "◆", x: "28%", y: "88%", size: "4vw", weight: 400, color: ORANGE, rotation: 45 },
  { text: "○", x: "68%", y: "52%", size: "6vw", weight: 100, color: "#333", rotation: 0 },
  { text: "□", x: "45%", y: "38%", size: "3vw", weight: 100, color: "#222", rotation: 30 },
  { text: "△", x: "88%", y: "22%", size: "3.5vw", weight: 100, color: "#FF3366", rotation: -25 },
  // Design-Specs
  { text: "16px", x: "5%", y: "92%", size: "1.5vw", weight: 300, color: "#333", rotation: 0 },
  { text: "1440", x: "75%", y: "90%", size: "1.8vw", weight: 300, color: "#333", rotation: -5 },
  { text: "60fps", x: "20%", y: "5%", size: "1.5vw", weight: 400, color: "#555", rotation: 8 },
  { text: "#FF6B00", x: "55%", y: "92%", size: "1.2vw", weight: 300, color: ORANGE, rotation: 0 },
  { text: "→", x: "42%", y: "58%", size: "4vw", weight: 100, color: "#222", rotation: -45 },
];

/* ─── Statement Words ─── */
const STATEMENT = ["WIR", "GESTALTEN", "DIGITALE"];

export default function HeroV010A() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  /* ─── Custom Cursor (Desktop) ─── */
  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    document.documentElement.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.style.cursor = "";
    };
  }, []);

  /* ─── GSAP Choreografie ─── */
  useGSAP(
    () => {
      const track = trackRef.current;
      const wrapper = wrapperRef.current;
      if (!track || !wrapper) return;

      const totalScroll = track.scrollWidth - window.innerWidth;

      /* ═══════════════════════════════════════════
         MAIN: Horizontal Scroll (pinned, scrub)
         ═══════════════════════════════════════════ */
      const scrollTween = gsap.to(track, {
        x: () => -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          scrub: 1,
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
        },
      });

      /* Progress Bar */
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          scrub: true,
          start: "top top",
          end: () => `+=${totalScroll}`,
        },
      });

      /* ═══════════════════════════════════════════
         PANEL 1: IDEE — Massive Text, Zoom-Through
         ═══════════════════════════════════════════ */

      // Entry: snap in
      gsap.from(".panel-idee .hero-word", {
        scale: 2.5,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
      });

      // Subtitle stagger
      gsap.from(".panel-idee .hero-sub span", {
        y: 20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        delay: 0.6,
        ease: "power2.out",
      });

      // Exit: zoom through on scroll
      gsap.to(".panel-idee .hero-word", {
        scale: 15,
        opacity: 0,
        ease: "power2.in",
        scrollTrigger: {
          trigger: ".panel-idee",
          containerAnimation: scrollTween,
          start: "30% left",
          end: "right left",
          scrub: true,
        },
      });

      // Scroll hint fade
      gsap.to(".scroll-hint", {
        opacity: 0,
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "+=300",
          scrub: true,
        },
      });

      /* ═══════════════════════════════════════════
         PANEL 2: CHAOS — Fragments Fly In
         ═══════════════════════════════════════════ */

      const chaosEls = gsap.utils.toArray<HTMLElement>(".chaos-fragment");
      chaosEls.forEach((el, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        const dist = 250 + Math.random() * 500;

        // Fly in from edges
        gsap.from(el, {
          x: dist * dir,
          y: (Math.random() - 0.5) * 700,
          rotation: `+=${Math.random() * 200 - 100}`,
          opacity: 0,
          scrollTrigger: {
            trigger: ".panel-chaos",
            containerAnimation: scrollTween,
            start: "left 90%",
            end: "35% center",
            scrub: true,
          },
        });

        // Gentle drift while visible
        gsap.to(el, {
          y: `+=${(Math.random() - 0.5) * 30}`,
          rotation: `+=${(Math.random() - 0.5) * 8}`,
          scrollTrigger: {
            trigger: ".panel-chaos",
            containerAnimation: scrollTween,
            start: "35% center",
            end: "right left",
            scrub: true,
          },
        });
      });

      // Dashed SVG lines fade in
      gsap.from(".chaos-line", {
        strokeDashoffset: 1000,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".panel-chaos",
          containerAnimation: scrollTween,
          start: "15% 70%",
          end: "50% center",
          scrub: true,
        },
      });

      /* ═══════════════════════════════════════════
         PANEL 3: ORDNUNG — Grid + Text Assembly
         ═══════════════════════════════════════════ */

      // Horizontal grid lines draw
      gsap.from(".grid-line-h", {
        scaleX: 0,
        transformOrigin: "left center",
        stagger: 0.06,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: ".panel-ordnung",
          containerAnimation: scrollTween,
          start: "left 65%",
          end: "35% center",
          scrub: true,
        },
      });

      // Vertical grid lines draw
      gsap.from(".grid-line-v", {
        scaleY: 0,
        transformOrigin: "center top",
        stagger: 0.04,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: ".panel-ordnung",
          containerAnimation: scrollTween,
          start: "left 65%",
          end: "35% center",
          scrub: true,
        },
      });

      // Subheading
      gsap.from(".ordnung-sub", {
        y: 30,
        opacity: 0,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".panel-ordnung",
          containerAnimation: scrollTween,
          start: "15% 60%",
          end: "30% center",
          scrub: true,
        },
      });

      // Statement words reveal (word by word, masked)
      gsap.from(".statement-word", {
        y: "110%",
        rotateX: -15,
        opacity: 0,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".panel-ordnung",
          containerAnimation: scrollTween,
          start: "20% 55%",
          end: "55% center",
          scrub: true,
        },
      });

      /* ═══════════════════════════════════════════
         PANEL 4: ERLEBNIS — Circle Clip-Path Reveal
         ═══════════════════════════════════════════ */

      // Circle expands
      gsap.fromTo(
        ".erlebnis-reveal",
        { clipPath: "circle(0% at 50% 50%)" },
        {
          clipPath: "circle(80% at 50% 50%)",
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: ".panel-erlebnis",
            containerAnimation: scrollTween,
            start: "left 75%",
            end: "45% center",
            scrub: true,
          },
        }
      );

      // Giant "ERLEBNIS" text parallax (moves slower)
      gsap.to(".erlebnis-text", {
        x: "-25%",
        ease: "none",
        scrollTrigger: {
          trigger: ".panel-erlebnis",
          containerAnimation: scrollTween,
          start: "left right",
          end: "right left",
          scrub: true,
        },
      });

      // Decorative circles scale in
      gsap.from(".erlebnis-circle", {
        scale: 0,
        opacity: 0,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".panel-erlebnis",
          containerAnimation: scrollTween,
          start: "25% 60%",
          end: "55% center",
          scrub: true,
        },
      });

      /* ═══════════════════════════════════════════
         PANEL 5: MARKE — Brand Reveal + CTA
         ═══════════════════════════════════════════ */

      gsap.from(".brand-line", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".panel-marke",
          containerAnimation: scrollTween,
          start: "left 65%",
          end: "45% center",
          scrub: true,
        },
      });

      // Divider line draws
      gsap.from(".brand-divider", {
        scaleX: 0,
        transformOrigin: "center center",
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: ".panel-marke",
          containerAnimation: scrollTween,
          start: "20% 60%",
          end: "40% center",
          scrub: true,
        },
      });

      // CTA glow pulse (not scroll-driven, continuous)
      gsap.to(".cta-button", {
        boxShadow: `0 0 60px ${ORANGE}60`,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
      });
    },
    { scope: wrapperRef }
  );

  return (
    <main className="bg-[#0A0A0A] overflow-x-hidden">
      {/* ─── Custom Cursor ─── */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white/30 pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />

      {/* ─── Progress Bar ─── */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[90] bg-white/5">
        <div
          ref={progressRef}
          className="h-full origin-left"
          style={{ transform: "scaleX(0)", backgroundColor: ORANGE }}
        />
      </div>

      {/* ─── Grain Overlay (SVG, performant) ─── */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none z-[80] opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* ═══════════════════════════════════════════
          HORIZONTAL SCROLL TRACK
          ═══════════════════════════════════════════ */}
      <div ref={wrapperRef}>
        <div
          ref={trackRef}
          className="flex h-screen will-change-transform"
        >
          {/* ────────────────────────────────
             Panel 1: IDEE
             Massive word, zooms through on scroll.
             ──────────────────────────────── */}
          <section className="panel-idee flex-shrink-0 w-screen h-screen flex items-center justify-center relative bg-[#0A0A0A]">
            <div className="relative">
              <h1
                className="hero-word text-[32vw] md:text-[28vw] font-black text-white leading-[0.82] tracking-[-0.06em] select-none"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                IDEE
              </h1>
              <p className="hero-sub absolute -bottom-6 right-0 text-[1.1vw] text-white/20 tracking-[0.4em] font-light flex gap-2">
                {"PIXINT CREATORS".split("").map((ch, i) => (
                  <span key={i}>{ch}</span>
                ))}
              </p>
            </div>

            {/* Scroll Hint */}
            <div className="scroll-hint absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 text-white/25">
              <span className="text-xs tracking-[0.3em] uppercase font-light">
                Scroll
              </span>
              <svg
                width="28"
                height="12"
                viewBox="0 0 28 12"
                fill="none"
                className="animate-pulse"
              >
                <path
                  d="M0 6h22M18 1l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </section>

          {/* ────────────────────────────────
             Panel 2: CHAOS
             Design-Fragmente schweben im Raum.
             Worte, Symbole, Specs — alles durcheinander.
             ──────────────────────────────── */}
          <section
            className="panel-chaos flex-shrink-0 w-[150vw] h-screen relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #060B15 0%, #0D0D1A 50%, #0A0510 100%)",
            }}
          >
            {/* Fragments */}
            {FRAGMENTS.map((f, i) => (
              <div
                key={i}
                className="chaos-fragment absolute select-none whitespace-nowrap will-change-transform"
                style={{
                  left: f.x,
                  top: f.y,
                  fontSize: f.size,
                  fontWeight: f.weight,
                  color: f.color,
                  transform: `rotate(${f.rotation}deg)`,
                  fontFamily: "var(--font-geist-sans)",
                }}
              >
                {f.text}
              </div>
            ))}

            {/* Connecting Lines (Design-Tool-Aesthetic) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line
                className="chaos-line"
                x1="10%"
                y1="20%"
                x2="55%"
                y2="72%"
                stroke={ORANGE}
                strokeWidth="0.5"
                strokeDasharray="6 12"
                opacity="0.15"
              />
              <line
                className="chaos-line"
                x1="28%"
                y1="8%"
                x2="82%"
                y2="62%"
                stroke="#4A9EFF"
                strokeWidth="0.5"
                strokeDasharray="6 12"
                opacity="0.12"
              />
              <line
                className="chaos-line"
                x1="48%"
                y1="92%"
                x2="92%"
                y2="28%"
                stroke="#fff"
                strokeWidth="0.3"
                strokeDasharray="4 10"
                opacity="0.08"
              />
              <line
                className="chaos-line"
                x1="65%"
                y1="5%"
                x2="15%"
                y2="85%"
                stroke="#FF3366"
                strokeWidth="0.4"
                strokeDasharray="5 15"
                opacity="0.1"
              />
            </svg>

            {/* Subtle center label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 text-[12vw] font-black select-none pointer-events-none">
              CHAOS
            </div>
          </section>

          {/* ────────────────────────────────
             Panel 3: ORDNUNG
             Grid-Linien zeichnen sich, Worte ordnen sich.
             Vom Chaos zur Gestalt.
             ──────────────────────────────── */}
          <section className="panel-ordnung flex-shrink-0 w-[120vw] h-screen relative bg-[#0A0A0A] flex items-center">
            {/* Horizontal Grid Lines */}
            {[18, 32, 50, 68, 82].map((pct, i) => (
              <div
                key={`h${i}`}
                className="grid-line-h absolute w-full h-px"
                style={{ top: `${pct}%`, backgroundColor: "rgba(255,255,255,0.06)" }}
              />
            ))}
            {/* Vertical Grid Lines */}
            {[12, 25, 40, 55, 70, 85].map((pct, i) => (
              <div
                key={`v${i}`}
                className="grid-line-v absolute h-full w-px"
                style={{ left: `${pct}%`, backgroundColor: "rgba(255,255,255,0.06)" }}
              />
            ))}

            {/* Statement */}
            <div className="px-[8vw] relative z-10">
              {/* Subheading */}
              <div className="overflow-hidden mb-4">
                <p
                  className="ordnung-sub text-[1.2vw] tracking-[0.35em] uppercase font-light"
                  style={{ color: ORANGE }}
                >
                  Vom Chaos zur Gestalt
                </p>
              </div>

              {/* Main Statement — word-by-word reveal */}
              <div className="flex flex-wrap gap-x-[2vw]">
                {STATEMENT.map((word, i) => (
                  <div key={i} className="overflow-hidden">
                    <span
                      className="statement-word inline-block text-[12vw] font-black text-white leading-[0.88] tracking-[-0.04em]"
                      style={{ fontFamily: "var(--font-geist-sans)" }}
                    >
                      {word}
                    </span>
                  </div>
                ))}
              </div>

              {/* Supporting line */}
              <div className="overflow-hidden mt-6">
                <p className="ordnung-sub text-[1.4vw] text-white/30 tracking-[0.1em] font-light max-w-[40vw]">
                  Erlebnisse die im Kopf bleiben. Nicht solide — sondern
                  unvergesslich.
                </p>
              </div>
            </div>
          </section>

          {/* ────────────────────────────────
             Panel 4: ERLEBNIS
             Circle clip-path reveal. Orange Explosion.
             Der Signature Moment.
             ──────────────────────────────── */}
          <section className="panel-erlebnis flex-shrink-0 w-[140vw] h-screen relative bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
            {/* Circle Reveal Container */}
            <div
              className="erlebnis-reveal absolute inset-0"
              style={{
                clipPath: "circle(80% at 50% 50%)",
                background: `linear-gradient(135deg, #E65100 0%, ${ORANGE} 40%, #FF8533 100%)`,
              }}
            >
              {/* Massive Parallax Text */}
              <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
                <h2
                  className="erlebnis-text text-[20vw] font-black leading-none tracking-[-0.05em] whitespace-nowrap select-none"
                  style={{ color: "rgba(255,255,255,0.12)" }}
                >
                  ERLEBNIS
                </h2>

                {/* Decorative Circles */}
                <div className="erlebnis-circle absolute top-[12%] right-[18%] w-[18vw] h-[18vw] rounded-full border border-white/10" />
                <div className="erlebnis-circle absolute bottom-[15%] left-[12%] w-[12vw] h-[12vw] rounded-full border border-white/15" />
                <div className="erlebnis-circle absolute top-[35%] left-[25%] w-[6vw] h-[6vw] rounded-full bg-white/5" />
                <div className="erlebnis-circle absolute bottom-[30%] right-[25%] w-[8vw] h-[8vw] rounded-full border-2 border-white/8" />

                {/* Center accent */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2vw] h-[2vw] rounded-full bg-white/20" />
              </div>
            </div>

            {/* Corner label */}
            <div className="absolute bottom-8 right-10 text-white/20 text-xs tracking-[0.4em] uppercase z-10">
              Signature Moment
            </div>
          </section>

          {/* ────────────────────────────────
             Panel 5: MARKE
             Brand-Landing. Clean. CTA.
             ──────────────────────────────── */}
          <section className="panel-marke flex-shrink-0 w-screen h-screen flex flex-col items-center justify-center bg-[#0A0A0A] relative">
            <div className="text-center">
              {/* Divider */}
              <div className="overflow-hidden mb-8">
                <div
                  className="brand-divider mx-auto h-px w-[30vw]"
                  style={{ backgroundColor: ORANGE }}
                />
              </div>

              {/* Brand Name */}
              <div className="overflow-hidden">
                <div
                  className="brand-line text-[7vw] md:text-[5.5vw] font-black text-white leading-none tracking-[-0.03em]"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  PIXINT
                  <span style={{ color: ORANGE }}>CREATORS</span>
                </div>
              </div>

              {/* Tagline */}
              <div className="overflow-hidden mt-5">
                <div className="brand-line text-sm md:text-lg text-white/35 tracking-[0.25em] uppercase font-light">
                  Webdesign &middot; KI-Integration &middot; Creative Dev
                </div>
              </div>

              {/* CTA */}
              <div className="overflow-hidden mt-12">
                <div className="brand-line">
                  <button
                    className="cta-button px-10 py-5 text-white font-bold text-base md:text-lg rounded-full relative overflow-hidden transition-transform hover:scale-105 active:scale-95"
                    style={{
                      backgroundColor: ORANGE,
                      boxShadow: `0 0 30px ${ORANGE}40`,
                    }}
                  >
                    Projekt starten
                    <span className="ml-2">→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-8 w-full flex justify-between items-center px-10 text-white/15 text-[10px] tracking-[0.2em] uppercase">
              <span>© 2026</span>
              <span className="hidden md:inline">
                Von der Idee zum Erlebnis
              </span>
              <span>Pixint Creators</span>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
