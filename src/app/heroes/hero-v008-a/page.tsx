"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   hero-v008-a: TYPOGRAPHIC DEPTH — v2
   3D Parallax Typography — Mouse steuert Perspektive

   v2: Chris-Feedback — "am Ende fehlt ein abschliessendes Element"
   → IMPACT-MOMENT nach Zoom-Through hinzugefuegt
   → Partikel konvergieren → Orange Pulse → Brand materialisiert
   → CTA als Abschluss

   Choreografie (v2):
   - Entrance: Dunkelheit → Partikel erscheinen → Layers gestaffelt
   - Idle: Mouse = 3D tilt + parallax + Partikel reagieren
   - Scroll 0-55%: Zoom through — jeder Layer flasht und fliegt vorbei
   - Scroll 50-62%: IMPACT — Partikel konvergieren, orange Pulse
   - Scroll 60-80%: Brand MATERIALISIERT aus der Energie
   - Scroll 80-95%: Tagline + Subtitle + Line
   - Scroll 92-100%: CTA Einladung
   ═══════════════════════════════════════════════════════════ */

/* ─── Brand ─── */
const ORANGE = "#FF6B00";
const DARK = "#0A0A0A";
const LIGHT = "#F5F5F5";

/* ─── Typography Layers (back to front) ─── */
const LAYERS = [
  {
    text: "PIXEL",
    z: -2400,
    size: "28vw",
    weight: 300,
    opacity: 0.07,
    blur: 6,
    color: LIGHT,
    glow: "rgba(255,255,255,0.03)",
    y: "-15%",
    x: "5%",
    rotate: -3,
  },
  {
    text: "KREATIV",
    z: -1800,
    size: "22vw",
    weight: 400,
    opacity: 0.12,
    blur: 4,
    color: LIGHT,
    glow: "rgba(255,255,255,0.05)",
    y: "20%",
    x: "-8%",
    rotate: 2,
  },
  {
    text: "DESIGN",
    z: -1200,
    size: "18vw",
    weight: 500,
    opacity: 0.22,
    blur: 2,
    color: ORANGE,
    glow: "rgba(255,107,0,0.15)",
    y: "-8%",
    x: "12%",
    rotate: -1.5,
  },
  {
    text: "DIGITAL",
    z: -700,
    size: "15vw",
    weight: 600,
    opacity: 0.35,
    blur: 1,
    color: LIGHT,
    glow: "rgba(255,255,255,0.08)",
    y: "25%",
    x: "-15%",
    rotate: 1,
  },
  {
    text: "ERLEBNIS",
    z: -300,
    size: "12vw",
    weight: 700,
    opacity: 0.55,
    blur: 0,
    color: LIGHT,
    glow: "rgba(255,255,255,0.12)",
    y: "-20%",
    x: "6%",
    rotate: -0.5,
  },
];

const BRAND = {
  line1: "PIXINT",
  line2: "CREATORS",
  tagline: "Wir machen das 1%",
  subtitle: "Webdesign & KI-Integration",
};

/* ─── Particle System ─── */
const PARTICLE_COUNT = 150;

interface Particle {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  speed: number;
}

function createParticles(w: number, h: number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => {
    const x = Math.random() * w;
    const y = Math.random() * h;
    return {
      x,
      y,
      z: Math.random(),
      baseX: x,
      baseY: y,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.6 + 0.1,
      speed: Math.random() * 0.5 + 0.5,
    };
  });
}

/* ─── Grain SVG ─── */
const GRAIN_SVG = `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#grain)" opacity="0.04"/></svg>`;

export default function HeroV008A() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const flashRefs = useRef<(HTMLDivElement | null)[]>([]);
  const particles = useRef<Particle[]>([]);
  const mouseScreen = useRef({ x: 0, y: 0 });
  const scrollProgressRef = useRef(0);
  const animFrame = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  /* ─── Detect mobile ─── */
  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
  }, []);

  /* ─── Particle canvas (scroll-aware) ─── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      particles.current = createParticles(window.innerWidth, window.innerHeight);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseScreen.current.x;
      const my = mouseScreen.current.y;
      const sp = scrollProgressRef.current;

      // Impact phase detection
      const impactPhase = sp > 0.48 && sp < 0.66;
      const impactPeak = 0.56;
      const impactIntensity = impactPhase
        ? sp < impactPeak
          ? Math.min(1, (sp - 0.48) / 0.08)
          : Math.max(0, 1 - (sp - impactPeak) / 0.10)
        : 0;

      for (const p of particles.current) {
        // Drift (reduced during impact)
        if (!impactPhase) {
          p.x += p.vx * p.speed;
          p.y += p.vy * p.speed;
        } else {
          p.x += p.vx * p.speed * (1 - impactIntensity * 0.8);
          p.y += p.vy * p.speed * (1 - impactIntensity * 0.8);
        }

        // Wrap (skip during impact to prevent teleporting)
        if (!impactPhase) {
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10;
          if (p.y > h + 10) p.y = -10;
        }

        // Mouse repulsion (reduced during impact)
        if (!isMobile && impactIntensity < 0.5) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const force = (200 - dist) / 200;
            p.x += (dx / dist) * force * 2 * (1 - impactIntensity);
            p.y += (dy / dist) * force * 2 * (1 - impactIntensity);
          }
        }

        // IMPACT: Converge to center then explode outward
        if (impactPhase) {
          const centerX = w / 2;
          const centerY = h / 2;
          const dx = centerX - p.x;
          const dy = centerY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (sp < impactPeak) {
            // CONVERGE — particles rush inward
            if (dist > 5) {
              const force = impactIntensity * 7 * p.speed;
              p.x += (dx / dist) * force;
              p.y += (dy / dist) * force;
            }
          } else {
            // EXPLODE — particles burst outward
            if (dist > 2) {
              const explodeForce = (1 - impactIntensity) * 5 * p.speed;
              p.x -= (dx / dist) * explodeForce;
              p.y -= (dy / dist) * explodeForce;
            }
          }
        }

        // Draw
        const depthScale = 0.3 + p.z * 0.7;
        const impactSizeBoost = impactPhase ? 1 + impactIntensity * 2.5 : 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * depthScale * impactSizeBoost, 0, Math.PI * 2);

        // Color: all glow orange during impact
        if (impactIntensity > 0.3) {
          const glow = Math.min(1, p.opacity * depthScale + impactIntensity * 0.6);
          ctx.fillStyle = `rgba(255,107,0,${glow})`;
        } else {
          ctx.fillStyle =
            p.z > 0.7
              ? `rgba(255,107,0,${p.opacity * depthScale})`
              : `rgba(255,255,255,${p.opacity * depthScale * 0.6})`;
        }
        ctx.fill();
      }

      // Impact center glow (canvas-level, additional to the CSS glow)
      if (impactIntensity > 0.2) {
        const gradient = ctx.createRadialGradient(
          w / 2, h / 2, 0,
          w / 2, h / 2, 200 * impactIntensity
        );
        gradient.addColorStop(0, `rgba(255,107,0,${impactIntensity * 0.4})`);
        gradient.addColorStop(0.5, `rgba(255,107,0,${impactIntensity * 0.15})`);
        gradient.addColorStop(1, "rgba(255,107,0,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      animFrame.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame.current);
      window.removeEventListener("resize", resize);
    };
  }, [isMobile]);

  /* ─── Mouse tracking ─── */
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMobile) return;
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseScreen.current = { x: e.clientX, y: e.clientY };

      // Camera 3D tilt
      if (cameraRef.current) {
        gsap.to(cameraRef.current, {
          rotateY: cx * -10,
          rotateX: cy * 6,
          duration: 1,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      // Custom cursor
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.4,
          ease: "power2.out",
        });
      }
      if (cursorGlowRef.current) {
        gsap.to(cursorGlowRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      // Layer parallax (depth-based)
      layerRefs.current.forEach((el, i) => {
        if (!el) return;
        const depth = (i + 1) / LAYERS.length;
        gsap.to(el, {
          x: cx * depth * -35,
          y: cy * depth * -20,
          duration: 0.9,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    },
    [isMobile]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  /* ─── Mobile: gentle auto-tilt ─── */
  useEffect(() => {
    if (!isMobile || !cameraRef.current) return;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(cameraRef.current, {
      rotateY: 3,
      rotateX: -2,
      duration: 6,
      ease: "sine.inOut",
    });
    tl.to(cameraRef.current, {
      rotateY: -3,
      rotateX: 2,
      duration: 6,
      ease: "sine.inOut",
    });
    return () => {
      tl.kill();
    };
  }, [isMobile]);

  /* ─── GSAP Animations ─── */
  useGSAP(
    () => {
      if (!wrapRef.current || !sceneRef.current || !cameraRef.current) return;

      const brand = brandRef.current;
      const tagline = taglineRef.current;
      const subtitle = subtitleRef.current;
      const line = lineRef.current;
      const impact = impactRef.current;
      const cta = ctaRef.current;

      /* ─── Initial states ─── */
      // Brand stays HIDDEN — only revealed during impact
      if (brand) gsap.set(brand, { opacity: 0, scale: 0.7 });
      if (tagline) gsap.set(tagline, { opacity: 0, y: 50 });
      if (subtitle) gsap.set(subtitle, { opacity: 0, y: 30 });
      if (line) gsap.set(line, { scaleX: 0, opacity: 0 });
      if (impact) gsap.set(impact, { opacity: 0, scale: 0.3 });
      if (cta) gsap.set(cta, { opacity: 0, y: 20 });

      layerRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, scale: 0.5 });
      });
      flashRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0 });
      });

      /* ─── Entrance timeline (layers only, no brand) ─── */
      const entrance = gsap.timeline({ delay: 0.3 });

      // Layers stagger in (deepest first)
      layerRefs.current.forEach((el, i) => {
        if (!el) return;
        entrance.to(
          el,
          {
            opacity: LAYERS[i].opacity,
            scale: 1,
            duration: 1.4,
            ease: "expo.out",
          },
          0.1 + i * 0.12
        );
      });

      /* ─── Scroll timeline ─── */
      const scroll = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          pin: sceneRef.current,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress;
          },
        },
      });

      /* Phase 1: Zoom through layers (0% → 55%) */
      scroll.to(
        cameraRef.current,
        { z: 2600, duration: 0.55, ease: "none" },
        0
      );

      // Each layer: flash → scale up → vanish
      layerRefs.current.forEach((el, i) => {
        if (!el) return;
        const flash = flashRefs.current[i];
        const depth = Math.abs(LAYERS[i].z);
        const passTime = (depth / 2600) * 0.52;

        // Layer brightens as camera approaches
        scroll.to(
          el,
          {
            opacity: LAYERS[i].opacity * 3,
            duration: 0.06,
            ease: "power2.in",
          },
          Math.max(0, passTime - 0.06)
        );

        // Flash!
        if (flash) {
          scroll.to(
            flash,
            { opacity: 0.8, duration: 0.02, ease: "none" },
            passTime
          );
          scroll.to(
            flash,
            { opacity: 0, duration: 0.04, ease: "power2.out" },
            passTime + 0.02
          );
        }

        // Fly past
        scroll.to(
          el,
          {
            scale: 4,
            opacity: 0,
            duration: 0.08,
            ease: "power3.in",
          },
          passTime
        );
      });

      /* Phase 2: IMPACT — energy converges (53% → 62%) */
      // The CSS glow pulses (particles handle canvas glow separately)
      if (impact) {
        // Glow builds
        scroll.to(
          impact,
          { opacity: 1, scale: 1.5, duration: 0.05, ease: "power2.in" },
          0.51
        );
        // Peak flash
        scroll.to(
          impact,
          { scale: 3, opacity: 0.8, duration: 0.03, ease: "none" },
          0.56
        );
        // Glow expands and fades
        scroll.to(
          impact,
          { scale: 5, opacity: 0, duration: 0.08, ease: "expo.out" },
          0.59
        );
      }

      /* Phase 3: Brand MATERIALIZES from the energy (60% → 80%) */
      if (brand) {
        scroll.to(
          brand,
          {
            opacity: 1,
            scale: 1,
            duration: 0.18,
            ease: "expo.out",
          },
          0.60
        );
      }

      /* Phase 4: Details reveal (80% → 95%) */
      if (tagline) {
        scroll.to(
          tagline,
          { opacity: 1, y: 0, duration: 0.08, ease: "expo.out" },
          0.80
        );
      }

      if (subtitle) {
        scroll.to(
          subtitle,
          { opacity: 1, y: 0, duration: 0.08, ease: "expo.out" },
          0.85
        );
      }

      if (line) {
        scroll.to(
          line,
          { scaleX: 1, opacity: 1, duration: 0.08, ease: "expo.out" },
          0.88
        );
      }

      /* Phase 5: CTA invitation (92% → 100%) */
      if (cta) {
        scroll.to(
          cta,
          { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" },
          0.92
        );
      }
    },
    { scope: wrapRef }
  );

  return (
    <>
      <link
        href="https://api.fontshare.com/v2/css?f[]=clash-display@300,400,500,600,700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://api.fontshare.com/v2/css?f[]=instrument-serif@400,400i&display=swap"
        rel="stylesheet"
      />

      <div
        ref={wrapRef}
        style={{
          height: "500vh",
          background: DARK,
          position: "relative",
          overflowX: "hidden",
          cursor: isMobile ? "auto" : "none",
        }}
      >
        {/* Custom cursor (desktop only) */}
        {!isMobile && (
          <>
            <div
              ref={cursorGlowRef}
              style={{
                position: "fixed",
                top: -40,
                left: -40,
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${ORANGE}15 0%, transparent 70%)`,
                pointerEvents: "none",
                zIndex: 9998,
              }}
            />
            <div
              ref={cursorRef}
              style={{
                position: "fixed",
                top: -14,
                left: -14,
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: `1.5px solid ${ORANGE}`,
                pointerEvents: "none",
                zIndex: 9999,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: ORANGE,
                  transform: "translate(-50%, -50%)",
                }}
              />
            </div>
          </>
        )}

        {/* Pinned scene */}
        <div
          ref={sceneRef}
          style={{
            width: "100vw",
            height: "100vh",
            position: "relative",
            overflow: "hidden",
            background: DARK,
          }}
        >
          {/* Ambient particles (scroll-aware) */}
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              pointerEvents: "none",
            }}
          />

          {/* 3D perspective container */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              perspective: "1200px",
              perspectiveOrigin: "50% 50%",
              zIndex: 2,
            }}
          >
            <div
              ref={cameraRef}
              style={{
                width: "100%",
                height: "100%",
                transformStyle: "preserve-3d",
                position: "relative",
              }}
            >
              {/* Typography layers */}
              {LAYERS.map((layer, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    inset: 0,
                    transformStyle: "preserve-3d",
                    transform: `translateZ(${layer.z}px)`,
                    pointerEvents: "none",
                  }}
                >
                  {/* Flash overlay for this layer */}
                  <div
                    ref={(el) => {
                      flashRefs.current[i] = el;
                    }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        layer.color === ORANGE
                          ? `radial-gradient(circle, ${ORANGE}40 0%, transparent 60%)`
                          : `radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%)`,
                      opacity: 0,
                      pointerEvents: "none",
                    }}
                  />
                  {/* Text */}
                  <div
                    ref={(el) => {
                      layerRefs.current[i] = el;
                    }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: `translateX(${layer.x}) translateY(${layer.y}) rotate(${layer.rotate}deg)`,
                      opacity: 0,
                      willChange: "transform, opacity",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Clash Display', sans-serif",
                        fontSize: layer.size,
                        fontWeight: layer.weight,
                        color: layer.color,
                        filter: `blur(${layer.blur}px)`,
                        textShadow: `0 0 60px ${layer.glow}, 0 0 120px ${layer.glow}`,
                        letterSpacing: "-0.02em",
                        lineHeight: 0.9,
                        userSelect: "none",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {layer.text}
                    </span>
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* Impact glow — OUTSIDE 3D to avoid camera z-clip */}
          <div
            ref={impactRef}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "50vmin",
              height: "50vmin",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${ORANGE}80 0%, ${ORANGE}30 35%, ${ORANGE}08 60%, transparent 80%)`,
              opacity: 0,
              pointerEvents: "none",
              zIndex: 8,
              filter: "blur(30px)",
            }}
          />

          {/* Brand overlay — OUTSIDE 3D, unaffected by camera zoom */}
          <div
            ref={brandRef}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              opacity: 0,
              willChange: "transform, opacity",
            }}
          >
            <div
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: "clamp(48px, 12vw, 180px)",
                fontWeight: 700,
                color: LIGHT,
                letterSpacing: "-0.04em",
                lineHeight: 0.85,
                textAlign: "center",
                textShadow: `0 0 80px rgba(255,255,255,0.08)`,
              }}
            >
              {BRAND.line1}
            </div>
            <div
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(36px, 8vw, 120px)",
                fontWeight: 400,
                fontStyle: "italic",
                color: ORANGE,
                letterSpacing: "0.02em",
                lineHeight: 1,
                marginTop: "-0.5vw",
                textAlign: "center",
                textShadow: `0 0 60px rgba(255,107,0,0.3), 0 0 120px rgba(255,107,0,0.1)`,
              }}
            >
              {BRAND.line2}
            </div>

            <div
              ref={taglineRef}
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: "clamp(14px, 2vw, 28px)",
                fontWeight: 500,
                color: LIGHT,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginTop: "clamp(24px, 4vh, 48px)",
                opacity: 0,
              }}
            >
              {BRAND.tagline}
            </div>

            <div
              ref={subtitleRef}
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(12px, 1.4vw, 20px)",
                fontWeight: 400,
                fontStyle: "italic",
                color: `${LIGHT}88`,
                marginTop: "clamp(8px, 1.5vh, 16px)",
                opacity: 0,
              }}
            >
              {BRAND.subtitle}
            </div>

            <div
              ref={lineRef}
              style={{
                width: "clamp(40px, 6vw, 80px)",
                height: 2,
                background: ORANGE,
                marginTop: "clamp(20px, 3vh, 40px)",
                borderRadius: 1,
                transformOrigin: "center",
                opacity: 0,
              }}
            />

            {/* CTA — choreographic ending */}
            <div
              ref={ctaRef}
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: "clamp(11px, 1.1vw, 15px)",
                fontWeight: 400,
                color: ORANGE,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                marginTop: "clamp(32px, 5vh, 64px)",
                opacity: 0,
                display: "flex",
                alignItems: "center",
                gap: 12,
                pointerEvents: "auto",
                cursor: "pointer",
                transition: "letter-spacing 0.4s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.letterSpacing = "0.4em";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.letterSpacing = "0.25em";
              }}
            >
              <span>Erlebnis starten</span>
              <span
                style={{
                  display: "inline-block",
                  width: 24,
                  height: 1,
                  background: ORANGE,
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    right: 0,
                    top: -3,
                    width: 7,
                    height: 7,
                    borderRight: `1px solid ${ORANGE}`,
                    borderTop: `1px solid ${ORANGE}`,
                    transform: "rotate(45deg)",
                  }}
                />
              </span>
            </div>
          </div>

          {/* Scroll hint */}
          <div
            style={{
              position: "absolute",
              bottom: "clamp(20px, 4vh, 40px)",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              opacity: 0.3,
              zIndex: 20,
            }}
          >
            <span
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: 10,
                fontWeight: 500,
                color: LIGHT,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              {isMobile ? "Scroll" : "Scroll & Move"}
            </span>
            <div
              style={{
                width: 1,
                height: 28,
                background: `linear-gradient(to bottom, ${ORANGE}, transparent)`,
              }}
            />
          </div>

          {/* Vignette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
              pointerEvents: "none",
              zIndex: 15,
            }}
          />

          {/* Grain */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`,
              backgroundRepeat: "repeat",
              backgroundSize: "256px 256px",
              pointerEvents: "none",
              zIndex: 16,
              opacity: 0.4,
            }}
          />
        </div>
      </div>
    </>
  );
}
