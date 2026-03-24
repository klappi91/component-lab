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

### IMP-003: Overflow-Bug als Spec-Pflichtzeile
**Problem:** 3 von 12 Fehlern waren overflow-related (mobile-overflow-x, mobile-overflow, gsap-scroll-broken-by-overflow). Jedes Mal 10-20 Min Debugging.
**Loesung:** In JEDE creative-brief.md als Pflicht-Zeile einbauen: `CRITICAL: body { overflow-x: hidden } in globals.css. KEIN overflow:hidden auf body ohne scroll-wrapper — bricht GSAP ScrollTrigger.`
**Impact:** ~30 Min pro Build gespart, 0 overflow-Bugs.
**Aufwand:** Minimal — eine Zeile in Spec-Templates.

### IMP-004: Self-Eval Kalibrierung formalisieren
**Problem:** Self-Eval 9.5 → Chris 7.5 = 2.0 Punkte Inflation. Constitution sagt "mindestens 1.5 abziehen", aber das passiert nicht konsistent.
**Loesung:** Formal im QA-Schritt: `chris_score_estimate = self_eval - 2.0`. In GOALS.md und Experiment-Logs immer BEIDE Scores angeben: "Self: X, Chris-geschaetzt: Y".
**Impact:** Realistischere Erwartungen, bessere Entscheidungen ueber Iterations vs. neue Builds.
**Aufwand:** Minimal — Konvention aendern.

### [DONE] IMP-005: Reflector-Cron Fix (laeuft nie weil Agent blockiert)
Umgesetzt in run-20260324-0420: Cron von Mo 19:30 → So 03:00 verlegt (Agent eher idle).

## Erledigt

_(Noch keine)_
