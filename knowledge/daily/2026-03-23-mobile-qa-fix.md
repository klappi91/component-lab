# Mobile QA + Fix — 2026-03-23

## Run-ID: run-20260323-1540

## Aktion: Visuelles QA via agent-browser + Mobile Bug Fix

### Desktop QA (alle Sektionen)
- Hero: 9.5/10 — Mutige Typografie, WebGL Shader aktiv, full-bleed Studio-Bild
- Services: 9.5/10 — Stacking Cards perfekt, alle 3 mit full-bleed Images + großen Nummern
- Portfolio: 9/10 — Editorial Layout, 4 Items sichtbar
- Methode: 9.2/10 — Pinned Scroll Showcase funktioniert, 3 Steps mit Transitions
- CTA: 9.3/10 — "Bereit für was Neues?" Split-Text Reveal, Parallax Background
- Footer: 9.3/10 — Marquee "LET'S WORK TOGETHER", Live-Uhr
- **Desktop gesamt: ~9.3/10** ✓

### Mobile QA — BUG gefunden und gefixt
**Problem:** Kein `overflow-x: hidden` auf body → horizontaler Overflow auf Mobile. Alle großen Texte wurden rechts abgeschnitten (Hero, Services, CTA).

**Fix:**
1. `overflow-x-hidden` Klasse auf body in layout.tsx
2. Hero font-size min: 3rem → 2.2rem
3. CTA font-size min: 3.5rem → 2.5rem

**Ergebnis nach Fix:**
- Hero mobile: 6/10 → 9/10 ✓
- Services mobile: 7/10 → 9/10 ✓
- CTA mobile: 6/10 → 9/10 ✓
- **Mobile gesamt: ~8.8/10** ✓

### Schlüsselerkenntnisse
- **overflow-x: hidden auf body ist PFLICHT** für Mobile — in Constitution aufnehmen
- agent-browser iPhone 14 Emulation funktioniert gut für Mobile QA
- Die clamp-Werte waren eigentlich OK, das Problem war der fehlende overflow-x Schutz
- Desktop sieht durch die Fixes identisch aus (clamp min ändert sich nur auf sehr kleinen Viewports)

### Kosten
- Agent-browser Sessions: ~5 Min QA
- Code-Änderungen: 3 Zeilen in 2 Dateien
- Keine Token-intensive Sub-Agent-Arbeit
