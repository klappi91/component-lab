# 2026-03-24 — Prozess-Experiment: Parallel-Build

## Session: run-20260324-0200

## Hypothese
2 parallele Builders mit verschiedener kreativer Richtung produzieren mindestens ein besseres Ergebnis als ein einzelner Builder-Run.

## Methode
1. **Setup:** 2 Projekte mit web-lab setup.sh (exp-parallel-dark, exp-parallel-light)
2. **Assets:** 6 Gemini-Bilder generiert ($0.41, 55s), identisch für beide
3. **Specs:** 2x ~350 Zeilen creative-brief.md (Dark Cinematic vs Light Editorial)
4. **Builder:** 2x Sonnet via Agent-Tool, PARALLEL gestartet (~2 Min)
5. **Deploy:** 2x Vercel via website-deploy Agent (~3 Min)
6. **QA:** 2x agent-browser Desktop + Mobile (~10 Min)

## Ergebnis
- **Dark: QA 5.3/10** — Letter-by-letter Hero, Stacking Cards, Horizontal Scroll Portfolio
- **Light: QA 4.6/10** — Editorial Layout, Framer Motion, Masonry Portfolio
- **Benchmark: 8/10** (exp-signature-hero mit Opus Signature Module)
- **Hypothese NICHT bestätigt**

## Timing
- Total: ~35 Min für 2 komplette Websites
- Builder-Phase nur ~2 Min (parallel!)
- Spec-Schreiben: ~15 Min (größter Einzelblock)

## Erkenntnisse
1. **Parallel = Optionen, nicht Qualität** — 2 mittelmäßige < 1 gute
2. **Sonnet-Only reicht nicht** — Opus Signature Module fehlt für WOW
3. **Dark > Light bei gleicher Spec-Tiefe** — dramatischere Specs = eindrucksvolleres Ergebnis
4. **Mechanisch perfekt** — 0 Build-Fehler, 0 Konflikte, schnell
5. **Nützlich für Rapid Prototyping** — nicht für Awwwards-Qualität
