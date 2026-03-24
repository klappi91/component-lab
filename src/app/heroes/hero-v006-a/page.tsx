"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   hero-v006-a: DESTILLIERT
   Typographic Process Dissection — Self-Demonstrating Webdesign

   Inspiration: Aupale Vodka (Locomotive, SOTD 17.03.2026)
                Product-Dissection Pattern mit Sticky Reveals

   Skills: text-animation (SplitType, Scramble, Variable Weight)
           gsap-plugins (ScrollTrigger pin/scrub, CustomEase patterns)
           awwwards-animations (Stagger, Easing, Choreografie)

   Choreografie:
   - Intro: Scramble decode → "WAS MACHT EIN WEBDESIGN BESONDERS?"
   - Phase 1 TYPOGRAFIE: Massive Clash Display, char spread + weight wave
   - Phase 2 BEWEGUNG: Easing curves auf Canvas, motion comparison
   - Phase 3 DESTILLIERT: Orange flood, Instrument Serif italic, brand reveal
   ═══════════════════════════════════════════════════════════ */

/* ─── Brand ─── */
const ORANGE = "#FF6B00";
const DARK = "#0A0A0A";
const LIGHT = "#F5F5F0";
const MUTED = "#555";

/* ─── Scramble ─── */
const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";

/* ─── Easing functions for canvas visualization ─── */
function easeLinear(t: number) {
  return t;
}
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
function easeExpoOut(t: number) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function HeroV006A() {
  /* ─── Refs ─── */
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLHeadingElement>(null);
  const introArrowRef = useRef<HTMLDivElement>(null);
  const typoSectionRef = useRef<HTMLDivElement>(null);
  const typoWordRef = useRef<HTMLHeadingElement>(null);
  const typoSubRef = useRef<HTMLParagraphElement>(null);
  const motionSectionRef = useRef<HTMLDivElement>(null);
  const motionWordRef = useRef<HTMLHeadingElement>(null);
  const motionSubRef = useRef<HTMLParagraphElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const destilSectionRef = useRef<HTMLDivElement>(null);
  const destilWordRef = useRef<HTMLHeadingElement>(null);
  const destilSubRef = useRef<HTMLParagraphElement>(null);
  const destilBrandRef = useRef<HTMLDivElement>(null);
  const destilBgRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  /* ─── Custom Cursor (GSAP smooth follow) ─── */
  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    const onMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.6,
        ease: "power3.out",
      });
      gsap.to(dot, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.1,
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* ─── Canvas DPR Setup ─── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
  }, []);

  /* ─── Scramble Decode Effect (Intro) ─── */
  useEffect(() => {
    const el = introTextRef.current;
    if (!el) return;
    const target = "WAS MACHT EIN WEBDESIGN BESONDERS?";
    el.textContent = "";

    let iteration = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        el.textContent = target
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return target[index];
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("");

        if (iteration >= target.length) clearInterval(interval);
        iteration += 0.4;
      }, 30);
    }, 600);

    return () => clearTimeout(timeout);
  }, []);

  /* ═══════════════════════════════════════════════════════════
     MAIN GSAP CHOREOGRAFIE
     ═══════════════════════════════════════════════════════════ */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        /* ─── Intro: Fade + scale on scroll ─── */
        if (introRef.current) {
          gsap.to(introRef.current, {
            opacity: 0,
            scale: 0.92,
            filter: "blur(10px)",
            scrollTrigger: {
              trigger: introRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }

        /* ─── Intro Arrow: Gentle bounce ─── */
        if (introArrowRef.current) {
          gsap.to(introArrowRef.current, {
            y: 12,
            repeat: -1,
            yoyo: true,
            duration: 1.2,
            ease: "sine.inOut",
          });
        }

        /* ═══ PHASE 1: TYPOGRAFIE ═══ */
        if (typoSectionRef.current && typoWordRef.current) {
          const split = new SplitType(typoWordRef.current, { types: "chars" });

          /* Pin */
          ScrollTrigger.create({
            trigger: typoSectionRef.current,
            start: "top top",
            end: "+=300%",
            pin: true,
            pinSpacing: true,
          });

          /* Chars entrance: back.out bounce from below */
          gsap.from(split.chars || [], {
            y: 120,
            rotateX: -90,
            opacity: 0,
            stagger: 0.04,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: typoSectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });

          /* Chars spread: each goes different direction, weight varies */
          const spreadTl = gsap.timeline({
            scrollTrigger: {
              trigger: typoSectionRef.current,
              start: "top top",
              end: "+=200%",
              scrub: 1.5,
            },
          });

          const chars = split.chars || [];
          const mid = chars.length / 2;
          chars.forEach((char, i) => {
            const dir = i % 2 === 0 ? -1 : 1;
            const dist = 20 + Math.abs(i - mid) * 12;
            const rot = dir * (5 + Math.random() * 20);

            spreadTl.to(
              char,
              {
                y: dir * dist,
                x: (i - mid) * 15,
                rotate: rot,
                scale: 0.7 + Math.random() * 0.6,
                color: i % 3 === 0 ? ORANGE : LIGHT,
                duration: 1,
                ease: "power2.inOut",
              },
              0,
            );
          });

          /* Variable font weight wave (continuous) */
          chars.forEach((char, i) => {
            gsap.to(char, {
              fontWeight: 300,
              duration: 0.6,
              repeat: -1,
              yoyo: true,
              delay: i * 0.08,
              ease: "sine.inOut",
            });
          });

          /* Subtitle: line reveal with overflow hidden */
          if (typoSubRef.current) {
            const subSplit = new SplitType(typoSubRef.current, {
              types: "lines",
            });
            subSplit.lines?.forEach((line) => {
              const w = document.createElement("div");
              w.style.overflow = "hidden";
              line.parentNode?.insertBefore(w, line);
              w.appendChild(line);
            });
            gsap.from(subSplit.lines || [], {
              y: "100%",
              stagger: 0.12,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: typoSectionRef.current,
                start: "top 30%",
                toggleActions: "play none none reverse",
              },
            });
          }
        }

        /* ═══ PHASE 2: BEWEGUNG ═══ */
        if (motionSectionRef.current && motionWordRef.current) {
          const split = new SplitType(motionWordRef.current, {
            types: "chars",
          });

          /* Pin */
          ScrollTrigger.create({
            trigger: motionSectionRef.current,
            start: "top top",
            end: "+=350%",
            pin: true,
            pinSpacing: true,
          });

          /* Word entrance from center */
          gsap.from(split.chars || [], {
            x: -80,
            opacity: 0,
            stagger: { amount: 0.5, from: "center" },
            duration: 0.7,
            ease: "expo.out",
            scrollTrigger: {
              trigger: motionSectionRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          });

          /* Canvas: Easing curve visualization (scrub-driven) */
          const canvas = canvasRef.current;
          if (canvas) {
            const displayW = canvas.getBoundingClientRect().width;
            const displayH = canvas.getBoundingClientRect().height;

            ScrollTrigger.create({
              trigger: motionSectionRef.current,
              start: "top top",
              end: "+=350%",
              scrub: 1,
              onUpdate: (self) => {
                const ctx = canvas.getContext("2d");
                if (!ctx) return;

                const p = self.progress;
                ctx.clearRect(0, 0, displayW, displayH);

                const pad = 50;
                const gW = displayW - pad * 2;
                const gH = displayH - pad * 2;

                /* Grid */
                ctx.strokeStyle = "#1a1a1a";
                ctx.lineWidth = 1;
                for (let i = 0; i <= 4; i++) {
                  const y = pad + (gH / 4) * i;
                  ctx.beginPath();
                  ctx.moveTo(pad, y);
                  ctx.lineTo(displayW - pad, y);
                  ctx.stroke();
                }
                for (let i = 0; i <= 4; i++) {
                  const x = pad + (gW / 4) * i;
                  ctx.beginPath();
                  ctx.moveTo(x, pad);
                  ctx.lineTo(x, pad + gH);
                  ctx.stroke();
                }

                /* Curves */
                const curves = [
                  { fn: easeLinear, color: MUTED, label: "linear" },
                  { fn: easeOutCubic, color: LIGHT, label: "ease-out" },
                  { fn: easeExpoOut, color: ORANGE, label: "expo.out" },
                ];

                curves.forEach(({ fn, color, label }, ci) => {
                  ctx.beginPath();
                  ctx.strokeStyle = color;
                  ctx.lineWidth = 2.5;

                  const steps = Math.floor(p * 200);
                  for (let s = 0; s <= steps; s++) {
                    const t = s / 200;
                    const x = pad + t * gW;
                    const y = pad + gH - fn(t) * gH;
                    s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                  }
                  ctx.stroke();

                  /* Moving dot */
                  const dx = pad + p * gW;
                  const dy = pad + gH - fn(p) * gH;
                  ctx.beginPath();
                  ctx.fillStyle = color;
                  ctx.arc(dx, dy, 7, 0, Math.PI * 2);
                  ctx.fill();

                  /* Glow on orange dot */
                  if (color === ORANGE) {
                    ctx.beginPath();
                    ctx.fillStyle = `${ORANGE}33`;
                    ctx.arc(dx, dy, 18, 0, Math.PI * 2);
                    ctx.fill();
                  }

                  /* Label */
                  ctx.fillStyle = color;
                  ctx.font = "600 13px 'General Sans', sans-serif";
                  ctx.textAlign = "right";
                  ctx.fillText(label, displayW - pad, pad + 20 + ci * 26);
                });

                /* Axis labels */
                ctx.fillStyle = MUTED;
                ctx.font = "11px 'General Sans', sans-serif";
                ctx.textAlign = "center";
                ctx.fillText("ZEIT", displayW / 2, pad + gH + 30);
                ctx.save();
                ctx.translate(15, pad + gH / 2);
                ctx.rotate(-Math.PI / 2);
                ctx.fillText("FORTSCHRITT", 0, 0);
                ctx.restore();
              },
            });
          }

          /* Subtitle: word-by-word scroll reveal */
          if (motionSubRef.current) {
            const subSplit = new SplitType(motionSubRef.current, {
              types: "words",
            });
            gsap.fromTo(
              subSplit.words || [],
              { opacity: 0.12 },
              {
                opacity: 1,
                stagger: 0.15,
                scrollTrigger: {
                  trigger: motionSectionRef.current,
                  start: "top top",
                  end: "+=200%",
                  scrub: 1.5,
                },
              },
            );
          }
        }

        /* ═══ PHASE 3: DESTILLIERT ═══ */
        if (destilSectionRef.current && destilWordRef.current) {
          /* Pin */
          ScrollTrigger.create({
            trigger: destilSectionRef.current,
            start: "top top",
            end: "+=250%",
            pin: true,
            pinSpacing: true,
          });

          /* Orange flood from bottom */
          if (destilBgRef.current) {
            gsap.fromTo(
              destilBgRef.current,
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: "power4.inOut",
                scrollTrigger: {
                  trigger: destilSectionRef.current,
                  start: "top 60%",
                  end: "top top",
                  scrub: 1.5,
                },
              },
            );
          }

          /* DESTILLIERT. entrance: scale up from small */
          const destilSplit = new SplitType(destilWordRef.current, {
            types: "chars",
          });
          gsap.from(destilSplit.chars || [], {
            scale: 0.2,
            opacity: 0,
            y: 60,
            stagger: 0.06,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: destilSectionRef.current,
              start: "top 15%",
              toggleActions: "play none none reverse",
            },
          });

          /* Subtitle fade in */
          if (destilSubRef.current) {
            gsap.from(destilSubRef.current, {
              opacity: 0,
              y: 30,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: destilSectionRef.current,
                start: "top 5%",
                toggleActions: "play none none reverse",
              },
            });
          }

          /* Brand reveal */
          if (destilBrandRef.current) {
            gsap.from(destilBrandRef.current, {
              opacity: 0,
              y: 40,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: destilSectionRef.current,
                start: "top -10%",
                toggleActions: "play none none reverse",
              },
            });
          }
        }
      });

      /* ─── Mobile: Simplified animations ─── */
      mm.add("(max-width: 767px)", () => {
        /* Simple fade-in for all sections */
        const sections = [
          typoWordRef.current,
          typoSubRef.current,
          motionWordRef.current,
          destilWordRef.current,
          destilSubRef.current,
        ].filter(Boolean);

        sections.forEach((el) => {
          gsap.from(el!, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el!,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });

        /* Orange BG on mobile */
        if (destilBgRef.current) {
          gsap.fromTo(
            destilBgRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              scrollTrigger: {
                trigger: destilSectionRef.current,
                start: "top 80%",
                end: "top 20%",
                scrub: 1,
              },
            },
          );
        }
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  /* ═══════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════ */
  return (
    <>
      {/* Fontshare — ALWAYS <link>, never @import */}
      <link
        href="https://api.fontshare.com/v2/css?f[]=clash-display@300,400,500,600,700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://api.fontshare.com/v2/css?f[]=instrument-serif@400,400i&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://api.fontshare.com/v2/css?f[]=general-sans@300,400,500,600&display=swap"
        rel="stylesheet"
      />

      <div
        ref={containerRef}
        style={{
          background: DARK,
          color: LIGHT,
          fontFamily: "'General Sans', sans-serif",
          cursor: "none",
          overflowX: "hidden",
        }}
      >
        {/* ─── Custom Cursor ─── */}
        <div
          ref={cursorRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 40,
            height: 40,
            border: `2px solid ${ORANGE}`,
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 9999,
            mixBlendMode: "difference",
          }}
        />
        <div
          ref={cursorDotRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 8,
            height: 8,
            background: ORANGE,
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 9999,
          }}
        />

        {/* ─── Grain Overlay ─── */}
        <svg
          style={{
            position: "fixed",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 9998,
            opacity: 0.035,
          }}
        >
          <filter id="grain-006">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-006)" />
        </svg>

        {/* ═══════════════════════════════════════════════
            INTRO — Scramble Decode
            ═══════════════════════════════════════════════ */}
        <section
          ref={introRef}
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "clamp(2rem, 4vh, 3rem)",
              left: 0,
              right: 0,
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'General Sans', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 400,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: MUTED,
              }}
            >
              hero-v006-a
            </span>
          </div>

          <h1
            ref={introTextRef}
            style={{
              fontFamily: "'General Sans', sans-serif",
              fontSize: "clamp(1rem, 2.5vw, 1.8rem)",
              fontWeight: 300,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: MUTED,
              textAlign: "center",
              padding: "0 2rem",
              minHeight: "2em",
            }}
          />

          <div
            ref={introArrowRef}
            style={{
              position: "absolute",
              bottom: "clamp(2rem, 6vh, 4rem)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: MUTED,
              }}
            >
              Scroll
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={MUTED}
              strokeWidth="1.5"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            PHASE 1: TYPOGRAFIE
            Massive Clash Display, character spread + weight wave
            ═══════════════════════════════════════════════ */}
        <section
          ref={typoSectionRef}
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Phase label */}
          <div
            style={{
              position: "absolute",
              top: "clamp(2rem, 4vh, 3rem)",
              left: "clamp(1.5rem, 4vw, 3rem)",
            }}
          >
            <span
              style={{
                fontFamily: "'General Sans', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: ORANGE,
              }}
            >
              01 / 03
            </span>
          </div>

          <h2
            ref={typoWordRef}
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: "clamp(2.5rem, 16vw, 18rem)",
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              color: LIGHT,
              textAlign: "center",
              userSelect: "none",
            }}
          >
            TYPOGRAFIE
          </h2>
          <p
            ref={typoSubRef}
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontSize: "clamp(1.1rem, 2.8vw, 2.2rem)",
              color: ORANGE,
              marginTop: "clamp(1.5rem, 3vh, 3rem)",
              textAlign: "center",
              maxWidth: "550px",
              lineHeight: 1.4,
              padding: "0 1.5rem",
            }}
          >
            Worte die man fuehlt, nicht nur liest.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════
            PHASE 2: BEWEGUNG
            Easing curves visualization, motion comparison
            ═══════════════════════════════════════════════ */}
        <section
          ref={motionSectionRef}
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Phase label */}
          <div
            style={{
              position: "absolute",
              top: "clamp(2rem, 4vh, 3rem)",
              left: "clamp(1.5rem, 4vw, 3rem)",
            }}
          >
            <span
              style={{
                fontFamily: "'General Sans', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: ORANGE,
              }}
            >
              02 / 03
            </span>
          </div>

          <h2
            ref={motionWordRef}
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: "clamp(2.5rem, 14vw, 16rem)",
              fontWeight: 600,
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
              color: ORANGE,
              marginBottom: "clamp(1.5rem, 3vh, 3rem)",
              textAlign: "center",
              userSelect: "none",
            }}
          >
            BEWEGUNG
          </h2>

          <canvas
            ref={canvasRef}
            style={{
              width: "min(85vw, 700px)",
              height: "min(45vh, 400px)",
              display: "block",
            }}
          />

          <p
            ref={motionSubRef}
            style={{
              fontFamily: "'General Sans', sans-serif",
              fontSize: "clamp(1rem, 2vw, 1.5rem)",
              fontWeight: 300,
              color: LIGHT,
              marginTop: "clamp(1.5rem, 3vh, 2.5rem)",
              textAlign: "center",
              maxWidth: "650px",
              lineHeight: 1.6,
              padding: "0 1.5rem",
            }}
          >
            Der Unterschied zwischen einer Seite und einem Erlebnis.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════
            PHASE 3: DESTILLIERT
            Orange flood, brand reveal
            ═══════════════════════════════════════════════ */}
        <section
          ref={destilSectionRef}
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Phase label */}
          <div
            style={{
              position: "absolute",
              top: "clamp(2rem, 4vh, 3rem)",
              left: "clamp(1.5rem, 4vw, 3rem)",
              zIndex: 2,
            }}
          >
            <span
              style={{
                fontFamily: "'General Sans', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: DARK,
              }}
            >
              03 / 03
            </span>
          </div>

          {/* Orange background fill */}
          <div
            ref={destilBgRef}
            style={{
              position: "absolute",
              inset: 0,
              background: ORANGE,
              transformOrigin: "bottom center",
              transform: "scaleY(0)",
              zIndex: 0,
            }}
          />

          {/* Content */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2
              ref={destilWordRef}
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontSize: "clamp(3rem, 14vw, 15rem)",
                fontWeight: 400,
                lineHeight: 0.9,
                color: DARK,
                userSelect: "none",
              }}
            >
              Destilliert.
            </h2>

            <p
              ref={destilSubRef}
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: "clamp(0.9rem, 1.8vw, 1.3rem)",
                fontWeight: 500,
                color: DARK,
                marginTop: "clamp(1.5rem, 3vh, 2.5rem)",
                letterSpacing: "0.08em",
                opacity: 0.7,
              }}
            >
              Weniger. Aber besser.
            </p>

            <div
              ref={destilBrandRef}
              style={{
                marginTop: "clamp(3rem, 6vh, 5rem)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span
                style={{
                  fontFamily: "'General Sans', sans-serif",
                  fontSize: "clamp(0.6rem, 1vw, 0.8rem)",
                  fontWeight: 400,
                  color: DARK,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  opacity: 0.5,
                }}
              >
                PixIntCreators
              </span>
              <span
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: "italic",
                  fontSize: "clamp(1rem, 2.2vw, 1.8rem)",
                  color: DARK,
                }}
              >
                Wir machen das eine Prozent.
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
