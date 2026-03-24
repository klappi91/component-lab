"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { Playfair_Display, Space_Mono } from "next/font/google";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   hero-v022-b: PIXEL STORY — Vertikale Pixel-Reise

   STORY: Vom Pixel zum Erlebnis
   Ein einzelner 4px-Pixel transformiert sich durch 5 Etappen.
   Jede Transformation erzaehlt einen Teil der PixIntCreators-Geschichte.

   ETAPPEN:
   0. IDEE       — 4px Pixel pulsiert, "Alles beginnt mit einem Pixel."
   1. DESIGN     — Pixel wird Gestaltungs-Akzent, Service 01 Webdesign
   2. INTELLIGENZ — Pixel multipliziert sich (4 Dots), Service 02 KI
   3. ERLEBNIS   — Pixel explodiert, fuellt Viewport orange, Service 03
   4. MARKE      — Orange weicht, Brand + CTA erscheinen

   CHRIS-FEEDBACK (UID 29, v022-a):
   - "der punkt ist zu gross" → 4px statt 12px
   - "wieso so oft seitwaerts" → VERTIKAL statt horizontal
   - "es muss eine story erzaehlt werden" → klare Etappen mit Bedeutung
   - Mobile muss funktionieren

   Palette: #0A0A0A + #FF6B00 + #F5F5F5
   Fonts: Playfair Display (editorial serif) + Space Mono (tech)
   Tech: GSAP ScrollTrigger (pinned, scrub), Lenis Smooth Scroll
   ═══════════════════════════════════════════════════════════════ */

/* ─── Fonts ─── */
const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700", "900"],
  display: "swap",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

/* ─── Palette ─── */
const O = "#FF6B00";
const D = "#0A0A0A";
const L = "#F5F5F5";

/* ─── Pixel ─── */
const PX = 4; // Chris: "der punkt ist zu gross" → start TINY

export default function PixelStory() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pixRef = useRef<HTMLDivElement>(null);
  const c1Ref = useRef<HTMLDivElement>(null);
  const c2Ref = useRef<HTMLDivElement>(null);
  const c3Ref = useRef<HTMLDivElement>(null);

  /* ─── Lenis Smooth Scroll ─── */
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 1.0 });
    const raf = (t: number) => lenis.raf(t * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  /* ═══════════════════════════════════════════════
     MASTER TIMELINE — pinned, scrubbed, vertical
     Duration: 5 units over 6000px scroll
     ═══════════════════════════════════════════════ */
  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const pix = pixRef.current;
      const cl1 = c1Ref.current;
      const cl2 = c2Ref.current;
      const cl3 = c3Ref.current;
      if (!wrap || !pix || !cl1 || !cl2 || !cl3) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cx = vw / 2 - PX / 2;
      const cy = vh / 2 - PX / 2;

      /* ── Initial states ── */
      gsap.set(pix, {
        x: cx,
        y: cy,
        width: PX,
        height: PX,
        opacity: 1,
        borderRadius: 0,
      });
      // Clone positions: pre-set at 2x2 grid around center
      // (invisible until section 2 transition)
      const cloneGap = 24;
      gsap.set(cl1, {
        opacity: 0, width: PX, height: PX,
        x: cx + cloneGap, y: cy - 12,
      });
      gsap.set(cl2, {
        opacity: 0, width: PX, height: PX,
        x: cx - 12, y: cy + cloneGap,
      });
      gsap.set(cl3, {
        opacity: 0, width: PX, height: PX,
        x: cx + cloneGap, y: cy + cloneGap,
      });
      // Sections hidden
      gsap.set([".ps-s1", ".ps-s2", ".ps-s3", ".ps-brand"], { opacity: 0 });
      gsap.set(
        [".ps-num", ".ps-title", ".ps-desc", ".ps-line"],
        { opacity: 0, y: 40 }
      );
      gsap.set(
        [".ps-brand-l1", ".ps-brand-l2", ".ps-tag", ".ps-cta"],
        { opacity: 0, y: 50 }
      );

      /* ══════════════════════════════
         BUILD MASTER TIMELINE
         ══════════════════════════════ */
      const m = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          pin: true,
          scrub: 1.2,
          start: "top top",
          end: "+=6000",
          invalidateOnRefresh: true,
        },
      });

      // Progress bar (full duration)
      m.to(".ps-progress", { scaleX: 1, ease: "none", duration: 5 }, 0);

      /* ─────────────────────────────────────────
         SECTION 0: IDEE (t=0.0 – 0.6)
         Pixel centered with glow, opening text
         ───────────────────────────────────────── */

      // Scroll hint fades
      m.to(".ps-hint", { opacity: 0, y: -10, duration: 0.15 }, 0.05);

      // Intro text fades out
      m.to(".ps-intro", {
        opacity: 0,
        y: -30,
        duration: 0.2,
        ease: "power2.in",
      }, 0.45);

      /* ─────────────────────────────────────────
         TRANSITION 0→1 (t=0.5 – 0.8)
         Pixel glides to left margin as DOT accent
         ───────────────────────────────────────── */
      m.to(pix, {
        x: () => window.innerWidth * 0.07,
        y: () => window.innerHeight * 0.43,
        duration: 0.3,
        ease: "power3.inOut",
      }, 0.55);

      // Glow shrinks as pixel becomes design element
      m.to(pix, {
        boxShadow: `0 0 4px 1px rgba(255,107,0,0.2)`,
        duration: 0.2,
      }, 0.6);

      /* ─────────────────────────────────────────
         SECTION 1: DESIGN (t=0.8 – 1.5)
         Service 01 — Webdesign & Entwicklung
         Pixel = design accent dot at left margin
         ───────────────────────────────────────── */
      m.to(".ps-s1", { opacity: 1, duration: 0.05 }, 0.78);
      m.to(".ps-s1 .ps-num", {
        y: 0, opacity: 1, duration: 0.2, ease: "expo.out",
      }, 0.82);
      m.to(".ps-s1 .ps-title", {
        y: 0, opacity: 1, duration: 0.2, ease: "expo.out",
      }, 0.92);
      m.to(".ps-s1 .ps-desc", {
        y: 0, opacity: 1, duration: 0.15, ease: "power2.out",
      }, 1.02);
      // Accent line grows FROM pixel (pixel extends itself)
      m.to(".ps-s1 .ps-line", {
        y: 0, opacity: 1, scaleX: 1, duration: 0.25, ease: "power4.inOut",
      }, 0.95);

      // Fade out section 1
      m.to(".ps-s1", { opacity: 0, duration: 0.15, ease: "power2.in" }, 1.4);

      /* ─────────────────────────────────────────
         TRANSITION 1→2 (t=1.4 – 1.8)
         Pixel moves to center and SPLITS into 4
         ───────────────────────────────────────── */
      m.to(pix, {
        x: () => window.innerWidth / 2 - PX / 2 - 12,
        y: () => window.innerHeight / 2 - PX / 2 - 12,
        duration: 0.3,
        ease: "power3.inOut",
      }, 1.42);

      // Clones fade in at pre-set grid positions (staggered)
      m.to(cl1, { opacity: 1, duration: 0.12, ease: "power2.out" }, 1.7);
      m.to(cl2, { opacity: 1, duration: 0.12, ease: "power2.out" }, 1.75);
      m.to(cl3, { opacity: 1, duration: 0.12, ease: "power2.out" }, 1.8);

      /* ─────────────────────────────────────────
         SECTION 2: INTELLIGENZ (t=1.8 – 2.6)
         Service 02 — KI-Integration
         4 pixels working in sync = AI amplification
         ───────────────────────────────────────── */
      m.to(".ps-s2", { opacity: 1, duration: 0.05 }, 1.82);
      m.to(".ps-s2 .ps-num", {
        y: 0, opacity: 1, duration: 0.2, ease: "expo.out",
      }, 1.88);
      m.to(".ps-s2 .ps-title", {
        y: 0, opacity: 1, duration: 0.2, ease: "expo.out",
      }, 1.98);
      m.to(".ps-s2 .ps-desc", {
        y: 0, opacity: 1, duration: 0.15, ease: "power2.out",
      }, 2.08);

      // 4 pixels pulse in sync (subtle scale)
      m.to([pix, cl1, cl2, cl3], {
        scale: 1.6,
        duration: 0.15,
        ease: "sine.inOut",
      }, 2.0);
      m.to([pix, cl1, cl2, cl3], {
        scale: 1.0,
        duration: 0.15,
        ease: "sine.inOut",
      }, 2.15);

      // Fade out section 2
      m.to(".ps-s2", { opacity: 0, duration: 0.15, ease: "power2.in" }, 2.5);

      /* ─────────────────────────────────────────
         TRANSITION 2→3: CONVERGENCE + EXPLOSION
         (t=2.5 – 3.0)
         4 pixels converge → single pixel → FILLS VIEWPORT
         This is the WOW moment
         ───────────────────────────────────────── */

      // Clones converge to center
      m.to([cl1, cl2, cl3], {
        x: () => window.innerWidth / 2 - PX / 2,
        y: () => window.innerHeight / 2 - PX / 2,
        duration: 0.2,
        ease: "power3.in",
      }, 2.52);
      m.to(pix, {
        x: () => window.innerWidth / 2 - PX / 2,
        y: () => window.innerHeight / 2 - PX / 2,
        duration: 0.2,
        ease: "power3.in",
      }, 2.52);

      // Hide clones
      m.to([cl1, cl2, cl3], { opacity: 0, duration: 0.05 }, 2.72);

      // EXPLOSION — pixel fills entire viewport
      m.to(pix, {
        x: 0,
        y: 0,
        width: () => window.innerWidth,
        height: () => window.innerHeight,
        borderRadius: 0,
        boxShadow: "none",
        duration: 0.3,
        ease: "power4.inOut",
      }, 2.72);

      /* ─────────────────────────────────────────
         SECTION 3: ERLEBNIS (t=3.0 – 3.8)
         Service 03 — Creative Development
         White text on full orange viewport
         ───────────────────────────────────────── */
      m.to(".ps-s3", { opacity: 1, duration: 0.05 }, 2.98);
      m.to(".ps-s3 .ps-num", {
        y: 0, opacity: 1, duration: 0.2, ease: "expo.out",
      }, 3.05);
      m.to(".ps-s3 .ps-title", {
        y: 0, opacity: 1, duration: 0.2, ease: "expo.out",
      }, 3.15);
      m.to(".ps-s3 .ps-desc", {
        y: 0, opacity: 1, duration: 0.15, ease: "power2.out",
      }, 3.25);

      // Fade out section 3
      m.to(".ps-s3", { opacity: 0, duration: 0.15, ease: "power2.in" }, 3.7);

      /* ─────────────────────────────────────────
         TRANSITION 3→4: RECEDE (t=3.7 – 4.1)
         Orange shrinks back, pixel returns to accent
         ───────────────────────────────────────── */
      m.to(pix, {
        x: () => window.innerWidth * 0.07,
        y: () => window.innerHeight * 0.52,
        width: PX,
        height: PX,
        boxShadow: `0 0 6px 2px rgba(255,107,0,0.3)`,
        duration: 0.4,
        ease: "power3.inOut",
      }, 3.75);

      /* ─────────────────────────────────────────
         SECTION 4: MARKE (t=4.0 – 5.0)
         Brand reveal + CTA
         Pixel rests as small accent — story complete
         ───────────────────────────────────────── */
      m.to(".ps-brand", { opacity: 1, duration: 0.05 }, 3.95);
      m.to(".ps-brand-l1", {
        y: 0, opacity: 1, duration: 0.35, ease: "expo.out",
      }, 4.0);
      m.to(".ps-brand-l2", {
        y: 0, opacity: 1, duration: 0.35, ease: "expo.out",
      }, 4.15);
      m.to(".ps-tag", {
        y: 0, opacity: 1, duration: 0.25, ease: "power2.out",
      }, 4.4);
      m.to(".ps-cta", {
        y: 0, opacity: 1, duration: 0.25, ease: "power2.out",
      }, 4.55);
    },
    { scope: wrapRef }
  );

  return (
    <div
      ref={wrapRef}
      className={spaceMono.className}
      style={{
        background: D,
        color: L,
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ═══ THE PIXEL — persistent character ═══ */}
      <div
        ref={pixRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: PX,
          height: PX,
          background: O,
          zIndex: 50,
          pointerEvents: "none",
          willChange: "transform, width, height",
          boxShadow: `0 0 8px 2px rgba(255,107,0,0.4)`,
        }}
      />

      {/* ═══ CLONE PIXELS (for section 2 split) ═══ */}
      {[c1Ref, c2Ref, c3Ref].map((ref, i) => (
        <div
          key={i}
          ref={ref}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: PX,
            height: PX,
            background: O,
            zIndex: 50,
            pointerEvents: "none",
            opacity: 0,
            willChange: "transform",
            boxShadow: `0 0 6px 1px rgba(255,107,0,0.3)`,
          }}
        />
      ))}

      {/* ═══ PROGRESS BAR ═══ */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 2,
          zIndex: 100,
        }}
      >
        <div
          className="ps-progress"
          style={{
            width: "100%",
            height: "100%",
            background: O,
            transformOrigin: "left",
            transform: "scaleX(0)",
          }}
        />
      </div>

      {/* ═══ SECTION 0: IDEE ═══ */}
      <div
        className="ps-intro"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <p
          className={playfair.className}
          style={{
            fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)",
            color: L,
            opacity: 0.55,
            marginTop: "10vh",
            fontStyle: "italic",
            textAlign: "center",
            padding: "0 2rem",
            letterSpacing: "0.02em",
          }}
        >
          Alles beginnt mit einem Pixel.
        </p>
      </div>

      {/* Scroll hint */}
      <div
        className="ps-hint"
        style={{
          position: "fixed",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        <div
          style={{
            width: 1,
            height: 24,
            background: "rgba(255,255,255,0.15)",
            animation: "ps-bob 2s ease-in-out infinite",
          }}
        />
        <p
          style={{
            fontSize: "0.6rem",
            color: "#444",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </p>
        <style>{`
          @keyframes ps-bob {
            0%, 100% { transform: translateY(0); opacity: 0.5; }
            50% { transform: translateY(6px); opacity: 1; }
          }
        `}</style>
      </div>

      {/* ═══ SECTION 1: DESIGN ═══ */}
      <div
        className="ps-s1"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          pointerEvents: "none",
          padding: "0 6vw",
        }}
      >
        <div style={{ marginLeft: "max(14vw, 56px)" }}>
          <p
            className={`ps-num ${spaceMono.className}`}
            style={{
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontWeight: 700,
              color: O,
              lineHeight: 0.85,
              opacity: 0.15,
            }}
          >
            01
          </p>
          <h2
            className={`ps-title ${playfair.className}`}
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              marginTop: "0.3rem",
              whiteSpace: "pre-line",
            }}
          >
            {"Webdesign &\nEntwicklung"}
          </h2>
          <p
            className="ps-desc"
            style={{
              fontSize: "clamp(0.8rem, 1.1vw, 0.95rem)",
              color: "#777",
              maxWidth: "30ch",
              marginTop: "0.8rem",
              lineHeight: 1.65,
            }}
          >
            Jede Seite ein Unikat. Kein Template, kein Baukasten — von der
            ersten Idee bis zum fertigen Deployment.
          </p>
          <div
            className="ps-line"
            style={{
              width: 48,
              height: 2,
              background: O,
              marginTop: "1rem",
              transformOrigin: "left",
              transform: "scaleX(0)",
            }}
          />
        </div>
      </div>

      {/* ═══ SECTION 2: INTELLIGENZ ═══ */}
      <div
        className="ps-s2"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          textAlign: "center",
          padding: "0 2rem",
        }}
      >
        <div style={{ marginTop: "10vh" }}>
          <p
            className={`ps-num ${spaceMono.className}`}
            style={{
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontWeight: 700,
              color: O,
              lineHeight: 0.85,
              opacity: 0.15,
            }}
          >
            02
          </p>
          <h2
            className={`ps-title ${playfair.className}`}
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              marginTop: "0.3rem",
              whiteSpace: "pre-line",
            }}
          >
            {"KI-\nIntegration"}
          </h2>
          <p
            className="ps-desc"
            style={{
              fontSize: "clamp(0.8rem, 1.1vw, 0.95rem)",
              color: "#777",
              maxWidth: "30ch",
              marginTop: "0.8rem",
              lineHeight: 1.65,
              marginInline: "auto",
            }}
          >
            Kuenstliche Intelligenz dort wo sie Mehrwert bringt. Nicht als
            Buzzword — als Werkzeug.
          </p>
        </div>
      </div>

      {/* ═══ SECTION 3: ERLEBNIS (above pixel z-index) ═══ */}
      <div
        className="ps-s3"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          textAlign: "center",
          padding: "0 2rem",
        }}
      >
        <div>
          <p
            className={`ps-num ${spaceMono.className}`}
            style={{
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontWeight: 700,
              color: L,
              lineHeight: 0.85,
              opacity: 0.2,
            }}
          >
            03
          </p>
          <h2
            className={`ps-title ${playfair.className}`}
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              marginTop: "0.3rem",
              color: D,
              whiteSpace: "pre-line",
            }}
          >
            {"Creative\nDevelopment"}
          </h2>
          <p
            className="ps-desc"
            style={{
              fontSize: "clamp(0.8rem, 1.1vw, 0.95rem)",
              color: "rgba(10,10,10,0.55)",
              maxWidth: "30ch",
              marginTop: "0.8rem",
              lineHeight: 1.65,
              marginInline: "auto",
            }}
          >
            WebGL, 3D, Shader, Partikel — wir bringen das Web zum Leben. Fuer
            Marken die auffallen wollen.
          </p>
        </div>
      </div>

      {/* ═══ SECTION 4: MARKE ═══ */}
      <div
        className="ps-brand"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <h1
          className={`ps-brand-l1 ${playfair.className}`}
          style={{
            fontSize: "clamp(2.5rem, 9vw, 7rem)",
            fontWeight: 900,
            lineHeight: 0.9,
          }}
        >
          PIXINT
        </h1>
        <h1
          className={`ps-brand-l2 ${playfair.className}`}
          style={{
            fontSize: "clamp(2.5rem, 9vw, 7rem)",
            fontWeight: 900,
            lineHeight: 0.9,
            color: O,
          }}
        >
          CREATORS
        </h1>
        <p
          className={`ps-tag ${spaceMono.className}`}
          style={{
            fontSize: "clamp(0.6rem, 0.9vw, 0.8rem)",
            letterSpacing: "0.3em",
            color: "#555",
            marginTop: "1.2rem",
            textTransform: "uppercase",
          }}
        >
          Pixelizing Intelligence
        </p>
        <a
          className="ps-cta"
          href="#"
          onClick={(e) => e.preventDefault()}
          style={{
            marginTop: "2rem",
            padding: "0.85rem 2.2rem",
            border: `1px solid ${O}`,
            color: O,
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textDecoration: "none",
            pointerEvents: "auto",
            transition: "background 0.3s, color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = O;
            e.currentTarget.style.color = D;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = O;
          }}
        >
          Projekt starten
        </a>
      </div>

      {/* ═══ GRAIN OVERLAY ═══ */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 90,
          pointerEvents: "none",
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
