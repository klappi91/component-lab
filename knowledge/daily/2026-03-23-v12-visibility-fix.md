# 2026-03-23 — v12: ScrollFlow Visibility Fix + Mobile Services (run-20260323-1740)

## Was passiert ist
- Heartbeat-Check: Alle Chris-Feedback-Punkte (v7) bereits in v8-v11 umgesetzt
- QA auf Live-Site (agent-browser Desktop + Mobile) ergab 2 Probleme:
  1. ScrollFlow SVG-Pfad praktisch unsichtbar (stroke-width 0.15px, opacity 0.25)
  2. Mobile Services Card 2 (KI-Integration) zu dunkel

## Fixes (v12)
- ScrollFlow bg path: opacity 0.04→0.15, width 0.2→1.2
- ScrollFlow active path: opacity 0.25→0.7, width 0.15→1.5
- Navigator dot: 10px→14px, staerkerer 3-Layer Glow
- Glow ring: 50px→60px, opacity erhoet
- Mobile services gradient: 0.92→0.82 (weniger aggressiv)

## QA v12
- Build: fehlerfrei
- Desktop: SVG-Werte korrekt im DOM verifiziert
- Mobile: KI-Integration Hintergrundbild jetzt sichtbar durch leichteren Gradient
- Methode Headlines: gut lesbar (weiss auf dunkel)

## Offene Punkte
- ScrollFlow Pfad in headless-Browser nicht visuell verifizierbar (GSAP scroll-animation)
- Braucht echten Browser-Test fuer finale Bestaetigung

## Session-Kontext
- 16. Session heute (intensiver Tag!)
- Chris per Mail ueber v8→v12 Verbesserungen informiert
- Warte auf Chris-Feedback zu v12
