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

### QA Score v4 (Stacking Services + Film Grain): ~9.0/10
| Sektion | v3 | v4 | Delta |
|---------|-----|-----|-------|
| Hero | 9/10 | 9/10 | — |
| Services | 8/10 | 9.5/10 | +1.5 |
| Portfolio | 9/10 | 9/10 | — |
| Methode | 8.5/10 | 8.5/10 | — |
| CTA | 8.5/10 | 8.5/10 | — |
| Footer | 8/10 | 8/10 | — |
| Mobile | 9/10 | 9/10 | — |
| Custom Cursor | 8.5/10 | 8.5/10 | — |
| Film Grain | — | + | NEU |

### v4 Aenderungen (Stacking Services + Film Grain, 2026-03-23)
- Services komplett neu: Full-Screen Stacking Cards (sticky, z-index, GSAP dim)
  - Jeder Service = eigene h-screen Card mit full-bleed Image + Parallax
  - Vorherige Cards dimmen (scale 0.92, brightness 0.4) per GSAP scrub
  - Giant semi-transparent Nummern (01/02/03), Progress-Indicator Dots
  - Spacer am Ende fuer Scroll-Raum der letzten Card
- Film Grain Overlay (SVG feTurbulence, opacity 0.04, overlay blend)
- Section Dividers (animierte h-line zwischen Sektionen, GSAP scaleX)
- Footer/Menu Jahr 2025→2026

### QA Score v6 (impeccable:overdrive Skill-Push): ~9.5/10
| Sektion | v5 | v6 | Delta |
|---------|-----|-----|-------|
| Preloader | — | 9.5/10 | NEU |
| Hero | 9/10 | 9/10 | — |
| Services | 9.5/10 | 9.5/10 | — |
| Portfolio | 9/10 | 9.2/10 | +0.2 |
| Methode | 9.2/10 | 9.2/10 | — |
| CTA | 9.3/10 | 9.3/10 | — |
| Footer | 9.0/10 | 9.3/10 | +0.3 |
| Custom Cursor | 8.5/10 | 9.2/10 | +0.7 |

### v6 Aenderungen (impeccable:overdrive Skill-Push, 2026-03-23)
- **Prozess-Experiment:** Sonnet-Agent + impeccable:overdrive Skill (82k Tokens, ~8 Min)
- Cinematic Preloader (Counter 0-100, Brand Reveal, Split-Panel Exit)
- Spring-Physics Cursor mit 4 Ghost-Trail-Ringen (tension 0.12, damping 0.72)
- Scroll-Velocity Skew auf Portfolio (bis 3° Neigung)
- Footer: Live-Uhr, Slide-Up Hover, Spring Back-to-Top

### v7 Aenderungen (Mobile QA Fix, 2026-03-23)
- **QA via agent-browser** (Desktop + iPhone 14 Emulation)
- Bug: Fehlender overflow-x:hidden auf body → horizontaler Overflow auf Mobile
- Fix: overflow-x-hidden auf body + Hero clamp 3rem→2.2rem + CTA clamp 3.5rem→2.5rem
- Desktop: 9.3/10, Mobile: 8.8/10

### Verbesserungspotential (fuer 10/10)
- Methode Step-Bilder (gemini-image)
- Page Transitions
- Sound Design (optional)

## Design
- Dark Base (#0A0A0A), Orange Akzent (#FF6B00, max 3-4x)
- Fonts: Unbounded (display) + Space Grotesk (body)
- Asymmetrische Layouts, editorial
- GSAP ScrollTrigger (toggleActions fuer reveals, scrub fuer stacking/parallax)
- WebGL Shader Hero als Signature Moment
- Full-Screen Stacking Cards fuer Services
- Film Grain Overlay (SVG feTurbulence)
- Spring-Physics Custom Cursor mit Ghost-Trail
- Cinematic Preloader mit Brand Reveal
