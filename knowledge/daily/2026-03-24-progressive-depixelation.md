# 2026-03-24 — hero-v005-a v4: Progressive Depixelation (run-20260324-1020)

## Entscheidung
P1: Chris-Feedback (UID 20) — "Unterschied von Pixeln zum fertigen Bild noch zu drastisch und nicht smooth genug. Recherche machen wie man das technisch umsetzen kann."

## Recherche

### Problem
v3 nutzte einen harten Crossfade: assembled particles (pixeliertes Raster) → scharfes Bild.
Visuell sichtbarer Sprung, weil Pixel-Raster ≠ scharfes Bild.

### Loesung: Progressive Depixelation
Technik aus StackOverflow / Codrops:
1. Bild auf Offscreen-Canvas in reduzierter Aufloesung zeichnen
2. `imageSmoothingEnabled = false` → pixelierter Look
3. Auf Haupt-Canvas hochskalieren
4. Pixelgroesse animieren: gross (= Partikel-Raster) → 1px (= scharf)

### Warum das funktioniert
- Bei Start der Depixelation: Bild-Pixelgroesse = Partikel-Zellgroesse → IDENTISCHER Look
- Uebergang Partikel → pixeliertes Bild ist UNSICHTBAR (gleiche Farben, gleiche Groesse)
- Dann wird das Bild stufenlos schaerfer → kein sichtbarer Switch-Moment

## Was gebaut wurde
- Offscreen Canvas (512x512) fuer Pixelation
- `depixBlendStart = 0.5` reassembleEase (Partikel ~50% assembled)
- Exponentielles Pixel-Size Decay: `maxCellSize^(1 - depixEase)` → perceptually linear
- Partikel-Alpha Reduktion: `1 - depixProgress^2` (quadratischer Fadeout)
- Image-Alpha: `depixProgress * 1.3` (etwas schneller ein als Partikel aus)
- Orange Border Glow ab depixEase > 0.7

## Self-Eval
- **Konzept:** 9/10 — exakt auf Chris' Feedback, recherchiert und technisch fundiert
- **Depixelation-Effekt:** 8/10 — smooth, kein sichtbarer Sprung
- **Timing:** 7.5/10 — Depixelation schreitet schnell voran wegen exponentieller Formel
- **Gesamt:** 8/10 (chris_estimate: ~6/10)
- **Potenzial:** 8.5/10 — Timing-Feintuning koennte Effekt noch cinematischer machen

## Technische Erkenntnisse
- **Canvas drawImage Pixelation:** `imageSmoothingEnabled = false` + scale-up = sauberer Pixel-Look
- **Offscreen Canvas noetig:** Kann nicht auf dem Haupt-Canvas klein zeichnen (anderer Content)
- **Exponentielles Pixel-Decay:** `size^(1-t)` → gleichmaessige WAHRGENOMMENE Schaerfung
  (lineares Decay waere visuell ungleichmaessig weil Verdopplung der Aufloesung = konstanterer Sprung)
- **Blend-Synchronisation:** Depixelation an reassembleEase koppeln, nicht an scrollP
  → beide Systeme (Partikel + Bild) sind automatisch synchron

## Naechste Schritte
- [ ] Chris v4 Feedback abwarten
- [ ] Optional: Depixelation-Timing verlangsamen (laengerer Uebergang)
- [ ] Optional: Intermediary-Stufen (Partikel werden kleiner BEVOR Bild eingeblendet wird)
- [ ] Mobile testen
