"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   hero-v011-a: FLOW — Der kreative Faden

   ERSTER Hero mit DURCHGEHENDEM, LEBENDIGEM Element.
   Ein fliessender Partikelstrom der durch die gesamte Seite
   fliesst, sich verwandelt, auf Maus reagiert, Content verbindet.

   Chris-Feedback (UID 11): "die ganze Zeit irgendein Element
   sich mitbewegt — DAS macht Awwwards-Sites aus"

   Innovation:
   - Fixed Canvas mit fliessender Partikel-Linie
   - Form morpht mit Scroll (Sinus → komplex → konvergent)
   - Partikel fliessen IMMER (auch ohne Scrollen)
   - Maus biegt den Strom (Gummiband-Effekt)
   - Text erscheint MIT dem Strom (nicht separat)

   Choreografie:
   ORIGIN  (0-15%)  — Punkt → fliessende Linie entsteht
   FORM    (15-35%) — Sanfte Welle, Worte erscheinen
   ENERGIE (35-60%) — Wilde Oszillation, Peak-Intensitaet
   FOKUS   (60-80%) — Konvergenz, Klarheit
   BRAND   (80-100%) — Horizontaler Strom, Brand Reveal
   ═══════════════════════════════════════════════════════════ */

const ORANGE = "#FF6B00";
const DARK = "#0A0A0A";
const PARTICLE_COUNT = 300;

/* ─── Stream Path ─── */

function getStreamPoints(
  scrollP: number,
  time: number
): { x: number; y: number }[] {
  const NUM_POINTS = 16;
  const points: { x: number; y: number }[] = [];

  // Emergence: dot → line in first 15%
  const emergence = Math.min(1, scrollP / 0.15);

  // Amplitude envelope — controls wave height
  let amplitude: number;
  if (scrollP < 0.15) {
    amplitude = (scrollP / 0.15) * 0.06;
  } else if (scrollP < 0.35) {
    amplitude = 0.06 + ((scrollP - 0.15) / 0.2) * 0.14;
  } else if (scrollP < 0.6) {
    amplitude = 0.2 + ((scrollP - 0.35) / 0.25) * 0.15;
  } else if (scrollP < 0.8) {
    amplitude = 0.35 - ((scrollP - 0.6) / 0.2) * 0.25;
  } else {
    amplitude = 0.1 - ((scrollP - 0.8) / 0.2) * 0.07;
  }

  // Frequency: rises then settles
  const frequency =
    scrollP < 0.6 ? 1 + scrollP * 3.5 : 3.1 - (scrollP - 0.6) * 2.5;

  // Phase: continuous rotation + time for life
  const phase = scrollP * Math.PI * 6 + time * 0.4;

  // Center Y: subtle drift
  const centerY = 0.5 + Math.sin(scrollP * Math.PI * 2) * 0.04;

  for (let i = 0; i <= NUM_POINTS; i++) {
    const t = i / NUM_POINTS;
    const x = t * 1.2 - 0.1;

    const wave1 = Math.sin(t * Math.PI * frequency + phase);
    const wave2 =
      Math.sin(t * Math.PI * frequency * 1.7 + phase * 1.3) * 0.3;
    const breath = Math.sin(time * 0.25 + t * Math.PI * 2) * 0.008;

    const y = centerY + amplitude * (wave1 + wave2) * emergence + breath;
    points.push({ x, y });
  }

  return points;
}

/* ─── Catmull-Rom interpolation ─── */

function getPointOnPath(
  points: { x: number; y: number }[],
  t: number
): { x: number; y: number; nx: number; ny: number } {
  t = Math.max(0, Math.min(1, t));
  const segCount = points.length - 1;
  const seg = t * segCount;
  const i = Math.min(Math.floor(seg), segCount - 1);
  const frac = seg - i;

  const p0 = points[Math.max(0, i - 1)];
  const p1 = points[i];
  const p2 = points[Math.min(points.length - 1, i + 1)];
  const p3 = points[Math.min(points.length - 1, i + 2)];

  const tt = frac;
  const tt2 = tt * tt;
  const tt3 = tt2 * tt;

  const x =
    0.5 *
    (2 * p1.x +
      (-p0.x + p2.x) * tt +
      (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * tt2 +
      (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * tt3);
  const y =
    0.5 *
    (2 * p1.y +
      (-p0.y + p2.y) * tt +
      (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * tt2 +
      (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * tt3);

  // Tangent
  const dx =
    0.5 *
    (-p0.x +
      p2.x +
      (4 * p0.x - 10 * p1.x + 8 * p2.x - 2 * p3.x) * tt +
      (-3 * p0.x + 9 * p1.x - 9 * p2.x + 3 * p3.x) * tt2);
  const dy =
    0.5 *
    (-p0.y +
      p2.y +
      (4 * p0.y - 10 * p1.y + 8 * p2.y - 2 * p3.y) * tt +
      (-3 * p0.y + 9 * p1.y - 9 * p2.y + 3 * p3.y) * tt2);

  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  return { x, y, nx: -dy / len, ny: dx / len };
}

/* ─── Particle type ─── */

interface StreamParticle {
  t: number;
  speed: number;
  offset: number;
  size: number;
  baseAlpha: number;
  hueShift: number; // color variation
}

/* ─── Component ─── */

export default function FlowHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollPRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const particlesRef = useRef<StreamParticle[]>([]);
  const frameRef = useRef(0);
  const timeRef = useRef(0);
  const dprRef = useRef(1);

  // Section refs for text animations
  const s1Ref = useRef<HTMLElement>(null);
  const s2Ref = useRef<HTMLElement>(null);
  const s3Ref = useRef<HTMLElement>(null);
  const s4Ref = useRef<HTMLElement>(null);
  const s5Ref = useRef<HTMLElement>(null);

  // Init particles
  const initParticles = useCallback(() => {
    const ps: StreamParticle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      ps.push({
        t: Math.random(),
        speed: 0.0004 + Math.random() * 0.0012,
        offset: (Math.random() - 0.5) * 2,
        size: 0.8 + Math.random() * 2.5,
        baseAlpha: 0.2 + Math.random() * 0.8,
        hueShift: Math.random() * 30 - 15,
      });
    }
    particlesRef.current = ps;
  }, []);

  // Canvas animation loop
  useEffect(() => {
    initParticles();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", onMouse);

    // Touch support
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = {
          x: e.touches[0].clientX / window.innerWidth,
          y: e.touches[0].clientY / window.innerHeight,
        };
      }
    };
    window.addEventListener("touchmove", onTouch, { passive: true });

    let running = true;
    let lastTime = performance.now();

    const animate = (now: number) => {
      if (!running) return;

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      timeRef.current += dt;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      const dp = dprRef.current;
      const w = canvas.width;
      const h = canvas.height;
      const time = timeRef.current;
      const scrollP = scrollPRef.current;
      const mouse = mouseRef.current;

      // Clear with subtle trail (motion blur)
      ctx.fillStyle = "rgba(10, 10, 10, 0.15)";
      ctx.fillRect(0, 0, w, h);

      // Get stream path
      const pathPoints = getStreamPoints(scrollP, time);

      // Mouse displacement on path control points
      for (const p of pathPoints) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 0.18) {
          const force = (1 - dist / 0.18) * 0.1;
          p.x += dx * force;
          p.y += dy * force;
        }
      }

      // Stream width varies with scroll
      let streamWidth: number;
      if (scrollP < 0.15) {
        streamWidth = (scrollP / 0.15) * 20;
      } else if (scrollP < 0.5) {
        streamWidth = 20 + ((scrollP - 0.15) / 0.35) * 50;
      } else if (scrollP < 0.8) {
        streamWidth = 70 - ((scrollP - 0.5) / 0.3) * 30;
      } else {
        streamWidth = 40;
      }

      // ─── Draw glow layers ───
      const glowLayers = [
        { w: streamWidth * 2.5, a: 0.015 },
        { w: streamWidth * 1.5, a: 0.03 },
        { w: streamWidth * 0.8, a: 0.06 },
        { w: streamWidth * 0.3, a: 0.12 },
        { w: Math.max(1, streamWidth * 0.08), a: 0.35 },
      ];

      for (const layer of glowLayers) {
        ctx.beginPath();
        ctx.lineWidth = layer.w * dp;
        ctx.strokeStyle = `rgba(255, 107, 0, ${layer.a})`;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        const first = pathPoints[0];
        ctx.moveTo(first.x * w, first.y * h);

        for (let i = 1; i < pathPoints.length - 1; i++) {
          const curr = pathPoints[i];
          const next = pathPoints[i + 1];
          ctx.quadraticCurveTo(
            curr.x * w,
            curr.y * h,
            ((curr.x + next.x) / 2) * w,
            ((curr.y + next.y) / 2) * h
          );
        }
        const last = pathPoints[pathPoints.length - 1];
        ctx.lineTo(last.x * w, last.y * h);
        ctx.stroke();
      }

      // ─── Draw second stream (branching) in energy phase ───
      if (scrollP > 0.3 && scrollP < 0.75) {
        const branchIntensity = scrollP < 0.5
          ? (scrollP - 0.3) / 0.2
          : 1 - (scrollP - 0.5) / 0.25;
        const branchAlpha = branchIntensity * 0.4;

        const branch2 = getStreamPoints(scrollP, time + 1.5);
        for (const p of branch2) {
          p.y += 0.08 * branchIntensity;
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 0.18) {
            const force = (1 - dist / 0.18) * 0.08;
            p.x += dx * force;
            p.y += dy * force;
          }
        }

        ctx.beginPath();
        ctx.lineWidth = streamWidth * 0.4 * dp;
        ctx.strokeStyle = `rgba(255, 140, 50, ${branchAlpha * 0.08})`;
        ctx.lineCap = "round";
        const f = branch2[0];
        ctx.moveTo(f.x * w, f.y * h);
        for (let i = 1; i < branch2.length - 1; i++) {
          const curr = branch2[i];
          const next = branch2[i + 1];
          ctx.quadraticCurveTo(
            curr.x * w,
            curr.y * h,
            ((curr.x + next.x) / 2) * w,
            ((curr.y + next.y) / 2) * h
          );
        }
        const l2 = branch2[branch2.length - 1];
        ctx.lineTo(l2.x * w, l2.y * h);
        ctx.stroke();
      }

      // ─── Particles ───
      const particles = particlesRef.current;
      const activeCount = Math.floor(
        scrollP < 0.08
          ? (scrollP / 0.08) * 60
          : scrollP < 0.5
            ? 60 + ((scrollP - 0.08) / 0.42) * 240
            : PARTICLE_COUNT
      );

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Always flow
        p.t += p.speed * (1 + scrollP * 0.5);
        if (p.t > 1) p.t -= 1;

        if (i >= activeCount) continue;

        const pos = getPointOnPath(pathPoints, p.t);
        const spread = streamWidth * 0.015;
        let px = (pos.x + pos.nx * p.offset * spread) * w;
        let py = (pos.y + pos.ny * p.offset * spread) * h;

        // Mouse repulsion
        const mpx = mouse.x * w;
        const mpy = mouse.y * h;
        const mdx = px - mpx;
        const mdy = py - mpy;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        const mRadius = 120 * dp;
        if (mDist < mRadius && mDist > 0) {
          const mForce = ((1 - mDist / mRadius) * 25 * dp);
          px += (mdx / mDist) * mForce;
          py += (mdy / mDist) * mForce;
        }

        // Alpha with pulse
        const pulse = 0.5 + 0.5 * Math.sin(time * 2.5 + p.t * Math.PI * 6);
        const alpha = p.baseAlpha * (0.5 + 0.5 * pulse);

        // Color variation: orange → warm amber → near-white
        const r = Math.min(255, 255 + p.hueShift * 0.5);
        const g = Math.min(255, Math.max(60, 107 + p.hueShift * 2));
        const b = Math.max(0, 0 + p.hueShift);

        ctx.beginPath();
        ctx.arc(px, py, p.size * dp, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();

        // Hot core for bright particles
        if (p.size > 2 && p.baseAlpha > 0.6) {
          ctx.beginPath();
          ctx.arc(px, py, p.size * 0.35 * dp, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 220, 180, ${alpha * 0.4})`;
          ctx.fill();
        }
      }

      // ─── Cursor glow ───
      const cursorGlow = ctx.createRadialGradient(
        mouse.x * w,
        mouse.y * h,
        0,
        mouse.x * w,
        mouse.y * h,
        80 * dp
      );
      cursorGlow.addColorStop(0, "rgba(255, 107, 0, 0.06)");
      cursorGlow.addColorStop(1, "rgba(255, 107, 0, 0)");
      ctx.fillStyle = cursorGlow;
      ctx.fillRect(0, 0, w, h);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      running = false;
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [initParticles]);

  // ─── GSAP Scroll + Text Animations ───
  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Master scroll progress
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          scrollPRef.current = self.progress;
        },
      });

      // Section 1: ALLES FLIESST
      if (s1Ref.current) {
        const h1 = s1Ref.current.querySelector("h1");
        if (h1) {
          gsap.from(h1.children, {
            opacity: 0,
            y: 80,
            stagger: 0.15,
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: {
              trigger: s1Ref.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        }
      }

      // Section 2: Form. Raum. Rhythmus.
      if (s2Ref.current) {
        const lines = s2Ref.current.querySelectorAll(".flow-line");
        gsap.from(lines, {
          opacity: 0,
          x: -60,
          stagger: 0.2,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: s2Ref.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Section 3: Jede Idee hat ENERGIE
      if (s3Ref.current) {
        gsap.from(s3Ref.current.querySelector("h2"), {
          opacity: 0,
          scale: 0.85,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: s3Ref.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Section 4: Wir destillieren
      if (s4Ref.current) {
        const lines = s4Ref.current.querySelectorAll(".flow-line");
        gsap.from(lines, {
          opacity: 0,
          x: 60,
          stagger: 0.2,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: s4Ref.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Section 5: Brand reveal
      if (s5Ref.current) {
        const brand = s5Ref.current.querySelector(".brand-text");
        const tag = s5Ref.current.querySelector(".tagline");
        if (brand) {
          gsap.from(brand.children, {
            opacity: 0,
            y: 100,
            stagger: 0.12,
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: s5Ref.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          });
        }
        if (tag) {
          gsap.from(tag, {
            opacity: 0,
            y: 30,
            duration: 1.2,
            delay: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: s5Ref.current,
              start: "top 50%",
              toggleActions: "play none none reverse",
            },
          });
        }
      }
    },
    { scope: containerRef }
  );

  /* ─── Render ─── */
  return (
    <>
      {/* Font imports */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://api.fontshare.com/v2/css?f[]=clash-display@700,600&f[]=instrument-serif@400,400-italic&display=swap"
        rel="stylesheet"
      />

      <div
        ref={containerRef}
        style={{
          minHeight: "600vh",
          background: DARK,
          color: "#fff",
          position: "relative",
          overflowX: "hidden",
          cursor: "none",
        }}
      >
        {/* Fixed canvas stream */}
        <canvas
          ref={canvasRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Custom cursor */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: 200,
            mixBlendMode: "difference",
          }}
        >
          <div
            className="cursor-dot"
            style={{
              position: "absolute",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#fff",
              transform: "translate(-50%, -50%)",
              transition: "transform 0.1s ease-out",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Grain */}
        <svg
          style={{
            position: "fixed",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 100,
            pointerEvents: "none",
            opacity: 0.035,
          }}
        >
          <filter id="grain011">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain011)" />
        </svg>

        {/* Vignette */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 3,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* ═══ SECTION 1: ORIGIN ═══ */}
        <section
          ref={s1Ref}
          style={{
            height: "130vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 5,
          }}
        >
          <h1
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: "clamp(3.5rem, 11vw, 9rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
              textAlign: "center",
              mixBlendMode: "difference",
            }}
          >
            <span style={{ display: "block" }}>ALLES</span>
            <span
              style={{
                display: "block",
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: ORANGE,
                mixBlendMode: "normal",
              }}
            >
              fliesst.
            </span>
          </h1>
        </section>

        {/* ═══ SECTION 2: FORM ═══ */}
        <section
          ref={s2Ref}
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            padding: "0 8vw",
            position: "relative",
            zIndex: 5,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 600,
                lineHeight: 1.3,
              }}
            >
              <span className="flow-line" style={{ display: "block" }}>
                Form.
              </span>
              <span className="flow-line" style={{ display: "block" }}>
                Raum.
              </span>
              <span
                className="flow-line"
                style={{ display: "block", color: ORANGE }}
              >
                Rhythmus.
              </span>
            </p>
            <p
              className="flow-line"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontSize: "clamp(1rem, 2vw, 1.5rem)",
                opacity: 0.5,
                marginTop: "1.5rem",
                maxWidth: "400px",
              }}
            >
              Jedes Erlebnis beginnt mit Struktur — unsichtbar, aber
              unverzichtbar.
            </p>
          </div>
        </section>

        {/* ═══ SECTION 3: ENERGIE ═══ */}
        <section
          ref={s3Ref}
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 5,
          }}
        >
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              fontWeight: 400,
              textAlign: "center",
              maxWidth: "800px",
              lineHeight: 1.15,
              mixBlendMode: "difference",
            }}
          >
            Jede Idee hat
            <br />
            <span
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontWeight: 700,
                fontStyle: "normal",
                color: ORANGE,
                mixBlendMode: "normal",
              }}
            >
              ENERGIE.
            </span>
          </h2>
        </section>

        {/* ═══ SECTION 4: FOKUS ═══ */}
        <section
          ref={s4Ref}
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 8vw",
            position: "relative",
            zIndex: 5,
          }}
        >
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 600,
                lineHeight: 1.3,
              }}
            >
              <span className="flow-line" style={{ display: "block" }}>
                Wir destillieren
              </span>
              <span className="flow-line" style={{ display: "block" }}>
                Chaos in
              </span>
              <span
                className="flow-line"
                style={{ display: "block", color: ORANGE }}
              >
                Klarheit.
              </span>
            </p>
            <p
              className="flow-line"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontSize: "clamp(1rem, 2vw, 1.5rem)",
                opacity: 0.5,
                marginTop: "1.5rem",
                maxWidth: "400px",
                marginLeft: "auto",
              }}
            >
              Wenn alles zusammenfliesst, entsteht etwas das bleibt.
            </p>
          </div>
        </section>

        {/* ═══ SECTION 5: BRAND ═══ */}
        <section
          ref={s5Ref}
          style={{
            height: "170vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 5,
          }}
        >
          <div className="brand-text">
            <h2
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: "clamp(3rem, 10vw, 8rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
                textAlign: "center",
              }}
            >
              <span style={{ display: "block" }}>PIXINT</span>
              <span style={{ display: "block", color: ORANGE }}>CREATORS</span>
            </h2>
          </div>
          <p
            className="tagline"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
              marginTop: "2.5rem",
              opacity: 0.6,
            }}
          >
            Webdesign das fliesst.
          </p>
          <a
            href="#"
            style={{
              marginTop: "3rem",
              fontFamily: "'Clash Display', sans-serif",
              fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: DARK,
              background: ORANGE,
              padding: "1rem 2.5rem",
              borderRadius: 0,
              textDecoration: "none",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.transform = "scale(1.05)";
              (e.target as HTMLElement).style.boxShadow = `0 0 40px ${ORANGE}66`;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = "scale(1)";
              (e.target as HTMLElement).style.boxShadow = "none";
            }}
          >
            Erlebe es selbst
          </a>
        </section>
      </div>

      {/* Cursor follower script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var dot = document.querySelector('.cursor-dot');
              if (!dot) return;
              var mx = 0, my = 0;
              document.addEventListener('mousemove', function(e) {
                mx = e.clientX; my = e.clientY;
              });
              function update() {
                dot.style.left = mx + 'px';
                dot.style.top = my + 'px';
                requestAnimationFrame(update);
              }
              update();

              // Hide on mobile
              if ('ontouchstart' in window) {
                dot.style.display = 'none';
                document.body.style.cursor = 'auto';
              }
            })();
          `,
        }}
      />
    </>
  );
}
