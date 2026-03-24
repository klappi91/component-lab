# Experiment: Parallel-Build (exp-parallel-dark + exp-parallel-light)

## Status: ABGESCHLOSSEN
## Session: run-20260324-0200
## Datum: 2026-03-24

## Hypothese
2 parallele Builders mit verschiedener kreativer Richtung (Dark vs Light) bei gleichen Assets produzieren mindestens ein besseres Ergebnis als ein einzelner Builder-Run.

## Ergebnis: HYPOTHESE NICHT BESTÄTIGT
- Dark: QA 5.3/10
- Light: QA 4.6/10
- Beide deutlich unter dem Benchmark (8/10 bei exp-signature-hero)

## Variablen
| Variable | Builder A (Dark) | Builder B (Light) |
|----------|-----------------|------------------|
| Stil | Dark Cinematic | Light Editorial |
| Fonts | Clash Display + Switzer + Instrument Serif | Zodiak + General Sans + Satoshi |
| Farben | #0A0A0A bg, #F5F0EB text, #FF6B00 accent | #F5F0EB bg, #1A1A1A text, #FF6B00 accent |
| Animationen | GSAP ScrollTrigger (heavy) | Framer Motion (subtle) + GSAP (minimal) |
| Hero | Full-screen BG + Letter-by-letter reveal | Full-width Image + Overlapping text |
| Services | Full-screen Stacking Cards | Editorial Rows mit Hover |
| Portfolio | Horizontal Scroll Gallery (pinned) | Asymmetrisches Masonry Grid |
| Layout | Dramatic, full-bleed, pinned sections | Magazine, whitespace, rounded corners |
| Code-Zeilen | 1001 | 457 |

## Konstanten (gleich für beide)
- Modell: Sonnet
- Tool: Agent-Tool (nicht tmux)
- Assets: 6 identische Gemini-Bilder ($0.41)
- Brand: PixIntCreators (gleiche Infos)
- Services: gleiche 3 Services
- Spec-Format: creative-brief.md (Dark ~350, Light ~350 Zeilen)
- Builder-Instruktionen: gleich strukturiert

## Timing
- Setup (2 Projekte): ~3 Min
- Assets (Gemini Batch): ~1 Min ($0.41)
- Specs schreiben (Opus): ~15 Min
- Builder A + B parallel: ~2 Min (beide gleichzeitig!)
- Deploy (2x Vercel): ~3 Min
- QA (2x agent-browser): ~10 Min
- **Total: ~35 Min für 2 komplette Websites**

## QA-Scores im Detail
| Kategorie | Dark | Light |
|-----------|:----:|:-----:|
| Hero | 6 | 5 |
| Typografie | 6 | 5 |
| Layout | 5 | 5 |
| Farbe | 6 | 5 |
| Bilder | 4 | 4 |
| Animationen | 6 | 4 |
| Services | 5 | 5 |
| Portfolio | 5 | 5 |
| Mobile | 5 | 3 |
| **Gesamt** | **5.3** | **4.6** |

## Stärken Dark
1. Dark-to-Light Transition als Designkonzept
2. Typografische Konsistenz im hellen Teil
3. Klares Farbsystem mit einem Akzent

## Schwächen Dark
1. Leere Seite beim ersten Laden (Bug)
2. Stock-Bilder zerstören Glaubwürdigkeit
3. Heller Teil zu template-nah

## Stärken Light
1. Farbkonzept hat Eigencharakter
2. Portfolio-Layout mit versetzten Mockups
3. CTA-Typografie klar und selbstbewusst

## Schwächen Light
1. Mobile-Scroll-Animation kaputt (schwarz, hängt)
2. Keine nennenswerten Animationen/Interaktionen
3. Generischer visueller Eindruck

## FUNDAMENTALE Erkenntnisse

### 1. Parallel-Build = Optionen, nicht Qualität
Die Qualität kommt nicht davon, MEHR zu bauen, sondern besser. 2 mittelmäßige Websites sind weniger wert als 1 gute. Der bewährte Workflow (Opus Signature Module + Sonnet Builder + Overdrive) bleibt überlegen.

### 2. Sonnet-Only reicht nicht für WOW
Ohne Opus-Signature-Module (WebGL, Custom Cursor, etc.) fehlt der Game-Changer. Sonnet setzt Specs exakt um, erfindet aber nichts Überraschendes.

### 3. Dark > Light bei gleicher Spec-Tiefe
Die dramatischeren Specs (GSAP heavy, pinned sections, stacking cards) produzieren visuell eindrucksvollere Ergebnisse als subtile Editorial-Ansätze.

### 4. Mechanisch funktioniert Parallel perfekt
2 Builder in ~2 Min parallel, 0 Build-Fehler, 0 Konflikte. Das Setup funktioniert — es ist nur kein Ersatz für den Opus-Orchestrierung.

### 5. Wann Parallel-Build nützlich ist
- Rapid Prototyping: schnell 2 Richtungen visualisieren
- Kunden-Präsentation: "Welche Richtung gefällt Ihnen?"
- Stil-Exploration: verschiedene Fonts/Farben/Layouts vergleichen
- NICHT als Ersatz für den Full-Workflow mit Opus

## URLs
- Dark: https://exp-parallel-dark.vercel.app / https://github.com/klappi91/weblab-exp-parallel-dark
- Light: https://exp-parallel-light.vercel.app / https://github.com/klappi91/weblab-exp-parallel-light
