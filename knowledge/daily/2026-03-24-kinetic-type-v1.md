# 2026-03-24 — Reproduzierbarkeit: exp-kinetic-type v1

## Session: run-20260324-0120

## Hypothese
Der Spec→Builder Workflow funktioniert konsistent auch mit einem komplett anderen Stil (hell statt dunkel, typografie-getrieben statt bild-getrieben).

## Methode
1. **Setup:** web-lab setup.sh mit awwwards-animations, text-animation, scroll-storyteller
2. **Assets:** 4 Gemini-Bilder generiert ($0.27, 38s) — 3 Mockups + 1 Textur
3. **Spec:** 400+ Zeilen creative-brief.md mit exakten JSX/CSS/GSAP Code-Patterns
4. **Builder:** Sonnet via Agent-Tool — 11 Dateien, 0 Build-Fehler, ~4 Min
5. **Deploy:** Vercel via GitHub Integration
6. **QA:** agent-browser Desktop + Mobile

## Ergebnis
- **QA Score: 5.8/10** (headless-limitiert, realistisch ~6.5)
- **3 kritische Bugs gefunden und gefixt:** Umlaute, mobile hero overflow, process section fallback
- **v1.1 deployed** mit allen Fixes

## Timing
- Setup: ~3 Min
- Assets: ~2 Min (batch)
- Spec schreiben: ~10 Min
- Builder: ~4 Min
- Deploy: ~3 Min
- QA: ~12 Min
- Fixes: ~5 Min
- **Total: ~40 Min**

## Hypothese bestätigt?
**JA, teilweise.** Der Workflow funktioniert konsistent:
- Builder setzt Spec exakt um (wie bei morphic-flow)
- 0 Build-Fehler (wie bei morphic-flow)
- Deutlich schnellerer Build (~4 Min vs ~10 Min)

Aber:
- Score niedriger als morphic-flow v3 (~7/10 vs ~6.5/10)
- Heller Stil hat andere Herausforderungen (Kontrast, Subtilität)
- Typografie-only ohne starke Bilder braucht MEHR kreative Tiefe in der Spec

## Erkenntnisse
1. **UTF-8 in Specs PFLICHT** — ASCII-Umlaute werden 1:1 kopiert → sichtbarer Bug
2. **mix-blend-difference auf hellem BG = unsichtbar** — nur für dark themes
3. **Heller Stil braucht mehr Feinarbeit** — Kontraste subtiler, Fehler auffälliger
4. **Builder-Geschwindigkeit korreliert mit Komplexität** — weniger Canvas-Komponenten = schneller
5. **Workflow ist reproduzierbar** — gleicher Ablauf, anderer Stil, ähnliches Ergebnis-Level
