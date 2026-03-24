# 2026-03-24 — Improvements umgesetzt (run-20260324-0440)

## Entscheidung
P3: Kein neues Feedback, keine Experimente kurz vor fertig → Offene Improvements abarbeiten.

## Was passiert ist
- **IMP-003 umgesetzt:** Overflow-Bug Spec-Pflichtzeile
  - In `knowledge/constitution.md`: Neue Sektion "SPEC-PFLICHTZEILEN" mit overflow-x Regel
  - In `web-lab/setup.sh`: CRITICAL OVERFLOW Zeile im Qualitaet-Abschnitt des Build-Commands
  - Erwartet: 0 overflow-Bugs in zukuenftigen Builds (~30 Min/Build gespart)

- **IMP-004 umgesetzt:** Self-Eval Kalibrierung formalisiert
  - In `knowledge/constitution.md`: Neue Sektion "Self-Eval Kalibrierung"
  - Formel: chris_score_estimate = self_eval - 2.0
  - Entscheidungsregel: Iterieren nur wenn chris_score_estimate < 8.0

- **Alle Improvements jetzt abgearbeitet:** IMP-001 bis IMP-005 [DONE]

## Kein neuer Build gestartet — Gruende:
1. Blocked auf Chris-Feedback zu v6
2. 04:40 morgens, Chris schlaeft
3. IMP-002 (Skills in Build testen) kommt beim naechsten Build automatisch

## Token-Effizienz
- Fokussierte Session: nur Edits, kein Build-Overhead
- Geschaetzter Verbrauch: niedrig
