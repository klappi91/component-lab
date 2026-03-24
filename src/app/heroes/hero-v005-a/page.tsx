"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   PIXEL GENESIS — Vom Pixel zur Website
   Scroll-driven Particle → Image Transformation
   ═══════════════════════════════════════════════════════════ */

/* ─── Brand ─── */
const ORANGE = "#FF6B00";
const DARK = "#0A0A0A";
const LIGHT = "#F5F5F0";
const MUTED = "#555";

/* ─── Particle Grid ─── */
const GRID_COLS = 52;
const GRID_ROWS = 30;
const TOTAL = GRID_COLS * GRID_ROWS; // 1560

/* ─── Phase definitions ─── */
const PHASES = [
  { num: "01", label: "Der Pixel.", sub: "Alles beginnt hier." },
  { num: "02", label: "Die Ordnung.", sub: "Struktur entsteht." },
  { num: "03", label: "Die Farbe.", sub: "Design nimmt Form an." },
  { num: "04", label: "Das Erlebnis.", sub: "Vom Pixel zur Website." },
];

/* ─── Easing ─── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}
function easeOutExpo(t: number) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}
function easeInOutQuart(t: number) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/* ─── Particle type ─── */
interface Particle {
  chaosX: number;
  chaosY: number;
  imgX: number;
  imgY: number;
  r: number;
  g: number;
  b: number;
  fullSize: number;
  delay: number;
  seed: number;
}

/* ─── Fallback: procedural website wireframe ─── */
function createFallbackImage(w: number, h: number): ImageData {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;

  // Background
  ctx.fillStyle = DARK;
  ctx.fillRect(0, 0, w, h);

  // Nav bar
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, w, h * 0.055);
  ctx.fillStyle = ORANGE;
  ctx.fillRect(w * 0.04, h * 0.015, w * 0.07, h * 0.025);
  // Nav links
  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = "#444";
    ctx.fillRect(w * 0.55 + i * w * 0.1, h * 0.02, w * 0.06, h * 0.015);
  }

  // Hero section — large block
  ctx.fillStyle = "#131313";
  ctx.fillRect(w * 0.04, h * 0.08, w * 0.92, h * 0.38);
  // Hero text simulation
  ctx.fillStyle = LIGHT;
  ctx.font = `bold ${Math.round(h * 0.09)}px sans-serif`;
  ctx.fillText("WIR CODIEREN", w * 0.08, h * 0.24);
  ctx.fillStyle = ORANGE;
  ctx.font = `italic bold ${Math.round(h * 0.09)}px serif`;
  ctx.fillText("ERLEBNISSE", w * 0.08, h * 0.36);
  // Hero accent line
  ctx.fillStyle = ORANGE;
  ctx.fillRect(w * 0.08, h * 0.39, w * 0.15, h * 0.004);

  // Three service cards
  const cardW = w * 0.28;
  const cardH = h * 0.3;
  const cardY = h * 0.52;
  for (let i = 0; i < 3; i++) {
    const cx = w * 0.04 + i * (cardW + w * 0.02);
    // Card bg
    ctx.fillStyle = "#0F0F0F";
    ctx.fillRect(cx, cardY, cardW, cardH);
    // Top accent
    ctx.fillStyle = i === 0 ? ORANGE : "#222";
    ctx.fillRect(cx, cardY, cardW, h * 0.004);
    // Number
    ctx.fillStyle = "#1A1A1A";
    ctx.font = `bold ${Math.round(h * 0.14)}px sans-serif`;
    ctx.fillText(`0${i + 1}`, cx + cardW * 0.06, cardY + cardH * 0.55);
    // Text lines
    ctx.fillStyle = "#333";
    ctx.fillRect(cx + cardW * 0.06, cardY + cardH * 0.65, cardW * 0.7, h * 0.01);
    ctx.fillRect(cx + cardW * 0.06, cardY + cardH * 0.75, cardW * 0.5, h * 0.008);
  }

  // Footer
  ctx.fillStyle = "#0C0C0C";
  ctx.fillRect(0, h * 0.88, w, h * 0.12);
  ctx.fillStyle = ORANGE;
  ctx.fillRect(w * 0.04, h * 0.92, w * 0.05, h * 0.015);
  ctx.fillStyle = "#333";
  ctx.fillRect(w * 0.04, h * 0.95, w * 0.2, h * 0.008);

  return ctx.getImageData(0, 0, w, h);
}

/* ─── Init particles from image data ─── */
function initParticles(
  imageData: ImageData,
  canvasW: number,
  canvasH: number
): Particle[] {
  const particles: Particle[] = [];
  const cellW = canvasW / GRID_COLS;
  const cellH = canvasH / GRID_ROWS;

  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      // Sample image pixel
      const sx = Math.floor((col / GRID_COLS) * imageData.width);
      const sy = Math.floor((row / GRID_ROWS) * imageData.height);
      const idx = (sy * imageData.width + sx) * 4;

      // Target position
      const imgX = col * cellW + cellW / 2;
      const imgY = row * cellH + cellH / 2;

      // Chaos burst from center
      const angle = Math.random() * Math.PI * 2;
      const dist = 80 + Math.random() * Math.max(canvasW, canvasH) * 0.55;

      particles.push({
        chaosX: canvasW / 2 + Math.cos(angle) * dist,
        chaosY: canvasH / 2 + Math.sin(angle) * dist,
        imgX,
        imgY,
        r: imageData.data[idx],
        g: imageData.data[idx + 1],
        b: imageData.data[idx + 2],
        fullSize: Math.max(cellW, cellH) * 1.08,
        delay: Math.random() * 0.12,
        seed: Math.random() * 1000,
      });
    }
  }
  return particles;
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function HeroV005A() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const genesisRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealRef = useRef<HTMLElement>(null);

  const progressRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef(0);
  const cursorRef = useRef<HTMLDivElement>(null);

  /* ─── Canvas + Particle System ─── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cw = window.innerWidth;
    let ch = window.innerHeight;
    canvas.width = cw;
    canvas.height = ch;

    const onResize = () => {
      cw = window.innerWidth;
      ch = window.innerHeight;
      canvas.width = cw;
      canvas.height = ch;
    };
    window.addEventListener("resize", onResize);

    // Load image or use fallback
    const loadTarget = (): Promise<ImageData> =>
      new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = "/heroes/hero-v005-a/target.png";

        const timeout = setTimeout(() => {
          resolve(createFallbackImage(560, 320));
        }, 1500);

        img.onload = () => {
          clearTimeout(timeout);
          const off = document.createElement("canvas");
          off.width = img.width;
          off.height = img.height;
          const offCtx = off.getContext("2d")!;
          offCtx.drawImage(img, 0, 0);
          resolve(offCtx.getImageData(0, 0, img.width, img.height));
        };
        img.onerror = () => {
          clearTimeout(timeout);
          resolve(createFallbackImage(560, 320));
        };
      });

    loadTarget().then((imageData) => {
      particlesRef.current = initParticles(imageData, cw, ch);
    });

    // ─── Render Loop ───
    const ctx = canvas.getContext("2d")!;

    const render = () => {
      ctx.clearRect(0, 0, cw, ch);
      const p = progressRef.current;
      const particles = particlesRef.current;
      const t = performance.now() * 0.001;

      // Pre-load: single pulsing pixel
      if (particles.length === 0) {
        const pulse = Math.sin(t * 3) * 0.3 + 0.7;
        ctx.fillStyle = ORANGE;
        ctx.globalAlpha = pulse;
        ctx.fillRect(cw / 2 - 3, ch / 2 - 3, 6, 6);
        ctx.globalAlpha = pulse * 0.12;
        ctx.fillRect(cw / 2 - 25, ch / 2 - 25, 50, 50);
        ctx.globalAlpha = 1;
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      /* ─── Draw particles based on scroll progress ─── */
      for (let i = 0; i < particles.length; i++) {
        const px = particles[i];

        let x: number,
          y: number,
          size: number,
          cr: number,
          cg: number,
          cb: number,
          alpha: number;

        if (p < 0.18) {
          /* ── Phase 1: EMERGENCE — single pixel explodes into chaos ── */
          const pt = clamp01(p / 0.18);
          const visible = pt > px.delay * 4;
          if (!visible) continue;

          const moveT = easeOutExpo(clamp01((pt - px.delay * 4) * 1.8));
          x = lerp(cw / 2, px.chaosX, moveT);
          y = lerp(ch / 2, px.chaosY, moveT);

          // Living noise
          x += Math.sin(t * 2.5 + px.seed) * 5 * moveT;
          y += Math.cos(t * 2.1 + px.seed * 1.3) * 5 * moveT;

          size = 2 + moveT * 2.5;
          cr = 255;
          cg = 107;
          cb = 0;
          alpha = moveT * 0.8;
        } else if (p < 0.48) {
          /* ── Phase 2: ORDER — chaos flows to image positions ── */
          const pt = clamp01((p - 0.18) / 0.3);
          const et = easeInOutQuart(pt);

          x = lerp(px.chaosX, px.imgX, et);
          y = lerp(px.chaosY, px.imgY, et);

          // Fading noise
          const noise = (1 - et) * 4;
          x += Math.sin(t * 1.5 + px.seed) * noise;
          y += Math.cos(t * 1.2 + px.seed * 1.3) * noise;

          // Color starts hinting
          const colorHint = et * 0.15;
          cr = Math.round(lerp(255, px.r, colorHint));
          cg = Math.round(lerp(107, px.g, colorHint));
          cb = Math.round(lerp(0, px.b, colorHint));

          size = lerp(4, px.fullSize * 0.45, et);
          alpha = 0.8 + et * 0.2;
        } else if (p < 0.76) {
          /* ── Phase 3: COLOR — orange resolves to actual image colors ── */
          const pt = clamp01((p - 0.48) / 0.28);
          const et = easeOutCubic(pt);

          x = px.imgX;
          y = px.imgY;

          const colorT = 0.15 + et * 0.85;
          cr = Math.round(lerp(255, px.r, colorT));
          cg = Math.round(lerp(107, px.g, colorT));
          cb = Math.round(lerp(0, px.b, colorT));

          size = lerp(px.fullSize * 0.45, px.fullSize * 0.85, et);
          alpha = 1;
        } else {
          /* ── Phase 4: SHARPEN — full resolution, blocks merge ── */
          const pt = clamp01((p - 0.76) / 0.24);
          const et = easeOutCubic(pt);

          x = px.imgX;
          y = px.imgY;
          cr = px.r;
          cg = px.g;
          cb = px.b;
          size = lerp(px.fullSize * 0.85, px.fullSize, et);
          alpha = 1;
        }

        ctx.fillStyle = `rgb(${cr},${cg},${cb})`;
        ctx.globalAlpha = alpha;
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* ─── Custom cursor ─── */
  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      gsap.to(el, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* ─── GSAP Choreography ─── */
  useGSAP(
    () => {
      const wrap = wrapRef.current;
      if (!wrap) return;

      /* ── Intro entrance ── */
      const introTl = gsap.timeline({ delay: 0.3 });
      introTl.from(".intro-pixel", {
        scale: 0,
        opacity: 0,
        duration: 1.4,
        ease: "expo.out",
      });
      introTl.from(
        ".intro-heading",
        { y: 60, opacity: 0, duration: 1.2, ease: "expo.out" },
        0.5
      );
      introTl.from(
        ".intro-accent",
        { y: 40, opacity: 0, duration: 1, ease: "expo.out" },
        0.8
      );
      introTl.from(
        ".intro-sub",
        { y: 20, opacity: 0, duration: 0.8, ease: "power2.out" },
        1.1
      );
      introTl.from(
        ".scroll-line",
        { scaleY: 0, duration: 0.6, ease: "power2.out" },
        1.4
      );

      /* ── Intro scroll-out ── */
      gsap.to(".intro-content", {
        y: -120,
        opacity: 0,
        scrollTrigger: {
          trigger: introRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* ── GENESIS — pinned scroll drives canvas progress ── */
      ScrollTrigger.create({
        trigger: genesisRef.current,
        start: "top top",
        end: "+=500%",
        pin: true,
        scrub: 1.5,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });

      /* ── Phase labels — fade in/out at scroll positions ── */
      PHASES.forEach((_, i) => {
        const start = [0, 20, 50, 76][i];
        const end = [18, 48, 76, 100][i];

        // Fade in
        gsap.fromTo(
          `.phase-${i}`,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            ease: "expo.out",
            scrollTrigger: {
              trigger: genesisRef.current,
              start: `top+=${start + 1}% top`,
              end: `top+=${start + 6}% top`,
              scrub: 1,
            },
          }
        );

        // Fade out (not the last)
        if (i < 3) {
          gsap.to(`.phase-${i}`, {
            opacity: 0,
            y: -15,
            ease: "power2.in",
            scrollTrigger: {
              trigger: genesisRef.current,
              start: `top+=${end - 4}% top`,
              end: `top+=${end}% top`,
              scrub: 1,
            },
          });
        }
      });

      /* ── Progress bar ── */
      gsap.fromTo(
        ".progress-fill",
        { scaleX: 0 },
        {
          scaleX: 1,
          scrollTrigger: {
            trigger: genesisRef.current,
            start: "top top",
            end: "+=500%",
            scrub: 1,
          },
        }
      );

      /* ── REVEAL section ── */
      gsap.fromTo(
        ".reveal-heading",
        { scale: 0.35, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: revealRef.current,
            start: "top 85%",
            end: "top 25%",
            scrub: 1.5,
          },
        }
      );

      gsap.fromTo(
        ".reveal-sub",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: revealRef.current,
            start: "top 55%",
            end: "top 25%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".reveal-cta",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: revealRef.current,
            start: "top 45%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );

      // Orange fill from bottom
      gsap.fromTo(
        ".reveal-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: revealRef.current,
            start: "top 35%",
            end: "center center",
            scrub: 1,
          },
        }
      );
    },
    { scope: wrapRef }
  );

  /* ═══ RENDER ═══ */
  return (
    <div
      ref={wrapRef}
      className="relative overflow-x-hidden"
      style={{ background: DARK, color: LIGHT }}
    >
      {/* ── Grain ── */}
      <svg
        className="pointer-events-none fixed inset-0 z-50 h-full w-full"
        style={{ opacity: 0.035 }}
      >
        <filter id="g">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#g)" />
      </svg>

      {/* ── Custom Cursor ── */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden mix-blend-difference md:block"
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: ORANGE,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* ═══════════════════════════════════════════
          SECTION 1: INTRO — The Single Pixel
          ═══════════════════════════════════════════ */}
      <section
        ref={introRef}
        className="relative flex h-screen flex-col items-center justify-center"
      >
        <div className="intro-content flex flex-col items-center gap-6 px-6 text-center">
          {/* The pixel */}
          <div className="intro-pixel relative mb-4">
            <div
              className="animate-pulse"
              style={{
                width: 8,
                height: 8,
                background: ORANGE,
                boxShadow: `0 0 20px ${ORANGE}80, 0 0 60px ${ORANGE}30, 0 0 100px ${ORANGE}15`,
              }}
            />
          </div>

          {/* Heading */}
          <h1
            className="intro-heading select-none"
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: "clamp(32px, 6vw, 100px)",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Alles beginnt mit
          </h1>

          <h1
            className="intro-accent select-none"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(36px, 7vw, 110px)",
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 1,
              color: ORANGE,
            }}
          >
            einem Pixel.
          </h1>

          {/* Subtitle */}
          <p
            className="intro-sub mt-4"
            style={{
              fontFamily: "'General Sans', sans-serif",
              fontSize: "clamp(12px, 1.2vw, 18px)",
              color: MUTED,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Scroll um zu erschaffen
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 flex flex-col items-center gap-2"
          style={{ opacity: 0.3 }}
        >
          <div
            className="scroll-line h-10 w-px origin-top"
            style={{ background: LIGHT }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2: GENESIS — Scroll-driven Canvas
          ═══════════════════════════════════════════ */}
      <section
        ref={genesisRef}
        className="relative h-screen overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block"
        />

        {/* Phase labels — bottom left */}
        {PHASES.map((phase, i) => (
          <div
            key={i}
            className={`phase-${i} pointer-events-none absolute bottom-[12%] left-[5%] opacity-0 will-change-transform`}
          >
            <span
              style={{
                fontFamily: "'General Sans', sans-serif",
                fontSize: "clamp(10px, 0.9vw, 13px)",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: ORANGE,
                fontWeight: 500,
              }}
            >
              {phase.num} / 04
            </span>
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(28px, 4.5vw, 72px)",
                fontWeight: 400,
                fontStyle: "italic",
                lineHeight: 1.1,
                color: LIGHT,
                marginTop: 4,
              }}
            >
              {phase.label}
            </h2>
            <p
              style={{
                fontFamily: "'General Sans', sans-serif",
                fontSize: "clamp(12px, 1.1vw, 17px)",
                color: MUTED,
                marginTop: 8,
                fontWeight: 300,
              }}
            >
              {phase.sub}
            </p>
          </div>
        ))}

        {/* Progress bar */}
        <div
          className="absolute bottom-6 left-[5%] right-[5%] h-px"
          style={{ background: `${LIGHT}10` }}
        >
          <div
            className="progress-fill h-full origin-left will-change-transform"
            style={{ background: ORANGE, transform: "scaleX(0)" }}
          />
        </div>

        {/* Corner: PixIntCreators watermark */}
        <span
          className="pointer-events-none absolute right-[5%] top-6"
          style={{
            fontFamily: "'General Sans', sans-serif",
            fontSize: "clamp(10px, 0.8vw, 12px)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: `${LIGHT}20`,
          }}
        >
          PixIntCreators
        </span>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3: REVEAL — Vom Pixel zur Website
          ═══════════════════════════════════════════ */}
      <section
        ref={revealRef}
        className="relative flex h-screen flex-col items-center justify-center overflow-hidden"
      >
        {/* Orange background fill */}
        <div
          className="reveal-fill absolute inset-0 origin-bottom"
          style={{ background: ORANGE, transform: "scaleY(0)" }}
        />

        <div className="relative z-10 flex flex-col items-center gap-4 px-8 text-center">
          <h2
            className="reveal-heading select-none"
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: "clamp(36px, 8vw, 150px)",
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            Vom Pixel
            <br />
            <span
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
                fontStyle: "italic",
              }}
            >
              zur Website.
            </span>
          </h2>

          <p
            className="reveal-sub"
            style={{
              fontFamily: "'General Sans', sans-serif",
              fontSize: "clamp(14px, 1.5vw, 22px)",
              fontWeight: 300,
              color: LIGHT,
              opacity: 0.75,
              maxWidth: 480,
              lineHeight: 1.7,
              marginTop: 8,
            }}
          >
            Intelligent. Kreativ. Auf den Punkt.
            <br />
            PixIntCreators — Wir codieren Erlebnisse.
          </p>

          <a
            href="mailto:info@pixintcreators.de"
            className="reveal-cta mt-6 inline-block border px-10 py-4 transition-all duration-300 hover:bg-white hover:text-black"
            style={{
              fontFamily: "'General Sans', sans-serif",
              fontSize: "clamp(11px, 1vw, 15px)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontWeight: 500,
              borderColor: `${LIGHT}40`,
              color: LIGHT,
            }}
          >
            Projekt starten
          </a>
        </div>

        {/* Bottom credit */}
        <span
          className="absolute bottom-6 z-10"
          style={{
            fontFamily: "'General Sans', sans-serif",
            fontSize: "clamp(10px, 0.8vw, 13px)",
            letterSpacing: "0.2em",
            color: `${LIGHT}40`,
          }}
        >
          info@pixintcreators.de
        </span>
      </section>
    </div>
  );
}
