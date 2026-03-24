"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   PIXEL GENESIS v3 — TRUE Pixel Decomposition

   Chris: "Eine Webseite in echte Pixel zerlegen die wenn
   alle wieder zusammen kommen das Bild ergeben — DAS wäre WOW"

   v3 Approach:
   - Image loads → briefly visible as pixel grid
   - SHATTERS outward (each pixel keeps its REAL color)
   - Scroll drives REASSEMBLY
   - When assembled → crossfade to crystal-clear image
   ═══════════════════════════════════════════════════════════ */

/* ─── Brand ─── */
const ORANGE = "#FF6B00";
const DARK = "#0A0A0A";
const LIGHT = "#F5F5F0";

/* ─── Easing ─── */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));
const easeInOutQuart = (t: number) =>
  t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2;
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
const easeInCubic = (t: number) => t * t * t;

/* ─── Types ─── */
interface Particle {
  homeX: number;
  homeY: number;
  scatterX: number;
  scatterY: number;
  r: number;
  g: number;
  b: number;
  cellW: number;
  cellH: number;
  shatterDelay: number; // Stagger for the shatter animation (center → edge)
  reassembleDelay: number; // Per-particle offset for wave-like reassembly
  angle: number; // Direction of scatter
  dist: number; // Distance of scatter
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
  let w = cw * 0.78;
  let h = w / aspect;
  if (h > ch * 0.78) {
    h = ch * 0.78;
    w = h * aspect;
  }
  const x = (cw - w) / 2;
  const y = (ch - h) / 2;

  const targetSize = Math.max(8, Math.min(14, cw / 140));
  const cols = Math.max(40, Math.floor(w / targetSize));
  const rows = Math.max(25, Math.floor(h / targetSize));

  return { x, y, w, h, cols, rows, cellW: w / cols, cellH: h / rows };
}

/* ─── Create particles from image ─── */
function createParticles(
  imgData: ImageData,
  area: ImgArea,
  cw: number,
  ch: number
): Particle[] {
  const particles: Particle[] = [];
  const { x: ox, y: oy, cols, rows, cellW, cellH } = area;
  const centerX = cw / 2;
  const centerY = ch / 2;
  const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Sample center of cell from image
      const sx = Math.floor(((col + 0.5) / cols) * imgData.width);
      const sy = Math.floor(((row + 0.5) / rows) * imgData.height);
      const idx = (sy * imgData.width + sx) * 4;

      // Home position (where this pixel belongs)
      const homeX = ox + col * cellW + cellW / 2;
      const homeY = oy + row * cellH + cellH / 2;

      // Scatter: outward from image center with randomness
      const dx = homeX - centerX;
      const dy = homeY - centerY;
      const distFromCenter = Math.sqrt(dx * dx + dy * dy);
      const baseAngle = Math.atan2(dy, dx);
      const angle = baseAngle + (Math.random() - 0.5) * 1.2; // ±34° random spread
      const dist = 200 + Math.random() * Math.max(cw, ch) * 0.7;

      const scatterX = homeX + Math.cos(angle) * dist;
      const scatterY = homeY + Math.sin(angle) * dist;

      // Shatter delay: center shatters first, edges last
      const normDist = distFromCenter / maxDist;
      const shatterDelay = normDist * 0.4 + Math.random() * 0.15;

      // Reassemble delay: edges arrive first, center last (inward wave)
      const reassembleDelay = (1 - normDist) * 0.2 + Math.random() * 0.08;

      particles.push({
        homeX,
        homeY,
        scatterX,
        scatterY,
        r: imgData.data[idx],
        g: imgData.data[idx + 1],
        b: imgData.data[idx + 2],
        cellW,
        cellH,
        shatterDelay,
        reassembleDelay,
        angle,
        dist,
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const scrollProgressRef = useRef(0);
  const shatterProgressRef = useRef(0); // 0 = assembled, 1 = fully scattered
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef(0);
  const imgElRef = useRef<HTMLImageElement | null>(null);
  const areaRef = useRef<ImgArea | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const imageLoadedRef = useRef(false);

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

    // Mouse tracking
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouse);

    // Touch tracking
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    window.addEventListener("touchmove", onTouch, { passive: true });

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
      imageLoadedRef.current = true;

      // Start assembled, then auto-shatter after brief delay
      shatterProgressRef.current = 0;
      setTimeout(() => {
        // Animate shatter: 0 → 1 over 1.8s
        gsap.to(shatterProgressRef, {
          current: 1,
          duration: 1.8,
          ease: "expo.out",
        });
      }, 800); // Show assembled for 0.8s first
    };

    // ─── Render Loop ───
    const render = () => {
      ctx.clearRect(0, 0, cw, ch);
      const particles = particlesRef.current;
      const area = areaRef.current;
      const t = performance.now() * 0.001;
      const scrollP = scrollProgressRef.current;
      const shatterP = shatterProgressRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Loading state
      if (!imageLoadedRef.current) {
        // Subtle loading indicator
        const pulse = Math.sin(t * 4) * 0.3 + 0.7;
        ctx.fillStyle = ORANGE;
        ctx.globalAlpha = pulse * 0.6;
        const s = 4;
        ctx.fillRect(cw / 2 - s, ch / 2 - s, s * 2, s * 2);
        ctx.globalAlpha = 1;
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      // Combined progress: shatter drives scatter, scroll drives reassembly
      // shatterP: 0 = assembled, 1 = scattered
      // scrollP: 0 = start, 1 = end
      // effectiveScatter: how scattered the particles currently are
      // When shattered but not scrolled: effectiveScatter = 1
      // As scroll progresses: effectiveScatter decreases toward 0
      const reassembleT = clamp01(scrollP / 0.82); // Use 82% of scroll for reassembly
      const effectiveScatter = shatterP * (1 - easeInOutQuart(reassembleT));

      /* ═══ DRAW PARTICLES ═══ */
      for (let i = 0; i < particles.length; i++) {
        const px = particles[i];

        // Shatter animation: per-particle stagger
        const particleShatter = clamp01(
          (shatterP - px.shatterDelay) / (1 - px.shatterDelay)
        );
        const shatterEased = easeOutExpo(particleShatter);

        // Reassemble animation: per-particle stagger
        const particleReassemble = clamp01(
          (reassembleT - px.reassembleDelay) / (1 - px.reassembleDelay)
        );
        const reassembleEased = easeInOutQuart(particleReassemble);

        // Position: lerp between home and scatter based on effective state
        const currentScatter = shatterEased * (1 - reassembleEased);
        let x = lerp(px.homeX, px.scatterX, currentScatter);
        let y = lerp(px.homeY, px.scatterY, currentScatter);

        // Subtle drift when scattered
        if (currentScatter > 0.1) {
          const drift = currentScatter * 6;
          x += Math.sin(t * 0.8 + px.angle * 3) * drift;
          y += Math.cos(t * 0.6 + px.dist * 0.01) * drift;
        }

        // Mouse interaction: gentle push when scattered
        if (currentScatter > 0.05 && mx > 0) {
          const dmx = x - mx;
          const dmy = y - my;
          const mouseDist = Math.sqrt(dmx * dmx + dmy * dmy);
          if (mouseDist < 180 && mouseDist > 1) {
            const pushForce = (1 - mouseDist / 180) * 25 * currentScatter;
            x += (dmx / mouseDist) * pushForce;
            y += (dmy / mouseDist) * pushForce;
          }
        }

        // Size: full cell when assembled, slightly smaller when scattered
        const maxCell = Math.max(px.cellW, px.cellH);
        const size = lerp(maxCell * 1.02, maxCell * 0.6, currentScatter);

        // Alpha: full when assembled, slightly transparent when scattered
        const alpha = lerp(1, 0.7 + Math.random() * 0.05, currentScatter);

        ctx.fillStyle = `rgb(${px.r},${px.g},${px.b})`;
        ctx.globalAlpha = clamp01(alpha);
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
      }

      /* ═══ CROSSFADE: Sharp image over assembled particles ═══ */
      if (scrollP > 0.7 && imgElRef.current && area) {
        const fadeT = easeOutCubic(clamp01((scrollP - 0.7) / 0.25));
        ctx.globalAlpha = fadeT;

        // Rounded rect clip
        const r = 10;
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(area.x - 2, area.y - 2, area.w + 4, area.h + 4, r);
        ctx.clip();
        ctx.drawImage(imgElRef.current, area.x, area.y, area.w, area.h);
        ctx.restore();

        // Subtle orange border glow when image is visible
        if (fadeT > 0.3) {
          ctx.globalAlpha = (fadeT - 0.3) * 0.25;
          ctx.strokeStyle = ORANGE;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(area.x - 3, area.y - 3, area.w + 6, area.h + 6, r + 2);
          ctx.stroke();
        }
      }

      /* ═══ Vignette ═══ */
      ctx.globalAlpha = 0.4;
      const vg = ctx.createRadialGradient(cw / 2, ch / 2, cw * 0.3, cw / 2, ch / 2, cw * 0.8);
      vg.addColorStop(0, "transparent");
      vg.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, cw, ch);

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
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
      if (!wrapRef.current || !sectionRef.current) return;

      /* ── Pinned canvas: scroll drives reassembly ── */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=500%",
        pin: true,
        scrub: 1.5,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
        },
      });

      /* ── Text overlays ── */

      // "ZERLEGT." appears during/after shatter
      gsap.fromTo(
        ".text-shatter",
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "expo.out",
          delay: 1.6,
        }
      );

      // "ZERLEGT." fades out when scroll begins
      gsap.to(".text-shatter", {
        opacity: 0,
        y: -30,
        ease: "power2.in",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=5%",
          scrub: 1,
        },
      });

      // Scroll indicator
      gsap.fromTo(
        ".scroll-indicator",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out", delay: 2.8 }
      );
      gsap.to(".scroll-indicator", {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3%",
          scrub: 1,
        },
      });

      // Progress counter (shows reassembly %)
      gsap.fromTo(
        ".progress-counter",
        { opacity: 0 },
        {
          opacity: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "+=3%",
            end: "+=8%",
            scrub: 1,
          },
        }
      );

      gsap.to(".progress-counter", {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "+=78%",
          end: "+=85%",
          scrub: 1,
        },
      });

      // Final reveal text
      gsap.fromTo(
        ".text-reveal",
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "+=82%",
            end: "+=92%",
            scrub: 1.5,
          },
        }
      );

      gsap.fromTo(
        ".text-brand",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "+=88%",
            end: "+=95%",
            scrub: 1.5,
          },
        }
      );

      // Progress bar
      gsap.fromTo(
        ".progress-fill",
        { scaleX: 0 },
        {
          scaleX: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=500%",
            scrub: 1,
          },
        }
      );
    },
    { scope: wrapRef }
  );

  /* ═══ Progress counter update ═══ */
  const counterRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const update = () => {
      if (counterRef.current) {
        const pct = Math.round(
          easeInOutQuart(clamp01(scrollProgressRef.current / 0.82)) * 100
        );
        counterRef.current.textContent = `${pct}%`;
      }
      requestAnimationFrame(update);
    };
    const raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

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
        style={{ opacity: 0.03 }}
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
          MAIN SECTION — Pinned Canvas Experience
          ═══════════════════════════════════════════ */}
      <section
        ref={sectionRef}
        className="relative h-screen w-full"
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10"
        />

        {/* ── Text: "ZERLEGT." after shatter ── */}
        <div className="text-shatter pointer-events-none absolute inset-0 z-20 flex items-center justify-center opacity-0">
          <div className="text-center">
            <h1
              className="tracking-tight"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: "clamp(3rem, 8vw, 7rem)",
                fontWeight: 600,
                color: LIGHT,
                lineHeight: 1,
              }}
            >
              ZER<span style={{ color: ORANGE }}>LEGT</span>.
            </h1>
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <div className="scroll-indicator pointer-events-none absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 opacity-0">
          <span
            className="text-xs uppercase tracking-[0.3em]"
            style={{ fontFamily: "'General Sans', sans-serif", color: LIGHT, opacity: 0.5 }}
          >
            Scroll to rebuild
          </span>
          <div
            className="h-10 w-px"
            style={{ background: `linear-gradient(to bottom, ${ORANGE}, transparent)` }}
          />
        </div>

        {/* ── Progress counter ── */}
        <div className="progress-counter pointer-events-none absolute right-8 top-1/2 z-20 -translate-y-1/2 opacity-0">
          <span
            ref={counterRef}
            className="tabular-nums"
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: "clamp(1rem, 2vw, 1.5rem)",
              fontWeight: 500,
              color: ORANGE,
            }}
          >
            0%
          </span>
        </div>

        {/* ── Final reveal text ── */}
        <div className="text-reveal pointer-events-none absolute inset-0 z-20 flex items-end justify-center pb-16 opacity-0">
          <div className="text-center">
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: LIGHT,
                lineHeight: 1.2,
              }}
            >
              Vom Pixel zur Website.
            </h2>
          </div>
        </div>

        {/* ── Brand name ── */}
        <div className="text-brand pointer-events-none absolute inset-0 z-20 flex items-end justify-center pb-6 opacity-0">
          <span
            className="text-xs uppercase tracking-[0.4em]"
            style={{
              fontFamily: "'General Sans', sans-serif",
              color: ORANGE,
              opacity: 0.7,
            }}
          >
            PixInt Creators
          </span>
        </div>

        {/* ── Progress bar ── */}
        <div className="absolute bottom-0 left-0 z-30 h-[2px] w-full" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div
            className="progress-fill h-full origin-left"
            style={{ background: ORANGE, transform: "scaleX(0)" }}
          />
        </div>
      </section>
    </div>
  );
}
