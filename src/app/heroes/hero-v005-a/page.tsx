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
  const depixCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const depixCtxRef = useRef<CanvasRenderingContext2D | null>(null);

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

      // Offscreen canvas for progressive depixelation
      const depixCanvas = document.createElement("canvas");
      depixCanvas.width = 512;
      depixCanvas.height = 512;
      depixCanvasRef.current = depixCanvas;
      depixCtxRef.current = depixCanvas.getContext("2d")!;

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
      // Use easeInCubic for reassembly: stays scattered LONG, then snaps together
      // This creates a dramatic "nothing happening... BAM assembled" feel
      const reassembleT = clamp01(scrollP / 0.85); // Use 85% of scroll for reassembly
      const reassembleEase = easeInCubic(reassembleT); // Slow start, fast finish

      /* ═══ PROGRESSIVE DEPIXELATION ═══ */
      // Depixelation progress: tied to reassembly state
      // When particles are 50% assembled → image starts appearing at particle-grid resolution
      // When 100% assembled → image is full resolution, particles gone
      const depixBlendStart = 0.5; // reassembleEase threshold to start blend
      const depixProgress = clamp01((reassembleEase - depixBlendStart) / (1 - depixBlendStart));
      const depixEase = easeOutCubic(depixProgress);
      // Particle fade: particles become transparent as image takes over
      const particleFadeFactor = 1 - depixProgress * depixProgress; // Quadratic fadeout

      /* ═══ DRAW PARTICLES ═══ */
      for (let i = 0; i < particles.length; i++) {
        const px = particles[i];

        // Shatter animation: per-particle stagger
        const particleShatter = clamp01(
          (shatterP - px.shatterDelay) / (1 - px.shatterDelay)
        );
        const shatterEased = easeOutExpo(particleShatter);

        // Reassemble: per-particle stagger for wave effect
        const particleReassemble = clamp01(
          (reassembleEase - px.reassembleDelay) / (1 - px.reassembleDelay)
        );
        const reassembleSmooth = easeOutCubic(particleReassemble);

        // Position: lerp between home and scatter
        const currentScatter = shatterEased * (1 - reassembleSmooth);
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

        // Alpha: reduce during depixelation blend (particles fade as image takes over)
        const scatterAlpha = lerp(1, 0.7 + Math.random() * 0.05, currentScatter);
        const alpha = scatterAlpha * particleFadeFactor;

        if (alpha < 0.01) continue; // Skip invisible particles
        ctx.fillStyle = `rgb(${px.r},${px.g},${px.b})`;
        ctx.globalAlpha = clamp01(alpha);
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
      }

      /* ═══ CANVAS TEXT: "ZERLEGT." — synced with particle state ═══ */
      if (shatterP > 0.5 && scrollP < 0.08) {
        const textFadeIn = clamp01((shatterP - 0.5) / 0.5);
        const textFadeOut = scrollP > 0.02 ? clamp01((scrollP - 0.02) / 0.06) : 0;
        const textAlpha = textFadeIn * (1 - textFadeOut);
        if (textAlpha > 0.01) {
          ctx.save();
          ctx.globalAlpha = textAlpha;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const fontSize = Math.min(cw * 0.08, 100);
          ctx.font = `600 ${fontSize}px 'Clash Display', sans-serif`;
          ctx.fillStyle = LIGHT;
          ctx.fillText("ZER", cw / 2 - fontSize * 0.95, ch / 2);
          ctx.fillStyle = ORANGE;
          ctx.fillText("LEGT.", cw / 2 + fontSize * 0.7, ch / 2);
          ctx.restore();
        }
      }

      /* ═══ CANVAS TEXT: "Scroll to rebuild" indicator ═══ */
      if (shatterP > 0.8 && scrollP < 0.05) {
        const indicatorAlpha = clamp01((shatterP - 0.8) / 0.2) *
          (1 - clamp01(scrollP / 0.05)) * 0.5;
        if (indicatorAlpha > 0.01) {
          ctx.save();
          ctx.globalAlpha = indicatorAlpha;
          ctx.textAlign = "center";
          ctx.font = `400 ${Math.min(cw * 0.012, 13)}px 'General Sans', sans-serif`;
          ctx.fillStyle = LIGHT;
          ctx.letterSpacing = "3px";
          ctx.fillText("SCROLL TO REBUILD", cw / 2, ch - 60);
          // Animated line
          const lineH = 30;
          ctx.strokeStyle = ORANGE;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(cw / 2, ch - 40);
          ctx.lineTo(cw / 2, ch - 40 + lineH);
          ctx.stroke();
          ctx.restore();
        }
      }

      /* ═══ CANVAS TEXT: Progress counter ═══ */
      if (scrollP > 0.03 && scrollP < 0.88) {
        const counterFadeIn = clamp01((scrollP - 0.03) / 0.05);
        const counterFadeOut = scrollP > 0.82 ? clamp01((scrollP - 0.82) / 0.06) : 0;
        const counterAlpha = counterFadeIn * (1 - counterFadeOut) * 0.5;
        if (counterAlpha > 0.01) {
          const pct = Math.round(reassembleEase * 100);
          ctx.save();
          ctx.globalAlpha = counterAlpha;
          ctx.textAlign = "right";
          ctx.font = `500 ${Math.min(cw * 0.02, 22)}px 'Clash Display', sans-serif`;
          ctx.fillStyle = ORANGE;
          ctx.fillText(`${pct}%`, cw - 40, ch / 2);
          ctx.restore();
        }
      }

      /* ═══ CANVAS TEXT: "Vom Pixel zur Website." — final reveal ═══ */
      if (scrollP > 0.82) {
        const revealT = easeOutCubic(clamp01((scrollP - 0.82) / 0.15));
        ctx.save();
        ctx.globalAlpha = revealT;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const revealSize = Math.min(cw * 0.035, 36);
        ctx.font = `400 italic ${revealSize}px 'Instrument Serif', serif`;
        ctx.fillStyle = LIGHT;
        ctx.fillText("Vom Pixel zur Website.", cw / 2, ch - 70 + (1 - revealT) * 30);
        // Brand
        if (scrollP > 0.9) {
          const brandT = easeOutCubic(clamp01((scrollP - 0.9) / 0.08));
          ctx.globalAlpha = brandT * 0.6;
          ctx.font = `400 ${Math.min(cw * 0.01, 11)}px 'General Sans', sans-serif`;
          ctx.fillStyle = ORANGE;
          ctx.fillText("PIXINT CREATORS", cw / 2, ch - 35 + (1 - brandT) * 15);
        }
        ctx.restore();
      }

      /* ═══ PROGRESSIVE DEPIXELATION: Smooth pixel → sharp image ═══ */
      // Instead of hard crossfade, progressively decrease pixel block size
      // Image appears at particle-grid resolution (invisible blend) → gets sharper
      if (depixProgress > 0 && imgElRef.current && area && depixCtxRef.current && depixCanvasRef.current) {
        const depixCanvas = depixCanvasRef.current;
        const depixCtx = depixCtxRef.current;
        const img = imgElRef.current;

        // Pixel size: exponential decay from cell-size → 1px (perceptually linear sharpening)
        const maxCellSize = Math.max(area.cellW, area.cellH);
        const pixelSize = Math.max(1, maxCellSize ** (1 - depixEase));

        // Image alpha: ramp in smoothly, matches particle fadeout
        const imageAlpha = clamp01(depixProgress * 1.3);

        const r = 10;
        ctx.save();
        ctx.globalAlpha = imageAlpha;
        ctx.beginPath();
        ctx.roundRect(area.x - 2, area.y - 2, area.w + 4, area.h + 4, r);
        ctx.clip();

        if (pixelSize > 1.5) {
          // Draw pixelated: render image small on offscreen, scale up without smoothing
          const tw = Math.max(2, Math.ceil(area.w / pixelSize));
          const th = Math.max(2, Math.ceil(area.h / pixelSize));

          depixCtx.clearRect(0, 0, depixCanvas.width, depixCanvas.height);
          depixCtx.drawImage(img, 0, 0, tw, th);

          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(depixCanvas, 0, 0, tw, th, area.x, area.y, area.w, area.h);
          ctx.imageSmoothingEnabled = true;
        } else {
          // Full resolution — no pixelation needed
          ctx.drawImage(img, area.x, area.y, area.w, area.h);
        }

        ctx.restore();

        // Orange border glow when image is mostly sharp
        if (depixEase > 0.7) {
          ctx.globalAlpha = (depixEase - 0.7) * 0.4;
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

  /* (text rendering moved to canvas) */

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

        {/* All text now rendered directly on canvas for perfect sync */}

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
