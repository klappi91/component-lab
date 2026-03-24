"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { Playfair_Display, Space_Mono } from "next/font/google";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   hero-v020-a: EDITORIAL REEL — Horizontal Motion Narrative

   INSPIRATION: Unseen Studio 2025 Wrapped (Awwwards SOTD 24.03.2026)

   KEY INSIGHT: Award-winning agency sites tell stories through
   content. Animation SERVES the narrative — it IS NOT the narrative.

   FUNDAMENTAL DIFFERENCE from heroes v001-v019:
   - Content-driven: actual PixIntCreators brand story
   - Editorial restraint: 2 colors, minimal effects
   - ONE motion moment per panel, not ten
   - Horizontal narrative: scroll = story progression

   Choreography:
   - Opening: char-by-char reveal (expo.out, stagger 0.04s)
   - Services: number parallax + content cascade (onEnter, once)
   - Closing: word-by-word dramatic reveal
   - Progress bar + custom cursor + grain overlay

   Palette: #0A0A0A + #FF6B00 + #F5F5F5 (black + orange + white)
   Fonts: Playfair Display (editorial serif) + Space Mono (tech labels)
   ═══════════════════════════════════════════════════════════ */

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
const O = "#FF6B00"; // accent
const D = "#0A0A0A"; // background
const L = "#F5F5F5"; // text
const M = "#555555"; // muted

/* ─── Brand Content ─── */
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

const PANEL_COUNT = SERVICES.length + 2; // opening + services + closing

export default function EditorialReel() {
  const mainRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  /* ══════════════════════════
     Lenis Smooth Scroll
     ══════════════════════════ */
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

  /* ══════════════════════════
     Custom Cursor (desktop only)
     ══════════════════════════ */
  useEffect(() => {
    const c = cursorRef.current;
    if (!c || !window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.style.cursor = "none";
    const xTo = gsap.quickTo(c, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(c, "y", { duration: 0.4, ease: "power3.out" });
    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.style.cursor = "";
    };
  }, []);

  /* ══════════════════════════
     GSAP Horizontal Scroll + Choreography
     ══════════════════════════ */
  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      if (!wrapper || !track) return;

      const totalScroll = track.scrollWidth - window.innerWidth;

      /* ── Main horizontal scroll ── */
      const scrollTween = gsap.to(track, {
        x: () => -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          scrub: 1,
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
        },
      });

      /* ── Progress bar ── */
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          scrub: 0.3,
          start: "top top",
          end: () => `+=${totalScroll}`,
        },
      });

      /* ═══════════════════════════════════════
         Panel 1: OPENING — Character Reveal
         ═══════════════════════════════════════ */
      const chars = gsap.utils.toArray<HTMLElement>(".er-char");
      const tagline = document.querySelector(".er-tagline");
      const line = document.querySelector(".er-line");
      const labels = gsap.utils.toArray<HTMLElement>(".er-label");

      gsap.set(chars, { y: 120, opacity: 0 });
      if (tagline) gsap.set(tagline, { y: 30, opacity: 0 });
      if (line) gsap.set(line, { scaleX: 0 });
      gsap.set(labels, { opacity: 0 });

      const openTl = gsap.timeline({ delay: 0.5 });
      openTl
        .to(chars, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.04,
          ease: "expo.out",
        })
        .to(
          line,
          {
            scaleX: 1,
            duration: 1.0,
            ease: "power4.inOut",
          },
          "-=0.6"
        )
        .to(
          tagline,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .to(
          labels,
          {
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.3"
        );

      /* Scroll hint fade */
      gsap.to(".er-scroll-hint", {
        opacity: 0,
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "+=200",
          scrub: true,
        },
      });

      /* ═══════════════════════════════════════
         Panels 2-4: SERVICE — Reveal + Parallax
         ═══════════════════════════════════════ */
      const servicePanels = gsap.utils.toArray<HTMLElement>(".er-service");

      servicePanels.forEach((panel) => {
        const num = panel.querySelector(".er-num");
        const title = panel.querySelector(".er-title");
        const desc = panel.querySelector(".er-desc");
        const accent = panel.querySelector(".er-accent");
        const tags = gsap.utils.toArray<HTMLElement>(
          panel.querySelectorAll(".er-tag")
        );

        // Initial states
        if (num) gsap.set(num, { y: 80, opacity: 0 });
        if (title) gsap.set(title, { y: 50, opacity: 0 });
        if (desc) gsap.set(desc, { y: 30, opacity: 0 });
        if (accent) gsap.set(accent, { scaleX: 0 });
        gsap.set(tags, { x: 16, opacity: 0 });

        // Number parallax — drifts right as panel scrolls through
        // Creates editorial depth: number feels on a deeper layer
        if (num) {
          gsap.to(num, {
            x: 60,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          });
        }

        // Content reveal — plays once on enter
        ScrollTrigger.create({
          trigger: panel,
          containerAnimation: scrollTween,
          start: "left 75%",
          once: true,
          onEnter: () => {
            const tl = gsap.timeline();
            if (num)
              tl.to(num, {
                y: 0,
                opacity: 1,
                duration: 1.0,
                ease: "expo.out",
              });
            if (title)
              tl.to(
                title,
                { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" },
                "-=0.7"
              );
            if (desc)
              tl.to(
                desc,
                { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                "-=0.4"
              );
            if (accent)
              tl.to(
                accent,
                { scaleX: 1, duration: 0.8, ease: "power4.inOut" },
                "-=0.4"
              );
            tl.to(
              tags,
              {
                x: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.06,
                ease: "power2.out",
              },
              "-=0.3"
            );
          },
        });
      });

      /* ═══════════════════════════════════════
         Panel 5: CLOSING — Word Reveal
         ═══════════════════════════════════════ */
      const closingPanel = document.querySelector(".er-closing");
      if (closingPanel) {
        const words = gsap.utils.toArray<HTMLElement>(".er-word");
        const arrow = document.querySelector(".er-arrow");
        const cta = document.querySelector(".er-cta");

        gsap.set(words, { y: 80, opacity: 0 });
        if (arrow) gsap.set(arrow, { x: -30, opacity: 0 });
        if (cta) gsap.set(cta, { y: 20, opacity: 0 });

        ScrollTrigger.create({
          trigger: closingPanel,
          containerAnimation: scrollTween,
          start: "left 65%",
          once: true,
          onEnter: () => {
            const tl = gsap.timeline();
            tl.to(words, {
              y: 0,
              opacity: 1,
              duration: 1.0,
              stagger: 0.1,
              ease: "expo.out",
            });
            if (arrow)
              tl.to(
                arrow,
                { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                "-=0.4"
              );
            if (cta)
              tl.to(
                cta,
                { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                "-=0.3"
              );
          },
        });
      }
    },
    { scope: mainRef }
  );

  /* ══════════════════════════
     JSX — Editorial Layout
     ══════════════════════════ */
  return (
    <div ref={mainRef} style={{ background: D, overflowX: "hidden" }}>
      {/* Hover styles */}
      <style>{`
        .er-cta:hover { border-bottom-color: ${O} !important; }
        .er-cta { transition: border-color 0.3s ease; }
      `}</style>

      {/* Progress Bar — thin orange line at bottom */}
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
          zIndex: 100,
        }}
      />

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: -10,
          left: -10,
          width: 20,
          height: 20,
          border: `1.5px solid ${O}`,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
      />

      {/* Film Grain Overlay */}
      <svg
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 50,
          opacity: 0.035,
        }}
      >
        <filter id="er-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#er-grain)" />
      </svg>

      {/* ─── Pinned Wrapper ─── */}
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
              Panel 1: OPENING
              ════════════════════════════════════ */}
          <section
            className="er-panel"
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
              className="er-label"
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
              className="er-label"
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

            {/* Brand Name — char-by-char animation */}
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
              {"PixIntCreators".split("").map((c, i) => (
                <span
                  key={i}
                  className="er-char"
                  style={{ display: "inline-block" }}
                >
                  {c}
                </span>
              ))}
            </h1>

            {/* Orange divider line */}
            <div
              className="er-line"
              style={{
                width: 100,
                height: 1,
                background: O,
                margin: "2.5rem 0",
                transformOrigin: "center",
              }}
            />

            {/* Tagline */}
            <p
              className="er-tagline"
              style={{
                fontFamily: mono.style.fontFamily,
                fontSize: "clamp(0.75rem, 1vw, 0.95rem)",
                color: M,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              Wir codieren Erlebnisse
            </p>

            {/* Scroll hint */}
            <span
              className="er-scroll-hint er-label"
              style={{
                position: "absolute",
                bottom: "5vh",
                fontFamily: mono.style.fontFamily,
                fontSize: "0.65rem",
                color: `${M}88`,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              Scroll &rarr;
            </span>
          </section>

          {/* ════════════════════════════════════
              Panels 2-4: SERVICES
              ════════════════════════════════════ */}
          {SERVICES.map((s, i) => (
            <section
              key={i}
              className="er-panel er-service"
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
              {/* Editorial separator line */}
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

              {/* Left column: Large stroke number */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  className="er-num"
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
                  {s.num}
                </span>
              </div>

              {/* Right column: Content */}
              <div style={{ paddingLeft: "2vw" }}>
                <h2
                  className="er-title"
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
                  {s.title}
                </h2>

                <p
                  className="er-desc"
                  style={{
                    fontFamily: mono.style.fontFamily,
                    fontSize: "clamp(0.75rem, 0.85vw, 0.9rem)",
                    color: M,
                    lineHeight: 1.7,
                    maxWidth: 400,
                    margin: "0 0 2rem 0",
                  }}
                >
                  {s.desc}
                </p>

                {/* Orange accent line */}
                <div
                  className="er-accent"
                  style={{
                    width: 48,
                    height: 2,
                    background: O,
                    marginBottom: "1.5rem",
                    transformOrigin: "left",
                  }}
                />

                {/* Tags */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {s.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="er-tag"
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
                Leistung {s.num} / 03
              </span>
            </section>
          ))}

          {/* ════════════════════════════════════
              Panel 5: CLOSING
              ════════════════════════════════════ */}
          <section
            className="er-panel er-closing"
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

            <h2
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
              {"Bereit für".split(" ").map((w, i) => (
                <span
                  key={i}
                  className="er-word"
                  style={{ display: "inline-block", marginRight: "0.3em" }}
                >
                  {w}
                </span>
              ))}
              <br />
              <span
                className="er-word"
                style={{
                  display: "inline-block",
                  color: O,
                  marginRight: "0.3em",
                }}
              >
                das 1%
              </span>
              <br />
              {"das im Kopf bleibt?".split(" ").map((w, i) => (
                <span
                  key={`c${i}`}
                  className="er-word"
                  style={{ display: "inline-block", marginRight: "0.3em" }}
                >
                  {w}
                </span>
              ))}
            </h2>

            {/* CTA */}
            <div
              style={{
                marginTop: "3rem",
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
              }}
            >
              <span
                className="er-arrow"
                style={{
                  fontFamily: playfair.style.fontFamily,
                  fontSize: "1.8rem",
                  color: O,
                }}
              >
                &rarr;
              </span>
              <a
                className="er-cta"
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

            {/* Bottom label */}
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
