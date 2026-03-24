# 2026-03-24 — hero-v005-a: Pixel Genesis (run-20260324-0640)

## Entscheidung
P1: Chris-Feedback! Mail-Antwort auf exp-story-editorial mit klarem Auftrag:
- Story: "Vom Pixel zur Website auf intelligente Weise mit KI"
- Technik: "Videos per Scrollen animieren, Start-Foto End-Foto, durch Scrollen abspielen"
- "Sei mutig und erfinde neue Dinge"
- "Was fuer Assets werten eine Website auf?"

## Was gebaut wurde
**hero-v005-a: PIXEL GENESIS — Vom Pixel zur Website**
- Kategorie: scroll-storytelling
- Canvas-basierte Particle-to-Image Transformation
- 1560 Particles (52x30 Grid) die ein Website-Bild formen

### Choreografie (4 Phasen, GSAP ScrollTrigger scrub, 500vh pinned)
1. **EMERGENCE (0-18%):** Einzelnes Pixel explodiert — Particles bursten aus der Mitte mit expo.out, chaotische Verteilung, orange Farbe, living noise
2. **ORDER (18-48%):** Chaos → Bild-Positionen — inOutQuart Easing, Particles fliessen wie Vogelschwaerme zu ihren Zielpositionen, Noise fadet aus
3. **COLOR (48-76%):** Orange → Bildfarben — jedes Particle nimmt die Farbe des gesampelten Bildpixels an, outCubic
4. **SHARPEN (76-100%):** Bloecke wachsen zusammen — volle Aufloesung, Bild vollstaendig erkennbar

### Weitere Sektionen
- **Intro:** Pulsendes einzelnes Pixel + "Alles beginnt mit einem Pixel." (Clash Display + Instrument Serif italic)
- **Reveal:** "Vom Pixel zur Website." scale-up + orange Background-Fill von unten

### Technische Details
- Canvas Render-Loop (requestAnimationFrame, ~60fps)
- Image-Sampling: Laedt target.png → Offscreen Canvas → getImageData → Pixel-Farben samplen
- Fallback: Prozedurales Website-Wireframe wenn kein Bild vorhanden
- Fonts: Clash Display (700), Instrument Serif (400i), General Sans (300-500) via Fontshare
- Custom Cursor (orange, mix-blend-difference)
- SVG Grain Overlay (feTurbulence, 3.5% opacity)
- Responsive: clamp() fuer alle Schriftgroessen

## Self-Eval
- **Konzept-Staerke:** 8/10 — die Story "Vom Pixel zur Website" passt PERFEKT zu PixIntCreators
- **Choreografie:** 7/10 — 4 Phasen sind klar, Uebergaenge smooth, aber noch nicht auf Awwwards-Niveau
- **Technik:** 7.5/10 — Canvas Particle System funktioniert, Fallback-Bild ist solide
- **Gesamt:** 7/10 (chris_estimate: ~5/10)
- **Potenzial:** 8.5/10 — mit echtem generierten Bild (gemini-image) und Feintuning der Easings/Timing koennte es deutlich besser werden

## Was fehlt / naechste Schritte
- [ ] Echtes Bild mit gemini-image generieren (statt Fallback-Wireframe)
- [ ] Eventuell gemini-video fuer eine echte Video-Sequenz
- [ ] Mobile-Optimierung testen (agent-browser)
- [ ] Easing-Feintuning (Phase 2: ORDER koennte dramatischer sein)
- [ ] Optional: Mouse-Parallax auf Particles in Phase 1

## Erkenntnisse
- **Chris' Feedback → direkte Umsetzung** ist der beste Workflow. Klar, fokussiert, relevant.
- **Canvas + GSAP ScrollTrigger** = starke Kombination fuer scroll-driven visuelle Erlebnisse
- **Procedural Fallback** ist ein gutes Pattern — das Erlebnis funktioniert immer, auch ohne Assets
- **Particles als Metapher** fuer den kreativen Prozess ist eine starke Idee die weiterverfolgt werden sollte
