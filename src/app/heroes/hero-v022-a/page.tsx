"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { Playfair_Display, Space_Mono } from "next/font/google";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   hero-v022-a: PIXEL JOURNEY — The Pixel as Persistent Character

   CONCEPT (Chris, 24.03.2026):
   A single pixel is born from a typing cursor, then transforms
   through every section of a horizontal scroll experience.

   Cursor → Pixel → Dot → Line → Background → Card → Returns

   The pixel IS the brand: Pixelizing Intelligence.
   Every transformation serves the narrative.

   CHOREOGRAPHY:
   Panel 0: GENESIS — brand typed, cursor shrinks to pixel
   Panel 1: PIXEL AS DOT — accent at left margin (Webdesign)
   Panel 2: PIXEL AS LINE — horizontal divider (KI-Integration)
   Panel 3: PIXEL AS BACKGROUND — fills viewport orange (Creative Dev)
   Panel 4: PIXEL AS CARD — brand quote card
   Panel 5: PIXEL RETURNS — small dot, CTA

   Palette: #0A0A0A + #FF6B00 + #F5F5F5
   Fonts: Playfair Display (serif) + Space Mono (tech)
   Tech: GSAP ScrollTrigger (scrub), Lenis, horizontal scroll
   ═══════════════════════════════════════════════════════════════ */

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
const M = "#555555";

/* ─── Content ─── */
const PANEL_COUNT = 6;
const BRAND_LINE1 = "PIXINT";
const BRAND_LINE2 = "CREATORS";
const TAGLINE = "Pixelizing Intelligence";

const SERVICES = [
  {
    num: "01",
    title: "Webdesign &\nEntwicklung",
    desc: "Jede Seite ein Unikat. Kein Template, kein Baukasten — von der ersten Idee bis zum fertigen Deployment.",
    tags: ["Responsive", "Scroll-Animationen", "Performance", "SEO"],
  },
  {
    num: "02",
    title: "KI-\nIntegration",
    desc: "Künstliche Intelligenz dort wo sie echten Mehrwert bringt. Nicht als Buzzword — als Werkzeug.",
    tags: ["Chatbots", "Automatisierung", "Content-KI", "Custom AI"],
  },
  {
    num: "03",
    title: "Creative\nDevelopment",
    desc: "WebGL, 3D, Shader, Partikel — wir bringen das Web zum Leben. Für Marken die auffallen wollen.",
    tags: ["Three.js", "WebGL", "Scroll-Storytelling", "Generative Art"],
  },
];

export default function PixelJourney() {
  const mainRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pixelRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  /* ═══════════════════════════
     Lenis Smooth Scroll
     ═══════════════════════════ */
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 1.2 });
    const raf = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  /* ═══════════════════════════
     Phase 1: Typing Animation
     Plays once on mount, then enables scroll
     ═══════════════════════════ */
  useEffect(() => {
    const pixel = pixelRef.current;
    const cursor = cursorRef.current;
    if (!pixel || !cursor) return;

    const brandChars = gsap.utils.toArray<HTMLElement>(".pj-brand-char");
    const tagChars = gsap.utils.toArray<HTMLElement>(".pj-tag-char");

    // Initial states
    gsap.set(brandChars, { y: 120, opacity: 0 });
    gsap.set(tagChars, { opacity: 0 });
    gsap.set(cursor, { opacity: 0 });
    gsap.set(pixel, { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.4 });

    // Brand name reveal (char-by-char, expo.out)
    tl.to(brandChars, {
      y: 0,
      opacity: 1,
      duration: 1.0,
      stagger: 0.04,
      ease: "expo.out",
    });

    // Cursor appears, tagline types character by character
    tl.set(cursor, { opacity: 1 }, "+=0.3");
    tagChars.forEach((_, i) => {
      tl.set(tagChars[i], { opacity: 1 }, `>+${i === 0 ? 0.05 : 0.06}`);
    });

    // Pause with blinking cursor
    tl.to({}, { duration: 0.6 });

    // Cursor → Pixel transformation
    tl.call(() => {
      const rect = cursor.getBoundingClientRect();
      gsap.set(pixel, {
        x: rect.left + rect.width / 2 - 6,
        y: rect.top + rect.height / 2 - 6,
        width: 12,
        height: 12,
        opacity: 1,
      });
      gsap.set(cursor, { opacity: 0 });
    });

    // Pixel birth pulse
    tl.fromTo(
      pixel,
      { scale: 0.5 },
      { scale: 1.6, duration: 0.2, ease: "power2.out" }
    );
    tl.to(pixel, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });

    // Pixel floats to center-below (resting position)
    tl.to(
      pixel,
      {
        x: window.innerWidth / 2 - 6,
        y: window.innerHeight * 0.62,
        duration: 0.7,
        ease: "power3.inOut",
      },
      "+=0.15"
    );

    // Show scroll hint
    tl.to(".pj-scroll-hint", { opacity: 1, duration: 0.5 }, "-=0.3");

    // Enable scroll phase
    tl.call(() => setReady(true));

    return () => { tl.kill(); };
  }, []);

  /* ═══════════════════════════════════════════════
     Phase 2: Horizontal Scroll + Pixel Journey
     One master timeline drives everything
     ═══════════════════════════════════════════════ */
  useGSAP(
    () => {
      if (!ready) return;

      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      const pixel = pixelRef.current;
      const progress = progressRef.current;
      if (!wrapper || !track || !pixel) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const totalScroll = track.scrollWidth - vw;

      /* ── Hide panel content (revealed by scroll) ── */
      gsap.set(
        [
          ".pj-s1-num",
          ".pj-s1-title",
          ".pj-s1-desc",
          ".pj-s1-tags",
          ".pj-s2-num",
          ".pj-s2-title",
          ".pj-s2-desc",
          ".pj-s2-tags",
          ".pj-s3-num",
          ".pj-s3-title",
          ".pj-s3-desc",
          ".pj-s3-tags",
          ".pj-close-text",
          ".pj-close-cta",
        ],
        { opacity: 0, y: 50 }
      );
      gsap.set([".pj-s1-accent", ".pj-s2-accent"], {
        scaleX: 0,
        transformOrigin: "left",
      });

      /* ═══════════════════════════════════
         MASTER TIMELINE
         Duration: 5 units (6 panels, 5 transitions)
         t=0: Panel 0 centered
         t=1: Panel 1 centered
         t=2: Panel 2 centered
         t=3: Panel 3 centered
         t=4: Panel 4 centered
         t=5: Panel 5 centered
         ═══════════════════════════════════ */
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          scrub: 1,
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
        },
      });

      // Track horizontal slide (full duration)
      master.to(
        track,
        {
          x: () => -(track.scrollWidth - vw),
          ease: "none",
          duration: 5,
        },
        0
      );

      // Progress bar
      if (progress) {
        master.to(progress, { scaleX: 1, ease: "none", duration: 5 }, 0);
      }

      // Scroll hint fades immediately
      master.to(".pj-scroll-hint", { opacity: 0, duration: 0.2 }, 0);

      /* ═══════════════════════════════════
         THE PIXEL JOURNEY
         ═══════════════════════════════════ */

      /* ── Panel 0→1: Pixel from center to LEFT MARGIN (DOT) ── */
      master.to(
        pixel,
        {
          x: vw * 0.06,
          y: vh * 0.44,
          width: 10,
          height: 10,
          duration: 0.5,
          ease: "power3.inOut",
        },
        0.5
      );

      /* ── Panel 1 content reveal: Webdesign ── */
      master.to(
        ".pj-s1-num",
        { y: 0, opacity: 1, duration: 0.35, ease: "expo.out" },
        0.75
      );
      master.to(
        ".pj-s1-title",
        { y: 0, opacity: 1, duration: 0.3, ease: "expo.out" },
        0.85
      );
      master.to(
        ".pj-s1-desc",
        { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" },
        0.95
      );
      master.to(
        ".pj-s1-accent",
        { scaleX: 1, duration: 0.3, ease: "power4.inOut" },
        1.0
      );
      master.to(
        ".pj-s1-tags",
        { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" },
        1.05
      );

      /* ── Panel 1→2: Pixel stretches to LINE ── */
      master.to(
        pixel,
        {
          x: vw * 0.12,
          y: vh * 0.5 - 1,
          width: vw * 0.35,
          height: 2,
          borderRadius: 1,
          duration: 0.4,
          ease: "power3.inOut",
        },
        1.55
      );

      /* ── Panel 2 content reveal: KI-Integration ── */
      master.to(
        ".pj-s2-num",
        { y: 0, opacity: 1, duration: 0.35, ease: "expo.out" },
        1.75
      );
      master.to(
        ".pj-s2-title",
        { y: 0, opacity: 1, duration: 0.3, ease: "expo.out" },
        1.85
      );
      master.to(
        ".pj-s2-desc",
        { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" },
        1.95
      );
      master.to(
        ".pj-s2-accent",
        { scaleX: 1, duration: 0.3, ease: "power4.inOut" },
        2.0
      );
      master.to(
        ".pj-s2-tags",
        { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" },
        2.05
      );

      /* ── Panel 2→3: Pixel EXPANDS to BACKGROUND (WOW MOMENT) ── */
      master.to(
        pixel,
        {
          x: 0,
          y: 0,
          width: vw,
          height: vh,
          borderRadius: 0,
          duration: 0.5,
          ease: "power4.inOut",
        },
        2.5
      );

      /* ── Panel 3 content: Creative Dev (inside pixel) ── */
      master.to(".pj-bg-content", { opacity: 1, duration: 0.25 }, 2.75);
      master.to(
        ".pj-s3-num",
        { y: 0, opacity: 1, duration: 0.35, ease: "expo.out" },
        2.8
      );
      master.to(
        ".pj-s3-title",
        { y: 0, opacity: 1, duration: 0.3, ease: "expo.out" },
        2.9
      );
      master.to(
        ".pj-s3-desc",
        { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" },
        3.0
      );
      master.to(
        ".pj-s3-tags",
        { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" },
        3.05
      );

      /* ── Panel 3→4: Pixel SHRINKS to CARD ── */
      master.to(".pj-bg-content", { opacity: 0, duration: 0.15 }, 3.4);

      const cardW = Math.min(480, vw * 0.85);
      const cardH = 260;
      master.to(
        pixel,
        {
          x: (vw - cardW) / 2,
          y: (vh - cardH) / 2,
          width: cardW,
          height: cardH,
          borderRadius: 16,
          duration: 0.45,
          ease: "power3.inOut",
        },
        3.5
      );

      /* ── Panel 4: Card content fades in ── */
      master.to(".pj-card-content", { opacity: 1, duration: 0.25 }, 3.8);

      /* ── Panel 4→5: Pixel RETURNS to center (small) ── */
      master.to(".pj-card-content", { opacity: 0, duration: 0.15 }, 4.35);
      master.to(
        pixel,
        {
          x: vw / 2 - 6,
          y: vh / 2 + 50,
          width: 12,
          height: 12,
          borderRadius: 0,
          duration: 0.5,
          ease: "power3.inOut",
        },
        4.45
      );

      /* ── Panel 5 content reveal: CTA ── */
      master.to(
        ".pj-close-text",
        { y: 0, opacity: 1, duration: 0.35, ease: "expo.out" },
        4.65
      );
      master.to(
        ".pj-close-cta",
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
        4.85
      );

      /* ── Final pixel pulse ── */
      master.to(pixel, { scale: 1.8, duration: 0.08 }, 4.92);
      master.to(pixel, { scale: 1, duration: 0.1, ease: "power2.out" }, 5.0);
    },
    { scope: mainRef, dependencies: [ready] }
  );

  /* ═══════════════════════════════════
     JSX — The Experience
     ═══════════════════════════════════ */
  return (
    <div ref={mainRef} style={{ background: D, overflowX: "hidden" }}>
      {/* Cursor blink animation */}
      <style>{`
        @keyframes pj-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .pj-cursor { animation: pj-blink 0.7s step-end infinite; }
      `}</style>

      {/* ── Progress Bar ── */}
      <div
        ref={progressRef}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 2,
          background: O,
          transformOrigin: "left",
          transform: "scaleX(0)",
          zIndex: 200,
        }}
      />

      {/* ── Grain Overlay ── */}
      <svg
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 150,
          opacity: 0.035,
        }}
      >
        <filter id="pj-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#pj-grain)" />
      </svg>

      {/* ═══════════════════════════════════
         THE PIXEL — Persistent Character
         Fixed position, transforms through scroll
         ═══════════════════════════════════ */}
      <div
        ref={pixelRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 12,
          height: 12,
          backgroundColor: O,
          borderRadius: 0,
          zIndex: 100,
          pointerEvents: "none",
          overflow: "hidden",
          willChange: "transform, width, height",
        }}
      >
        {/* ── Background Phase Content (Panel 3: Creative Dev) ── */}
        <div
          className="pj-bg-content"
          style={{
            opacity: 0,
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "0 8vw",
          }}
        >
          <span
            className="pj-s3-num"
            style={{
              fontFamily: playfair.style.fontFamily,
              fontSize: "clamp(6rem, 12vw, 14rem)",
              fontWeight: 400,
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(255,255,255,0.3)",
              lineHeight: 0.85,
              userSelect: "none",
              marginBottom: "1.5rem",
            }}
          >
            03
          </span>
          <h2
            className="pj-s3-title"
            style={{
              fontFamily: playfair.style.fontFamily,
              fontSize: "clamp(2rem, 4vw, 4rem)",
              fontWeight: 400,
              color: "#fff",
              lineHeight: 1.15,
              whiteSpace: "pre-line",
              margin: "0 0 1.5rem 0",
            }}
          >
            {"Creative\nDevelopment"}
          </h2>
          <p
            className="pj-s3-desc"
            style={{
              fontFamily: mono.style.fontFamily,
              fontSize: "clamp(0.75rem, 0.9vw, 0.95rem)",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.7,
              maxWidth: 500,
              margin: "0 0 2rem 0",
            }}
          >
            {SERVICES[2].desc}
          </p>
          <div
            className="pj-s3-tags"
            style={{
              display: "flex",
              gap: "1.5rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {SERVICES[2].tags.map((tag, j) => (
              <span
                key={j}
                style={{
                  fontFamily: mono.style.fontFamily,
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── Card Phase Content (Panel 4: Brand Quote) ── */}
        <div
          className="pj-card-content"
          style={{
            opacity: 0,
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <p
            style={{
              fontFamily: playfair.style.fontFamily,
              fontSize: "clamp(1.1rem, 1.8vw, 1.6rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: D,
              lineHeight: 1.5,
              margin: "0 0 1rem 0",
            }}
          >
            &ldquo;Pixelizing Intelligence.
            <br />
            Creating Something Great.&rdquo;
          </p>
          <span
            style={{
              fontFamily: mono.style.fontFamily,
              fontSize: "0.65rem",
              color: `${D}77`,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            PixIntCreators
          </span>
        </div>
      </div>

      {/* ═══════════════════════════════════
         HORIZONTAL TRACK
         6 panels, 100vw each
         ═══════════════════════════════════ */}
      <div ref={wrapperRef}>
        <div
          ref={trackRef}
          style={{
            display: "flex",
            width: `${PANEL_COUNT * 100}vw`,
            height: "100vh",
            willChange: "transform",
          }}
        >
          {/* ════════════════════════════════════
              Panel 0: GENESIS — Typing + Pixel Birth
              ════════════════════════════════════ */}
          <section
            style={{
              width: "100vw",
              height: "100vh",
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* Top labels */}
            <span
              style={{
                position: "absolute",
                top: "5vh",
                left: "8vw",
                fontFamily: mono.style.fontFamily,
                fontSize: "0.7rem",
                color: M,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Kreativ-Agentur
            </span>
            <span
              style={{
                position: "absolute",
                top: "5vh",
                right: "8vw",
                fontFamily: mono.style.fontFamily,
                fontSize: "0.7rem",
                color: M,
                letterSpacing: "0.2em",
              }}
            >
              &copy; 2026
            </span>

            {/* Brand Name — char-by-char reveal */}
            <h1
              style={{
                fontFamily: playfair.style.fontFamily,
                fontSize: "clamp(3rem, 8vw, 8rem)",
                fontWeight: 400,
                color: L,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                textAlign: "center",
                margin: 0,
              }}
            >
              <span style={{ display: "block", overflow: "hidden" }}>
                {BRAND_LINE1.split("").map((c, i) => (
                  <span
                    key={i}
                    className="pj-brand-char"
                    style={{ display: "inline-block" }}
                  >
                    {c}
                  </span>
                ))}
              </span>
              <span style={{ display: "block", overflow: "hidden" }}>
                {BRAND_LINE2.split("").map((c, i) => (
                  <span
                    key={`b${i}`}
                    className="pj-brand-char"
                    style={{ display: "inline-block" }}
                  >
                    {c}
                  </span>
                ))}
              </span>
            </h1>

            {/* Tagline — typed character by character */}
            <div
              style={{
                marginTop: "2rem",
                display: "flex",
                alignItems: "center",
                fontFamily: mono.style.fontFamily,
                fontSize: "clamp(0.75rem, 1vw, 0.95rem)",
                color: O,
                letterSpacing: "0.15em",
              }}
            >
              {TAGLINE.split("").map((c, i) => (
                <span
                  key={i}
                  className="pj-tag-char"
                  style={{
                    display: "inline-block",
                    whiteSpace: c === " " ? "pre" : "normal",
                  }}
                >
                  {c}
                </span>
              ))}
              <span
                ref={cursorRef}
                className="pj-cursor"
                style={{
                  display: "inline-block",
                  width: 2,
                  height: "1.2em",
                  backgroundColor: O,
                  marginLeft: 2,
                }}
              />
            </div>

            {/* Scroll hint */}
            <span
              className="pj-scroll-hint"
              style={{
                position: "absolute",
                bottom: "5vh",
                fontFamily: mono.style.fontFamily,
                fontSize: "0.65rem",
                color: `${M}88`,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                opacity: 0,
              }}
            >
              Scroll &rarr;
            </span>
          </section>

          {/* ════════════════════════════════════
              Panel 1: WEBDESIGN (pixel = dot)
              ════════════════════════════════════ */}
          <section
            style={{
              width: "100vw",
              height: "100vh",
              flexShrink: 0,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              alignItems: "center",
              padding: "0 8vw",
              position: "relative",
            }}
          >
            {/* Editorial separator */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "12vh",
                bottom: "12vh",
                width: 1,
                background: `${M}18`,
              }}
            />

            {/* Large stroke number */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                className="pj-s1-num"
                style={{
                  fontFamily: playfair.style.fontFamily,
                  fontSize: "clamp(8rem, 16vw, 20rem)",
                  fontWeight: 400,
                  color: "transparent",
                  WebkitTextStroke: `1.5px ${O}`,
                  lineHeight: 0.85,
                  userSelect: "none",
                }}
              >
                01
              </span>
            </div>

            {/* Content */}
            <div style={{ paddingLeft: "2vw" }}>
              <h2
                className="pj-s1-title"
                style={{
                  fontFamily: playfair.style.fontFamily,
                  fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
                  fontWeight: 400,
                  color: L,
                  lineHeight: 1.15,
                  whiteSpace: "pre-line",
                  margin: "0 0 1.5rem 0",
                }}
              >
                {SERVICES[0].title}
              </h2>
              <p
                className="pj-s1-desc"
                style={{
                  fontFamily: mono.style.fontFamily,
                  fontSize: "clamp(0.75rem, 0.85vw, 0.9rem)",
                  color: M,
                  lineHeight: 1.7,
                  maxWidth: 400,
                  margin: "0 0 2rem 0",
                }}
              >
                {SERVICES[0].desc}
              </p>
              <div
                className="pj-s1-accent"
                style={{
                  width: 48,
                  height: 2,
                  background: O,
                  marginBottom: "1.5rem",
                }}
              />
              <div
                className="pj-s1-tags"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {SERVICES[0].tags.map((tag, j) => (
                  <span
                    key={j}
                    style={{
                      fontFamily: mono.style.fontFamily,
                      fontSize: "0.7rem",
                      color: `${L}55`,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom label */}
            <span
              style={{
                position: "absolute",
                bottom: "5vh",
                left: "8vw",
                fontFamily: mono.style.fontFamily,
                fontSize: "0.6rem",
                color: `${M}44`,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Leistung 01 / 03
            </span>
          </section>

          {/* ════════════════════════════════════
              Panel 2: KI-INTEGRATION (pixel = line)
              ════════════════════════════════════ */}
          <section
            style={{
              width: "100vw",
              height: "100vh",
              flexShrink: 0,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              alignItems: "center",
              padding: "0 8vw",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "12vh",
                bottom: "12vh",
                width: 1,
                background: `${M}18`,
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                className="pj-s2-num"
                style={{
                  fontFamily: playfair.style.fontFamily,
                  fontSize: "clamp(8rem, 16vw, 20rem)",
                  fontWeight: 400,
                  color: "transparent",
                  WebkitTextStroke: `1.5px ${O}`,
                  lineHeight: 0.85,
                  userSelect: "none",
                }}
              >
                02
              </span>
            </div>
            <div style={{ paddingLeft: "2vw" }}>
              <h2
                className="pj-s2-title"
                style={{
                  fontFamily: playfair.style.fontFamily,
                  fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
                  fontWeight: 400,
                  color: L,
                  lineHeight: 1.15,
                  whiteSpace: "pre-line",
                  margin: "0 0 1.5rem 0",
                }}
              >
                {SERVICES[1].title}
              </h2>
              <p
                className="pj-s2-desc"
                style={{
                  fontFamily: mono.style.fontFamily,
                  fontSize: "clamp(0.75rem, 0.85vw, 0.9rem)",
                  color: M,
                  lineHeight: 1.7,
                  maxWidth: 400,
                  margin: "0 0 2rem 0",
                }}
              >
                {SERVICES[1].desc}
              </p>
              <div
                className="pj-s2-accent"
                style={{
                  width: 48,
                  height: 2,
                  background: O,
                  marginBottom: "1.5rem",
                }}
              />
              <div
                className="pj-s2-tags"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {SERVICES[1].tags.map((tag, j) => (
                  <span
                    key={j}
                    style={{
                      fontFamily: mono.style.fontFamily,
                      fontSize: "0.7rem",
                      color: `${L}55`,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <span
              style={{
                position: "absolute",
                bottom: "5vh",
                left: "8vw",
                fontFamily: mono.style.fontFamily,
                fontSize: "0.6rem",
                color: `${M}44`,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Leistung 02 / 03
            </span>
          </section>

          {/* ════════════════════════════════════
              Panel 3: CREATIVE DEV (pixel = background)
              Content lives inside the pixel element
              ════════════════════════════════════ */}
          <section
            style={{
              width: "100vw",
              height: "100vh",
              flexShrink: 0,
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                bottom: "5vh",
                left: "8vw",
                fontFamily: mono.style.fontFamily,
                fontSize: "0.6rem",
                color: `${M}44`,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Leistung 03 / 03
            </span>
          </section>

          {/* ════════════════════════════════════
              Panel 4: BRAND CARD (pixel = card)
              Content lives inside the pixel element
              ════════════════════════════════════ */}
          <section
            style={{
              width: "100vw",
              height: "100vh",
              flexShrink: 0,
              position: "relative",
            }}
          />

          {/* ════════════════════════════════════
              Panel 5: CTA — Pixel returns home
              ════════════════════════════════════ */}
          <section
            style={{
              width: "100vw",
              height: "100vh",
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "12vh",
                bottom: "12vh",
                width: 1,
                background: `${M}18`,
              }}
            />

            <h2
              className="pj-close-text"
              style={{
                fontFamily: playfair.style.fontFamily,
                fontSize: "clamp(2.5rem, 5vw, 5rem)",
                fontWeight: 400,
                color: L,
                lineHeight: 1.3,
                textAlign: "center",
                maxWidth: 800,
                margin: 0,
              }}
            >
              Bereit für
              <br />
              <span style={{ color: O }}>das 1%</span>
              <br />
              das im Kopf bleibt?
            </h2>

            <div
              className="pj-close-cta"
              style={{
                marginTop: "3rem",
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
              }}
            >
              <span
                style={{
                  fontFamily: playfair.style.fontFamily,
                  fontSize: "1.8rem",
                  color: O,
                }}
              >
                &rarr;
              </span>
              <a
                href="mailto:info@pixintcreators.de"
                style={{
                  fontFamily: mono.style.fontFamily,
                  fontSize: "clamp(0.85rem, 1vw, 1.05rem)",
                  color: L,
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  borderBottom: `1px solid ${O}55`,
                  paddingBottom: 4,
                }}
              >
                info@pixintcreators.de
              </a>
            </div>

            <span
              style={{
                position: "absolute",
                bottom: "5vh",
                fontFamily: mono.style.fontFamily,
                fontSize: "0.6rem",
                color: `${M}44`,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              PixIntCreators — Webdesign &amp; KI-Integration
            </span>
          </section>
        </div>
      </div>
    </div>
  );
}
