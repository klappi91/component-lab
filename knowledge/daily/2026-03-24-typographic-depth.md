# 2026-03-24 — hero-v008-a: TYPOGRAPHIC DEPTH (run-20260324-0820)

## Entscheidung
P4: Neues Erlebnis — ERSTES mit Mouse-Interaktion. Kein neues Chris-Feedback (alle verarbeitet).

## Heartbeat-Check
- Mail: uid 19 (07:30) bereits verarbeitet (v005-a v2). uid 18 (Server Error /compare/hero-v004): transient, jetzt behoben.
- Inspiration: neuroproductions.be (Kris Temmerman) → WebGPU, "Portfolio = Game", Creativity 8.03. Scraper kann nur Fallback rendern. Key Insight: **Interaktivitaet** fehlt in allen bisherigen Erlebnissen.
- Awwwards: The Camel Fabric Game (Adoratorio/Max Mara, Three.js Spiel). Wenig relevant fuer Agentur.
- Improvements: alle 5 [DONE].

## Was gebaut wurde
**hero-v008-a: TYPOGRAPHIC DEPTH — 3D Parallax Typography**

### Konzept
Erstes Erlebnis mit MOUSE-INTERAKTION statt nur Scroll:
- 5 Typography-Layer auf verschiedenen Z-Ebenen (CSS 3D perspective + translateZ)
- Mouse steuert 3D-Perspektive (rotateX/Y via GSAP quickTo/to)
- Scroll zoomt durch die Schichten — jeder Layer flasht beim Passieren
- Ambient-Partikel im Raum (Canvas, maus-reaktiv mit Repulsion)
- Brand Reveal (PIXINT / CREATORS) am Ende

### Signature Moments
1. **Mouse bewegen = Welt reagiert sofort** — 3D tilt + Layer parallax + Partikel weichen aus
2. **Layer-Flash beim Durchfliegen** — radial gradient pulse wenn Kamera Layer passiert
3. **Ambient Particles** — 120 driftende Punkte, orange (vorne) + weiss (hinten), depth-scaled
4. **Cursor Glow** — orange radial gradient folgt Cursor mit Delay

### Technisches
- CSS `perspective: 1200px` + `preserve-3d` + `translateZ` fuer echten 3D-Raum
- GSAP `gsap.to()` fuer smooth Mouse-Rotation (power2.out, 1s duration)
- Canvas 2D fuer Particle System (DPR-aware, 60fps)
- Mobile: Auto-Tilt Animation (sine.inOut, 6s yoyo) statt Mouse
- `overflowX: hidden` (nicht overflow:hidden — bricht ScrollTrigger)
- Fontshare via `<link>` (Clash Display + Instrument Serif)

### Choreografie
- **Entrance (0.3s delay):** Layers gestaffelt (deepest first, expo.out), Brand overlapping
- **Scroll 0-55%:** Camera Z 0→2600, Layer brightens → flash → scale 4x + fade
- **Scroll 55-75%:** Brand grows (power4.inOut)
- **Scroll 75-100%:** Tagline, Subtitle, Decorative Line reveal

## Self-Eval
- **Konzept:** 8/10 — Mouse-Interaktion ist der richtige naechste Schritt
- **3D-Effekt:** 7/10 — CSS 3D funktioniert, aber echte WebGL waere dramatischer
- **Partikel:** 7/10 — einfach aber effektiv, Mouse-Repulsion gibt Feedback
- **Scroll-Through:** 7.5/10 — Layer-Flash ist ein guter Signature Moment
- **Gesamt:** 7.5/10 (chris_estimate: ~5.5/10)
- **Potenzial:** 8/10 — WebGL-Upgrade, bessere Layer-Animations, Sound

## Was ich gelernt habe
- **CSS 3D perspective + GSAP** = brauchbar fuer leichtgewichtige 3D-Effekte, aber hat Grenzen
- **Mouse-Interaktion** als Differenzierungsmerkmal — alle bisherigen Erlebnisse nur scroll
- **Canvas Particles + DOM** mischen geht problemlos (Canvas als unterste Schicht)
- **quickTo vs gsap.to fuer Mouse:** quickTo setzt GSAP properties direkt, gsap.to mit overwrite:auto ist flexibler fuer komplexe Targets

## Naechste Schritte
- [ ] Chris-Feedback zu v008-a einholen
- [ ] Optional: WebGL-Upgrade mit Three.js fuer dramatischere Tiefe
- [ ] Optional: SplitText auf Brand-Layer fuer char-by-char Entrance
