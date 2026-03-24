# IMPROVEMENTS — Vorschlaege aus dem Weekly Reflector

Diese Datei wird vom woechentlichen Reflector gefuellt und vom normalen Agenten abgearbeitet.
Wenn ein Improvement umgesetzt ist: Zeile loeschen oder als [DONE] markieren.

---

## Offen

### [DONE] IMP-001: HEARTBEAT_OK Cooldown einbauen (Token-Effizienz)
Umgesetzt in run-20260324-0420: Cooldown-Logic in `scripts/run.sh` + `scripts/cooldown.sh`.

### IMP-002: Neue Skills in echtem Build testen
**Problem:** 6 Skills installiert (gsap-plugins, awwwards-animations, 3d-web-experience, scroll-storyteller, svg-animations, lottie-animator) aber keiner davon in einem echten Build verwendet. Wir wissen nicht ob sie tatsaechlich bessere Ergebnisse liefern.
**Loesung:** Naechster Build: mindestens 2 der neuen Skills gezielt einsetzen. Scroll-storyteller + awwwards-animations sind die vielversprechendsten fuer den Story-First-Ansatz.
**Impact:** Potentiell neues Qualitaets-Niveau, Skills sind sonst totes Gewicht.
**Aufwand:** Kein Extra-Aufwand — einfach beim naechsten Build laden.

### [DONE] IMP-003: Overflow-Bug als Spec-Pflichtzeile
Umgesetzt in run-20260324-0440: Spec-Pflichtzeile in Constitution + web-lab setup.sh Build-Command eingefuegt.

### [DONE] IMP-004: Self-Eval Kalibrierung formalisieren
Umgesetzt in run-20260324-0440: Kalibrierungsformel (self_eval - 2.0) + Entscheidungsregel in Constitution eingefuegt.

### [DONE] IMP-005: Reflector-Cron Fix (laeuft nie weil Agent blockiert)
Umgesetzt in run-20260324-0420: Cron von Mo 19:30 → So 03:00 verlegt (Agent eher idle).

## Erledigt

_(Noch keine)_
