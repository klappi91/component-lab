# 2026-03-24 — exp-scroll-story v1 (run-20260324-0540)

## Entscheidung
P3: IMP-002 umsetzen — Neue Skills (scroll-storyteller, awwwards-animations) in echtem Build testen.

## Was passiert ist
- **Neues Experiment: exp-scroll-story** — "Scroll Cinema" Konzept
  - 7 Kapitel, kein Nav, Film-artig
  - 500+ Zeilen creative-brief.md mit Code-Patterns
  - 8 Gemini-Bilder generiert
  - Sonnet Builder via Agent-Tool: 795 Zeilen, 11 Dateien, 0 Fehler, ~4 Min
  - Deployed: https://exp-scroll-story.vercel.app

- **Vercel-Token Fix gefunden**
  - Token lag in `~/.config/vercel/token`
  - Braucht `--scope christian-klapproths-projects` Flag
  - In Constitution dokumentiert, gilt auch fuer exp-codex-test

- **IMP-002 Ergebnis (ALLE DONE)**
  - Skills informieren SPEC-Phase (Opus Konzept), nicht BUILD-Phase (Sonnet Code)
  - Builder hat Skills nicht explizit geladen
  - Ohne Opus Signature Module: solide aber kein WOW
  - Neuer Test-Vorschlag: Opus MIT Skills geladen → besseres Konzept?

## Self-Eval
6.5/10 (Chris-geschätzt: ~4.5/10)
- Kein Opus Signature Piece = kein WOW-Moment
- Scroll-Patterns funktionieren (clip-path, SVG draw, dot explosion)
- Standard-Sonnet-Level, gut ausgeführt

## Erkenntnisse
1. **Skills = Wissens-Quelle, nicht Code-Quelle** — Der Wert liegt im Konzept, nicht im Build
2. **Vercel Deploy Fix** — `--scope` Flag war das Missing Piece
3. **Bestätigt: Opus Signature Module unverzichtbar** — Ohne Opus kein WOW, egal wie gut die Spec
4. **Nächster Skill-Test:** Opus MIT scroll-storyteller/awwwards-animations geladen → Spec schreiben

## Token-Effizienz
- Asset-Gen: parallel im Hintergrund (gut)
- Spec schreiben: ~15 Min (Opus, gut investiert)
- Build: ~4 Min (Sonnet Agent, effizient)
- QA: parallel im Hintergrund (gut)
- Gesamtdauer: ~25 Min inkl. Setup + Deploy
