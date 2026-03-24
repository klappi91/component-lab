# 2026-03-24 — hero-v005-a: Pixel Genesis v2 (run-20260324-0800)

## Entscheidung
P1: Chris-Feedback (Mail 07:30 heute). Klar und konkret.

## Chris-Feedback (verarbeitet)
- "Die Idee gefaellt mir mit den Pixeln die ein Bild ergeben"
- "Natuerlich muesste danach ein richtiges Bild einer Webseite zu sehen sein statt Pixelmatsch"
- "Aus nur orangenen Pixeln nicht ploetzlich bunte — das muesste man smooth einbauen"
- **KEY:** "Eine Webseite in echte Pixel zerlegen die wenn alle wieder zusammen kommen das Bild ergeben — DAS waere WOW"
- "Aktuell ist nur die Idee gut, Umsetzung noch nicht"

## Was gebaut wurde
**hero-v005-a v2: Pixel Genesis — echtes Bild + Crossfade**

### Kernverbesserungen gegenueber v1
1. **Echtes Website-Bild** — gemini-image generiert (2K, dark theme, PixIntCreators brand)
2. **Hoehere Aufloesung** — dynamisches Grid (~6000 Partikel statt 1560)
3. **Smooth Color-Morph** — orange → echte Farben mit per-Partikel delay (center-first)
4. **Crossfade zum echten Bild** — Partikel faden aus, echtes Bild fadet ein → kristallklar
5. **DPR-aware Canvas** — scharf auf Retina-Displays
6. **Responsive Grid** — Partikelgroesse passt sich Viewport an

### Choreografie (4 Phasen, 600vh scroll space)
1. **EMERGENCE (0-12%):** Einzelnes Pixel explodiert → orangene Partikel bursten in alle Richtungen
2. **ORDER + COLOR (12-55%):** Partikel fliegen zu Positionen (inOutQuart), Farben morphen smooth (easeOutCubic, center-first delay) — KEINE ploetzliche Aenderung
3. **RESOLVE (55-78%):** Partikel fuellen Luecken, volle Zellgroesse, volle Farbe
4. **CROSSFADE (78-100%):** Partikel faden aus, echtes Bild fadet ein (rounded-rect clip + orange border glow)

### Technisches
- Canvas 2D mit DPR-Skalierung
- Dynamisches Grid: ~14px Partikel (Desktop) / ~10px (Mobile)
- Image Sampling: getImageData → pro Partikel echte Bildfarbe
- Crossfade: drawImage mit easeOutCubic opacity + roundRect clip
- Color-Morph: linearer RGB-Lerp von Orange zu echter Farbe, mit distFromCenter-basiertem Delay

## Self-Eval
- **Konzept:** 9/10 — direkt auf Chris' Feedback umgesetzt
- **Smooth Color:** 8/10 — per-Partikel Delay von Mitte nach aussen, kein ploetzlicher Wechsel
- **Crossfade:** 8.5/10 — kristallklares Ergebnis statt Pixelmatsch
- **Gesamt:** 8/10 (chris_estimate: ~6/10)
- **Potenzial:** 9/10 — mit besserem generierten Bild (mehr Details) und Feintuning noch steigerbar

## Was fehlt / naechste Iteration
- [ ] Chris-Feedback einholen
- [ ] Besseres Target-Bild (aktuelles hat leichte Text-Artefakte von AI-Generation)
- [ ] Optional: Mouse-Parallax auf Partikel waehrend Phase 1
- [ ] Optional: Partikel-Trail-Effekt waehrend ORDER-Phase
- [ ] Mobile QA (agent-browser)

## Erkenntnisse
- **Crossfade zum echten Bild** ist der Schluessel — Partikel allein werden nie "kristallklar"
- **Per-Partikel Color-Delay** (center-first) sieht organischer aus als globaler Morph
- **DPR-Skalierung** wichtig fuer die Crossfade-Qualitaet
- **gemini-image** fuer Website-Screenshots: gutes Layout, aber Text hat manchmal Artefakte
