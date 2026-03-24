"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   PIXEL GENESIS v2 — Echte Website → Pixel → Zusammensetzen
   Chris-Feedback: "Eine Webseite in echte Pixel zerlegen,
   die wenn alle wieder zusammen kommen das Bild ergeben"
   ═══════════════════════════════════════════════════════════ */

/* ─── Brand ─── */
const ORANGE = "#FF6B00";
const DARK = "#0A0A0A";
const LIGHT = "#F5F5F0";
const MUTED = "#555";
const OR = 255, OG = 107, OB = 0;

/* ─── Phases ─── */
const PHASES = [
  { num: "01", label: "Der Pixel.", sub: "Alles beginnt hier." },
  { num: "02", label: "Die Ordnung.", sub: "Struktur entsteht." },
  { num: "03", label: "Die Farbe.", sub: "Design nimmt Form an." },
  { num: "04", label: "Das Erlebnis.", sub: "Vom Pixel zur Website." },
];

/* ─── Easing ─── */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));
const easeInOutQuart = (t: number) =>
  t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2;
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/* ─── Types ─── */
interface Particle {
  chaosX: number;
  chaosY: number;
  imgX: number;
  imgY: number;
  r: number;
  g: number;
  b: number;
  cellW: number;
  cellH: number;
  delay: number;
  colorDelay: number;
  seed: number;
}

interface ImgArea {
  x: number;
  y: number;
  w: number;
  h: number;
  cols: number;
  rows: number;
  cellW: number;
  cellH: number;
}

/* ─── Calculate image area + grid ─── */
function calcArea(cw: number, ch: number, imgW: number, imgH: number): ImgArea {
  const aspect = imgW / imgH;
  let w = cw * 0.82;
  let h = w / aspect;
  if (h > ch * 0.82) {
    h = ch * 0.82;
    w = h * aspect;
  }
  const x = (cw - w) / 2;
  const y = (ch - h) / 2;

  // Responsive particle size: ~14px on desktop, ~10px on mobile
  const targetSize = Math.max(10, Math.min(16, cw / 130));
  const cols = Math.max(30, Math.floor(w / targetSize));
  const rows = Math.max(18, Math.floor(h / targetSize));

  return { x, y, w, h, cols, rows, cellW: w / cols, cellH: h / rows };
}

/* ─── Create particles from image data ─── */
function createParticles(
  imgData: ImageData,
  area: ImgArea,
  cw: number,
  ch: number
): Particle[] {
  const particles: Particle[] = [];
  const { x: ox, y: oy, cols, rows, cellW, cellH } = area;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Sample center of grid cell from image
      const sx = Math.floor(((col + 0.5) / cols) * imgData.width);
      const sy = Math.floor(((row + 0.5) / rows) * imgData.height);
      const idx = (sy * imgData.width + sx) * 4;

      // Target position
      const imgX = ox + col * cellW + cellW / 2;
      const imgY = oy + row * cellH + cellH / 2;

      // Chaos: burst from center in all directions
      const angle = Math.random() * Math.PI * 2;
      const dist = 120 + Math.random() * Math.max(cw, ch) * 0.6;

      // Distance from center → color delay (center pixels reveal color first)
      const dx = col / cols - 0.5;
      const dy = row / rows - 0.5;
      const distNorm = Math.sqrt(dx * dx + dy * dy) / 0.707; // normalize to 0-1

      particles.push({
        chaosX: cw / 2 + Math.cos(angle) * dist,
        chaosY: ch / 2 + Math.sin(angle) * dist,
        imgX,
        imgY,
        r: imgData.data[idx],
        g: imgData.data[idx + 1],
        b: imgData.data[idx + 2],
        cellW,
        cellH,
        delay: Math.random() * 0.08,
        colorDelay: distNorm * 0.25 + Math.random() * 0.1,
        seed: Math.random() * 1000,
      });
    }
  }

  return particles;
}

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function HeroV005A() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const genesisRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const progressRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef(0);
  const imgElRef = useRef<HTMLImageElement | null>(null);
  const areaRef = useRef<ImgArea | null>(null);

  /* ═══ Canvas + Particle System ═══ */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cw = window.innerWidth;
    let ch = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const setCanvasSize = () => {
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      canvas.style.width = cw + "px";
      canvas.style.height = ch + "px";
    };
    setCanvasSize();

    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    const onResize = () => {
      cw = window.innerWidth;
      ch = window.innerHeight;
      setCanvasSize();
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", onResize);

    // ─── Load target image ───
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/heroes/hero-v005-a/target.png";

    img.onload = () => {
      imgElRef.current = img;
      const area = calcArea(cw, ch, img.naturalWidth, img.naturalHeight);
      areaRef.current = area;

      // Extract pixel data
      const off = document.createElement("canvas");
      off.width = img.naturalWidth;
      off.height = img.naturalHeight;
      const offCtx = off.getContext("2d")!;
      offCtx.drawImage(img, 0, 0);
      const imgData = offCtx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);

      particlesRef.current = createParticles(imgData, area, cw, ch);
    };

    // ─── Render Loop ───
    const render = () => {
      ctx.clearRect(0, 0, cw, ch);
      const p = progressRef.current;
      const particles = particlesRef.current;
      const area = areaRef.current;
      const t = performance.now() * 0.001;

      // Pre-load: pulsing pixel
      if (particles.length === 0) {
        const pulse = Math.sin(t * 3) * 0.3 + 0.7;
        ctx.fillStyle = ORANGE;
        ctx.globalAlpha = pulse;
        ctx.fillRect(cw / 2 - 3, ch / 2 - 3, 6, 6);
        ctx.globalAlpha = pulse * 0.08;
        ctx.fillRect(cw / 2 - 22, ch / 2 - 22, 44, 44);
        ctx.globalAlpha = 1;
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      /* ═══ DRAW PARTICLES ═══ */
      for (let i = 0; i < particles.length; i++) {
        const px = particles[i];
        let x: number, y: number, size: number;
        let cr: number, cg: number, cb: number, alpha: number;

        if (p < 0.12) {
          /* ── Phase 1: EMERGENCE — pixel explodes into orange particles ── */
          const pt = clamp01(p / 0.12);
          if (pt < px.delay * 5) continue;

          const moveT = easeOutExpo(clamp01((pt - px.delay * 5) * 2));
          x = lerp(cw / 2, px.chaosX, moveT);
          y = lerp(ch / 2, px.chaosY, moveT);

          // Living noise
          x += Math.sin(t * 2.5 + px.seed) * 4 * moveT;
          y += Math.cos(t * 2.1 + px.seed * 1.3) * 4 * moveT;

          size = 2 + moveT * 3;
          cr = OR;
          cg = OG;
          cb = OB;
          alpha = 0.3 + moveT * 0.5;
        } else if (p < 0.55) {
          /* ── Phase 2: ORDER + COLOR MORPH ──
             Particles fly to positions. Colors smoothly morph
             from orange to real image colors, center-first. */
          const pt = clamp01((p - 0.12) / 0.43);
          const moveT = easeInOutQuart(pt);

          x = lerp(px.chaosX, px.imgX, moveT);
          y = lerp(px.chaosY, px.imgY, moveT);

          // Noise fades as particles settle
          const noise = (1 - moveT) * 5;
          x += Math.sin(t * 1.5 + px.seed) * noise;
          y += Math.cos(t * 1.2 + px.seed * 1.3) * noise;

          // Smooth color morph with per-particle offset
          const rawColorT = clamp01((pt - px.colorDelay) / (0.85 - px.colorDelay));
          const colorT = easeOutCubic(rawColorT);
          cr = Math.round(lerp(OR, px.r, colorT));
          cg = Math.round(lerp(OG, px.g, colorT));
          cb = Math.round(lerp(OB, px.b, colorT));

          // Size grows as particles approach positions
          const maxCell = Math.max(px.cellW, px.cellH);
          size = lerp(4, maxCell * 0.65, moveT);
          alpha = 0.8 + moveT * 0.2;
        } else if (p < 0.78) {
          /* ── Phase 3: RESOLVE — fill gaps, reach full cell size ── */
          const pt = clamp01((p - 0.55) / 0.23);
          const et = easeOutCubic(pt);

          x = px.imgX;
          y = px.imgY;
          cr = px.r;
          cg = px.g;
          cb = px.b;

          const maxCell = Math.max(px.cellW, px.cellH);
          size = lerp(maxCell * 0.65, maxCell * 1.06, et);
          alpha = 1;
        } else {
          /* ── Phase 4: CROSSFADE — particles hold while image fades in ── */
          x = px.imgX;
          y = px.imgY;
          cr = px.r;
          cg = px.g;
          cb = px.b;

          const maxCell = Math.max(px.cellW, px.cellH);
          size = maxCell * 1.06;

          // Particles fade out as real image fades in
          const fadeT = clamp01((p - 0.78) / 0.22);
          alpha = 1 - easeOutCubic(fadeT);
        }

        ctx.fillStyle = `rgb(${cr},${cg},${cb})`;
        ctx.globalAlpha = alpha;
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
      }

      /* ═══ CROSSFADE: Draw real image over particles ═══ */
      if (p > 0.72 && imgElRef.current && area) {
        const fadeT = easeOutCubic(clamp01((p - 0.72) / 0.28));
        ctx.globalAlpha = fadeT;

        // Subtle rounded rect clip for "screen" feel
        const r = 8;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(area.x + r, area.y);
        ctx.lineTo(area.x + area.w - r, area.y);
        ctx.quadraticCurveTo(area.x + area.w, area.y, area.x + area.w, area.y + r);
        ctx.lineTo(area.x + area.w, area.y + area.h - r);
        ctx.quadraticCurveTo(
          area.x + area.w,
          area.y + area.h,
          area.x + area.w - r,
          area.y + area.h
        );
        ctx.lineTo(area.x + r, area.y + area.h);
        ctx.quadraticCurveTo(area.x, area.y + area.h, area.x, area.y + area.h - r);
        ctx.lineTo(area.x, area.y + r);
        ctx.quadraticCurveTo(area.x, area.y, area.x + r, area.y);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(imgElRef.current, area.x, area.y, area.w, area.h);
        ctx.restore();

        // Subtle border glow when image is nearly fully visible
        if (fadeT > 0.5) {
          ctx.globalAlpha = (fadeT - 0.5) * 0.3;
          ctx.strokeStyle = ORANGE;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(area.x - 1, area.y - 1, area.w + 2, area.h + 2, r + 1);
          ctx.stroke();
        }
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

  /* ═══ Custom Cursor ═══ */
  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      gsap.to(el, { x: e.clientX, y: e.clientY, duration: 0.5, ease: "power3.out" });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* ═══ GSAP Choreography ═══ */
  useGSAP(
    () => {
      if (!wrapRef.current) return;

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

      /* ── GENESIS — pinned canvas, scroll drives particle animation ── */
      ScrollTrigger.create({
        trigger: genesisRef.current,
        start: "top top",
        end: "+=600%",
        pin: true,
        scrub: 1.5,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });

      /* ── Phase labels ── */
      const starts = [0, 14, 56, 80];
      const ends = [10, 53, 76, 100];

      PHASES.forEach((_, i) => {
        gsap.fromTo(
          `.phase-${i}`,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            ease: "expo.out",
            scrollTrigger: {
              trigger: genesisRef.current,
              start: `top+=${starts[i]}% top`,
              end: `top+=${starts[i] + 5}% top`,
              scrub: 1,
            },
          }
        );

        if (i < 3) {
          gsap.to(`.phase-${i}`, {
            opacity: 0,
            y: -15,
            ease: "power2.in",
            scrollTrigger: {
              trigger: genesisRef.current,
              start: `top+=${ends[i] - 3}% top`,
              end: `top+=${ends[i]}% top`,
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
            end: "+=600%",
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

  /* ═══════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════ */
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
          Website wird aus Pixeln zusammengesetzt
          ═══════════════════════════════════════════ */}
      <section
        ref={genesisRef}
        className="relative h-screen overflow-hidden"
      >
        <canvas ref={canvasRef} className="absolute inset-0 block" />

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

        {/* Watermark */}
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
