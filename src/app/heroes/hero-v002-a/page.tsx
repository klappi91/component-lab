"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// --- Multi-octave noise for organic flow ---
function noise2D(x: number, y: number): number {
  const n1 = Math.sin(x * 1.27 + y * 0.93) * Math.cos(y * 0.71 + x * 0.53);
  const n2 = Math.sin(x * 0.68 - y * 1.41) * Math.cos(x * 1.83 - y * 0.37);
  const n3 = Math.cos(x * 2.14 + y * 0.42) * Math.sin(y * 1.67 - x * 0.91);
  return n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
}

// --- Particle type ---
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  layer: number; // 0 = back (slow, dim), 1 = mid, 2 = front (fast, bright)
}

const LAYER_CONFIG = [
  { speed: 0.4, alpha: 0.25, sizeMin: 0.5, sizeMax: 1.5, hueShift: 0 },
  { speed: 0.7, alpha: 0.45, sizeMin: 1, sizeMax: 2.5, hueShift: 30 },
  { speed: 1.0, alpha: 0.7, sizeMin: 1.5, sizeMax: 3.5, hueShift: 60 },
];

export default function HeroV002A() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);
  const scrollRef = useRef(0);
  const dimRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // --- Resize ---
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const parent = canvas.parentElement!;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dimRef.current = { w, h };

      // Init particles
      const count = Math.min(2000, Math.floor((w * h) / 500));
      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const layer = i < count * 0.3 ? 0 : i < count * 0.7 ? 1 : 2;
        const cfg = LAYER_CONFIG[layer];
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: 0,
          vy: 0,
          life: Math.random() * 300,
          maxLife: 250 + Math.random() * 350,
          size: cfg.sizeMin + Math.random() * (cfg.sizeMax - cfg.sizeMin),
          layer,
        });
      }
      particlesRef.current = particles;

      // Clear canvas to bg color
      ctx.fillStyle = "#06040f";
      ctx.fillRect(0, 0, w, h);
    };

    resize();
    window.addEventListener("resize", resize);

    // --- Mouse ---
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    // Touch support
    const onTouch = (e: TouchEvent) => {
      const r = canvas.getBoundingClientRect();
      const t = e.touches[0];
      if (t) mouseRef.current = { x: t.clientX - r.left, y: t.clientY - r.top };
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("touchmove", onTouch, { passive: true });
    canvas.addEventListener("touchend", onLeave);

    // --- Animation ---
    const animate = () => {
      const { w, h } = dimRef.current;
      if (w === 0) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      timeRef.current += 0.002;
      const t = timeRef.current;
      const scroll = scrollRef.current;

      // Trail: slow fade — creates flowing ribbons
      ctx.fillStyle = "rgba(6, 4, 15, 0.06)";
      ctx.fillRect(0, 0, w, h);

      const mouse = mouseRef.current;
      const mouseActive = mouse.x > -1000;
      const mouseRadius = 180;

      for (const p of particlesRef.current) {
        const cfg = LAYER_CONFIG[p.layer];

        // Flow field from noise
        const noiseScale = 0.0015;
        const nx = noise2D(p.x * noiseScale + t, p.y * noiseScale + t * 0.3);
        const ny = noise2D(p.x * noiseScale + 50, p.y * noiseScale + t * 0.5 + 100);
        const angle = (nx + ny) * Math.PI * 1.5;
        const flowSpeed = (0.6 + Math.abs(ny) * 0.8) * cfg.speed;

        p.vx += Math.cos(angle) * flowSpeed * 0.12;
        p.vy += Math.sin(angle) * flowSpeed * 0.12;

        // Scroll: adds downward/outward push
        p.vy += scroll * 0.3 * cfg.speed;

        // Mouse repulsion
        if (mouseActive) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius && dist > 1) {
            const force = (1 - dist / mouseRadius) * 4 * cfg.speed;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Damping
        p.vx *= 0.93;
        p.vy *= 0.93;

        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Reset particle
        if (
          p.life > p.maxLife ||
          p.x < -80 ||
          p.x > w + 80 ||
          p.y < -80 ||
          p.y > h + 80
        ) {
          const edge = Math.random() * 4;
          if (edge < 1) { p.x = -10; p.y = Math.random() * h; }
          else if (edge < 2) { p.x = w + 10; p.y = Math.random() * h; }
          else if (edge < 3) { p.x = Math.random() * w; p.y = -10; }
          else { p.x = Math.random() * w; p.y = h + 10; }
          p.vx = 0;
          p.vy = 0;
          p.life = 0;
          p.maxLife = 250 + Math.random() * 350;
        }

        // Color: aurora palette cycling through position + time
        const lifeRatio = p.life / p.maxLife;
        const alpha = Math.sin(lifeRatio * Math.PI) * cfg.alpha;
        if (alpha < 0.01) continue;

        // Hue: position-based zones create flowing color bands
        const hueBase =
          noise2D(p.x * 0.0008 + t * 0.2, p.y * 0.0008) * 60 +
          cfg.hueShift;
        // Range: 200-340 → deep blue → purple → magenta → rose
        const hue = ((hueBase + 240) % 360 + 360) % 360;
        const sat = 75 + Math.abs(nx) * 25;
        const light = 55 + p.layer * 8;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`;
        ctx.fill();
      }

      // Subtle vignette
      const vg = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w * 0.8);
      vg.addColorStop(0, "rgba(6, 4, 15, 0)");
      vg.addColorStop(1, "rgba(6, 4, 15, 0.4)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      // Mouse glow
      if (mouseActive && mouse.x > 0 && mouse.y > 0) {
        const mg = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, mouseRadius * 0.8
        );
        mg.addColorStop(0, "rgba(140, 80, 255, 0.04)");
        mg.addColorStop(0.5, "rgba(80, 140, 255, 0.02)");
        mg.addColorStop(1, "rgba(140, 80, 255, 0)");
        ctx.fillStyle = mg;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouseRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("touchmove", onTouch);
      canvas.removeEventListener("touchend", onLeave);
    };
  }, []);

  // --- GSAP scroll + text ---
  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Track scroll for canvas effect
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          scrollRef.current = self.progress;
        },
      });

      // Title entrance — each line slides up with clip reveal
      const lines = containerRef.current.querySelectorAll(".hero-line");
      lines.forEach((line, i) => {
        const inner = line.querySelector(".hero-line-inner");
        if (!inner) return;
        gsap.fromTo(
          inner,
          { yPercent: 110, rotate: 2 },
          {
            yPercent: 0,
            rotate: 0,
            duration: 1.4,
            delay: 0.4 + i * 0.12,
            ease: "power4.out",
          }
        );
      });

      // Subtitle fade
      gsap.fromTo(
        ".hero-sub",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1, delay: 1.1, ease: "power3.out" }
      );

      // Scroll: title scales down and fades
      gsap.to(".hero-text-wrap", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "50% top",
          scrub: 1.2,
        },
        scale: 0.55,
        opacity: 0,
        y: -120,
      });

      // Corner details entrance
      gsap.fromTo(
        ".hero-corner",
        { opacity: 0 },
        { opacity: 1, duration: 1.5, delay: 1.6, ease: "power2.out" }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="h-[100dvh] relative overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ background: "#06040f" }}
        />

        {/* Typography overlay */}
        <div className="hero-text-wrap absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10">
          <div className="hero-line overflow-hidden">
            <h1 className="hero-line-inner text-[clamp(3rem,15vw,13rem)] font-black leading-[0.88] tracking-[-0.04em] text-white mix-blend-difference">
              DIGITAL
            </h1>
          </div>
          <div className="hero-line overflow-hidden">
            <h1 className="hero-line-inner text-[clamp(3rem,15vw,13rem)] font-black leading-[0.88] tracking-[-0.04em] text-white mix-blend-difference">
              FLOW
            </h1>
          </div>
          <p className="hero-sub mt-8 text-[clamp(0.55rem,1.1vw,0.85rem)] tracking-[0.7em] uppercase font-light text-white/25 mix-blend-difference">
            Kreativstudio fuer digitale Erlebnisse
          </p>
        </div>

        {/* Corner details */}
        <div className="hero-corner absolute bottom-5 left-6 font-mono text-[9px] tracking-[0.3em] text-white/8 pointer-events-none z-10">
          SINCE 2019
        </div>
        <div className="hero-corner absolute bottom-5 right-6 font-mono text-[9px] tracking-[0.3em] text-white/8 pointer-events-none z-10">
          SCROLL
        </div>
        <div className="hero-corner absolute top-6 right-6 font-mono text-[9px] tracking-[0.3em] text-white/8 pointer-events-none z-10">
          HAMBURG
        </div>
      </section>

      {/* Second section — contrast */}
      <section
        className="h-[100dvh] flex items-center justify-center relative"
        style={{ background: "#06040f" }}
      >
        <div className="text-center">
          <p className="text-white/15 text-[clamp(0.7rem,1.8vw,1.2rem)] font-light tracking-[0.5em] uppercase">
            Wir formen digitale Welten
          </p>
          <div className="mt-6 w-12 h-px bg-white/10 mx-auto" />
        </div>
      </section>
    </div>
  );
}
