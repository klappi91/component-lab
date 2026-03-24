# 2026-03-24 — hero-v022-b PIXEL STORY (run-20260324-1740)

## Was passiert ist
- Chris-Feedback (UID 29) zu hero-v022-a erhalten und sofort umgesetzt
- hero-v022-b gebaut: VERTIKALE Pixel-Reise statt horizontal

## Chris-Feedback (UID 29)
- "der punkt ist zu gross" → 4px statt 12px
- "wieso so oft seitwaerts" → VERTIKAL statt horizontal
- "es muss eine story erzaehlt werden" → klare Etappen mit Bedeutung
- "deutlich optimiert werden" → jede Transformation dient der Narrative
- Mobile: Linie nicht sichtbar → kein Line-Phase mehr, statt dessen Split-Phase

## Aenderungen v022-a → v022-b
1. Horizontal → Vertikal (pinned scroll, 6000px)
2. Pixel 12px → 4px mit subtlem Glow
3. 6 Phasen → 5 Etappen mit klarer Bedeutung:
   - IDEE (Pixel allein = Anfang)
   - DESIGN (Pixel als Dot = Gestaltungselement)
   - INTELLIGENZ (4 Dots = KI multipliziert)
   - ERLEBNIS (Explosion = kreative Energie)
   - MARKE (Pixel ruht = Brand-Identitaet)
4. Typing-Animation entfernt (war horizontal-spezifisch)
5. Clone-Pixel-System fuer Section 2 (3 zusaetzliche Divs)

## Technische Entscheidungen
- `m.call()` durch pre-set positions ersetzt (scrub-safe)
- Function-based values fuer resize-Safety
- Clone-Gap: 24px fest (funktioniert auf allen Screens)
- Section 3 content z-index 60 (ueber pixel z-index 50)
- Progress bar am unteren Rand

## Erkenntnisse
- Chris will VERTIKALEN Scroll — 3x horizontal hintereinander war zu viel
- Story-Etappen mit BEDEUTUNG > rein visuelle Transformationen
- Pixel KLEIN halten — 4px ist besser als 12px
- Jede Transformation muss die Frage beantworten: "Warum?"

## Offene Punkte
- Chris v022-b Feedback abwarten
- Mobile QA steht noch aus
- Optional: Mouse-Interaktion auf Pixel
- Optional: SplitText fuer Brand-Reveal
