# Prozess-Experiment #3: Overdrive Polish via Delegated Builder — 2026-03-23

## Run-ID: run-20260323-1121

## Was wurde getestet
Drittes Prozess-Experiment: Kann ein Builder-Agent (Sonnet) eine bestehende Website effektiv iterieren, wenn er eine detaillierte Overdrive-Spec bekommt?

## Setup
- **Bestehende Website:** exp-cinematic-dark (7/10)
- **Builder-Modell:** Sonnet 4.6
- **System-Prompt:** overdrive-push.md (77 Zeilen, 6 Prioritaeten, dateibasiert)
- **Skills geladen:** impeccable:overdrive, creative-effects (vom Builder)
- **Laufzeit Builder:** ~12 Minuten
- **Context verbraucht:** ~36% (Sonnet)

## Ergebnis
- **Score vorher:** 7/10
- **Score nachher:** 7.5/10
- **Aenderungen:** 11 Dateien, 498 Insertions, 339 Deletions
- **Build:** Fehlerfrei
- **Deployed:** https://exp-cinematic-dark.vercel.app

## Was der Builder umgesetzt hat (alle 6 Prioritaeten)

### 1. Signature Effects
- GrainOverlay (SVG feTurbulence, opacity 0.04) — Film-Charakter
- CustomCursor (Orange Ring + Dot, Spring-Physik, mix-blend-mode: difference, Desktop-only)
- MagneticButton (Spring-basierter Magneteffekt auf CTAs)

### 2. AI-Template-Tells entfernt
- Corner Marks auf Portfolio-Items: GELOESCHT
- Emoji-Icons (Mail, Calendar, Phone): Durch Lucide SVG-Icons ersetzt

### 3. Methode radikal umgebaut
- Vorher: 4 nummerierte Kreise in einem Grid (Template-Standard)
- Nachher: Vertikale Timeline mit riesigen orange Nummern (6rem/9rem), horizontale Divider-Lines
- GSAP Slide-In Animation pro Step
- Hover-Effekt: Nummer wird sichtbarer, Titel wird orange
- Step-Indicator rechts (1/4, 2/4, etc.)

### 4. Navigation Auto-Hide
- Verschwindet nach 3 Sekunden
- Kommt bei Scroll-Up zurueck
- AnimatePresence fuer smooth enter/exit
- Mobile: Fullscreen Overlay mit Display-Font Navigation

### 5. Magnetic Buttons
- Spring-Physik via framer-motion
- Auf Hero-CTA und Haupt-CTA angewendet

### 6. Hero asymmetrisch
- Vorher: Zentriert (Standard)
- Nachher: Links-aligned, Eyebrow-Text, riesige Typo (18vw!)
- Scroll-Arrow (SVG) statt bouncing mouse
- Ueberarbeitete Tagline: "Wir bauen Websites die gewinnen"
- Zusaetzlicher left-to-right Gradient fuer Lesbarkeit

## QA-Bewertung (Desktop + Mobile)

| Sektion | Score | Delta |
|---------|-------|-------|
| Hero | 8/10 | +1 |
| Services | 7/10 | = |
| Portfolio | 7/10 | +0.5 |
| Methode | 8/10 | +2 |
| CTA | 7/10 | +1 |
| Effekte | 8/10 | NEU |
| **Gesamt** | **7.5/10** | **+0.5** |

## Schluesselerkenntnisse

### 1. Delegierter Overdrive funktioniert — mit Einschraenkungen
Der Builder hat alle 6 Aufgaben sauber umgesetzt. Die dateibasierte Spec (overdrive-push.md) war ausfuehrlich genug. ABER: Der Qualitaets-Sprung war nur 0.5 Punkte, nicht die erhofften 2 Punkte.

### 2. Sonnet ist gut bei "was" aber nicht bei "wow"
Der Builder hat exakt umgesetzt was in der Spec stand. Aber er hat NICHT darueber hinaus gedacht. Kein kreativer Eigenbeitrag, keine Ueberraschungen. Fuer echtes WOW braucht es entweder:
- Opus als Builder (kreativer)
- Noch detailliertere Spec mit konkreten Referenz-Implementierungen
- Oder: Manuelles Polishing nach dem Builder

### 3. Der groesste Impact war die Methode-Sektion
Von Template-Standard (4 Kreise) zu Editorial-Timeline — der groesste visuelle Sprung in einem einzelnen Bereich.

### 4. Fuer 9/10 braucht es ein echtes Signature Piece
Grain + Cursor + Magnetic sind nice-to-haves, aber kein "wie haben die das gemacht?"-Moment. Dafuer braucht es:
- WebGL Shader im Hero
- 3D-Element (React Three Fiber)
- Oder: Eine technisch beeindruckende Scroll-Animation

### 5. Services + Portfolio sind noch konventionell
Die beiden Sektionen haben sich kaum veraendert. Fuer den naechsten Push: Editorial Layouts fuer Services, mehr Portfolio-Items mit echten Projekten.

## Prozess-Effizienz
- **Meine Arbeit:** ~15 Min (Spec schreiben, Builder starten, QA)
- **Builder-Arbeit:** ~12 Min
- **Gesamtzeit:** ~30 Min fuer einen 0.5-Punkt-Improvement
- **Kosten:** Niedrig (Sonnet)
- **Fazit:** Effizient fuer chirurgische Verbesserungen, aber kein Game-Changer

## Naechste Schritte
1. WebGL/Shader Signature Moment hinzufuegen (Three.js oder raw WebGL)
2. Services-Sektion redesignen (kein Text-Bild-Grid mehr)
3. Mehr Portfolio-Items mit echten Case Studies
4. Oder: Neuen Fresh-Build mit allen Learnings
