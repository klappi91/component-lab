# 2026-03-24 — run-20260324-1240: LIQUID GLASS — Erster WebGL Shader

## Was passiert ist
- **Tiefe Analyse:** 14 Heroes, 0 WOW — warum? Fundamentales Problem identifiziert
- **Referenz-Analyse:** Lusion, Immersive Garden, makemepulse analysiert
- **Paradigmenwechsel:** Erster WebGL-Shader-Hero statt Canvas 2D oder DOM
- **hero-v015-a: LIQUID GLASS gebaut**

## Die Erkenntnis: Warum 14 Heroes kein WOW erzeugt haben

| Problem | Meine Heroes | Award-Gewinner |
|---------|-------------|----------------|
| Konzept | Tech-Demo | Emotionales Erlebnis |
| Visuell | Abstrakt/generiert | Echte Fotografie |
| Technik | Breite (14 Techniken) | Tiefe (1 perfektioniert) |
| Alive | Effekt stoppt | Immer lebendig, immer reaktiv |
| Interaktion | Nur Scroll | Mouse, Cursor, Touch |

**Lusion:** WebGL 3D-Objekte als Hero, interaktiv, reagiert auf Mouse/Scroll
**Immersive Garden:** Atmosphaerische WebGL-Szenen, cinematic, Sound-Toggle
**makemepulse:** Project Trail (Bilder folgen Cursor), "aesthetics into experiences"

**Key Insight:** Award-Studios nutzen WebGL/Shader als KERN ihres visuellen Identitaet. Nicht DOM-Animationen, nicht Canvas 2D. GLSL Fragment Shader.

## hero-v015-a: LIQUID GLASS

### Konzept
- Cinematic Bild (Haende am Tablet, orange Licht) hinter GLSL-Distortion
- 3 Schichten Simplex-Noise fuer fluessige Bewegung
- Mouse-Position verschiebt das Bild (Ripple-Effekt)
- Chromatic Aberration trennt RGB-Kanaele
- Scroll klaert Verzerrung exponentiell
- Text erscheint beim Klaeren: "WIR CODIEREN ERLEBNISSE"

### Tech-Stack (NEU)
- react-three-fiber + drei + three.js
- Custom GLSL Fragment Shader (simplex noise, chromatic aberration)
- GSAP ScrollTrigger (scrub) fuer Scroll-Progress
- Space Grotesk (Google Font) fuer mutige Typografie
- gemini-image 2K Hero-Bild ($0.10)

### Choreografie
- DISTORTION (0-30%): Volle Verzerrung, abstraktes Muster
- EMERGENCE (30-60%): Bild klaert sich, "WIR CODIEREN" mit Blur-Reveal
- CLARITY (60-90%): Fast klar, "ERLEBNISSE" schlaegt ein (12vw, orange)
- RESOLVE (90-100%): Kristallklar, Brand + Services

### Was anders ist als alle vorherigen
1. **Erster WebGL-Shader** (nicht Canvas 2D, nicht DOM)
2. **Image-zentriert** (echtes Visual, nicht abstrakt)
3. **Mouse-interaktiv** (User ist Teil des Erlebnisses)
4. **Immer lebendig** (Shader laeuft permanent, unabhaengig von Scroll)
5. **Fokussiert** (EINE Technik, EINE Emotion: Mystery → Klarheit)

## Technik-Erkenntnisse (promote-worthy?)
- **react-three-fiber + Next.js 16:** Braucht `dynamic(() => ..., { ssr: false })` weil Three.js Browser-APIs nutzt
- **Cover UV in GLSL:** Aspect-Ratio-Berechnung im Shader fuer responsives Bild-Fitting
- **Mouse Lerp im useFrame:** `smoothMouse += (raw - smooth) * 0.06` gibt fluessiges, physisches Gefuehl
- **Exponentieller Distortion Falloff:** `dist * dist` statt linear = natuerlicheres Klaeren
- **Chromatic Aberration proportional:** Staerker bei hoher Verzerrung, verschwindet bei Klarheit

## Offen
- Chris Feedback abwarten
- Visuelles QA (kann nicht ohne dev server, Build ist OK)
- Mobile Touch-Interaction testen
- Optional: Lenis Smooth Scroll integrieren
- Optional: Sound Toggle (wie Immersive Garden)
