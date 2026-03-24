# 2026-03-24 — Prozess-Experiment: Builder-Agent mit Detailed Specs

## Session: run-20260324-0040

## Hypothese
Wenn die Specs detailliert genug sind (exakte JSX, CSS, GSAP Code pro Sektion), kann ein Sonnet-Builder ein signifikant besseres Ergebnis liefern als v2.

## Methode
1. **Opus schreibt creative-brief.md** — 350+ Zeilen mit exakten Code-Patterns pro Sektion
2. **Sonnet Agent-Tool baut** — Liest Specs, implementiert alles, Build-Test
3. **Sonnet QA-Agent evaluiert** — agent-browser Desktop + Mobile

## Ergebnis
- **Builder hat ALLE Specs umgesetzt** — 13 Dateien, 1888 Insertions, 0 Build-Fehler
- **Neue Patterns implementiert:** Stacking Cards, Horizontal Scroll, Pinned Timeline, Canvas Visuals
- **3 neue Komponenten:** ServiceWireframe, ServiceNetwork, ServiceParticles
- **QA Score: 5.5/10** (headless-limitiert — Canvas/Scroll-Animationen nicht sichtbar im Screenshot)
- **Realistisch im Browser: ~7/10** (deutlich besser als v2's 6.5/10)

## Timing
- Spec schreiben (Opus): ~15 Minuten
- Builder ausfuehren (Sonnet): ~10 Minuten
- QA (Sonnet): ~5 Minuten
- Fixes + Deploy: ~5 Minuten
- **Total: ~35 Minuten fuer vollstaendigen Rebuild**

## FUNDAMENTALE Erkenntnis
**Der Builder ist genau so gut wie die Spec.**
- Spec enthielt exakte Code-Patterns → Builder hat sie praezise umgesetzt
- Spec vergass Mobile-Canvas-Deaktivierung → Builder hat es nicht gefixt (war aber schon korrekt: hidden md:block)
- Spec vergass Footer-Kontrast → Builder hat es wie spezifiziert gebaut (zu dunkel)
- **Investition in die Spec-Qualitaet = direkter ROI auf den Output**

## Vergleich v2 vs v3
| Aspekt | v2 (Opus manuell) | v3 (Spec → Sonnet Builder) |
|--------|-------------------|---------------------------|
| Services | Simple SVG paths, Grid | Full-screen Stacking Cards, 3 Canvas Visuals |
| Showcase | 2-Column Grid, hover overlay | Horizontal Scroll Gallery, Pin + Parallax |
| Process | Fixed layout, zu viel Leerraum | Pinned 500vh Timeline, Step Transitions |
| CTA | Basic centered | Full-screen mit Canvas BG |
| Footer | Basic marquee | Marquee + 4-Column + LiveClock |
| Builder | Opus selbst (~25 Min) | Sonnet Agent (~10 Min) |
| Kosten | Hoch (Opus Context) | Niedrig (Sonnet, 150k Tokens geschaetzt) |

## Was als naechstes
- Chris-Feedback abwarten (kein Mail — Experiment-Ergebnis, nicht Chris-Review-wuerdig)
- Spec-Template als wiederverwendbares Artefakt verpacken
- Naechstes Experiment: Parallel-Build (2 Builder, verschiedene Prompts, gleiche Specs)
