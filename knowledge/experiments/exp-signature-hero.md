# exp-signature-hero

## Meta
- **Konzept:** "Signature Hero" — WebGL Shader als Signature Moment, cinematic dark, editorial
- **URL:** (pending deploy)
- **GitHub:** https://github.com/klappi91/weblab-exp-signature-hero
- **Status:** v1 deployed, QA Score 8/10
- **URL:** https://exp-signature-hero.vercel.app
- **Erstellt:** 2026-03-23
- **Prozess-Experiment:** #4 — Signature Module + Builder Integration

## Prozess-Experiment #4: Signature Module + Builder Integration

### Hypothese
Das kreativste/schwierigste Stück (WebGL Shader) wird vom Orchestrator (Opus) selbst gebaut.
Der Rest (Layout, Sektionen, Responsive) wird an einen Sonnet-Builder delegiert.
Die Kombination von kreativem Opus-Modul + systematischem Sonnet-Build sollte bessere Ergebnisse liefern als alles zu delegieren.

### Unterschied zu bisherigen Experimenten
- #1 (Designer → Builder): Designer-Konzept + Builder = 5/10
- #2 (OpenAI Rules → Builder): Rules + Assets + Builder = 7/10
- #3 (Overdrive → Builder): Bestehend + Polish-Spec + Builder = 7.5/10
- **#4 (Signature Module + Builder): Opus baut Kern-Modul + Sonnet baut Rest**

### Setup
- **Orchestrator (Opus):** ShaderHero WebGL Component (noise displacement, mouse ripple, chromatic aberration)
- **Assets:** 8 gemini-image Bilder ($0.58, 64 Sek)
- **Builder (Sonnet):** Homepage via Agent-Tool, mit pre-built ShaderHero
- **Skills:** gsap-scrolltrigger, motion-framer, frontend-design, creative-effects, threejs-webgl
- **Konzept:** Manuell geschrieben mit konkreten Sektions-Specs

### Assets
1. hero-studio.png (16:9, 2K) — Dark Studio, orange volumetric light
2. service-webdesign.png (3:4) — Laptop mit Wireframe
3. service-ki.png (3:4) — Neural Network Nodes
4. service-creative.png (3:4) — 3D Glas-Skulptur
5. project-mockup-1.png (3:2) — Website auf curved Monitor
6. project-mockup-2.png (3:2) — Mobile + Tablet Mockup
7. team-chris.png (3:4) — Portrait-Silhouette
8. studio-atmosphere.png (21:9) — Ultra-wide Studio

### ShaderHero Component (von Opus gebaut)
- Three.js Plane mit Hero-Bild als Textur
- Custom Fragment Shader: Simplex Noise displacement ("atmendes" Bild)
- Mouse-Ripple: Verzerrung folgt dem Cursor
- Scroll-Progress: Chromatic Aberration nimmt zu bei Scroll
- Film Grain + Vignette im Shader
- React Three Fiber als React-Integration

### Evaluation (QA 2026-03-23)
- [x] Hat der Builder den ShaderHero korrekt integriert? ✓
- [x] Nutzt der Builder alle 8 Bilder? ✓ (8/8)
- [x] Ist das Ergebnis besser als exp-cinematic-dark (7.5/10)? ✓ (8/10 vs 7.5/10)
- [x] Hat das WebGL den "Wie haben die das gemacht?"-Effekt? ✓ Hero lebt, Noise-Displacement sichtbar
- [x] Build fehlerfrei? ✓
- [ ] Mobile responsive? Teilweise — kein Hamburger-Menu auf Mobile

### QA Score v1: 8/10

### QA Score v2 (Overdrive Push): 8.5/10
| Sektion | v1 | v2 | Delta |
|---------|-----|-----|-------|
| Hero | 9/10 | 9/10 | — |
| Services | 8/10 | 8/10 | — |
| Portfolio | 7.5/10 | 8.5/10 | +1 |
| Methode | 7.5/10 | 8.5/10 | +1 |
| CTA | 8.5/10 | 8.5/10 | — |
| Footer | 7/10 | 8/10 | +1 |
| Mobile | 7/10 | 9/10 | +2 |

### v2 Änderungen (Overdrive Push, 2026-03-23)
- Mobile: Full-Screen Hamburger Menu mit nummerierten Links + GSAP Animations
- Nav: Backdrop-blur on scroll
- Portfolio: Editorial Info-Bar (solid bg) statt Overlay (unlesbar)
- Methode: Nummern 5-10rem (war 4-7rem), Connector Lines
- Footer: "Digital. Mutig. Anders." Statement + Mail-Link

### QA Score v3 (Custom Cursor + Portfolio): ~8.8/10
| Sektion | v2 | v3 | Delta |
|---------|-----|-----|-------|
| Hero | 9/10 | 9/10 | — |
| Services | 8/10 | 8/10 | — |
| Portfolio | 8.5/10 | 9/10 | +0.5 |
| Methode | 8.5/10 | 8.5/10 | — |
| CTA | 8.5/10 | 8.5/10 | — |
| Footer | 8/10 | 8/10 | — |
| Mobile | 9/10 | 9/10 | — |
| Custom Cursor | — | 8.5/10 | NEU |

### v3 Aenderungen (Custom Cursor + Portfolio, 2026-03-23)
- Custom Cursor: Magnetic GSAP cursor mit orange ring + dot
  - Context-aware: "Explore" auf Portfolio, "View" auf Bildern, magnetic auf Links
  - Click pulse effect (elastic), touch-device hidden
- Portfolio: 4 Items statt 2 (DripSwipe + Immobilien 360°)
- 2 neue gemini-image Mockups ($0.20)

### Verbesserungspotential (fuer 9/10+)
- Scroll-Transitions zwischen Sektionen
- Services-Section aufwerten (aktuell 8/10)
- impeccable:overdrive Skill-Push

## Design
- Dark Base (#0A0A0A), Orange Akzent (#FF6B00, max 3-4x)
- Fonts: Unbounded (display) + Space Grotesk (body)
- Asymmetrische Layouts, editorial
- GSAP ScrollTrigger (toggleActions, kein scrub)
- WebGL Shader Hero als Signature Moment
