"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   hero-v009-a: MAGNETIC TYPE FIELD
   Physik-basiertes Wort-Feld — Mouse zieht Worte magnetisch an

   ERSTES Erlebnis mit PHYSIK-SIMULATION.
   30+ Worte schweben im Raum. Mouse = Magnet.
   Scroll transformiert Chaos → Ordnung → Brand.

   Signature Moments:
   1. Erste Mausbewegung — Worte RASEN zum Cursor
   2. Wort-Cluster die den Cursor umkreisen
   3. Chaos → Ordnung Transformation (Scroll)
   4. Brand Reveal: Alles formt PIXINT CREATORS

   Choreografie:
   - Phase 0 (0-15%):   CHAOS — Worte driften, Mouse zieht an
   - Phase 1 (15-45%):  GRAVITATION — Schwerkraft steigt, Worte sinken
   - Phase 2 (45-70%):  FORMATION — Worte ordnen sich zur Nachricht
   - Phase 3 (70-100%): BRAND — Nachricht loest sich, Brand formt sich
   ═══════════════════════════════════════════════════════════ */

/* ─── Brand ─── */
const ORANGE = "#FF6B00";
const DARK = "#050505";
const LIGHT = "#E8E8E8";
const DIM = "#444444";

/* ─── Word Pool ─── */
interface WordConfig {
  text: string;
  size: number; // vw
  weight: number;
  importance: number; // 0-1, affects color transition timing
}

const WORDS: WordConfig[] = [
  // Core brand
  { text: "PIXEL", size: 4.5, weight: 900, importance: 1 },
  { text: "DESIGN", size: 4, weight: 800, importance: 0.95 },
  { text: "CODE", size: 3.5, weight: 700, importance: 0.9 },
  { text: "MOTION", size: 3.8, weight: 800, importance: 0.85 },
  { text: "BRAND", size: 3.5, weight: 700, importance: 0.8 },
  // Craft words
  { text: "TYPOGRAFIE", size: 3, weight: 600, importance: 0.7 },
  { text: "ANIMATION", size: 2.8, weight: 600, importance: 0.65 },
  { text: "FARBE", size: 2.5, weight: 500, importance: 0.6 },
  { text: "LAYOUT", size: 2.5, weight: 500, importance: 0.55 },
  { text: "FLOW", size: 3, weight: 700, importance: 0.75 },
  { text: "RHYTHMUS", size: 2.5, weight: 500, importance: 0.5 },
  { text: "DETAIL", size: 2.2, weight: 400, importance: 0.45 },
  { text: "IMPACT", size: 3.2, weight: 800, importance: 0.8 },
  { text: "CRAFT", size: 2.8, weight: 600, importance: 0.6 },
  { text: "STORY", size: 2.8, weight: 600, importance: 0.65 },
  // Tech words
  { text: "REACT", size: 2, weight: 400, importance: 0.35 },
  { text: "WEBGL", size: 2, weight: 400, importance: 0.3 },
  { text: "GSAP", size: 2.2, weight: 500, importance: 0.4 },
  { text: "SHADER", size: 2, weight: 400, importance: 0.3 },
  { text: "CANVAS", size: 2, weight: 400, importance: 0.35 },
  { text: "SVG", size: 1.8, weight: 400, importance: 0.25 },
  { text: "CSS", size: 1.8, weight: 400, importance: 0.25 },
  // Feeling words
  { text: "WOW", size: 4, weight: 900, importance: 1 },
  { text: "BOLD", size: 2.8, weight: 700, importance: 0.7 },
  { text: "MUTIG", size: 3, weight: 700, importance: 0.75 },
  { text: "VISION", size: 2.5, weight: 500, importance: 0.5 },
  { text: "DIGITAL", size: 2.2, weight: 400, importance: 0.4 },
  { text: "KREATIV", size: 2.5, weight: 500, importance: 0.55 },
  { text: "1%", size: 5, weight: 900, importance: 1 },
  { text: "ERLEBNIS", size: 2.8, weight: 600, importance: 0.65 },
];

/* ─── Brand Formation Target ─── */
const BRAND_LINE_1 = "PIXINT";
const BRAND_LINE_2 = "CREATORS";

/* ─── Physics Entity ─── */
interface WordEntity {
  // State
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationV: number;
  // Properties
  mass: number;
  width: number;
  height: number;
  // Config
  config: WordConfig;
  // Target (for formation phase)
  targetX: number;
  targetY: number;
  // Visual
  opacity: number;
  scale: number;
  colorProgress: number; // 0 = dim, 1 = orange
}

/* ─── Helpers ─── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/* ─── Main Component ─── */
export default function HeroV009A() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLDivElement | null)[]>([]);
  const entitiesRef = useRef<WordEntity[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const scrollProgressRef = useRef(0);
  const rafRef = useRef(0);
  const frameRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  // Brand formation refs
  const brandLine1Ref = useRef<HTMLDivElement>(null);
  const brandLine2Ref = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  /* ─── Initialize entities ─── */
  const initEntities = useCallback(() => {
    if (!viewportRef.current) return;
    const vw = viewportRef.current.clientWidth;
    const vh = viewportRef.current.clientHeight;

    entitiesRef.current = WORDS.map((config, i) => {
      const el = wordRefs.current[i];
      const w = el?.offsetWidth || 100;
      const h = el?.offsetHeight || 40;

      return {
        x: rand(w / 2, vw - w / 2),
        y: rand(h / 2, vh - h / 2),
        vx: rand(-1.5, 1.5),
        vy: rand(-1.5, 1.5),
        rotation: rand(-15, 15),
        rotationV: rand(-0.5, 0.5),
        mass: config.size * 0.8,
        width: w,
        height: h,
        config,
        targetX: vw / 2,
        targetY: vh / 2,
        opacity: 0,
        scale: 1,
        colorProgress: 0,
      };
    });
  }, []);

  /* ─── Physics Step ─── */
  const physicsStep = useCallback(() => {
    const entities = entitiesRef.current;
    if (!entities.length || !viewportRef.current) return;

    const vw = viewportRef.current.clientWidth;
    const vh = viewportRef.current.clientHeight;
    const mouse = mouseRef.current;
    const progress = scrollProgressRef.current;
    const dt = 1; // fixed timestep

    // Phase parameters
    const isChaos = progress < 0.15;
    const isGravity = progress >= 0.15 && progress < 0.45;
    const isFormation = progress >= 0.45 && progress < 0.70;
    const isBrand = progress >= 0.70;

    // Magnetic strength varies by phase
    const magnetStrength = isChaos ? 800 : isGravity ? 400 : isFormation ? 100 : 0;
    const magnetRadius = isChaos ? 350 : isGravity ? 250 : 150;

    // Gravity
    const gravityY = isChaos ? 0.02 : isGravity ? 0.15 : 0;

    // Damping
    const damping = isChaos ? 0.985 : isGravity ? 0.97 : isFormation ? 0.92 : 0.9;

    // Formation spring strength
    const formationSpring = isFormation
      ? clamp((progress - 0.45) / 0.25, 0, 1) * 0.08
      : isBrand
        ? 0.12
        : 0;

    for (let i = 0; i < entities.length; i++) {
      const e = entities[i];
      let fx = 0;
      let fy = 0;

      // Mouse magnetic attraction (only when mouse is active)
      if (mouse.active && magnetStrength > 0) {
        const dx = mouse.x - e.x;
        const dy = mouse.y - e.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < magnetRadius && dist > 5) {
          const force = (magnetStrength * e.mass) / (dist * dist);
          fx += (dx / dist) * force;
          fy += (dy / dist) * force;
        }
      }

      // Gravity
      fy += gravityY * e.mass;

      // Formation: spring to target position
      if (formationSpring > 0) {
        const dx = e.targetX - e.x;
        const dy = e.targetY - e.y;
        fx += dx * formationSpring;
        fy += dy * formationSpring;
        // Reduce rotation during formation
        e.rotationV *= 0.9;
        e.rotation *= 0.95;
      }

      // Gentle random drift (chaos phase)
      if (isChaos) {
        fx += Math.sin(frameRef.current * 0.01 + i * 1.3) * 0.15;
        fy += Math.cos(frameRef.current * 0.013 + i * 0.9) * 0.1;
      }

      // Simple word-word repulsion (prevent overlap)
      for (let j = i + 1; j < entities.length; j++) {
        const o = entities[j];
        const dx = e.x - o.x;
        const dy = e.y - o.y;
        const minDist = (e.width + o.width) * 0.35;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist && dist > 1) {
          const force = ((minDist - dist) / dist) * 1.5;
          const nx = dx / dist;
          const ny = dy / dist;
          e.vx += nx * force;
          e.vy += ny * force;
          o.vx -= nx * force;
          o.vy -= ny * force;
        }
      }

      // Apply forces
      e.vx += fx * dt;
      e.vy += fy * dt;

      // Damping
      e.vx *= damping;
      e.vy *= damping;

      // Speed limit
      const speed = Math.sqrt(e.vx * e.vx + e.vy * e.vy);
      const maxSpeed = isChaos ? 8 : isGravity ? 6 : 4;
      if (speed > maxSpeed) {
        e.vx = (e.vx / speed) * maxSpeed;
        e.vy = (e.vy / speed) * maxSpeed;
      }

      // Integrate position
      e.x += e.vx * dt;
      e.y += e.vy * dt;

      // Rotation
      e.rotationV *= 0.98;
      e.rotation += e.rotationV;

      // Boundary bounce (soft)
      const pad = 20;
      if (e.x < pad) { e.x = pad; e.vx = Math.abs(e.vx) * 0.5; }
      if (e.x > vw - pad) { e.x = vw - pad; e.vx = -Math.abs(e.vx) * 0.5; }
      if (e.y < pad) { e.y = pad; e.vy = Math.abs(e.vy) * 0.5; }
      if (e.y > vh - pad) { e.y = vh - pad; e.vy = -Math.abs(e.vy) * 0.5; }

      // Color: important words turn orange during gravity/formation
      const targetColor = (isGravity || isFormation)
        ? e.config.importance
        : isBrand
          ? 0
          : 0;
      e.colorProgress = lerp(e.colorProgress, targetColor, 0.03);

      // Opacity: fade in at start, full during middle, dim during brand
      if (isBrand) {
        const brandFade = clamp((progress - 0.70) / 0.1, 0, 1);
        e.opacity = lerp(e.opacity, 1 - brandFade * 0.85, 0.05);
      } else {
        e.opacity = lerp(e.opacity, 1, 0.05);
      }

      // Scale: pulse important words
      const pulseTarget = (isGravity && e.config.importance > 0.8)
        ? 1 + Math.sin(frameRef.current * 0.03 + i) * 0.05
        : 1;
      e.scale = lerp(e.scale, pulseTarget, 0.1);
    }
  }, []);

  /* ─── Render DOM ─── */
  const renderFrame = useCallback(() => {
    const entities = entitiesRef.current;
    for (let i = 0; i < entities.length; i++) {
      const el = wordRefs.current[i];
      if (!el) continue;
      const e = entities[i];

      // Color interpolation: DIM → ORANGE
      const r = Math.round(lerp(0x44, 0xFF, e.colorProgress));
      const g = Math.round(lerp(0x44, 0x6B, e.colorProgress));
      const b = Math.round(lerp(0x44, 0x00, e.colorProgress));
      const color = `rgb(${r},${g},${b})`;

      el.style.transform = `translate(${e.x - e.width / 2}px, ${e.y - e.height / 2}px) rotate(${e.rotation}deg) scale(${e.scale})`;
      el.style.opacity = `${e.opacity}`;
      el.style.color = color;
    }
  }, []);

  /* ─── Animation Loop ─── */
  const animate = useCallback(() => {
    frameRef.current++;
    physicsStep();
    renderFrame();
    rafRef.current = requestAnimationFrame(animate);
  }, [physicsStep, renderFrame]);

  /* ─── Calculate Formation Targets ─── */
  const calculateFormationTargets = useCallback(() => {
    const entities = entitiesRef.current;
    if (!entities.length || !viewportRef.current) return;

    const vw = viewportRef.current.clientWidth;
    const vh = viewportRef.current.clientHeight;
    const progress = scrollProgressRef.current;

    if (progress >= 0.45 && progress < 0.70) {
      // SPIRAL formation: sort by importance, place center-out
      const sorted = [...entities].sort(
        (a, b) => b.config.importance - a.config.importance
      );

      // Center word (most important)
      sorted[0].targetX = vw / 2;
      sorted[0].targetY = vh / 2;

      // Remaining words in an expanding spiral
      const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~137.5 degrees
      for (let i = 1; i < sorted.length; i++) {
        const angle = i * goldenAngle;
        const radius = Math.sqrt(i) * Math.min(vw, vh) * 0.065;
        sorted[i].targetX = vw / 2 + Math.cos(angle) * radius;
        sorted[i].targetY = vh / 2 + Math.sin(angle) * radius;
      }
    } else if (progress >= 0.70) {
      // BRAND: words orbit outward, slowly rotating
      for (let i = 0; i < entities.length; i++) {
        const e = entities[i];
        const angle =
          (i / entities.length) * Math.PI * 2 +
          frameRef.current * 0.0008;
        const radius = Math.min(vw, vh) * 0.55 + i * 3;
        e.targetX = vw / 2 + Math.cos(angle) * radius;
        e.targetY = vh / 2 + Math.sin(angle) * radius;
      }
    }
  }, []);

  /* ─── Mouse Tracking ─── */
  useEffect(() => {
    if (!viewportRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = viewportRef.current!.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    // Touch support for mobile
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const rect = viewportRef.current!.getBoundingClientRect();
      mouseRef.current.x = touch.clientX - rect.left;
      mouseRef.current.y = touch.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleTouchEnd = () => {
      mouseRef.current.active = false;
    };

    const el = viewportRef.current;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("touchmove", handleTouchMove, { passive: true });
    el.addEventListener("touchend", handleTouchEnd);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [mounted]);

  /* ─── Init + Animation Loop ─── */
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Wait for fonts + layout
    const timer = setTimeout(() => {
      initEntities();

      // Entrance: fade in staggered
      const entities = entitiesRef.current;
      for (let i = 0; i < entities.length; i++) {
        entities[i].opacity = 0;
        // Stagger the fade-in via a delayed opacity target
        setTimeout(() => {
          if (entities[i]) entities[i].opacity = 0; // physicsStep lerps to 1
        }, i * 40);
      }

      animate();
    }, 300);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafRef.current);
    };
  }, [mounted, initEntities, animate]);

  /* ─── Resize Handler ─── */
  useEffect(() => {
    if (!mounted) return;
    const handleResize = () => {
      // Recalculate widths
      entitiesRef.current.forEach((e, i) => {
        const el = wordRefs.current[i];
        if (el) {
          e.width = el.offsetWidth;
          e.height = el.offsetHeight;
        }
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mounted]);

  /* ─── GSAP ScrollTrigger ─── */
  useGSAP(
    () => {
      if (!containerRef.current || !mounted) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: viewportRef.current,
        scrub: true,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
          calculateFormationTargets();
        },
      });

      // Fade scroll indicator
      gsap.to(".scroll-indicator", {
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "2% top",
          end: "5% top",
          scrub: true,
        },
      });

      // Brand reveal at 70%+
      const brandTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "70% top",
          end: "85% top",
          scrub: true,
        },
      });

      brandTl
        .fromTo(
          brandLine1Ref.current,
          { opacity: 0, y: 60, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "expo.out",
            duration: 1,
          }
        )
        .fromTo(
          brandLine2Ref.current,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "expo.out",
            duration: 1,
          },
          "-=0.6"
        );

      // Tagline + subtitle
      const endTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "85% top",
          end: "95% top",
          scrub: true,
        },
      });

      endTl
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, ease: "power2.out", duration: 1 }
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0 },
          { opacity: 0.4, ease: "power2.out", duration: 1 },
          "-=0.5"
        );
    },
    { scope: containerRef, dependencies: [mounted] }
  );

  /* ─── Cursor Glow (Canvas) ─── */
  const cursorCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!mounted || !cursorCanvasRef.current || !viewportRef.current) return;
    const canvas = cursorCanvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = viewportRef.current!.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    let cx = 0, cy = 0;
    const drawCursor = () => {
      const mouse = mouseRef.current;
      if (!mouse.active) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        requestAnimationFrame(drawCursor);
        return;
      }

      cx += (mouse.x - cx) * 0.08;
      cy += (mouse.y - cy) * 0.08;

      const rect = viewportRef.current!.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Outer glow
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200);
      gradient.addColorStop(0, "rgba(255, 107, 0, 0.08)");
      gradient.addColorStop(0.4, "rgba(255, 107, 0, 0.03)");
      gradient.addColorStop(1, "rgba(255, 107, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Inner core
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
      coreGrad.addColorStop(0, "rgba(255, 107, 0, 0.25)");
      coreGrad.addColorStop(1, "rgba(255, 107, 0, 0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fill();

      // Magnetic field lines (subtle)
      const progress = scrollProgressRef.current;
      if (progress < 0.45) {
        ctx.strokeStyle = "rgba(255, 107, 0, 0.06)";
        ctx.lineWidth = 1;
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2 + frameRef.current * 0.005;
          const r1 = 40;
          const r2 = 120 + Math.sin(frameRef.current * 0.02 + i) * 30;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1);
          ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2);
          ctx.stroke();
        }
      }

      requestAnimationFrame(drawCursor);
    };
    requestAnimationFrame(drawCursor);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [mounted]);

  /* ─── Grain Overlay ─── */
  const grainSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.04'/%3E%3C/svg%3E")`;

  return (
    <>
      {/* Fontshare */}
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap"
      />

      {/* Scroll space */}
      <div
        ref={containerRef}
        style={{ height: "500vh", position: "relative", background: DARK }}
      >
        {/* Pinned viewport */}
        <div
          ref={viewportRef}
          style={{
            width: "100vw",
            height: "100vh",
            position: "relative",
            overflow: "hidden",
            background: DARK,
            cursor: "none",
          }}
        >
          {/* Cursor canvas */}
          <canvas
            ref={cursorCanvasRef}
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 5,
            }}
          />

          {/* Word entities */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
            }}
          >
            {WORDS.map((word, i) => (
              <div
                key={`${word.text}-${i}`}
                ref={(el) => { wordRefs.current[i] = el; }}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: `${word.size}vw`,
                  fontWeight: word.weight,
                  color: DIM,
                  opacity: 0,
                  whiteSpace: "nowrap",
                  userSelect: "none",
                  willChange: "transform, opacity, color",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  pointerEvents: "none",
                }}
              >
                {word.text}
              </div>
            ))}
          </div>

          {/* Brand Overlay (appears at 70%+) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 20,
              pointerEvents: "none",
            }}
          >
            <div
              ref={brandLine1Ref}
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: "clamp(48px, 12vw, 180px)",
                fontWeight: 700,
                color: LIGHT,
                letterSpacing: "-0.03em",
                lineHeight: 0.9,
                opacity: 0,
              }}
            >
              {BRAND_LINE_1}
            </div>
            <div
              ref={brandLine2Ref}
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: "clamp(48px, 12vw, 180px)",
                fontWeight: 700,
                color: ORANGE,
                letterSpacing: "-0.03em",
                lineHeight: 0.9,
                opacity: 0,
              }}
            >
              {BRAND_LINE_2}
            </div>
            <div
              ref={taglineRef}
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: "clamp(14px, 1.5vw, 22px)",
                fontWeight: 400,
                color: LIGHT,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginTop: "clamp(16px, 3vw, 48px)",
                opacity: 0,
              }}
            >
              Webdesign & KI-Integration
            </div>
            <div
              ref={subtitleRef}
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: "clamp(11px, 1vw, 14px)",
                fontWeight: 300,
                color: DIM,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginTop: "clamp(8px, 1vw, 16px)",
                opacity: 0,
              }}
            >
              99% aller Websites sind gleich. Wir machen das andere 1%.
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            style={{
              position: "absolute",
              bottom: 32,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 15,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              opacity: 0.3,
              transition: "opacity 0.5s",
            }}
            className="scroll-indicator"
          >
            <span
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: 11,
                fontWeight: 400,
                color: LIGHT,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Scroll
            </span>
            <div
              style={{
                width: 1,
                height: 40,
                background: `linear-gradient(to bottom, ${LIGHT}, transparent)`,
              }}
            />
          </div>

          {/* Grain overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: grainSvg,
              backgroundRepeat: "repeat",
              backgroundSize: "256px 256px",
              pointerEvents: "none",
              zIndex: 30,
              mixBlendMode: "overlay",
            }}
          />

          {/* Vignette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)",
              pointerEvents: "none",
              zIndex: 25,
            }}
          />
        </div>
      </div>
    </>
  );
}
