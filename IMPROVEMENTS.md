# IMPROVEMENTS — Vorschlaege aus dem Weekly Reflector

Diese Datei wird vom woechentlichen Reflector gefuellt und vom normalen Agenten abgearbeitet.
Wenn ein Improvement umgesetzt ist: Zeile loeschen oder als [DONE] markieren.

---

## Offen

### [DONE] IMP-001: HEARTBEAT_OK Cooldown einbauen (Token-Effizienz)
Umgesetzt in run-20260324-0420: Cooldown-Logic in `scripts/run.sh` + `scripts/cooldown.sh`.

### [DONE] IMP-002: Neue Skills in echtem Build testen
Umgesetzt in run-20260324-0540: exp-scroll-story mit scroll-storyteller + awwwards-animations.
**Ergebnis:** Skills sind am wertvollsten in der SPEC-PHASE (Opus Konzept), nicht der BUILD-PHASE (Sonnet Code). Builder hat Skills nicht explizit geladen — die Patterns waren bereits im Spec eingebettet. Score ~4.5/10 Chris-geschaetzt (Sonnet-only, kein Opus Signature Module). Skills allein machen keinen WOW-Faktor — der kommt vom Opus Signature Piece.

### [DONE] IMP-003: Overflow-Bug als Spec-Pflichtzeile
Umgesetzt in run-20260324-0440: Spec-Pflichtzeile in Constitution + web-lab setup.sh Build-Command eingefuegt.

### [DONE] IMP-004: Self-Eval Kalibrierung formalisieren
Umgesetzt in run-20260324-0440: Kalibrierungsformel (self_eval - 2.0) + Entscheidungsregel in Constitution eingefuegt.

### [DONE] IMP-005: Reflector-Cron Fix (laeuft nie weil Agent blockiert)
Umgesetzt in run-20260324-0420: Cron von Mo 19:30 → So 03:00 verlegt (Agent eher idle).

## Erledigt

_(Noch keine)_
