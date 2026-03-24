# exp-haiku-test — Haiku als Builder (Prozess-Experiment #12)

## Meta
- **Datum:** 2026-03-24
- **Typ:** Prozess-Experiment (Modell-Vergleich)
- **Modell:** Claude Haiku 4.5
- **Spec:** creative-brief.md von exp-parallel-dark (386 Zeilen, Dark Cinematic)
- **Assets:** 7 Bilder (identisch zu parallel-dark)
- **URL:** https://exp-haiku-test.vercel.app
- **GitHub:** https://github.com/klappi91/weblab-exp-haiku-test

## Ergebnis: 3.0/10

### Metriken
| Metrik | Haiku | Sonnet (parallel-dark) | Delta |
|--------|-------|----------------------|-------|
| QA Score | **3.0/10** | 5.3/10 | -2.3 |
| Tokens | 61k | ~150k+ | -60% |
| Build-Zeit | 110s | ~600s | -82% |
| Build-Fehler | 0 | 0 | = |
| Dateien erstellt | 3 | ~10+ | weniger |
| Geschaetzte Kosten | ~$0.06 | ~$0.30 | -80% |

### Was funktioniert
- Hero-Typografie (grosse Buchstaben, orange/weiss Split)
- Stacking Cards (CSS sticky, kein GSAP noetig)
- Footer Marquee (CSS @keyframes, kein GSAP noetig)
- Alle 7 Bilder korrekt eingebunden
- Build ohne Fehler

### Was NICHT funktioniert (kritischer Bug)
- **body overflow:hidden + inner scroll wrapper** → bricht GSAP ScrollTrigger komplett
- Statement: Woerter stuck bei opacity 0.3 (Animation broken)
- Portfolio: Horizontal Scroll eingefroren (GSAP Translation = 0)
- Process: Steps bei opacity 0 (unsichtbar)
- CTA: Initial opacity 0 (durch GSAP-Trigger nicht ausgeloest)
- **4 von 7 Sektionen funktional zerstoert**

### Analyse
Haiku hat die Spec STRUKTURELL korrekt umgesetzt:
- Alle Sektionen vorhanden
- Alle Bilder referenziert
- GSAP-Code-Patterns aus der Spec kopiert
- Fonts und Farben korrekt

Aber Haiku VERSTEHT nicht was es baut:
- overflow:hidden auf body ist ein bekanntes ScrollTrigger-Problem
- Sonnet haette das entweder vermieden oder als overflow-x:hidden implementiert
- Haiku kopiert Code ohne die Interaktion zwischen Layout und JS zu verstehen

### Fundamentale Erkenntnis
**Haiku = Struktur-Kopierer, nicht Versteher.**
- Folgt Specs woertlich, versteht aber nicht die Implikationen
- CSS-only Features funktionieren (kein JS-Kontext noetig)
- GSAP/JS Features scheitern an subtilen Layout-Entscheidungen
- Die Kostenersparnis (80%) ist irrelevant wenn das Ergebnis unbrauchbar ist

### Wofuer Haiku brauchbar waere
- **Simple Static Pages** ohne JS-Animationen
- **CSS-only Komponenten** (Marquee, Grid, Typografie)
- **Boilerplate-Generierung** (Projekt-Setup, Config-Files)
- **NICHT fuer Awwwards-Builds** — zu wenig Verstaendnis fuer Interaktionen
