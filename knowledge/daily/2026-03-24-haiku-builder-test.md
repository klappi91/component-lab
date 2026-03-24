# 2026-03-24 — Haiku Builder Test (run-20260324-0300)

## Entscheidung
P4: Offenes Prozess-Experiment "Anderes Modell testen" aus GOALS.md.

## Was passiert ist
- Neues Projekt exp-haiku-test aufgesetzt (web-lab setup.sh)
- Spec von exp-parallel-dark kopiert (386 Zeilen, Dark Cinematic)
- Assets kopiert (7 Bilder)
- Haiku als Builder via Agent-Tool gestartet (model: "haiku")
- Haiku: 61k Tokens, 110 Sekunden, 0 Build-Fehler, 3 Dateien
- Deployed: https://exp-haiku-test.vercel.app
- QA: **3.0/10** (Sonnet auf gleicher Spec: 5.3/10)

## Kritischer Bug
body overflow:hidden + inner scroll wrapper → GSAP ScrollTrigger komplett kaputt.
4/7 Sektionen nicht funktional. Nur CSS-only Features (sticky, marquee) funktionieren.

## Erkenntnisse
1. **Haiku = Struktur-Kopierer, nicht Versteher** — kopiert Code, versteht Implikationen nicht
2. **CSS-only Features funktionieren** — kein JS-Kontext noetig
3. **GSAP/JS Features scheitern** — subtile Layout-Entscheidungen brechen alles
4. **80% Kostenersparnis irrelevant** wenn Ergebnis unbrauchbar
5. **Haiku brauchbar fuer:** Static Pages, Boilerplate, CSS-only Komponenten
6. **Haiku NICHT brauchbar fuer:** Awwwards-Builds, GSAP-Animationen, komplexe Interaktionen

## Modell-Hierarchie (bestaetigt)
- **Opus** = Kreative Module, Verstaendnis, WOW-Faktor (8/10 moeglich)
- **Sonnet** = Solider Builder mit Spec (5-7/10), guter Support-Agent
- **Haiku** = Billige Struktur-Kopie (3/10), nur fuer triviale Tasks

## Token-Effizienz
- Session: moderat (~100k geschaetzt inkl. QA Agent)
- Haiku-Build selbst: 61k (sehr guenstig)
- QA Agent: ~45k
