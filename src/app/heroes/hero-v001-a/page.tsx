"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroV001A() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Split main title into chars
      const titleEl = titleRef.current;
      if (titleEl) {
        const text = titleEl.textContent || "";
        titleEl.innerHTML = "";
        text.split("").forEach((char, i) => {
          const span = document.createElement("span");
          span.textContent = char === " " ? "\u00A0" : char;
          span.style.display = "inline-block";
          span.style.opacity = "0";
          span.style.transform = `translateY(120px) rotate(${(Math.random() - 0.5) * 20}deg)`;
          span.className = "char";
          titleEl.appendChild(span);
        });

        // Animate chars in
        gsap.to(titleEl.querySelectorAll(".char"), {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 1.2,
          stagger: 0.04,
          ease: "power4.out",
          delay: 0.3,
        });
      }

      // Subtitle fade
      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          opacity: 0,
          y: 40,
          duration: 1,
          delay: 1.2,
          ease: "power3.out",
        });
      }

      // Scroll-driven scale
      gsap.to(".hero-title", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        scale: 0.6,
        opacity: 0.1,
        y: -100,
      });

      // Scroll-driven subtitle spread
      gsap.to(".hero-subtitle", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "30% top",
          end: "80% top",
          scrub: 1,
        },
        letterSpacing: "2em",
        opacity: 0,
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative">
      {/* Main Hero */}
      <section className="h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden px-4">
        <h1
          ref={titleRef}
          className="hero-title text-[clamp(3rem,15vw,12rem)] font-black leading-[0.85] tracking-[-0.04em] text-center select-none"
        >
          FORM STEIN RAUM
        </h1>
        <p
          ref={subtitleRef}
          className="hero-subtitle mt-8 text-[clamp(0.75rem,2vw,1.25rem)] tracking-[0.3em] uppercase font-light text-white/40"
        >
          Architektur die bleibt
        </p>
      </section>

      {/* Second section for scroll effect */}
      <section className="h-screen bg-white flex items-center justify-center">
        <p className="text-black text-[clamp(1rem,3vw,2rem)] font-light tracking-[0.2em] uppercase">
          Seit 1987
        </p>
      </section>
    </div>
  );
}
