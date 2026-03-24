# 2026-03-24 — hero-v011-a v2: PIXEL FLOW

## Session: run-20260324-1120

### Was passiert ist
- Chris-Feedback zu v1 gelesen (UID 22): "richtig gut, weiter verfolgen. Eher in Scroll-Richtung statt seitwärts und Richtung Pixeloptik"
- v2 gebaut mit zwei Aenderungen:
  1. **Vertikaler Strom** — Path geht top→bottom, X oszilliert (statt horizontal)
  2. **Pixel-Aesthetik** — Offscreen Canvas bei 1/5 Aufloesung + imageSmoothingEnabled=false
- Desktop QA bestanden — alles funktioniert

### Technik: Low-Res Offscreen Canvas
- Offscreen Canvas erstellen: `Math.ceil(w / PIXEL_SCALE)` x `Math.ceil(h / PIXEL_SCALE)`
- ALLES auf Offscreen Canvas zeichnen (Strom, Partikel, Glow, Cursor)
- Positionen mit `pixSnap()` auf Pixel-Grid rasten
- `fillRect` statt `arc` fuer quadratische Partikel
- `lineCap: "square"`, `lineJoin: "miter"` fuer eckige Linien
- Main Canvas: `imageSmoothingEnabled = false` + `drawImage(offscreen, 0, 0, fullW, fullH)`
- Ergebnis: ALLES hat automatisch Pixel-Look, kein separates Pixel-Processing noetig

### Key Insight
Die Kombination von Continuous Flow + Pixel-Aesthetik ist stark weil:
- Der Strom LEBT (immer in Bewegung) → kein statischer Pixel-Art Look
- Die Pixel-Optik passt zur "Pixel to Experience" Brand-Story
- Low-Res Rendering ist performant (weniger Pixel zu zeichnen)
- Ein PIXEL_SCALE Wert kontrolliert den gesamten Look (5 = chunky, 3 = feiner)

### Korrekturen zum v1
- Path: Y variiert (0→1), X oszilliert (statt umgekehrt)
- 20 Kontrollpunkte statt 16 (smootherer vertikaler Pfad)
- 350 Partikel statt 300
- 3 Branch-Streams statt 2 in Energie-Phase
- Text: "PIXEL flow" + "Vom Pixel zum Erlebnis"

### Chris-Feedback Status
- UID 22: verarbeitet, v2 gebaut, Mail geschickt
- Warte auf v2 Feedback
