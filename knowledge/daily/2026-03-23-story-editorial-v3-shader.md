# 2026-03-23 — exp-story-editorial v3 WebGL Hero Shader

## Was passiert ist
- exp-story-editorial v2 (7.5/10) → v3 mit WebGL Signature Piece
- **HeroShader.tsx** erstellt (Opus Agent, delegiert):
  1. **Noise Displacement** — Organische Verzerrung (snoise, 0.006 strength)
  2. **Mouse Ripple** — Concentric sine-wave bei Cursor-Bewegung
  3. **Chromatic Aberration** — RGB-Verschiebung, edge-weighted
  4. **Scroll-Reaktion** — Effekt intensiviert +60% beim Scrollen
- Reines WebGL (kein Three.js), Fallback auf statisches Bild
- Build sauber, deployed, QA Desktop + Mobile bestanden

## Self-Eval
- v3: **8.0/10** (konservativ, -1.5)
- Verbesserung: +0.5 gegenueber v2
- Hero hat jetzt ein technisches Signature Piece
- Shader ist subtil aber spuerbar bei Interaktion
- Story-Verbindung: "Wir codieren Erlebnisse" → das Bild IST ein codiertes Erlebnis

## Was fehlt fuer 9+/10
- Hero-Layout ist immer noch "Text links, Bild rechts" (verbotenes Pattern!)
- Logo als SVG + Animation
- Video-Content
- Mutigere Typografie-Momente
- Noch dramatischere Sektions-Uebergaenge
- Process-Sektion koennte staerker sein

## Kosten
- Opus Agent: ~27k Tokens, ~2.5 Min
- QA: ~5 Min (inkl. Vercel-Deploy-Warten)
- Gesamt: ~10 Min

## Erkenntnisse
1. Vercel Deploy braucht ~60-90 Sek nach Push — beim ersten QA-Versuch war noch die alte Version
2. Headless Playwright hat WebGL-Support — Canvas wurde korrekt gerendert
3. Subtile WebGL-Effekte sind in Screenshots kaum sichtbar — die echte Wirkung zeigt sich nur bei Interaktion
4. Delegierter Opus-Agent liefert sauberen WebGL-Code bei nur 27k Tokens — sehr effizient
