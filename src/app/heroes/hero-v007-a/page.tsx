"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   VOM PIXEL ZUR WEBSITE
   Scroll-driven Creation Story — 5 Phasen
   Was macht eine Website besonders?
   ═══════════════════════════════════════════════════════════ */

const ORANGE = "#FF6B00";
const DARK = "#0A0A0A";

const PHASES = [
  { num: "01", title: "STRUKTUR", desc: "Das Fundament. Grid, Hierarchie, Flow." },
  { num: "02", title: "TYPOGRAFIE", desc: "Worte geben Bedeutung. Gewicht schafft Hierarchie." },
  { num: "03", title: "FARBE", desc: "Emotion. Identität. Wiedererkennung." },
  { num: "04", title: "BILD", desc: "Echte Bilder erzählen echte Geschichten." },
  { num: "05", title: "BEWEGUNG", desc: "Der Unterschied zwischen gut und unvergesslich." },
];

export default function HeroV007A() {
  const mainRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  /* ─── Font Loading ─── */
  useEffect(() => {
    const fonts = [
      "https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap",
      "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap",
    ];
    fonts.forEach((href) => {
      const link = document.createElement("link");
      link.href = href;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    });
  }, []);

  /* ─── Custom Cursor ─── */
  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    const onMove = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.6, ease: "power2.out" });
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* ─── GSAP Animations ─── */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        /* --- INTRO: question fades on scroll --- */
        gsap.to("#intro-content", {
          opacity: 0,
          y: -80,
          scale: 0.95,
          ease: "none",
          scrollTrigger: {
            trigger: "#intro",
            start: "top top",
            end: "80% top",
            scrub: 1,
          },
        });

        /* --- JOURNEY: pinned browser + 5 phases --- */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#journey",
            start: "top top",
            end: "+=8000",
            scrub: 1,
            pin: "#browser-pin",
            anticipatePin: 1,
          },
        });

        /* ── Phase 1: STRUKTUR (0% - 18%) ── */
        // Chapter card
        tl.fromTo("#ch-1", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.02 }, 0)
          .to("#ch-1", { opacity: 0, duration: 0.02 }, 0.04);

        // Wireframe elements stagger in
        tl.fromTo(
          ".wf",
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, stagger: 0.006, duration: 0.06, ease: "power2.out" },
          0.05
        );

        // Progress bar
        tl.fromTo("#progress-fill", { scaleX: 0 }, { scaleX: 0.2, duration: 0.12, ease: "none" }, 0.05);

        /* ── Phase 2: TYPOGRAFIE (18% - 36%) ── */
        tl.fromTo("#ch-2", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.02 }, 0.17)
          .to("#ch-2", { opacity: 0, duration: 0.02 }, 0.21);

        // Logo text
        tl.fromTo(
          "#nav-logo",
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.02, ease: "expo.out" },
          0.22
        );
        // Nav links
        tl.fromTo(
          ".nav-link",
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, stagger: 0.005, duration: 0.02, ease: "power2.out" },
          0.23
        );
        // Hero headline (word by word)
        tl.fromTo(
          ".hero-word",
          { opacity: 0, y: 30, rotateX: -15 },
          { opacity: 1, y: 0, rotateX: 0, stagger: 0.01, duration: 0.03, ease: "expo.out" },
          0.24
        );
        // Subtext
        tl.fromTo("#hero-sub", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.02, ease: "power2.out" }, 0.29);
        // CTA button
        tl.fromTo("#hero-cta", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.02, ease: "back.out(1.7)" }, 0.31);
        // Service titles
        tl.fromTo(
          ".svc-title",
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, stagger: 0.005, duration: 0.02, ease: "power2.out" },
          0.30
        );
        // Service descriptions
        tl.fromTo(
          ".svc-desc",
          { opacity: 0 },
          { opacity: 1, stagger: 0.005, duration: 0.02 },
          0.32
        );
        // Footer text
        tl.fromTo(".ft-text", { opacity: 0 }, { opacity: 1, stagger: 0.005, duration: 0.02 }, 0.33);

        // Progress
        tl.to("#progress-fill", { scaleX: 0.4, duration: 0.16, ease: "none" }, 0.18);

        /* ── Phase 3: FARBE (36% - 54%) ── */
        tl.fromTo("#ch-3", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.02 }, 0.35)
          .to("#ch-3", { opacity: 0, duration: 0.02 }, 0.39);

        // Wireframes change: dashed → solid, subtle bg
        tl.to(".wf", {
          borderColor: "#222",
          borderStyle: "solid" as unknown as string,
          duration: 0.04,
        }, 0.40);

        // Nav gets dark bg
        tl.to("#wf-nav", { backgroundColor: "#111", duration: 0.04 }, 0.40);
        // Hero bg darkens with orange gradient hint
        tl.to("#wf-hero", {
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a0f00 100%)",
          duration: 0.04,
        }, 0.41);
        // CTA turns orange
        tl.to("#hero-cta", {
          backgroundColor: ORANGE,
          borderColor: ORANGE,
          color: "#fff",
          duration: 0.03,
        }, 0.43);
        // Service cards get subtle bg
        tl.to(".wf-svc", { backgroundColor: "#111", duration: 0.04 }, 0.42);
        // Service numbers turn orange
        tl.to(".svc-num", { color: ORANGE, duration: 0.03 }, 0.44);
        // Footer subtle line
        tl.to("#wf-footer", { borderTopColor: "#222", borderTopWidth: 1, borderTopStyle: "solid" as unknown as string, duration: 0.03 }, 0.44);

        // Progress
        tl.to("#progress-fill", { scaleX: 0.6, duration: 0.18, ease: "none" }, 0.36);

        /* ── Phase 4: BILD (54% - 72%) ── */
        tl.fromTo("#ch-4", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.02 }, 0.53)
          .to("#ch-4", { opacity: 0, duration: 0.02 }, 0.57);

        // Hero image slides in
        tl.fromTo(
          "#hero-img",
          { opacity: 0, x: 40, clipPath: "inset(0 100% 0 0)" },
          { opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)", duration: 0.06, ease: "power4.inOut" },
          0.58
        );
        // Service icons appear
        tl.fromTo(
          ".svc-icon",
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, stagger: 0.01, duration: 0.03, ease: "back.out(1.7)" },
          0.62
        );
        // Logo mark
        tl.fromTo("#nav-mark", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.02, ease: "back.out(2)" }, 0.64);

        // Progress
        tl.to("#progress-fill", { scaleX: 0.8, duration: 0.18, ease: "none" }, 0.54);

        /* ── Phase 5: BEWEGUNG (72% - 90%) ── */
        tl.fromTo("#ch-5", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.02 }, 0.71)
          .to("#ch-5", { opacity: 0, duration: 0.02 }, 0.75);

        // Hero image subtle parallax
        tl.to("#hero-img", { y: -15, duration: 0.08, ease: "none" }, 0.76);
        // Headline slight shift
        tl.to("#hero-headline", { y: -8, duration: 0.08, ease: "none" }, 0.76);
        // CTA pulse
        tl.fromTo(
          "#hero-cta",
          { boxShadow: "0 0 0 0 rgba(255,107,0,0)" },
          { boxShadow: `0 0 20px 4px rgba(255,107,0,0.3)`, duration: 0.04 },
          0.78
        );
        // Service cards subtle hover-like lift
        tl.to(".wf-svc", { y: -4, duration: 0.04, stagger: 0.01, ease: "power2.out" }, 0.79);
        // Nav hover-like effect on links
        tl.to(".nav-link", { color: "#fff", stagger: 0.005, duration: 0.02 }, 0.80);
        // Motion line sweeps
        tl.fromTo(
          "#motion-line-1",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.04, ease: "expo.out" },
          0.77
        );
        tl.fromTo(
          "#motion-line-2",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.04, ease: "expo.out" },
          0.79
        );

        // Progress complete
        tl.to("#progress-fill", { scaleX: 1, duration: 0.18, ease: "none" }, 0.72);

        /* ── ZOOM OUT / REVEAL (90% - 100%) ── */
        tl.to("#browser-content", { scale: 1.02, duration: 0.05 }, 0.90);
        tl.to("#browser-chrome", { opacity: 0, y: -20, duration: 0.04 }, 0.92);
        tl.to("#browser-content", {
          borderRadius: 0,
          duration: 0.05,
        }, 0.93);
        // Result label
        tl.fromTo(
          "#result-label",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.04, ease: "expo.out" },
          0.94
        );
      });

      /* ── Mobile: simplified ── */
      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>(".mobile-reveal").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
            }
          );
        });
      });
    },
    { scope: mainRef }
  );

  return (
    <main
      ref={mainRef}
      className="relative overflow-x-hidden"
      style={{ background: DARK, cursor: "none" }}
    >
      {/* ─── Custom Cursor ─── */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-11 h-11 rounded-full border border-white/25 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* ─── Grain ─── */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none z-[9998]"
        style={{ opacity: 0.035 }}
      >
        <filter id="grain7">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain7)" />
      </svg>

      {/* ═══════════════════════════════════════════
          INTRO — "Was macht eine Website besonders?"
          ═══════════════════════════════════════════ */}
      <section id="intro" className="h-[140vh] relative flex items-start justify-center pt-[35vh]">
        <div id="intro-content" className="text-center px-4">
          <p
            className="text-xs md:text-sm tracking-[0.3em] uppercase mb-6 md:mb-8"
            style={{ color: ORANGE, fontFamily: "monospace" }}
          >
            PixIntCreators fragt
          </p>
          <h1
            className="text-[10vw] md:text-[7vw] font-bold text-white leading-[0.92]"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Was macht
            <br />
            eine Website
            <br />
            <span
              style={{
                color: ORANGE,
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
              }}
            >
              besonders?
            </span>
          </h1>
          <div className="mt-12 md:mt-16 flex flex-col items-center gap-2 text-gray-600 text-xs">
            <span>Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          JOURNEY — Browser mockup + 5 Phasen
          ═══════════════════════════════════════════ */}
      <section id="journey" className="relative hidden md:block" style={{ height: "9000px" }}>
        <div id="browser-pin" className="w-full h-screen flex items-center justify-center">
          {/* Browser window */}
          <div className="relative w-[74vw] max-w-[1200px]">
            {/* Chrome bar */}
            <div
              id="browser-chrome"
              className="bg-[#1c1c1c] rounded-t-xl px-5 py-3 flex items-center gap-3 relative z-10"
            >
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c840]" />
              </div>
              <div className="flex-1 bg-[#2a2a2a] rounded-lg px-4 py-1.5 text-[11px] text-gray-500 font-mono ml-4 flex items-center gap-2">
                <svg className="w-3 h-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                pixintcreators.de
              </div>
            </div>

            {/* Website content */}
            <div
              id="browser-content"
              className="bg-[#0c0c0c] rounded-b-xl relative overflow-hidden"
              style={{ height: "72vh" }}
            >
              {/* ── WIREFRAME ELEMENTS ── */}

              {/* Nav wireframe */}
              <div
                id="wf-nav"
                className="wf absolute top-0 left-0 right-0 flex items-center justify-between px-[4%] opacity-0"
                style={{ height: "7%", border: "1px dashed #333", borderTop: "none" }}
              >
                {/* Logo placeholder */}
                <div className="wf w-[12%] h-[40%] border border-dashed border-gray-700/60 rounded opacity-0" />
                {/* Nav links placeholder */}
                <div className="flex gap-[1.5vw]">
                  <div className="wf w-[3vw] h-[8px] border border-dashed border-gray-700/60 rounded opacity-0" />
                  <div className="wf w-[3vw] h-[8px] border border-dashed border-gray-700/60 rounded opacity-0" />
                  <div className="wf w-[3vw] h-[8px] border border-dashed border-gray-700/60 rounded opacity-0" />
                </div>
              </div>

              {/* Hero wireframe */}
              <div
                id="wf-hero"
                className="wf absolute left-0 right-0 opacity-0"
                style={{ top: "7%", height: "52%", border: "1px dashed #333", borderTop: "none" }}
              >
                {/* Text area wireframes */}
                <div className="wf absolute top-[18%] left-[5%] w-[50%] h-[10%] border border-dashed border-gray-700/60 rounded opacity-0" />
                <div className="wf absolute top-[32%] left-[5%] w-[45%] h-[8%] border border-dashed border-gray-700/60 rounded opacity-0" />
                <div className="wf absolute top-[44%] left-[5%] w-[30%] h-[6%] border border-dashed border-gray-700/60 rounded opacity-0" />
                <div className="wf absolute top-[58%] left-[5%] w-[18%] h-[8%] border border-dashed border-gray-700/60 rounded opacity-0" />
                {/* Image area wireframe */}
                <div className="wf absolute top-[12%] right-[4%] w-[36%] h-[70%] border border-dashed border-gray-700/60 rounded opacity-0" />
              </div>

              {/* Services wireframe */}
              <div
                className="wf absolute left-0 right-0 flex gap-0 opacity-0"
                style={{ top: "59%", height: "28%", border: "1px dashed #333", borderTop: "none" }}
              >
                <div id="wf-svc-1" className="wf-svc flex-1 border-r border-dashed border-gray-700/40 p-[2%] opacity-100" />
                <div id="wf-svc-2" className="wf-svc flex-1 border-r border-dashed border-gray-700/40 p-[2%] opacity-100" />
                <div id="wf-svc-3" className="wf-svc flex-1 p-[2%] opacity-100" />
              </div>

              {/* Footer wireframe */}
              <div
                id="wf-footer"
                className="wf absolute bottom-0 left-0 right-0 opacity-0"
                style={{ height: "6%", border: "1px dashed #333", borderBottom: "none" }}
              />

              {/* ── TYPOGRAPHY LAYER ── */}

              {/* Nav text */}
              <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-[4%]" style={{ height: "7%" }}>
                <div className="flex items-center gap-2">
                  <div
                    id="nav-mark"
                    className="w-[1.5vw] h-[1.5vw] rounded-sm opacity-0"
                    style={{ background: ORANGE }}
                  />
                  <span
                    id="nav-logo"
                    className="font-bold text-white opacity-0"
                    style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "clamp(10px, 1.1vw, 18px)" }}
                  >
                    PIXINT
                  </span>
                </div>
                <div className="flex gap-[1.5vw]" style={{ fontSize: "clamp(8px, 0.7vw, 12px)" }}>
                  <span className="nav-link text-gray-500 opacity-0">Leistungen</span>
                  <span className="nav-link text-gray-500 opacity-0">Projekte</span>
                  <span className="nav-link text-gray-500 opacity-0">Kontakt</span>
                </div>
              </div>

              {/* Hero text */}
              <div className="absolute left-[5%] w-[52%]" style={{ top: "15%" }}>
                <div id="hero-headline" style={{ perspective: "600px" }}>
                  <div
                    className="leading-[1.05]"
                    style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "clamp(16px, 3.2vw, 52px)", fontWeight: 700 }}
                  >
                    <span className="hero-word inline-block text-white opacity-0 mr-[0.8vw]">WIR</span>
                    <span className="hero-word inline-block text-white opacity-0 mr-[0.8vw]">MACHEN</span>
                    <br />
                    <span className="hero-word inline-block text-white opacity-0 mr-[0.8vw]">DAS</span>
                    <span className="hero-word inline-block opacity-0 mr-[0.8vw]" style={{ color: ORANGE }}>EINE</span>
                    <br />
                    <span
                      className="hero-word inline-block opacity-0"
                      style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontStyle: "italic",
                        color: ORANGE,
                        fontSize: "clamp(18px, 3.8vw, 60px)",
                      }}
                    >
                      PROZENT.
                    </span>
                  </div>
                </div>
                <p
                  id="hero-sub"
                  className="text-gray-500 mt-[1.2vw] leading-relaxed opacity-0"
                  style={{ fontSize: "clamp(8px, 0.85vw, 14px)" }}
                >
                  Webdesign & KI-Integration
                  <br />
                  für Marken die auffallen wollen.
                </p>
                <div
                  id="hero-cta"
                  className="inline-block mt-[1.5vw] px-[1.8vw] py-[0.6vw] text-white rounded-full opacity-0"
                  style={{
                    fontSize: "clamp(8px, 0.7vw, 12px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    letterSpacing: "0.05em",
                  }}
                >
                  Projekt starten →
                </div>
              </div>

              {/* Hero image placeholder */}
              <div
                id="hero-img"
                className="absolute rounded-lg overflow-hidden opacity-0"
                style={{ top: "14%", right: "4%", width: "36%", height: "38%" }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    background: `linear-gradient(135deg, #1a0f00 0%, ${ORANGE}22 40%, #0a0a0a 100%)`,
                  }}
                />
                {/* Abstract shapes suggesting a creative image */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `
                      radial-gradient(circle at 30% 40%, ${ORANGE}33 0%, transparent 50%),
                      radial-gradient(circle at 70% 60%, ${ORANGE}1a 0%, transparent 40%)
                    `,
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-[40%]"
                  style={{ background: "linear-gradient(to top, #0a0a0a 0%, transparent 100%)" }}
                />
                {/* Geometric accent */}
                <div
                  className="absolute top-[15%] left-[10%] w-[30%] h-[30%] rounded-full border border-orange-500/20"
                />
                <div
                  className="absolute top-[25%] left-[20%] w-[20%] h-[20%] rounded-full"
                  style={{ background: `${ORANGE}15` }}
                />
              </div>

              {/* Service texts */}
              <div
                className="absolute left-0 right-0 flex gap-0"
                style={{ top: "59%", height: "28%" }}
              >
                {[
                  { num: "01", title: "Webdesign", desc: "Keine Templates.\nJede Seite ein Unikat." },
                  { num: "02", title: "KI-Integration", desc: "Intelligente Automation\nfür Ihr Business." },
                  { num: "03", title: "Creative Dev", desc: "Code als kreatives\nMedium." },
                ].map((svc, i) => (
                  <div key={i} className="flex-1 p-[3%] relative">
                    {/* Service icon */}
                    <div
                      className="svc-icon w-[2.5vw] h-[2.5vw] rounded-lg mb-[0.8vw] opacity-0"
                      style={{
                        background:
                          i === 0
                            ? `linear-gradient(135deg, ${ORANGE}40, ${ORANGE}15)`
                            : i === 1
                            ? "linear-gradient(135deg, #3b82f640, #3b82f615)"
                            : "linear-gradient(135deg, #a855f740, #a855f715)",
                      }}
                    />
                    <span
                      className="svc-num block opacity-0 text-gray-600"
                      style={{ fontSize: "clamp(7px, 0.55vw, 10px)", fontFamily: "monospace" }}
                    >
                      {svc.num}
                    </span>
                    <h3
                      className="svc-title text-white font-semibold mt-0.5 opacity-0"
                      style={{
                        fontFamily: "'Clash Display', sans-serif",
                        fontSize: "clamp(9px, 1vw, 16px)",
                      }}
                    >
                      {svc.title}
                    </h3>
                    <p
                      className="svc-desc text-gray-600 mt-1 opacity-0 whitespace-pre-line"
                      style={{ fontSize: "clamp(7px, 0.6vw, 10px)", lineHeight: 1.4 }}
                    >
                      {svc.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer text */}
              <div
                className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-[4%]"
                style={{ height: "6%" }}
              >
                <span className="ft-text text-gray-700 opacity-0" style={{ fontSize: "clamp(6px, 0.5vw, 9px)" }}>
                  © 2026 PixIntCreators
                </span>
                <span className="ft-text text-gray-700 opacity-0" style={{ fontSize: "clamp(6px, 0.5vw, 9px)" }}>
                  Impressum · Datenschutz
                </span>
              </div>

              {/* ── MOTION LINES (Phase 5) ── */}
              <div
                id="motion-line-1"
                className="absolute opacity-0"
                style={{
                  top: "58%",
                  left: "4%",
                  right: "4%",
                  height: "1px",
                  background: `linear-gradient(90deg, transparent 0%, ${ORANGE}40 50%, transparent 100%)`,
                  transformOrigin: "left",
                }}
              />
              <div
                id="motion-line-2"
                className="absolute opacity-0"
                style={{
                  top: "87%",
                  left: "4%",
                  right: "4%",
                  height: "1px",
                  background: `linear-gradient(90deg, transparent 0%, ${ORANGE}40 50%, transparent 100%)`,
                  transformOrigin: "left",
                }}
              />

              {/* ── RESULT LABEL (end) ── */}
              <div
                id="result-label"
                className="absolute inset-0 flex items-center justify-center opacity-0 z-20"
                style={{ background: "rgba(10,10,10,0.6)", backdropFilter: "blur(2px)" }}
              >
                <div className="text-center">
                  <p
                    className="text-sm tracking-[0.3em] uppercase mb-3"
                    style={{ color: ORANGE, fontFamily: "monospace" }}
                  >
                    Fertig
                  </p>
                  <h2
                    className="text-[3vw] font-bold text-white"
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                  >
                    Eine Website.
                  </h2>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4 flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-800 relative overflow-hidden rounded-full">
                <div
                  id="progress-fill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: ORANGE, transformOrigin: "left", transform: "scaleX(0)" }}
                />
              </div>
              <span className="text-[10px] text-gray-600 font-mono tracking-wider">BUILDING</span>
            </div>
          </div>

          {/* ── PHASE CHAPTER CARDS ── */}
          {PHASES.map((phase, i) => (
            <div
              key={phase.num}
              id={`ch-${i + 1}`}
              className="fixed top-1/2 left-[4vw] -translate-y-1/2 z-20 opacity-0 pointer-events-none"
            >
              <span
                className="block text-[11px] tracking-[0.3em] uppercase mb-2 font-mono"
                style={{ color: ORANGE }}
              >
                {phase.num}
              </span>
              <h3
                className="text-[4vw] font-bold text-white leading-none"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                {phase.title}
              </h3>
              <p className="text-[1vw] text-gray-500 mt-3 max-w-[16vw]">{phase.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MOBILE FALLBACK — simplified version
          ═══════════════════════════════════════════ */}
      <section className="md:hidden px-6 py-20">
        {PHASES.map((phase) => (
          <div key={phase.num} className="mobile-reveal mb-16 opacity-0">
            <span className="text-xs font-mono tracking-widest" style={{ color: ORANGE }}>
              {phase.num}
            </span>
            <h3
              className="text-3xl font-bold text-white mt-1"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              {phase.title}
            </h3>
            <p className="text-gray-500 mt-2 text-sm">{phase.desc}</p>
          </div>
        ))}
      </section>

      {/* ═══════════════════════════════════════════
          OUTRO — "Vom Pixel zur Website."
          ═══════════════════════════════════════════ */}
      <section id="outro" className="h-screen flex items-center justify-center relative">
        <div className="text-center px-4">
          <p
            className="text-xs md:text-sm tracking-[0.3em] uppercase mb-4 md:mb-6"
            style={{ color: ORANGE, fontFamily: "monospace" }}
          >
            Das Ergebnis
          </p>
          <h2
            className="text-[12vw] md:text-[7vw] font-bold text-white leading-[0.92]"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Vom Pixel
            <br />
            zur Website.
          </h2>
          <p
            className="text-base md:text-xl text-gray-500 mt-6 md:mt-8"
            style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}
          >
            PixIntCreators — Wir machen das eine Prozent.
          </p>
        </div>
      </section>
    </main>
  );
}
