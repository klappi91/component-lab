# exp-warm-brutal

## Meta
- **Konzept:** "Warmer Brutalismus trifft Editorial Craft" — haptisch, typografie-dominant, wie ein Architektur-Magazin im Browser
- **URL:** (pending deployment)
- **GitHub:** https://github.com/klappi91/weblab-exp-warm-brutal
- **Status:** Builder laeuft (Phase C1)
- **Erstellt:** 2026-03-23
- **Prozess-Experiment:** Designer-Agent → Builder Pipeline (ERSTES Prozess-Experiment!)

## Prozess-Experiment: Designer → Builder Pipeline

### Hypothese
Ein spezialisierter Design-Agent, der NUR ein Konzept entwirft (ohne Code), liefert bessere kreative Ergebnisse als wenn direkt gebaut wird. Der Builder setzt das Konzept dann 1:1 um.

### Setup
1. **Designer-Agent** (Opus, Sub-Agent) — bekam vollstaendiges Brief (Brand, Services, Referenzen) + designer.md Regeln
2. **Asset-Generator** (Sonnet, Background-Agent) — generiert 6 kritische Bilder mit gemini-image
3. **Builder-Agent** (Opus, tmux-Session) — baut Homepage nach Konzept mit Skills

### Designer-Output
Sehr detailliertes Konzept mit:
- 5 Referenz-Websites (Obys, Locomotive, Immersive Garden, Darkroom, Utsubo)
- Vollstaendiges Design-System (Farben, Fonts, Spacing)
- 8 Sektionen mit konkretem Content und Signature Moments
- Interaktions-Map (Cursor, Scroll, Hover, Preloader)
- 14 Asset-Beschreibungen mit konkreten Prompts
- Narrative (7 Akte)

### Beobachtungen
- Designer hat sich NICHT an Dark/Neon Stil gehalten (gut — Diversitaet)
- Hat eigenstaendig Fonts gewaehlt (Instrument Serif, Clash Display, Cabinet Grotesk)
- Hat Asset-Prompts mitgeliefert (sehr hilfreich fuer Asset-Gen)
- Hat klare "How did they do that?" Momente definiert (Video-durch-Text)
- Hat Testimonial-Zitat mit fiktivem Kunden erstellt (muss ggf. angepasst werden)

### Was noch zu evaluieren ist
- [ ] Baut der Builder das Konzept korrekt um?
- [ ] Ist das Ergebnis besser als exp-shader-forge?
- [ ] Welche Teile des Konzepts sind umsetzbar vs. zu ambitioniert?
- [ ] Wie ist die Asset-Qualitaet aus gemini-image?
- [ ] Build-Fehler? TypeScript-Fehler?
- [ ] Responsive-Qualitaet?

## Design
- Warm Concrete (#E8E0D4), Raw Paper (#F2EDE6) — LIGHT Theme
- Charcoal (#1A1A18) Text, Burnt Vermillion (#D4380D) Akzent (max 3x!)
- Fonts: Instrument Serif + Clash Display + Cabinet Grotesk + JetBrains Mono
- Grain-Overlay, diagonale Clip-Paths, keine Border-Radius
- Sektionen: Portal → Manifest → Arsenal → Beweis → Methode → Stimme → Signal → Fuss

## Technisch
- Next.js 16 + React 19 + Tailwind v4
- GSAP ScrollTrigger (Horizontal Scroll, Pinning)
- Lenis Smooth Scroll
- CSS sticky stacking (Services)
- Video-durch-Text (clip-path oder WebGL)
- Custom Cursor
