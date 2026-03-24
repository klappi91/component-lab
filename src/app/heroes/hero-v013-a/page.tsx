"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   hero-v013-a: CREATION TIMELINE

   Inspiration:
   - Web Design Trends 2026: "Video + oversized typography"
   - The Camel Fabric Game (Adoratorio Studio) — Immersive Storytelling
   - Scroll-driven video = User kontrolliert ZEIT

   Konzept: Der User scrubbt durch einen Schoepfungsprozess.
   Aus Dunkelheit entsteht Licht, aus Licht entsteht die Marke.
   VIDEO ist das Medium, SCROLL ist die Zeitachse.

   Choreografie:
   VOID       (0-20%)   — Pure Dunkelheit, Letterbox oeffnet sich
   GENESIS    (20-45%)  — Licht entsteht, erste Partikel sichtbar
   EMERGENCE  (45-65%)  — "WIR ERSCHAFFEN" bricht durch das Licht
   STATEMENT  (65-82%)  — "ERLEBNISSE" + Video blur → abstraktes BG
   BRAND      (82-100%) — PixIntCreators materialisiert aus dem Licht

   Easings (Constitution v14):
   - Text reveals: expo.out
   - Wipes: power4.inOut
   - Fades: power2.out
   - Letter-spacing: expo.inOut
   - Video blur: linear (scroll-gekoppelt)
   ═══════════════════════════════════════════════════════════ */

const ORANGE = "#FF6B00";
const DARK = "#0A0A0A";

export default function HeroV013A() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  // ── Lenis Smooth Scroll ──────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
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

  // ── Custom Cursor ────────────────────────────────────────
  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    const onMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    const onEnterInteractive = () => {
      gsap.to(cursor, { scale: 2.5, borderColor: ORANGE, duration: 0.3 });
    };
    const onLeaveInteractive = () => {
      gsap.to(cursor, { scale: 1, borderColor: "rgba(255,255,255,0.4)", duration: 0.3 });
    };

    window.addEventListener("mousemove", onMove);

    const interactives = document.querySelectorAll("a, button, .interactive");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
    };
  }, []);

  // ── Video Setup ──────────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => {
      video.pause();
      video.currentTime = 0;
      setVideoReady(true);
    };

    if (video.readyState >= 1) {
      onReady();
    } else {
      video.addEventListener("loadedmetadata", onReady);
      return () => video.removeEventListener("loadedmetadata", onReady);
    }
  }, []);

  // ── GSAP Choreografie ────────────────────────────────────
  useGSAP(
    () => {
      const container = containerRef.current;
      const video = videoRef.current;
      if (!container) return;

      const hasVideo = video && video.readyState >= 1;
      const videoDuration = hasVideo ? video.duration : 8;

      // ── Main Timeline (pinned, scrub) ──────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // ── Video Scrub ────────────────────────────────────
      if (hasVideo) {
        tl.to(video, { currentTime: videoDuration, ease: "none", duration: 1 }, 0);
      }

      // ── PHASE 1: VOID (0-20%) ─────────────────────────
      // Letterbox bars retract
      tl.fromTo(
        ".letterbox-top",
        { scaleY: 1 },
        { scaleY: 0, duration: 0.2, ease: "power4.inOut" },
        0
      );
      tl.fromTo(
        ".letterbox-bottom",
        { scaleY: 1 },
        { scaleY: 0, duration: 0.2, ease: "power4.inOut" },
        0
      );

      // Progress line grows
      tl.fromTo(
        ".progress-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: "none" },
        0
      );

      // ── Fallback BG glow (wenn kein Video) ─────────────
      if (!hasVideo) {
        tl.fromTo(
          ".fallback-glow",
          { opacity: 0, scale: 0.3 },
          { opacity: 0.6, scale: 1.2, duration: 0.5, ease: "power2.out" },
          0.1
        );
      }

      // ── PHASE 2: GENESIS (20-45%) ──────────────────────
      // Scroll indicator fades
      tl.to(".scroll-hint", { opacity: 0, duration: 0.05 }, 0.15);

      // Time counter appears
      tl.fromTo(
        ".time-counter",
        { opacity: 0 },
        { opacity: 0.6, duration: 0.1, ease: "power2.out" },
        0.2
      );

      // ── PHASE 3: EMERGENCE (45-65%) ────────────────────
      // Blur overlay starts
      tl.fromTo(
        ".blur-overlay",
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "none" },
        0.4
      );

      // "WIR" — clip-path reveal from bottom
      tl.fromTo(
        ".text-wir",
        { clipPath: "inset(100% 0 0 0)", opacity: 1 },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 0.12,
          ease: "expo.out",
        },
        0.45
      );

      // "ERSCHAFFEN" — stagger word, slight y offset
      tl.fromTo(
        ".text-erschaffen .letter",
        { y: 80, opacity: 0, rotateX: -45 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.008,
          duration: 0.12,
          ease: "expo.out",
        },
        0.5
      );

      // Orange accent line under ERSCHAFFEN
      tl.fromTo(
        ".accent-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.1, ease: "power4.inOut" },
        0.55
      );

      // ── PHASE 4: STATEMENT (65-82%) ────────────────────
      // "ERLEBNISSE" — scale up with glow
      tl.fromTo(
        ".text-erlebnisse",
        { scale: 0.6, opacity: 0, filter: "blur(20px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.12,
          ease: "power4.out",
        },
        0.65
      );

      // More blur on video
      tl.to(
        ".blur-overlay",
        { backdropFilter: "blur(30px)", duration: 0.17 },
        0.65
      );

      // ── PHASE 5: BRAND (82-100%) ──────────────────────
      // First text fades out
      tl.to(
        [".text-wir", ".text-erschaffen", ".text-erlebnisse", ".accent-line"],
        { opacity: 0, duration: 0.05, ease: "power2.out" },
        0.8
      );

      // Dark overlay
      tl.to(
        ".dark-overlay",
        { opacity: 0.7, duration: 0.1, ease: "none" },
        0.8
      );

      // Brand name — letter-spacing contracts
      tl.fromTo(
        ".brand-name",
        { letterSpacing: "1.5em", opacity: 0, scale: 0.95 },
        {
          letterSpacing: "0.15em",
          opacity: 1,
          scale: 1,
          duration: 0.1,
          ease: "expo.inOut",
        },
        0.85
      );

      // Tagline
      tl.fromTo(
        ".brand-tagline",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.05, ease: "expo.out" },
        0.9
      );

      // CTA button
      tl.fromTo(
        ".brand-cta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.05, ease: "expo.out" },
        0.93
      );

      // Orange pulse ring
      tl.fromTo(
        ".pulse-ring",
        { scale: 0, opacity: 0.8 },
        {
          scale: 8,
          opacity: 0,
          duration: 0.15,
          ease: "power2.out",
        },
        0.84
      );
    },
    { scope: containerRef, dependencies: [videoReady] }
  );

  // ── Split text helper ────────────────────────────────────
  const splitLetters = (text: string) =>
    text.split("").map((char, i) => (
      <span key={i} className="letter inline-block" style={{ perspective: "600px" }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 rounded-full border pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ borderColor: "rgba(255,255,255,0.4)" }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-white pointer-events-none z-[9999] hidden md:block"
      />

      {/* Film Grain */}
      <div className="fixed inset-0 z-[9998] pointer-events-none opacity-[0.04]">
        <svg width="100%" height="100%">
          <filter id="grain-v013">
            <feTurbulence baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-v013)" />
        </svg>
      </div>

      {/* Main Container */}
      <div
        ref={containerRef}
        className="relative w-full bg-[#0A0A0A] overflow-hidden"
        style={{ cursor: "none" }}
      >
        {/* ── VIEWPORT (pinned) ─────────────────────────── */}
        <div className="relative h-screen w-full overflow-hidden">
          {/* Video Layer */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src="/heroes/hero-v013-a/creation.mp4"
            muted
            playsInline
            preload="auto"
          />

          {/* Fallback BG (when no video) */}
          <div
            className="fallback-glow absolute inset-0 opacity-0"
            style={{
              background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${ORANGE}22 0%, transparent 70%)`,
            }}
          />

          {/* Blur Overlay (grows with scroll) */}
          <div
            className="blur-overlay absolute inset-0 opacity-0"
            style={{ backdropFilter: "blur(0px)" }}
          />

          {/* Dark Overlay (for brand phase) */}
          <div className="dark-overlay absolute inset-0 bg-[#0A0A0A] opacity-0" />

          {/* Letterbox Bars */}
          <div
            className="letterbox-top absolute top-0 left-0 right-0 bg-[#0A0A0A] z-10"
            style={{ height: "12vh", transformOrigin: "top" }}
          />
          <div
            className="letterbox-bottom absolute bottom-0 left-0 right-0 bg-[#0A0A0A] z-10"
            style={{ height: "12vh", transformOrigin: "bottom" }}
          />

          {/* Orange Pulse Ring (brand transition) */}
          <div
            className="pulse-ring absolute rounded-full z-20 pointer-events-none"
            style={{
              width: "80px",
              height: "80px",
              left: "calc(50% - 40px)",
              top: "calc(50% - 40px)",
              border: `2px solid ${ORANGE}`,
              scale: "0",
            }}
          />

          {/* ── TEXT LAYERS ──────────────────────────────── */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
            {/* WIR */}
            <div
              className="text-wir opacity-0"
              style={{
                clipPath: "inset(100% 0 0 0)",
              }}
            >
              <span
                className="block text-white font-extralight tracking-[0.3em] uppercase"
                style={{ fontSize: "clamp(1rem, 2.5vw, 1.8rem)" }}
              >
                Wir
              </span>
            </div>

            {/* ERSCHAFFEN */}
            <div className="text-erschaffen mt-2">
              <span
                className="block text-white font-black uppercase leading-none"
                style={{ fontSize: "clamp(3rem, 12vw, 10rem)" }}
              >
                {splitLetters("ERSCHAFFEN")}
              </span>
            </div>

            {/* Accent Line */}
            <div
              className="accent-line mt-4 origin-left"
              style={{
                width: "clamp(80px, 15vw, 200px)",
                height: "3px",
                background: ORANGE,
                transform: "scaleX(0)",
              }}
            />

            {/* ERLEBNISSE */}
            <div className="text-erlebnisse mt-8 opacity-0">
              <span
                className="block uppercase font-black leading-none"
                style={{
                  fontSize: "clamp(2.5rem, 10vw, 8rem)",
                  color: ORANGE,
                  textShadow: `0 0 60px ${ORANGE}44, 0 0 120px ${ORANGE}22`,
                }}
              >
                ERLEBNISSE
              </span>
            </div>
          </div>

          {/* ── BRAND LAYER ─────────────────────────────── */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-40 pointer-events-none">
            <div
              className="brand-name opacity-0 text-white font-extralight uppercase"
              style={{
                fontSize: "clamp(1.4rem, 4vw, 3rem)",
                letterSpacing: "1.5em",
              }}
            >
              PixIntCreators
            </div>

            <div
              className="brand-tagline mt-6 opacity-0 text-white/60 font-light"
              style={{ fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)" }}
            >
              Webdesign &middot; KI-Integration &middot; Creative Development
            </div>

            <a
              href="#"
              className="brand-cta interactive mt-10 opacity-0 pointer-events-auto relative group"
            >
              <span
                className="relative inline-block px-10 py-4 text-sm font-medium tracking-[0.2em] uppercase border overflow-hidden transition-colors duration-500"
                style={{
                  borderColor: ORANGE,
                  color: "white",
                }}
              >
                <span
                  className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  style={{ background: ORANGE }}
                />
                <span className="relative z-10">Projekt starten</span>
              </span>
            </a>
          </div>

          {/* ── UI ELEMENTS ─────────────────────────────── */}
          {/* Scroll Hint */}
          <div className="scroll-hint absolute bottom-[14vh] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3">
            <span className="text-white/40 text-[10px] tracking-[0.4em] uppercase font-light">
              Scroll to create
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
          </div>

          {/* Progress Line (bottom) */}
          <div
            className="progress-line absolute bottom-0 left-0 right-0 h-[2px] z-50 origin-left"
            style={{
              background: `linear-gradient(90deg, ${ORANGE}, ${ORANGE}88)`,
              transform: "scaleX(0)",
            }}
          />

          {/* Time Counter */}
          <div className="time-counter absolute top-8 right-8 z-30 opacity-0">
            <span className="text-white/30 text-[11px] font-mono tracking-wider">
              CREATION TIMELINE
            </span>
          </div>

          {/* Corner Markers (subtle framing) */}
          <div className="absolute top-6 left-6 z-30">
            <span
              className="text-[9px] font-light tracking-[0.3em] uppercase"
              style={{ color: `${ORANGE}66` }}
            >
              v013
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
