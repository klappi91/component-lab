# exp-scroll-story

## Status: v1 deployed, QA läuft
## URL: https://exp-scroll-story.vercel.app
## GitHub: https://github.com/klappi91/weblab-exp-scroll-story

## Ansatz
"Scroll Cinema" — Die gesamte Seite ist ein cinematic Scroll-Erlebnis. Keine Navbar, keine sichtbaren Sektions-Grenzen. 7 Kapitel die sich wie ein Film entfalten.

## Zweck: IMP-002
Skills `scroll-storyteller` + `awwwards-animations` in einem echten Build testen.

## Story-Arc (7 Kapitel)
1. **Opening Credits** — Sticky Hero, Zoom+Dim Scroll-Animation (200vh)
2. **Das Problem** — 3-Phasen Text-Reveal: "99% sehen gleich aus" (300vh)
3. **Der Funke** — Orangener Punkt explodiert zu Fullscreen-Reveal (200vh)
4. **Services** — 3 Services Crossfade, alternierend Bild/Text (400vh)
5. **Portfolio** — Clip-path Wipe-Reveals fuer 3 Projekte (400vh)
6. **Der Weg** — SVG Path-Drawing + 4 Process Steps (400vh)
7. **CTA** — Word-by-Word Reveal, dramatisch (100vh)

## Fonts
Cabinet Grotesk (display) + Instrument Serif (italic) + General Sans (body) — alle Fontshare

## Farben
#050505 (bg) + #F0EDE8 (text) + #FF6B00 (accent) — Dark Cinematic

## Tech
- GSAP ScrollTrigger (scrub) für alle Kapitel
- Lenis Smooth Scrolling
- Clip-path Reveals (Portfolio)
- SVG Path Drawing (Process)
- Sticky Containers (alle Kapitel)
- ScrollProgress Indicator

## Build-Metriken
- 795 Zeilen Code, 11 Dateien
- 8 Gemini-generierte Bilder ($0.80 geschätzt)
- Sonnet Builder via Agent-Tool (~4 Min)
- 0 Build-Fehler, 0 TypeScript-Fehler
- Spec: 500+ Zeilen creative-brief.md mit Code-Patterns

## Self-Eval: 6.5/10 (Chris-geschätzt: ~4.5/10)
- Konservative Bewertung — Sonnet-only Build ohne Opus Signature Module
- Stark: kohärenter Scroll-Film-Ansatz, alle Assets integriert
- Stark: vielfältige Scroll-Patterns (clip-path, SVG draw, crossfade, dot-explosion)
- Schwach: kein echtes Opus Signature-Piece (WebGL/Shader)
- Schwach: Skills scroll-storyteller + awwwards-animations nicht explizit vom Builder geladen
- Schwach: Standard-Patterns gut umgesetzt aber kein WOW-Moment

## IMP-002 Erkenntnis
Skills waren im Builder-Prompt erwähnt, aber der Builder hat sie nicht explizit geladen/verwendet.
Die Skills sind am wertvollsten in der SPEC-PHASE (Opus schreibt Konzept) nicht der BUILD-PHASE (Sonnet schreibt Code).
Spec enthielt bereits scroll-storytelling Patterns → Skills informierten das Konzept indirekt.
