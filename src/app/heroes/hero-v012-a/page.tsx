"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   hero-v012-a: EDITORIAL CINEMA

   Inspiration:
   - Unseen Studio 2025 Wrapped (SOTD 24.03.2026) — Editorial rhythm,
     chapter markers, mixed media, pacing
   - Shed.design (SOTD 23.03.2026) — Letter-spaced titles, clean editorial

   Konzept: Cinematic opening credits. Pure GSAP Choreografie.
   KEIN Canvas, KEIN WebGL, KEIN Partikel-System.
   WOW kommt aus TIMING, LAYOUT und TYPOGRAFIE.

   Choreografie:
   OPENING   (auto, 0-2.5s) — Title reveal, diagonal offset, accent line
   REVEAL    (scroll, pinned) — Image wipe from center + title parallax
   STATEMENT (scroll, trigger) — 3 Services asymmetrisch
   CLOSE     (scroll, trigger) — Orange pulse → Brand → CTA
   ═══════════════════════════════════════════════════════════ */

export default function HeroV012A() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  // ── Lenis Smooth Scroll ──────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  // ── Custom Cursor (desktop only) ────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ring = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!ring || !dot) return;

    ring.style.opacity = "1";
    dot.style.opacity = "1";

    const onMove = (e: MouseEvent) => {
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.5, ease: "power3.out" });
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08 });
    };

    window.addEventListener("mousemove", onMove);

    // Magnetic grow on interactive elements
    const timeout = setTimeout(() => {
      document.querySelectorAll("button, a, .magnetic").forEach((el) => {
        el.addEventListener("mouseenter", () => {
          gsap.to(ring, { scale: 2.5, opacity: 0.4, duration: 0.3, ease: "power2.out" });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
        });
      });
    }, 800);

    return () => {
      window.removeEventListener("mousemove", onMove);
      clearTimeout(timeout);
    };
  }, []);

  // ── GSAP Choreografie ───────────────────────────────────
  useGSAP(
    () => {
      if (!containerRef.current) return;

      /* ═══ PHASE 1: OPENING (auto-play) ═══ */
      const opening = gsap.timeline({ delay: 0.4 });

      // [001] marker fade
      opening.fromTo(
        ".marker-top",
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" }
      );

      // Title words — staggered clip-path from left, diagonal position
      opening.fromTo(
        ".tw-1",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "expo.out" },
        0.3
      );
      opening.fromTo(
        ".tw-2",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "expo.out" },
        0.5
      );
      opening.fromTo(
        ".tw-3",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "expo.out" },
        0.7
      );

      // Orange accent line draws left→right
      opening.fromTo(
        ".accent-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.0, ease: "power4.inOut" },
        1.1
      );

      // Subtitle fades in
      opening.fromTo(
        ".hero-sub",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        1.5
      );

      // Scroll cue
      opening.fromTo(
        ".scroll-cue",
        { opacity: 0 },
        { opacity: 0.4, duration: 0.5 },
        2.2
      );

      /* ═══ PHASE 2: IMAGE REVEAL (pinned scroll) ═══ */
      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-pin",
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Image wipe — clip-path expands from center
      reveal.fromTo(
        ".img-wipe",
        { clipPath: "inset(45% 45% 45% 45%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "none" }
      );

      // Image scale settle (cinematic zoom out)
      reveal.fromTo(
        ".img-scale",
        { scale: 1.12 },
        { scale: 1, duration: 1, ease: "none" },
        0
      );

      // Watermark drifts up subtly
      reveal.to(".watermark", { y: -80, duration: 1, ease: "none" }, 0);

      // Title parallax up + fade
      reveal.to(
        ".title-group",
        { y: "-25vh", opacity: 0, duration: 0.7, ease: "none" },
        0
      );

      // Accent + subtitle fade out
      reveal.to(
        ".accent-line, .hero-sub",
        { opacity: 0, duration: 0.3, ease: "none" },
        0
      );

      // Caption appears at end of reveal
      reveal.fromTo(
        ".img-caption",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.25, ease: "none" },
        0.75
      );

      /* ═══ PHASE 3: SERVICES (trigger reveal) ═══ */
      const svc = gsap.timeline({
        scrollTrigger: {
          trigger: ".svc-section",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Section marker
      svc.fromTo(
        ".svc-marker",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
      );

      // Service 1 — clip from left
      svc.fromTo(
        ".svc-1",
        { clipPath: "inset(0 100% 0 0)", x: -40 },
        { clipPath: "inset(0 0% 0 0)", x: 0, duration: 1.2, ease: "expo.out" },
        0.1
      );

      // Rule 1
      svc.fromTo(
        ".rule-1",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: "power4.inOut" },
        0.6
      );

      // Service 2 — clip from bottom
      svc.fromTo(
        ".svc-2",
        { clipPath: "inset(100% 0 0 0)", y: 30 },
        { clipPath: "inset(0% 0 0 0)", y: 0, duration: 1.2, ease: "expo.out" },
        0.7
      );

      // Rule 2
      svc.fromTo(
        ".rule-2",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: "power4.inOut" },
        1.1
      );

      // Service 3 — clip from right
      svc.fromTo(
        ".svc-3",
        { clipPath: "inset(0 0 0 100%)", x: 40 },
        { clipPath: "inset(0 0 0 0%)", x: 0, duration: 1.2, ease: "expo.out" },
        1.2
      );

      // Service descriptions stagger in
      svc.fromTo(
        ".svc-desc",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.12 },
        0.8
      );

      /* ═══ PHASE 4: BRAND CLOSE (signature moment) ═══ */
      const brand = gsap.timeline({
        scrollTrigger: {
          trigger: ".brand-section",
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });

      // Orange pulse circle expands
      brand.fromTo(
        ".pulse",
        { scale: 0, opacity: 0.6 },
        { scale: 60, opacity: 0, duration: 2.0, ease: "expo.out" }
      );

      // Brand name — letter-spacing contracts (dramatic entrance)
      brand.fromTo(
        ".brand-name",
        { opacity: 0, letterSpacing: "1em" },
        { opacity: 1, letterSpacing: "0.3em", duration: 1.6, ease: "expo.out" },
        0.3
      );

      // Tagline
      brand.fromTo(
        ".brand-tag",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        0.9
      );

      // Orange divider draws
      brand.fromTo(
        ".brand-div",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, ease: "power4.inOut" },
        1.1
      );

      // CTA
      brand.fromTo(
        ".brand-cta",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        1.3
      );

      // Footer
      brand.fromTo(
        ".brand-footer",
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" },
        1.6
      );
    },
    { scope: containerRef }
  );

  return (
    <>
      {/* ── Custom Cursor (hidden by default, shown on desktop via JS) ── */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 rounded-full border border-white/25 pointer-events-none z-[9999] opacity-0 mix-blend-difference"
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-[6px] h-[6px] -ml-[3px] -mt-[3px] rounded-full bg-[#FF6B00] pointer-events-none z-[9999] opacity-0"
      />

      <div
        ref={containerRef}
        className="bg-[#0A0A0A] text-[#F5F5F5] selection:bg-[#FF6B00] selection:text-[#0A0A0A]"
      >
        {/* Cursor-none only on mouse devices */}
        <style>{`
          @media (pointer: fine) {
            .hide-cursor, .hide-cursor * { cursor: none !important; }
          }
        `}</style>

        {/* ═══════════════════════════════════════
            HERO SECTION (Phase 1 + 2 combined)
            ═══════════════════════════════════════ */}
        <section className="hero-pin relative h-screen overflow-hidden hide-cursor">
          {/* ── Title Group (z-20, on top) ── */}
          <div className="title-group absolute inset-0 z-20 flex flex-col justify-center pl-[8vw] pr-[4vw]">
            <div className="tw-1 text-[clamp(64px,17vw,280px)] font-black leading-[0.88] tracking-[-0.04em] will-change-[clip-path]">
              WIR
            </div>
            <div className="tw-2 text-[clamp(64px,17vw,280px)] font-black leading-[0.88] tracking-[-0.04em] ml-[6vw] will-change-[clip-path]">
              CODIEREN
            </div>
            <div className="tw-3 text-[clamp(64px,17vw,280px)] font-black leading-[0.88] tracking-[-0.04em] ml-[12vw] will-change-[clip-path]">
              ERLEBNISSE
              <span className="text-[#FF6B00]">.</span>
            </div>

            {/* Orange accent line */}
            <div className="accent-line mt-8 h-[2px] bg-[#FF6B00] w-[30vw] ml-[12vw] origin-left" />

            {/* Subtitle */}
            <p className="hero-sub mt-5 ml-[12vw] text-[#666] text-[clamp(11px,0.85vw,14px)] uppercase tracking-[0.2em] font-mono">
              Kreativagentur für Webdesign &amp; KI
            </p>
          </div>

          {/* ── Top Marker ── */}
          <span className="marker-top absolute top-8 right-8 z-30 text-[#444] text-[11px] tracking-[0.25em] font-mono">
            [001]
          </span>

          {/* ── Scroll Cue ── */}
          <span className="scroll-cue absolute bottom-8 left-[8vw] z-30 text-[#333] text-[11px] tracking-[0.25em] font-mono">
            SCROLL ↓
          </span>

          {/* ── Image Layer (z-10, behind title, revealed on scroll) ── */}
          <div
            className="img-wipe absolute inset-0 z-10"
            style={{ clipPath: "inset(45% 45% 45% 45%)" }}
          >
            <div
              className="img-scale relative w-full h-full overflow-hidden"
              style={{ transform: "scale(1.12)" }}
            >
              {/* Hero image — cinematic ink in water */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url("/heroes/hero-v012-a/hero-bg.webp")`,
                }}
              />

              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Typography watermark — massive, barely visible */}
              <div
                className="watermark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] text-[45vw] font-black text-white/[0.025] whitespace-nowrap select-none pointer-events-none tracking-[-0.05em]"
              >
                PIX
              </div>

              {/* Film grain texture */}
              <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "repeat",
                  backgroundSize: "200px",
                }}
              />
            </div>
          </div>

          {/* ── Image Caption (appears after reveal) ── */}
          <span
            className="img-caption absolute bottom-12 right-[8vw] z-20 text-[#555] text-[11px] tracking-[0.2em] font-mono"
            style={{ opacity: 0 }}
          >
            WEBDESIGN · KI · CREATIVE DEV
          </span>
        </section>

        {/* ═══════════════════════════════════════
            SERVICES SECTION (Phase 3)
            ═══════════════════════════════════════ */}
        <section className="svc-section relative min-h-screen flex flex-col justify-center py-24 px-[8vw] hide-cursor">
          {/* Section marker */}
          <span className="svc-marker text-[#FF6B00] text-[11px] tracking-[0.25em] font-mono mb-16">
            [SERVICES]
          </span>

          {/* Service 1 — left aligned */}
          <div className="flex items-baseline gap-4 sm:gap-6">
            <span className="text-[#FF6B00] text-[11px] tracking-[0.25em] font-mono shrink-0 pt-2">
              01
            </span>
            <h3 className="svc-1 text-[clamp(36px,8.5vw,140px)] font-black leading-[1.05] tracking-[-0.03em]">
              WEBDESIGN
            </h3>
          </div>
          <p className="svc-desc text-[#555] text-[clamp(12px,0.95vw,15px)] ml-10 sm:ml-14 mt-2 mb-6 max-w-lg tracking-wide leading-relaxed">
            Individuelle Websites die beeindrucken — jede Seite ein Unikat.
          </p>

          <div className="rule-1 h-px bg-[#1a1a1a] my-4 origin-left" />

          {/* Service 2 — center aligned */}
          <div className="flex items-baseline gap-4 sm:gap-6 justify-center mt-4">
            <span className="text-[#FF6B00] text-[11px] tracking-[0.25em] font-mono shrink-0 pt-2">
              02
            </span>
            <h3 className="svc-2 text-[clamp(36px,8.5vw,140px)] font-black leading-[1.05] tracking-[-0.03em]">
              KI-INTEGRATION
            </h3>
          </div>
          <p className="svc-desc text-[#555] text-[clamp(12px,0.95vw,15px)] text-center mt-2 mb-6 max-w-lg mx-auto tracking-wide leading-relaxed">
            Künstliche Intelligenz dort wo sie echten Mehrwert bringt.
          </p>

          <div className="rule-2 h-px bg-[#1a1a1a] my-4 origin-right" />

          {/* Service 3 — right aligned */}
          <div className="flex items-baseline gap-4 sm:gap-6 justify-end mt-4">
            <span className="text-[#FF6B00] text-[11px] tracking-[0.25em] font-mono shrink-0 pt-2">
              03
            </span>
            <h3 className="svc-3 text-[clamp(36px,8.5vw,140px)] font-black leading-[1.05] tracking-[-0.03em]">
              CREATIVE DEV
            </h3>
          </div>
          <p className="svc-desc text-[#555] text-[clamp(12px,0.95vw,15px)] text-right mt-2 max-w-lg ml-auto tracking-wide leading-relaxed">
            WebGL, 3D, Shader — wir bringen das Web zum Leben.
          </p>
        </section>

        {/* ═══════════════════════════════════════
            BRAND SECTION (Phase 4 — Signature)
            ═══════════════════════════════════════ */}
        <section className="brand-section relative h-screen flex flex-col items-center justify-center overflow-hidden hide-cursor">
          {/* Orange pulse circle */}
          <div
            className="pulse absolute w-3 h-3 rounded-full bg-[#FF6B00]"
            style={{ transform: "scale(0)" }}
          />

          {/* Brand name — letter-spaced, mono */}
          <h2
            className="brand-name text-[clamp(16px,2vw,28px)] font-mono uppercase tracking-[0.3em]"
            style={{ opacity: 0 }}
          >
            PIXINTCREATORS
          </h2>

          {/* Tagline */}
          <p
            className="brand-tag mt-6 text-[#777] text-[clamp(14px,1.2vw,18px)] tracking-[0.08em]"
            style={{ opacity: 0 }}
          >
            Wir codieren Erlebnisse
          </p>

          {/* Orange divider */}
          <div
            className="brand-div mt-10 w-12 h-px bg-[#FF6B00] origin-center"
            style={{ transform: "scaleX(0)" }}
          />

          {/* CTA */}
          <div className="brand-cta mt-10" style={{ opacity: 0 }}>
            <button className="magnetic group relative px-10 py-4 border border-[#333] text-[12px] font-mono uppercase tracking-[0.15em] overflow-hidden transition-colors duration-500 hover:border-[#FF6B00]">
              <span className="relative z-10 transition-colors duration-500 group-hover:text-[#0A0A0A]">
                Projekt starten →
              </span>
              <span className="absolute inset-0 bg-[#FF6B00] -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
            </button>
          </div>

          {/* Footer */}
          <span
            className="brand-footer absolute bottom-8 text-[#333] text-[10px] tracking-[0.25em] font-mono"
            style={{ opacity: 0 }}
          >
            © 2026 PIXINTCREATORS
          </span>
        </section>

        {/* ── Global film grain overlay ── */}
        <div
          className="fixed inset-0 pointer-events-none z-[100] opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "256px",
          }}
        />
      </div>
    </>
  );
}
