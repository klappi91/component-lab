"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const words = ["FORM", "STEIN", "RAUM"];

function FloatingChar({
  char,
  index,
  total,
}: {
  char: string;
  index: number;
  total: number;
}) {
  const randomX = ((index / total) * 80 - 40 + (Math.sin(index * 2.7) * 15));
  const randomY = ((index / total) * 60 - 30 + (Math.cos(index * 1.9) * 10));

  return (
    <motion.span
      className="absolute text-[clamp(4rem,20vw,16rem)] font-black select-none mix-blend-difference pointer-events-none"
      style={{
        left: `${50 + randomX}%`,
        top: `${50 + randomY}%`,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ opacity: 0, scale: 0.3, rotate: (Math.random() - 0.5) * 90 }}
      animate={{
        opacity: [0.05, 0.15, 0.05],
        scale: [0.8, 1, 0.8],
        rotate: [(Math.random() - 0.5) * 10, 0, (Math.random() - 0.5) * 10],
      }}
      transition={{
        duration: 8 + index * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.3,
      }}
    >
      {char}
    </motion.span>
  );
}

export default function HeroV001B() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // All chars for floating background
  const allChars = words.join("").split("");

  return (
    <div ref={containerRef} className="relative">
      <section className="h-screen relative overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
        {/* Floating background chars */}
        <motion.div className="absolute inset-0" style={{ opacity: bgOpacity }}>
          {allChars.map((char, i) => (
            <FloatingChar key={i} char={char} index={i} total={allChars.length} />
          ))}
        </motion.div>

        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px",
          }}
        />

        {/* Main title — stacked grid */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-4"
          style={{ y: titleY, scale: titleScale }}
        >
          <div className="grid grid-rows-3 gap-0">
            {words.map((word, wi) => (
              <motion.div
                key={word}
                className="overflow-hidden"
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                transition={{
                  duration: 1.2,
                  delay: 0.2 + wi * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <motion.h1
                  className="text-[clamp(3.5rem,18vw,14rem)] font-black leading-[0.85] tracking-[-0.05em] text-center"
                  style={{ color: "#f5f0eb" }}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 1.2,
                    delay: 0.2 + wi * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.h1>
              </motion.div>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            className="mt-10 text-[clamp(0.65rem,1.5vw,1rem)] tracking-[0.5em] uppercase font-light"
            style={{ color: "#f5f0eb40" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Architektur die bleibt
          </motion.p>
        </motion.div>

        {/* Corner details */}
        <motion.div
          className="absolute bottom-8 left-8 font-mono text-[10px] tracking-widest"
          style={{ color: "#f5f0eb20" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          EST. 1987
        </motion.div>
        <motion.div
          className="absolute bottom-8 right-8 font-mono text-[10px] tracking-widest"
          style={{ color: "#f5f0eb20" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          BERLIN
        </motion.div>
      </section>

      {/* Second section */}
      <section
        className="h-screen flex items-center justify-center"
        style={{ backgroundColor: "#f5f0eb" }}
      >
        <p
          className="text-[clamp(1rem,3vw,2rem)] font-light tracking-[0.3em] uppercase"
          style={{ color: "#0a0a0a" }}
        >
          Raum definieren
        </p>
      </section>
    </div>
  );
}
