# 2026-03-24 — hero-v010-a: CREATIVE VELOCITY (Horizontal Scroll)

## Was passiert ist
- Heartbeat durchgefuehrt: Keine neuen Mails (UIDs 12-14 alt, als gelesen markiert)
- Awwwards SOTD recherchiert: Yes Now (Agency, Rive+Lottie, SOTD Mar 20), ZettaJoule (Zypsy, Webflow, SOTD Mar 21)
- **ERSTER horizontal-scroll Hero gebaut** — fundamental anders als alle 9 bisherigen (alle vertikal)

## hero-v010-a: Was es ist
- 5-Panel horizontal scroll: IDEE → CHAOS → ORDNUNG → ERLEBNIS → MARKE
- GSAP ScrollTrigger pin + scrub + containerAnimation fuer per-Panel Animationen
- Clip-path circle reveal (ERLEBNIS Panel)
- Grid-Linien die sich zeichnen + Text der sich assembliert (ORDNUNG)
- Custom Cursor + Grain Overlay + Progress Bar
- Story: "Von der Idee zum Erlebnis"

## Choreografie-Entscheidungen
- Panel 1 "IDEE": scale 2.5→1 Entry (expo.out), dann scale 1→15 zoom-through Exit (power2.in)
- Panel 2 "CHAOS": Fragmente fliegen von allen Seiten ein, driften dann sanft
- Panel 3 "ORDNUNG": Grid-Linien ziehen sich (power4.inOut), Statement word-by-word reveal (expo.out)
- Panel 4 "ERLEBNIS": circle(0%)→circle(80%) clip-path (power4.inOut), parallax Text
- Panel 5 "MARKE": Stagger reveal mit Brand + CTA

## Self-Eval
- Konzept: 7/10 — Starke Idee, klare Story-Progression
- Ausfuehrung: 6/10 — Solider Code, aber ERLEBNIS Panel braucht echte visuelle Assets
- chris_score_estimate: ~5/10 — braucht Iteration
- **Potenzial:** Hoch, wenn ERLEBNIS Panel echtes Visual bekommt und CHAOS mehr nicht-text Elemente hat

## Was fehlt fuer WOW
1. ERLEBNIS Panel: Echtes Bild oder Canvas-Effekt statt Gradient
2. CHAOS Panel: Echte visuelle Elemente (Rechtecke, Kreise) statt nur Text-Symbole
3. Lenis Smooth Scroll (fehlt komplett)
4. Per-Letter Animationen (aktuell nur word-level)
5. Mobile noch nicht getestet
6. Parallax-Tiefe innerhalb der Panels (verschiedene Speeds)

## Neue Erkenntnis
- containerAnimation ist der Schluessel fuer Animationen innerhalb von Horizontal Scroll
- Horizontal Scroll erzeugt sofortige "das ist anders" Reaktion
- 5 Panels mit je eigenem BG-Color erzeugen natuerliche Color-Transitions ohne extra Animation
