"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { Playfair_Display, Space_Mono } from "next/font/google";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   hero-v021-a: EMERGENCE — Editorial Narrative + WebGL Signature

   PARADIGM SYNTHESIS: Content-driven narrative (v020) meets
   ONE WebGL signature moment (v015-v018).

   THE CONCEPT: Brand identity EMERGES from noise/chaos.
   As you scroll, the WebGL noise field calms, and the brand
   text becomes readable. Chaos → Clarity = our brand promise.

   CHOREOGRAPHY:
   Phase 1 — CHAOS (0-25%): Full noise field, nothing readable
   Phase 2 — EMERGENCE (25-60%): Noise calms, "WIR CODIEREN" emerges char-by-char
   Phase 3 — CLARITY (60-85%): "ERLEBNISSE" appears, noise becomes ambient
   Phase 4 — RESOLVE (85-100%): Clean, editorial. Ready for content.

   Then: Editorial services with restraint (01/02/03, serif + mono)

   SIGNATURE MOMENT: The emergence itself — text appearing
   through a living, breathing noise field.

   Palette: #0A0A0A + #FF6B00 (2 colors only)
   Fonts: Playfair Display (editorial serif) + Space Mono (tech)
   Tech: react-three-fiber shader + GSAP ScrollTrigger + Lenis

   Inspiration: Adam Bricker SOTD (2 colors, content-driven)
   + Unseen Studio (editorial restraint) + v015 (WebGL shader)
   ═══════════════════════════════════════════════════════════ */

const NoiseField = dynamic(
  () => import("./NoiseField").then((m) => ({ default: m.NoiseField })),
  { ssr: false },
);

/* ─── Fonts ─── */
const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

/* ─── Palette ─── */
const O = "#FF6B00";
const D = "#0A0A0A";
const L = "#F5F5F5";
const M = "#666666";

/* ─── Brand Content ─── */
const SERVICES = [
  {
    num: "01",
    title: "Webdesign &\nEntwicklung",
    desc: "Jede Seite ein Unikat. Von der ersten Idee bis zum fertigen Deployment.",
    tags: ["Next.js", "GSAP", "Responsive", "Performance"],
  },
  {
    num: "02",
    title: "KI-\nIntegration",
    desc: "Künstliche Intelligenz dort wo sie echten Mehrwert bringt.",
    tags: ["Claude API", "Automatisierung", "Custom AI"],
  },
  {
    num: "03",
    title: "Creative\nDevelopment",
    desc: "WebGL, 3D, Shader — wir bringen das Web zum Leben.",
    tags: ["Three.js", "WebGL", "Scroll-Storytelling"],
  },
];

export default function EmergenceHero() {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  /* Refs for WebGL communication */
  const progressRef = useRef({ value: 0 });
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  /* Text element refs */
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);

  /* ─── Mouse tracking ─── */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = {
      x: e.clientX / window.innerWidth,
      y: 1 - e.clientY / window.innerHeight,
    };
  }, []);

  useEffect(() => {
    setMounted(true);
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  /* ─── Lenis Smooth Scroll ─── */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);

    return () => lenis.destroy();
  }, []);

  /* ─── GSAP Choreography ─── */
  useGSAP(
    () => {
      if (!heroRef.current) return;

      /* ── Hero Pin + Scroll Progress ── */
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          progressRef.current.value = self.progress;
        },
      });

      /* ── Phase 2: "WIR CODIEREN" emerges (20-45%) ── */
      if (line1Ref.current) {
        const chars1 = line1Ref.current.querySelectorAll(".char");

        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=300%",
            scrub: 0.8,
          },
        });

        tl1.fromTo(
          chars1,
          {
            opacity: 0,
            y: 80,
            rotateX: -45,
            filter: "blur(16px)",
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            stagger: 0.03,
            ease: "power3.out",
            duration: 0.25,
          },
          0.2, // starts at 20%
        );
      }

      /* ── Phase 3: "ERLEBNISSE" emerges (45-70%) ── */
      if (line2Ref.current) {
        const chars2 = line2Ref.current.querySelectorAll(".char");

        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=300%",
            scrub: 0.8,
          },
        });

        tl2.fromTo(
          chars2,
          {
            opacity: 0,
            y: 100,
            scale: 0.8,
            filter: "blur(20px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            stagger: 0.035,
            ease: "expo.out",
            duration: 0.3,
          },
          0.45,
        );
      }

      /* ── Tagline appears (65-80%) ── */
      if (taglineRef.current) {
        const tl3 = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=300%",
            scrub: 0.8,
          },
        });

        tl3.fromTo(
          taglineRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, ease: "power2.out", duration: 0.15 },
          0.65,
        );
      }

      /* ── Scroll hint fades out ── */
      if (scrollHintRef.current) {
        const tlHint = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=300%",
            scrub: 0.8,
          },
        });

        tlHint.to(
          scrollHintRef.current,
          { opacity: 0, y: -20, duration: 0.1 },
          0.15,
        );
      }

      /* ── Services Section Reveals ── */
      if (servicesRef.current) {
        const cards = servicesRef.current.querySelectorAll(".service-card");
        cards.forEach((card, i) => {
          const num = card.querySelector(".service-num");
          const title = card.querySelector(".service-title");
          const desc = card.querySelector(".service-desc");
          const tags = card.querySelector(".service-tags");
          const line = card.querySelector(".service-line");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
              once: true,
            },
          });

          tl.from(line, {
            scaleX: 0,
            transformOrigin: "left",
            duration: 0.8,
            ease: "expo.out",
          })
            .from(
              num,
              { opacity: 0, x: -40, duration: 0.6, ease: "expo.out" },
              0.1,
            )
            .from(
              title,
              {
                opacity: 0,
                y: 50,
                filter: "blur(8px)",
                duration: 0.8,
                ease: "expo.out",
              },
              0.2,
            )
            .from(
              desc,
              { opacity: 0, y: 30, duration: 0.6, ease: "power2.out" },
              0.4,
            )
            .from(
              tags,
              { opacity: 0, y: 20, duration: 0.5, ease: "power2.out" },
              0.5,
            );
        });
      }

      /* ── CTA reveal ── */
      if (ctaRef.current) {
        const words = ctaRef.current.querySelectorAll(".cta-word");
        gsap.from(words, {
          opacity: 0,
          y: 60,
          rotateX: -30,
          stagger: 0.1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }
    },
    { scope: mainRef },
  );

  /* ─── Char splitting helper ─── */
  const splitChars = (text: string) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className="char"
        style={{
          display: "inline-block",
          willChange: "transform, opacity, filter",
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  const splitWords = (text: string) =>
    text.split(" ").map((word, i) => (
      <span
        key={i}
        className="cta-word"
        style={{
          display: "inline-block",
          marginRight: "0.3em",
          willChange: "transform, opacity",
        }}
      >
        {word}
      </span>
    ));

  return (
    <div
      ref={mainRef}
      style={{
        background: D,
        color: L,
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* ═══ WebGL Noise Background ═══ */}
      {mounted && (
        <NoiseField progressRef={progressRef} mouseRef={mouseRef} />
      )}

      {/* ═══ Film Grain Overlay ═══ */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 2,
          pointerEvents: "none",
          opacity: 0.04,
        }}
      >
        <svg width="100%" height="100%">
          <filter id="grain-v021">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-v021)" />
        </svg>
      </div>

      {/* ═══ HERO — Pinned Emergence Section ═══ */}
      <section
        ref={heroRef}
        style={{
          height: "100vh",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 3,
        }}
      >
        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          className={mono.className}
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: M,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span>Scroll to reveal</span>
          <div
            style={{
              width: 1,
              height: 40,
              background: `linear-gradient(to bottom, ${M}, transparent)`,
              animation: "pulse-line 2s ease-in-out infinite",
            }}
          />
        </div>

        {/* Main headline container */}
        <div
          style={{
            textAlign: "center",
            padding: "0 5vw",
            maxWidth: 1400,
          }}
        >
          {/* Line 1: WIR CODIEREN */}
          <div
            ref={line1Ref}
            className={playfair.className}
            style={{
              fontSize: "clamp(3rem, 10vw, 9rem)",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              marginBottom: "0.1em",
              perspective: "800px",
            }}
          >
            {splitChars("WIR CODIEREN")}
          </div>

          {/* Line 2: ERLEBNISSE */}
          <div
            ref={line2Ref}
            className={playfair.className}
            style={{
              fontSize: "clamp(3.5rem, 12vw, 11rem)",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              color: O,
              fontStyle: "italic",
            }}
          >
            {splitChars("ERLEBNISSE")}
          </div>

          {/* Tagline */}
          <div
            ref={taglineRef}
            className={mono.className}
            style={{
              fontSize: "clamp(0.7rem, 1.2vw, 1rem)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: M,
              marginTop: "2em",
              opacity: 0,
            }}
          >
            Webdesign · KI-Integration · Creative Development
          </div>
        </div>
      </section>

      {/* ═══ SERVICES — Editorial with restraint ═══ */}
      <section
        ref={servicesRef}
        style={{
          position: "relative",
          zIndex: 5,
          background: D,
          padding: "15vh 0 10vh",
        }}
      >
        {/* Section label */}
        <div
          className={mono.className}
          style={{
            padding: "0 8vw",
            marginBottom: "8vh",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: O,
          }}
        >
          Was wir tun
        </div>

        {/* Service cards */}
        {SERVICES.map((svc, i) => (
          <div
            key={i}
            className="service-card"
            style={{
              padding: "6vh 8vw",
              position: "relative",
            }}
          >
            {/* Top line */}
            <div
              className="service-line"
              style={{
                height: 1,
                background: `linear-gradient(to right, ${O}, transparent 60%)`,
                marginBottom: "4vh",
              }}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "4vw",
                alignItems: "start",
              }}
            >
              {/* Number */}
              <div
                className="service-num"
                style={{
                  fontFamily: playfair.style.fontFamily,
                  fontSize: "clamp(4rem, 8vw, 8rem)",
                  fontWeight: 400,
                  lineHeight: 1,
                  color: "transparent",
                  WebkitTextStroke: `1px ${O}`,
                  opacity: 0.4,
                }}
              >
                {svc.num}
              </div>

              {/* Content */}
              <div>
                <h3
                  className={`service-title ${playfair.className}`}
                  style={{
                    fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                    fontWeight: 700,
                    lineHeight: 1.1,
                    marginBottom: "1em",
                    whiteSpace: "pre-line",
                  }}
                >
                  {svc.title}
                </h3>
                <p
                  className={`service-desc ${mono.className}`}
                  style={{
                    fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
                    lineHeight: 1.7,
                    color: M,
                    maxWidth: 500,
                    marginBottom: "1.5em",
                  }}
                >
                  {svc.desc}
                </p>
                <div
                  className={`service-tags ${mono.className}`}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5em",
                  }}
                >
                  {svc.tags.map((tag, j) => (
                    <span
                      key={j}
                      style={{
                        fontSize: "0.7rem",
                        letterSpacing: "0.1em",
                        padding: "0.4em 0.8em",
                        border: `1px solid ${O}33`,
                        color: O,
                        textTransform: "uppercase",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ═══ CTA — Close ═══ */}
      <section
        ref={ctaRef}
        style={{
          position: "relative",
          zIndex: 5,
          background: D,
          padding: "15vh 8vw 20vh",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          <p
            className={playfair.className}
            style={{
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              overflow: "hidden",
            }}
          >
            {splitWords("Das 1% das im Kopf bleibt.")}
          </p>

          <div
            style={{
              marginTop: "3em",
              display: "inline-flex",
              alignItems: "center",
              gap: "1em",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: O,
                display: "inline-block",
                animation: "pulse-dot 2s ease-in-out infinite",
              }}
            />
            <span
              className={mono.className}
              style={{
                fontSize: "0.8rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: M,
              }}
            >
              pixintcreators.de
            </span>
          </div>
        </div>
      </section>

      {/* ═══ Animations ═══ */}
      <style jsx global>{`
        @keyframes pulse-line {
          0%,
          100% {
            opacity: 0.3;
            transform: scaleY(1);
          }
          50% {
            opacity: 1;
            transform: scaleY(1.2);
          }
        }
        @keyframes pulse-dot {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.4);
            opacity: 1;
          }
        }
        html {
          scroll-behavior: auto !important;
        }
        body {
          overscroll-behavior: none;
        }
      `}</style>
    </div>
  );
}
