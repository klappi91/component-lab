"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const MANIFESTO =
  "We design the spaces between. The pauses. The voids that give meaning to form. Every absence is deliberate. Every silence speaks.";

const MARQUEE_A = [
  "01 ARCHITECTURE",
  "—",
  "02 INTERIORS",
  "—",
  "03 IDENTITY",
  "—",
  "04 DIGITAL",
  "—",
  "05 STRATEGY",
  "—",
  "01 ARCHITECTURE",
  "—",
  "02 INTERIORS",
  "—",
  "03 IDENTITY",
];

const MARQUEE_B = [
  "PROJECTS 47",
  "—",
  "AWARDS 12",
  "—",
  "YEARS 08",
  "—",
  "STUDIOS 03",
  "—",
  "PROJECTS 47",
  "—",
  "AWARDS 12",
  "—",
  "YEARS 08",
  "—",
  "STUDIOS 03",
];

export default function HeroV003A() {
  const main = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      /* ===== S1: VOID — spread + zoom-through ===== */
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".s-hero",
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      const letters = gsap.utils.toArray<HTMLElement>(".vl");
      const spread = [-38, -13, 13, 38];

      letters.forEach((el, i) => {
        heroTl.to(
          el,
          {
            x: () => (spread[i] / 100) * window.innerWidth,
            duration: 0.3,
            ease: "power1.out",
          },
          0
        );
      });

      heroTl.to(".vt", { scale: 80, duration: 0.5, ease: "power3.in" }, 0.3);
      heroTl.to(letters, { opacity: 0, duration: 0.15 }, 0.5);

      heroTl.fromTo(
        ".vs",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
        0.75
      );

      heroTl.to(".sc", { opacity: 0, y: -15, duration: 0.08 }, 0);

      /* ===== S2: Marquee — horizontal counter-scroll ===== */
      const marqTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".s-marq",
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      marqTl.fromTo(
        ".mr1",
        { xPercent: 0 },
        { xPercent: -35, ease: "none", duration: 1 },
        0
      );
      marqTl.fromTo(
        ".mr2",
        { xPercent: -35 },
        { xPercent: 0, ease: "none", duration: 1 },
        0
      );

      /* Subtle brightness pulse at midpoint */
      marqTl.fromTo(
        [".mr1", ".mr2"],
        { opacity: 0.4 },
        { opacity: 1, duration: 0.5, ease: "power1.inOut", yoyo: true, repeat: 1 },
        0
      );

      /* ===== S3: Manifesto — word-by-word reveal ===== */
      gsap.utils.toArray<HTMLElement>(".mw").forEach((word) => {
        gsap.fromTo(
          word,
          { opacity: 0.06, y: 10 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: word,
              start: "top 84%",
              end: "top 48%",
              scrub: 0.5,
            },
          }
        );
      });

      /* ===== S4: CTA — scale-up reveal ===== */
      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".s-cta",
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      ctaTl.fromTo(
        ".ct",
        { scale: 0.03, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.55, ease: "expo.out" }
      );
      ctaTl.fromTo(
        ".cg",
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
        0.4
      );
      ctaTl.fromTo(
        ".cb",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.2, ease: "power3.out" },
        0.6
      );
      ctaTl.fromTo(
        ".cm",
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.2 },
        0.75
      );

      /* ===== Global: progress line ===== */
      gsap.fromTo(
        ".prog",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: main.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.2,
          },
        }
      );
    },
    { scope: main }
  );

  const words = MANIFESTO.split(" ");

  return (
    <div
      ref={main}
      className="relative overflow-x-hidden bg-black text-white selection:bg-[#00ff88]/20 selection:text-[#00ff88]"
    >
      {/* ── Grain overlay ── */}
      <svg
        className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.035]"
        aria-hidden="true"
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* ── Progress line ── */}
      <div className="prog fixed left-0 top-0 z-50 h-full w-[2px] origin-top bg-[#00ff88]" />

      {/* ═══════════════════════════════════════════
          S1 — VOID HERO
      ═══════════════════════════════════════════ */}
      <section className="s-hero relative flex h-screen items-center justify-center overflow-hidden">
        {/* Year label */}
        <span className="absolute bottom-8 left-8 text-[10px] tracking-[0.2em] text-neutral-700">
          © 2024
        </span>

        {/* Menu hint */}
        <span className="absolute right-8 top-8 text-[10px] tracking-[0.35em] uppercase text-neutral-600">
          Menu
        </span>

        {/* Title */}
        <div className="vt flex items-center justify-center will-change-transform">
          {"VOID".split("").map((ch, i) => (
            <span
              key={i}
              className="vl inline-block text-[24vw] font-black leading-[0.82] tracking-[-0.04em] will-change-transform"
            >
              {ch}
            </span>
          ))}
        </div>

        {/* Subtitle (hidden, revealed by GSAP) */}
        <div className="vs absolute inset-x-0 bottom-[15%] text-center opacity-0">
          <p className="text-[11px] font-light tracking-[0.65em] uppercase text-neutral-400">
            Experimental Design Studio
          </p>
        </div>

        {/* Scroll hint */}
        <div className="sc absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
          <span className="text-[9px] tracking-[0.35em] uppercase text-neutral-600">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-neutral-600 to-transparent" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          S2 — MARQUEE
      ═══════════════════════════════════════════ */}
      <section className="s-marq relative flex h-screen flex-col justify-center gap-4 overflow-hidden">
        <div className="mr1 flex shrink-0 items-center gap-6 whitespace-nowrap will-change-transform">
          {MARQUEE_A.map((t, i) => (
            <span
              key={i}
              className={`text-[11vw] font-black leading-none ${
                t === "—" ? "text-[#1a1a1a]" : "text-[#1e1e1e]"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mr2 flex shrink-0 items-center gap-6 whitespace-nowrap will-change-transform">
          {MARQUEE_B.map((t, i) => (
            <span
              key={i}
              className={`text-[11vw] font-black leading-none ${
                t === "—" ? "text-[#1a1a1a]" : "text-[#1e1e1e]"
              }`}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Section label */}
        <div className="absolute right-8 top-8 text-right">
          <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-700">
            02 / 04
          </span>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          S3 — MANIFESTO
      ═══════════════════════════════════════════ */}
      <section className="s-mani flex min-h-[200vh] items-start justify-center px-6 pb-[50vh] pt-[40vh]">
        <p className="max-w-5xl text-center text-[clamp(1.6rem,4.5vw,4rem)] font-extralight leading-[1.35]">
          {words.map((word, i) => {
            const hasPeriod = word.endsWith(".");
            const text = hasPeriod ? word.slice(0, -1) : word;
            return (
              <span
                key={i}
                className="mw mr-[0.28em] inline-block will-change-[opacity,transform]"
              >
                {text}
                {hasPeriod && <span className="text-[#00ff88]">.</span>}
              </span>
            );
          })}
        </p>
      </section>

      {/* ═══════════════════════════════════════════
          S4 — CTA
      ═══════════════════════════════════════════ */}
      <section className="s-cta relative flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* Green glow */}
        <div className="cg pointer-events-none absolute inset-0 flex items-center justify-center opacity-0">
          <div
            className="h-[140%] w-[140%] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 55%)",
            }}
          />
        </div>

        {/* CTA text */}
        <div className="ct text-center will-change-transform">
          <p className="text-[clamp(2rem,11vw,9rem)] font-black leading-[0.88] tracking-[-0.03em]">
            LET&apos;S CREATE
          </p>
          <p className="text-[clamp(2rem,11vw,9rem)] font-black leading-[0.88] tracking-[-0.03em] text-[#00ff88]">
            VOID.
          </p>
        </div>

        {/* Accent line */}
        <div className="cb mt-10 h-[1px] w-16 origin-center bg-[#00ff88]" />

        {/* Contact */}
        <p className="cm mt-7 text-[10px] tracking-[0.5em] uppercase text-neutral-500">
          hello@void.studio
        </p>
      </section>
    </div>
  );
}
