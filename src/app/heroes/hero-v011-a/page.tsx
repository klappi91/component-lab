"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   hero-v011-a v3: PIXEL FLOW — Der digitale Strom

   Chris-Feedback (UID 23): "ist zu pixelig"
   → PIXEL_SCALE von 5 auf 2 reduziert: subtiler Digital-Look
     statt grober Pixel-Aesthetik. Partikel etwas groesser
     in absoluten Pixeln, aber weniger blocky.

   Choreografie (unveraendert):
   ORIGIN  (0-15%)  — Pixel-Punkt → vertikaler Strom entsteht
   FORM    (15-35%) — Sanfte Welle, Worte erscheinen
   ENERGIE (35-60%) — Wilde Oszillation, Peak-Intensitaet
   FOKUS   (60-80%) — Konvergenz, Klarheit
   BRAND   (80-100%) — Vertikaler Strom, Brand Reveal
   ═══════════════════════════════════════════════════════════ */

const ORANGE = "#FF6B00";
const DARK = "#0A0A0A";
const PARTICLE_COUNT = 350;
const PIXEL_SCALE = 2; // 1/2 resolution → subtle digital texture (v3: was 5, Chris: "zu pixelig")

/* ─── Vertical Stream Path ─── */

function getStreamPoints(
  scrollP: number,
  time: number
): { x: number; y: number }[] {
  const NUM_POINTS = 20;
  const points: { x: number; y: number }[] = [];

  // Emergence: dot → line in first 15%
  const emergence = Math.min(1, scrollP / 0.15);

  // Amplitude envelope (horizontal oscillation)
  let amplitude: number;
  if (scrollP < 0.15) {
    amplitude = (scrollP / 0.15) * 0.04;
  } else if (scrollP < 0.35) {
    amplitude = 0.04 + ((scrollP - 0.15) / 0.2) * 0.1;
  } else if (scrollP < 0.6) {
    amplitude = 0.14 + ((scrollP - 0.35) / 0.25) * 0.12;
  } else if (scrollP < 0.8) {
    amplitude = 0.26 - ((scrollP - 0.6) / 0.2) * 0.16;
  } else {
    amplitude = 0.1 - ((scrollP - 0.8) / 0.2) * 0.05;
  }

  // Frequency: rises then settles
  const frequency =
    scrollP < 0.6 ? 1.5 + scrollP * 3 : 3.3 - (scrollP - 0.6) * 2;

  // Phase: continuous rotation + time for life
  const phase = scrollP * Math.PI * 5 + time * 0.35;

  // Center X: subtle drift
  const centerX = 0.5 + Math.sin(scrollP * Math.PI * 2) * 0.03;

  for (let i = 0; i <= NUM_POINTS; i++) {
    const t = i / NUM_POINTS;
    // Y goes top to bottom (vertical flow)
    const y = t * 1.3 - 0.15;

    const wave1 = Math.sin(t * Math.PI * frequency + phase);
    const wave2 =
      Math.sin(t * Math.PI * frequency * 1.7 + phase * 1.3) * 0.3;
    const breath = Math.sin(time * 0.25 + t * Math.PI * 2) * 0.006;

    // X oscillates horizontally
    const x = centerX + amplitude * (wave1 + wave2) * emergence + breath;
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

  // Tangent for normal calculation
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

/* ─── Pixel-snap helper ─── */
function pixSnap(v: number, grid: number): number {
  return Math.round(v / grid) * grid;
}

/* ─── Particle type ─── */

interface StreamParticle {
  t: number;
  speed: number;
  offset: number;
  size: number; // in low-res pixels
  baseAlpha: number;
  hueShift: number;
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

  // Offscreen canvas for pixel rendering
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);

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
        speed: 0.0005 + Math.random() * 0.0015,
        offset: (Math.random() - 0.5) * 2,
        size: 2 + Math.floor(Math.random() * 4), // 2-5 low-res pixels (scaled for PIXEL_SCALE=2)
        baseAlpha: 0.25 + Math.random() * 0.75,
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

    // Create offscreen canvas
    const offscreen = document.createElement("canvas");
    offscreenRef.current = offscreen;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Main canvas at full resolution
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      // Offscreen at 1/PIXEL_SCALE (low-res for pixel effect)
      offscreen.width = Math.ceil(w / PIXEL_SCALE);
      offscreen.height = Math.ceil(h / PIXEL_SCALE);
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

      const offCtx = offscreen.getContext("2d");
      const mainCtx = canvas.getContext("2d");
      if (!offCtx || !mainCtx) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      const ow = offscreen.width;
      const oh = offscreen.height;
      const time = timeRef.current;
      const scrollP = scrollPRef.current;
      const mouse = mouseRef.current;

      // ─── Draw to LOW-RES offscreen canvas ───

      // Motion trail: semi-transparent clear
      offCtx.fillStyle = "rgba(10, 10, 10, 0.18)";
      offCtx.fillRect(0, 0, ow, oh);

      // Get vertical stream path
      const pathPoints = getStreamPoints(scrollP, time);

      // Mouse displacement on path control points
      for (const p of pathPoints) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 0.2) {
          const force = (1 - dist / 0.2) * 0.12;
          p.x += dx * force;
          p.y += dy * force;
        }
      }

      // Stream width (in low-res pixels, scaled for PIXEL_SCALE=2)
      let streamWidth: number;
      if (scrollP < 0.15) {
        streamWidth = (scrollP / 0.15) * 10;
      } else if (scrollP < 0.5) {
        streamWidth = 10 + ((scrollP - 0.15) / 0.35) * 20;
      } else if (scrollP < 0.8) {
        streamWidth = 30 - ((scrollP - 0.5) / 0.3) * 13;
      } else {
        streamWidth = 17;
      }

      // ─── Draw pixelated glow layers ───
      // Use rectangles for pixel aesthetic
      const glowLayers = [
        { w: streamWidth * 3, a: 0.02 },
        { w: streamWidth * 1.8, a: 0.04 },
        { w: streamWidth * 1, a: 0.08 },
        { w: streamWidth * 0.5, a: 0.18 },
        { w: Math.max(1, streamWidth * 0.15), a: 0.5 },
      ];

      for (const layer of glowLayers) {
        offCtx.lineWidth = Math.max(1, Math.round(layer.w));
        offCtx.strokeStyle = `rgba(255, 107, 0, ${layer.a})`;
        offCtx.lineCap = "square";
        offCtx.lineJoin = "miter";

        offCtx.beginPath();
        const first = pathPoints[0];
        offCtx.moveTo(pixSnap(first.x * ow, 1), pixSnap(first.y * oh, 1));

        for (let i = 1; i < pathPoints.length; i++) {
          const curr = pathPoints[i];
          offCtx.lineTo(
            pixSnap(curr.x * ow, 1),
            pixSnap(curr.y * oh, 1)
          );
        }
        offCtx.stroke();
      }

      // ─── Branching stream in energy phase ───
      if (scrollP > 0.3 && scrollP < 0.75) {
        const branchIntensity =
          scrollP < 0.5
            ? (scrollP - 0.3) / 0.2
            : 1 - (scrollP - 0.5) / 0.25;
        const branchAlpha = branchIntensity * 0.3;

        const branch2 = getStreamPoints(scrollP, time + 1.5);
        for (const p of branch2) {
          // Offset horizontally for branch
          p.x += 0.08 * branchIntensity;
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 0.2) {
            const force = (1 - dist / 0.2) * 0.08;
            p.x += dx * force;
            p.y += dy * force;
          }
        }

        offCtx.lineWidth = Math.max(1, Math.round(streamWidth * 0.5));
        offCtx.strokeStyle = `rgba(255, 140, 50, ${branchAlpha * 0.12})`;
        offCtx.lineCap = "square";

        offCtx.beginPath();
        const f = branch2[0];
        offCtx.moveTo(pixSnap(f.x * ow, 1), pixSnap(f.y * oh, 1));
        for (let i = 1; i < branch2.length; i++) {
          const curr = branch2[i];
          offCtx.lineTo(
            pixSnap(curr.x * ow, 1),
            pixSnap(curr.y * oh, 1)
          );
        }
        offCtx.stroke();

        // Second branch (opposite side)
        const branch3 = getStreamPoints(scrollP, time + 3.0);
        for (const p of branch3) {
          p.x -= 0.06 * branchIntensity;
        }

        offCtx.lineWidth = Math.max(1, Math.round(streamWidth * 0.3));
        offCtx.strokeStyle = `rgba(255, 160, 80, ${branchAlpha * 0.08})`;
        offCtx.beginPath();
        const f3 = branch3[0];
        offCtx.moveTo(pixSnap(f3.x * ow, 1), pixSnap(f3.y * oh, 1));
        for (let i = 1; i < branch3.length; i++) {
          const curr = branch3[i];
          offCtx.lineTo(
            pixSnap(curr.x * ow, 1),
            pixSnap(curr.y * oh, 1)
          );
        }
        offCtx.stroke();
      }

      // ─── Pixel Particles ───
      const particles = particlesRef.current;
      const activeCount = Math.floor(
        scrollP < 0.08
          ? (scrollP / 0.08) * 80
          : scrollP < 0.5
            ? 80 + ((scrollP - 0.08) / 0.42) * 270
            : PARTICLE_COUNT
      );

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Always flow (downward)
        p.t += p.speed * (1 + scrollP * 0.6);
        if (p.t > 1) p.t -= 1;

        if (i >= activeCount) continue;

        const pos = getPointOnPath(pathPoints, p.t);
        const spread = streamWidth * 0.12;
        const px = pixSnap((pos.x + pos.nx * p.offset * spread) * ow, 1);
        const py = pixSnap((pos.y + pos.ny * p.offset * spread) * oh, 1);

        // Mouse repulsion
        const mpx = mouse.x * ow;
        const mpy = mouse.y * oh;
        const mdx = px - mpx;
        const mdy = py - mpy;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        const mRadius = 60; // in low-res pixels (scaled for PIXEL_SCALE=2)
        let finalX = px;
        let finalY = py;
        if (mDist < mRadius && mDist > 0) {
          const mForce = (1 - mDist / mRadius) * 12;
          finalX = pixSnap(px + (mdx / mDist) * mForce, 1);
          finalY = pixSnap(py + (mdy / mDist) * mForce, 1);
        }

        // Alpha with pulse
        const pulse =
          0.5 + 0.5 * Math.sin(time * 2.5 + p.t * Math.PI * 6);
        const alpha = p.baseAlpha * (0.5 + 0.5 * pulse);

        // Color variation: orange → warm amber
        const r = Math.min(255, 255 + p.hueShift * 0.5);
        const g = Math.min(255, Math.max(60, 107 + p.hueShift * 2));
        const b = Math.max(0, 0 + p.hueShift);

        // SQUARE particles (pixel aesthetic)
        offCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        offCtx.fillRect(finalX, finalY, p.size, p.size);

        // Hot core for bright particles
        if (p.size >= 2 && p.baseAlpha > 0.6) {
          offCtx.fillStyle = `rgba(255, 220, 180, ${alpha * 0.5})`;
          offCtx.fillRect(finalX, finalY, 1, 1);
        }
      }

      // ─── Scattered ambient pixels (atmosphere) ───
      const ambientCount = Math.floor(scrollP * 30);
      for (let i = 0; i < ambientCount; i++) {
        const seed = i * 7919 + Math.floor(time * 0.5);
        const ax = pixSnap(((Math.sin(seed) * 0.5 + 0.5) * 0.8 + 0.1) * ow, 1);
        const ay = pixSnap(
          ((Math.cos(seed * 1.3) * 0.5 + 0.5) * 0.8 + 0.1) * oh,
          1
        );
        const aa =
          (0.03 + Math.sin(time * 1.5 + i) * 0.02) *
          Math.min(1, scrollP * 3);
        offCtx.fillStyle = `rgba(255, 107, 0, ${aa})`;
        offCtx.fillRect(ax, ay, 1, 1);
      }

      // ─── Cursor glow (pixelated) ───
      const cursorLR_X = mouse.x * ow;
      const cursorLR_Y = mouse.y * oh;
      const glowRadius = 35; // low-res pixels (scaled for PIXEL_SCALE=2)
      for (let gy = -glowRadius; gy <= glowRadius; gy += 1) {
        for (let gx = -glowRadius; gx <= glowRadius; gx += 1) {
          const dist = Math.sqrt(gx * gx + gy * gy);
          if (dist > glowRadius) continue;
          const ga = (1 - dist / glowRadius) * 0.04;
          if (ga < 0.005) continue;
          offCtx.fillStyle = `rgba(255, 107, 0, ${ga})`;
          offCtx.fillRect(
            pixSnap(cursorLR_X + gx, 1),
            pixSnap(cursorLR_Y + gy, 1),
            1,
            1
          );
        }
      }

      // ─── Upscale to main canvas with NEAREST NEIGHBOR ───
      mainCtx.imageSmoothingEnabled = false;
      mainCtx.clearRect(0, 0, canvas.width, canvas.height);
      mainCtx.drawImage(offscreen, 0, 0, canvas.width, canvas.height);

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
        {/* Fixed canvas — pixel stream */}
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
            imageRendering: "pixelated",
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
            opacity: 0.03,
          }}
        >
          <filter id="grain011v2">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain011v2)" />
        </svg>

        {/* Vignette */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 3,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)",
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
            <span style={{ display: "block" }}>PIXEL</span>
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
              flow.
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
                Vom Pixel
              </span>
              <span className="flow-line" style={{ display: "block" }}>
                zum
              </span>
              <span
                className="flow-line"
                style={{ display: "block", color: ORANGE }}
              >
                Erlebnis.
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
              Jedes digitale Erlebnis beginnt als einzelner Pixel — und wird
              zu etwas das man fuehlt.
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
              <span style={{ display: "block", color: ORANGE }}>
                CREATORS
              </span>
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
            Vom Pixel zum Erlebnis.
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

      {/* Cursor follower */}
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
