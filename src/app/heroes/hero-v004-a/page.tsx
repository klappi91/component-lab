"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Brand ─── */
const ORANGE = "#FF6B00";
const DARK = "#0A0A0A";
const LIGHT = "#F5F5F5";
const MUTED = "#555";

const SERVICES = [
  {
    num: "01",
    name: "Webdesign",
    sub: "& Entwicklung",
    desc: "Jede Seite ein Unikat. Kein Template, kein Baukasten.",
  },
  {
    num: "02",
    name: "KI",
    sub: "Integration",
    desc: "Kuenstliche Intelligenz dort wo sie echten Mehrwert bringt.",
  },
  {
    num: "03",
    name: "Creative",
    sub: "Development",
    desc: "WebGL, 3D, Shader — wir bringen das Web zum Leben.",
  },
];

/* ─── Letter spread directions for PIXINT ─── */
const SPREAD = [
  { x: "-30vw", y: "-25vh", rotate: -18, scale: 0.55 },
  { x: "-12vw", y: "30vh", rotate: 12, scale: 0.7 },
  { x: "8vw", y: "-35vh", rotate: -8, scale: 0.6 },
  { x: "25vw", y: "15vh", rotate: 15, scale: 0.65 },
  { x: "-20vw", y: "35vh", rotate: -12, scale: 0.5 },
  { x: "35vw", y: "-20vh", rotate: 20, scale: 0.55 },
];

export default function HeroV004A() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const svcRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const mouse = useRef({ x: 0, y: 0, active: false });
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rafId = useRef<number>(0);

  /* ─── Mouse tracker ─── */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouse.current.active = true;
    };
    const onLeave = () => {
      mouse.current.active = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* ─── Subtle mouse parallax on hero letters (runs continuously) ─── */
  const startParallax = useCallback(() => {
    const tick = () => {
      letterRefs.current.forEach((el, i) => {
        if (!el) return;
        const depth = ((i % 3) + 1) * 4;
        const tx = mouse.current.active ? mouse.current.x * depth : 0;
        const ty = mouse.current.active ? mouse.current.y * depth : 0;
        gsap.to(el, {
          x: `+=${tx * 0.03}`,
          y: `+=${ty * 0.03}`,
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  /* ─── Main GSAP choreography ─── */
  useGSAP(
    () => {
      const wrap = wrapRef.current;
      if (!wrap) return;

      const letters = wrap.querySelectorAll<HTMLElement>(".hero-char");
      const suffix = wrap.querySelector<HTMLElement>(".hero-suffix");
      const tagline = wrap.querySelector<HTMLElement>(".hero-tagline");
      const taglineWords = wrap.querySelectorAll<HTMLElement>(".tagline-word");
      const grain = wrap.querySelector<HTMLElement>(".grain");

      /* ── 1. ENTRANCE: Letters rise from below with mask ── */
      gsap.set(letters, {
        y: 140,
        opacity: 0,
        rotateX: -20,
        transformPerspective: 800,
      });
      gsap.set(suffix, { opacity: 0, scale: 0.6, y: 40 });
      gsap.set(taglineWords, { y: 60, opacity: 0, rotateX: -15 });
      gsap.set(grain, { opacity: 0 });

      const entrance = gsap.timeline({ delay: 0.4 });

      entrance.to(letters, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.07,
      });

      entrance.to(
        grain,
        { opacity: 0.04, duration: 0.8 },
        0.2
      );

      // Start mouse parallax after entrance
      entrance.call(() => { startParallax(); }, [], 1.6);

      /* ── 2. HERO SCROLL: Letters spread → CREATORS reveals → Reassemble ── */
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=280%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Phase A (0→0.4): Letters SPREAD apart
      letters.forEach((letter, i) => {
        const s = SPREAD[i];
        heroTl.to(
          letter,
          {
            x: s.x,
            y: s.y,
            rotate: s.rotate,
            scale: s.scale,
            opacity: 0.25,
            duration: 0.4,
            ease: "power4.inOut",
          },
          0
        );
      });

      // Phase B (0.3→0.6): CREATORS + tagline fade in at center
      heroTl.to(
        suffix,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "expo.out",
        },
        0.3
      );

      heroTl.to(
        taglineWords,
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.25,
          ease: "expo.out",
          stagger: 0.04,
        },
        0.4
      );

      // Phase C (0.6→0.85): Everything assembles into compact brand lockup
      heroTl.to(
        letters,
        {
          x: 0,
          y: -80,
          rotate: 0,
          scale: 0.35,
          opacity: 1,
          duration: 0.25,
          ease: "power4.inOut",
          stagger: 0.015,
        },
        0.6
      );

      heroTl.to(
        suffix,
        {
          y: -20,
          scale: 0.35,
          duration: 0.25,
          ease: "power4.inOut",
        },
        0.6
      );

      heroTl.to(
        taglineWords,
        {
          y: 40,
          scale: 0.9,
          duration: 0.2,
          ease: "power2.inOut",
        },
        0.65
      );

      // Phase D (0.85→1.0): Everything fades up and out
      heroTl.to(
        [letters, suffix, taglineWords],
        {
          y: "-=120",
          opacity: 0,
          duration: 0.15,
          ease: "power2.in",
        },
        0.85
      );

      /* ── 3. SERVICES: Pinned section, cycling text ── */
      const svcTl = gsap.timeline({
        scrollTrigger: {
          trigger: svcRef.current,
          start: "top top",
          end: "+=350%",
          pin: true,
          scrub: 1,
        },
      });

      // Horizontal line animates in
      svcTl.fromTo(
        ".svc-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.15, ease: "power4.inOut" },
        0
      );

      SERVICES.forEach((_, i) => {
        const offset = i * 0.33;

        // Enter
        svcTl.fromTo(
          `.svc-${i}`,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.12, ease: "expo.out" },
          offset + 0.02
        );

        svcTl.fromTo(
          `.svc-num-${i}`,
          { scale: 0, rotateZ: -90 },
          { scale: 1, rotateZ: 0, duration: 0.15, ease: "back.out(2)" },
          offset
        );

        svcTl.fromTo(
          `.svc-desc-${i}`,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.1, ease: "power2.out" },
          offset + 0.08
        );

        // Exit (except last)
        if (i < SERVICES.length - 1) {
          svcTl.to(
            `.svc-${i}`,
            {
              y: -80,
              opacity: 0,
              filter: "blur(10px)",
              duration: 0.1,
              ease: "power2.in",
            },
            offset + 0.25
          );
          svcTl.to(
            `.svc-num-${i}`,
            { y: -40, opacity: 0, duration: 0.08, ease: "power2.in" },
            offset + 0.25
          );
          svcTl.to(
            `.svc-desc-${i}`,
            { y: -20, opacity: 0, duration: 0.08, ease: "power2.in" },
            offset + 0.26
          );
        }
      });

      /* ── 4. CTA: Scale + color morph ── */
      gsap.fromTo(
        ".cta-text",
        { scale: 0.2, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            end: "center center",
            scrub: 1.5,
          },
        }
      );

      gsap.fromTo(
        ".cta-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 60%",
            end: "center 30%",
            scrub: 1,
          },
        }
      );

      // Pulse on the CTA once visible
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: "center center",
        onEnter: () => {
          gsap.to(".cta-text", {
            scale: 1.02,
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: "sine.inOut",
          });
        },
      });
    },
    { scope: wrapRef }
  );

  // Cleanup parallax RAF on unmount
  useEffect(() => {
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative overflow-x-hidden"
      style={{
        background: DARK,
        color: LIGHT,
        fontFamily: "'General Sans', sans-serif",
      }}
    >
      {/* ── Grain overlay ── */}
      <svg className="grain pointer-events-none fixed inset-0 z-50 h-full w-full opacity-0">
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>

      {/* ── Custom cursor dot ── */}
      <div
        className="pointer-events-none fixed z-40 mix-blend-difference"
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: ORANGE,
          transform: "translate(-50%, -50%)",
          transition: "transform 0.1s ease-out",
        }}
        ref={(el) => {
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
        }}
      />

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 1: HERO — PIXINT massive letters       */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex h-screen flex-col items-center justify-center"
      >
        {/* PIXINT letters */}
        <div className="flex items-center" style={{ gap: "0.5vw" }}>
          {"PIXINT".split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => {
                letterRefs.current[i] = el;
              }}
              className="hero-char inline-block select-none will-change-transform"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: "clamp(60px, 17vw, 280px)",
                fontWeight: 700,
                lineHeight: 0.9,
                color: LIGHT,
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* CREATORS — revealed during scroll */}
        <div
          className="hero-suffix absolute select-none will-change-transform"
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: "clamp(24px, 5.5vw, 90px)",
            fontWeight: 300,
            letterSpacing: "0.25em",
            color: ORANGE,
            bottom: "28%",
          }}
        >
          CREATORS
        </div>

        {/* Tagline — word by word */}
        <div
          className="hero-tagline absolute flex flex-wrap items-center justify-center gap-x-[0.8em]"
          style={{
            bottom: "18%",
            fontFamily: "'General Sans', sans-serif",
            fontSize: "clamp(14px, 1.8vw, 28px)",
            fontWeight: 400,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          {"Wir codieren Erlebnisse".split(" ").map((word, i) => (
            <span
              key={i}
              className="tagline-word inline-block will-change-transform"
              style={{
                color: word === "Erlebnisse" ? ORANGE : undefined,
                fontWeight: word === "Erlebnisse" ? 600 : undefined,
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 flex flex-col items-center gap-2"
          style={{ opacity: 0.3 }}
        >
          <span
            className="text-xs uppercase tracking-[0.3em]"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            Scroll
          </span>
          <div
            className="h-8 w-px origin-top animate-pulse"
            style={{ background: LIGHT }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 2: SERVICES — Cycling text theater     */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        ref={svcRef}
        className="relative flex h-screen items-center justify-center"
      >
        {/* Decorative line */}
        <div
          className="svc-line absolute left-[10%] right-[10%] top-[30%] h-px origin-left"
          style={{ background: `${LIGHT}15` }}
        />

        {/* Service layers */}
        {SERVICES.map((svc, i) => (
          <div
            key={i}
            className="absolute inset-0 flex flex-col items-center justify-center px-8"
          >
            {/* Large outline number */}
            <span
              className={`svc-num-${i} absolute select-none will-change-transform`}
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: "clamp(80px, 22vw, 350px)",
                fontWeight: 700,
                lineHeight: 0.85,
                right: "8%",
                top: "10%",
                color: "transparent",
                WebkitTextStroke: `1.5px ${ORANGE}40`,
                opacity: 0,
              }}
            >
              {svc.num}
            </span>

            {/* Service name */}
            <div className={`svc-${i} text-center will-change-transform`} style={{ opacity: 0 }}>
              <h2
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: "clamp(40px, 10vw, 160px)",
                  fontWeight: 700,
                  lineHeight: 0.95,
                  color: LIGHT,
                }}
              >
                {svc.name}
              </h2>
              {svc.sub && (
                <h3
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: "clamp(20px, 4vw, 64px)",
                    fontWeight: 300,
                    lineHeight: 1.1,
                    color: ORANGE,
                    marginTop: "0.1em",
                  }}
                >
                  {svc.sub}
                </h3>
              )}
            </div>

            {/* Description */}
            <p
              className={`svc-desc-${i} mt-8 max-w-lg text-center will-change-transform`}
              style={{
                fontFamily: "'General Sans', sans-serif",
                fontSize: "clamp(14px, 1.4vw, 22px)",
                fontWeight: 300,
                lineHeight: 1.6,
                color: MUTED,
                opacity: 0,
              }}
            >
              {svc.desc}
            </p>
          </div>
        ))}

        {/* Service counter / progress */}
        <div
          className="absolute bottom-12 flex gap-3"
          style={{ fontFamily: "'General Sans', sans-serif" }}
        >
          {SERVICES.map((_, i) => (
            <div
              key={i}
              className="h-px w-8"
              style={{ background: `${LIGHT}20` }}
            />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 3: CTA — Scaling text + color morph    */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        ref={ctaRef}
        className="relative flex h-screen items-center justify-center overflow-hidden"
      >
        {/* Orange background fill */}
        <div
          className="cta-fill absolute inset-0 origin-bottom"
          style={{ background: ORANGE, transform: "scaleY(0)" }}
        />

        {/* CTA text */}
        <h2
          className="cta-text relative z-10 select-none text-center will-change-transform"
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: "clamp(36px, 8vw, 140px)",
            fontWeight: 700,
            lineHeight: 1,
            color: LIGHT,
          }}
        >
          Lass uns
          <br />
          <span style={{ fontWeight: 300, fontStyle: "italic" }}>reden.</span>
        </h2>

        {/* Subtle email below */}
        <a
          href="mailto:info@pixintcreators.de"
          className="absolute bottom-12 z-10 transition-colors hover:text-white"
          style={{
            fontFamily: "'General Sans', sans-serif",
            fontSize: "clamp(12px, 1.2vw, 18px)",
            letterSpacing: "0.15em",
            color: `${LIGHT}80`,
          }}
        >
          info@pixintcreators.de
        </a>
      </section>
    </div>
  );
}
