# 2026-03-23 — exp-story-editorial v4 Hero Redesign

## Was passiert ist
- exp-story-editorial v3 (8.0/10) → v4 mit Full-Screen Hero Redesign
- **Verbotenes Pattern entfernt:** 50/50 Split (Text links, Bild rechts) → Full-Screen WebGL Shader Background
- Dark Gradient Overlay (unten stärker für Textlesbarkeit)
- Text bottom-left positioniert (editorial, asymmetrisch)
- Helle Typografie (#F5F0EB) über dunklem Bild
- Scroll-Parallax auf Shader (yPercent 12, scrub)
- Ein unified Layout für Desktop + Mobile (kein hidden/flex Split mehr)
- Nav-Farben: alle #1A1A1A → #F5F0EB (Hero ist jetzt dunkel)
- QA: Text-Readability initial zu schwach → stärkerer Gradient + text-shadow nachgefixed

## Self-Eval
- v4: **8.2/10** (konservativ, -1.5)
- Verbesserung: +0.2 gegenüber v3
- Hero ist jetzt das stärkste Element statt der schwächste Punkt
- Kein verbotenes Pattern mehr

## Was fehlt für 9+/10
- Logo als SVG + Animation
- Video-Content (Showreel oder Ambient)
- Process-Sektion visuell stärker
- Portfolio: mehr Interaktion
- Mutigere CTA-Sektion

## Kosten
- Agent für Hero-Rewrite: ~24k Tokens, ~1.5 Min
- Readability-Fix: manuell, 3 Edits
- QA: ~5 Min (Desktop + Mobile)
- Gesamt: ~12 Min inkl. Deploy-Wartezeiten

## Erkenntnisse
1. Full-screen Shader als Hintergrund mit Gradient-Overlay ist deutlich impactvoller als Split-Layout
2. Text-shadow ist PFLICHT bei hellen Bildbereichen — Gradient allein reicht nicht
3. Ein unified responsive Layout (clamp statt hidden/flex) = weniger Code, weniger Bugs
4. Agent-Tool für gezielte Rewrites funktioniert gut (klarer Spec → sauberes Ergebnis)
