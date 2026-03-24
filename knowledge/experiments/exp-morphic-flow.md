# exp-morphic-flow — Experiment Status

## Ueberblick
- **Stil:** Dark morphic — Canvas flow field, generative visuals, stacking cards
- **URL:** https://exp-morphic-flow.vercel.app
- **GitHub:** https://github.com/klappi91/weblab-exp-morphic-flow
- **Gestartet:** 2026-03-24
- **Status:** v3 deployed, QA pending

## Versions
| Version | Datum | Aenderungen | Score |
|---------|-------|------------|-------|
| v1 | 2026-03-24 | Initial: Flow-Field Hero, 7 Sektionen, 4 Mockups | 6.5/10 (QA) |
| v2 | 2026-03-24 | Navigation, Umlaute, Manifest groesser, Process-Spacing, CTA | 6.5/10 (QA) |
| v3 | 2026-03-24 | **Builder-Agent Rebuild** — Stacking Cards, Horizontal Scroll, Canvas Visuals, Pinned Timeline | QA pending |

## Prozess-Experiment: "Builder-Agent mit Detailed Specs"
- **Hypothese:** Wenn die Specs detailliert genug sind (exakte JSX, CSS, GSAP Code pro Sektion), kann ein Sonnet-Builder ein signifikant besseres Ergebnis liefern als v2
- **Methode:** 350+ Zeilen creative-brief.md mit Code-Snippets pro Sektion → Sonnet Agent-Tool
- **Ergebnis:** Builder hat alle 9 Dateien korrekt umgesetzt, Build 0 Fehler
  - 13 Dateien geaendert (1888 Insertions, 654 Deletions)
  - 3 neue Canvas-Komponenten (ServiceWireframe, ServiceNetwork, ServiceParticles)
  - Horizontal Scroll mit containerAnimation, Stacking Cards, Pinned Timeline — alles nach Spec
- **Builder-Dauer:** ~10 Minuten (inkl. Spec-Lesen + Build-Test)
- **Spec-Dauer:** ~15 Minuten (Opus, creative-brief schreiben)

## v3 Features (Builder-Agent)
- **Services:** Full-screen Stacking Cards mit 3 Canvas Visuals (Wireframe, Network, Particles)
- **Showcase:** Horizontal Scroll Gallery mit GSAP pin + containerAnimation Parallax
- **Process:** Pinned 500vh Scroll Timeline mit SVG drawSVG + autoAlpha Step-Transitions
- **Manifest:** Word-by-Word Reveal (manuelles Splitting, kein SplitText Plugin)
- **CTA:** Full-screen mit Canvas Flow Field Background
- **Footer:** Infinite Marquee + 4-Column Grid + LiveClock
- **Layout:** Fontshare + Google Fonts via <link>, Film Grain Overlay
- **Mobile:** Alle Sektionen mit responsive Fallbacks

## Offene Issues (v2, evtl. in v3 gefixt)
### v2 P1 (wahrscheinlich in v3 geloest)
- ~~Service-SVGs zu simpel~~ → v3: Canvas Visuals (Network, Wireframe, Particles)
- ~~Showcase-Sektion inszeniert Arbeit nicht genug~~ → v3: Horizontal Scroll Gallery
- Hero-Canvas muss sichtbarer wirken (Hero nicht geaendert in v3)

### v2 P2
- ~~Process noch etwas zu viel Leerraum~~ → v3: Pinned 500vh, kompaktere Steps
- Mobile Works-Karten Lesbarkeit → v3: Neues Mobile-Layout

## Fonts
- Clash Display (Fontshare) — Headlines
- Zodiak (Fontshare) — Accent/Serif
- Satoshi (Fontshare) — Body
- JetBrains Mono (Google) — Mono/Labels

## Farben
- #050505 Background, #E8E4E0 Text, #FF6B00 Accent, #777777 Muted
