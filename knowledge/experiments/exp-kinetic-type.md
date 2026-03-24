# exp-kinetic-type — Experiment Status

## Überblick
- **Stil:** Light, typografie-getrieben, kinetisch — HELLE Palette, Cabinet Grotesk Black
- **URL:** https://exp-kinetic-type.vercel.app
- **GitHub:** https://github.com/klappi91/weblab-exp-kinetic-type
- **Gestartet:** 2026-03-24
- **Status:** v1.1 deployed, QA done

## Prozess-Experiment: "Reproduzierbarkeit testen"
- **Hypothese:** Der bewiesene Spec→Builder Workflow funktioniert konsistent auch mit komplett anderem Stil
- **Methode:** 400+ Zeilen creative-brief.md (Opus) → Sonnet Builder via Agent-Tool
- **Ergebnis:** Builder hat alle Sektionen korrekt umgesetzt, 0 Build-Fehler, ~4 Min
- **QA Score: 5.8/10** (konservativ, headless-limitiert)
- **Realistisch im Browser: ~6.5/10** (Animationen nicht in Screenshots sichtbar)

## Versionen
| Version | Datum | Änderungen | Score |
|---------|-------|------------|-------|
| v1 | 2026-03-24 | Initial: 7 Sektionen, 4 Gemini-Bilder, kinetic type hero | 5.8/10 (QA) |
| v1.1 | 2026-03-24 | Bugfixes: Umlaute, mobile overflow, process fallback, nav | pending |

## Sektionen
1. **Hero** — Kinetic Typography "WIR CODIEREN ERLEBNISSE." (Cabinet Grotesk, scroll-parallax)
2. **Manifesto** — Word-by-word reveal (300vh sticky, 9 Wörter)
3. **Services** — Horizontal scroll 3 Panels (GSAP pin)
4. **Portfolio** — 3 Projekte mit clip-path image reveal
5. **Process** — Dark section, 3 Steps (250vh sticky)
6. **CTA** — "BEREIT FÜR ETWAS BESONDERES?" + texture background
7. **Footer** — Minimal 3-column

## Fonts
- Cabinet Grotesk (Fontshare) — Headlines
- Zodiak (Fontshare) — Serif accent
- Satoshi (Fontshare) — Body
- JetBrains Mono (Google) — Labels/Code

## Farben
- #FAFAF7 Background (warm off-white)
- #F0EDE8 Alt-Background (services)
- #0A0A0A Text
- #FF6B00 Accent (sparsam)

## Erkenntnisse
- **Workflow reproduzierbar:** Spec→Builder funktioniert auch für hellen Stil
- **Spec-Qualität direkt sichtbar:** 400+ Zeilen → sauberer Output
- **Umlaute-Bug:** ASCII-only im Spec → Builder kopiert 1:1 → IMMER UTF-8 in Specs
- **mix-blend-difference auf hellem BG:** Macht schwarzen Text unsichtbar → entfernen
- **Builder-Zeit:** ~4 Min (kürzer als morphic-flow's ~10 Min, weniger komplexe Komponenten)

## Nächste Schritte
- [ ] Overdrive Push (impeccable:overdrive oder Opus manuell)
- [ ] Chris-Feedback abwarten
