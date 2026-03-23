# Component Lab — Verbesserungen (zu besprechen am 23.03.2026)

Beobachtungen aus der Nacht-Überwachung des autonomen Agenten.

---

## 1. KRITISCH (bereits gefixt)

### Process-Check Bug in run-build.sh
- **Problem:** `pgrep -P "$PANE_PID" -f claude` sucht nach Kind-Prozessen des Pane-PID, aber Claude IST der Pane-Prozess selbst (kein Kind-Prozess)
- **Auswirkung:** Cronjob hätte jede laufende Session nach 1h gekillt, egal ob Claude noch arbeitet
- **Fix:** `ps -p "$PANE_PID" -o comm=` prüft ob der Prozess selbst "claude" ist
- **Status:** Bereits gefixt am 22.03.

---

## 2. Cronjob & Session-Management

### Agent beendet sich nicht selbst — BESTÄTIGT
- Agent schreibt in Constitution "Am Ende jeder Session: exit", macht es aber nicht
- **Beobachtet 23:00:** Run ist komplett fertig (deployed, E-Mail gesendet, Daily Note geschrieben), aber Claude-Prozess hängt im idle-Zustand (State: S, wartet auf Input)
- Folge: Cronjob erkennt "claude läuft noch" und startet keinen neuen Run → **kompletter Stillstand über Nacht**
- **Idee A:** Timeout im tmux-Befehl: `timeout 90m claude ...` — killt nach 90min automatisch
- **Idee B:** Im Process-Check zusätzlich Inaktivität prüfen (z.B. keine CPU-Last seit X Minuten)
- **Idee C:** `--max-turns` Flag falls verfügbar?
- **Priorität:** P0 — ohne Fix passiert über Nacht NICHTS nach dem ersten Run
- **Status: GEFIXT** — CPU-Check eingebaut (idle = CPU < 5% nach > 30min Laufzeit → Session wird neu gestartet)
- **Ergebnis der Nacht:** 9 Cron-Zyklen blockiert (23:00–05:00), 7h verschwendet. Fix um 05:37 angewendet, neuer Run gestartet.

### Kein Logging der Session-Ausgabe
- `runs/build-XXXXXX-XXXX/` Verzeichnisse werden erstellt aber sind leer
- Die gesamte tmux-Ausgabe geht verloren wenn die Session endet
- **Idee:** `tmux pipe-pane` oder `script` Command um Output zu loggen

### Cronjob-Frequenz
- 1h ist vielleicht zu häufig wenn Sessions länger laufen (aktueller Run: 7% nach 30min)
- Aktuell kein Problem dank Process-Check, aber verschwendet Cron-Zyklen
- **Idee:** Auf 2h oder 3h umstellen? Oder dynamisch basierend auf letzter Run-Dauer?

---

## 3. Agent-Qualität & Verhalten

### Viele tote tmux Sessions von Sub-Agents
- 9+ tmux Sessions laufen (combo-a-build2, combo-d-build2, norris-build, weblab-*)
- Die meisten sind von früheren Runs und idle
- **Idee:** Cleanup-Mechanismus am Anfang von run-build.sh (alle Sessions älter als X Stunden killen?)

### Experimente-Proliferation ohne Ergebnis
- 6 Experimente in lab-pixint, keines wirklich "fertig"
- exp-editorial-light deployed aber "weit weg von WOW"
- exp-ref-norris, exp-combo-a/d gebaut aber nicht deployed
- **Idee:** Agent soll explizit priorisieren: 1-2 Experimente fertig machen statt 5 neue anfangen

### Skills werden jetzt geladen (Fortschritt!)
- Build-20260322-2224 nutzt Brave Search, web-lab setup, Three.js
- Vorherige Runs: alles aus dem Kopf
- Constitution v4 hat die richtigen Lektionen

---

## 4. Infrastruktur

### Kein Monitoring der Vercel-Deployments
- Agent deployed auf Vercel, aber wir wissen nicht welche URLs aktiv/erreichbar sind
- **Idee:** Heartbeat-Run soll alle deployment-URLs pingen und Status reporten

### Daily Notes nur 1 Datei pro Tag
- Alles in `2026-03-22-build.md` — wird bei mehreren Runs am Tag unübersichtlich
- **Idee:** `YYYY-MM-DD-HHMM-run-type.md` pro Run statt pro Tag

### Runs-Verzeichnis wird nicht genutzt
- 6 leere Run-Verzeichnisse unter `runs/`
- Nur `cron.log` hat Inhalt
- **Idee:** Entweder Output dort loggen oder die Verzeichnisse nicht mehr erstellen

---

## 5. Mögliche neue Features

### Automatisches QA nach Deploy
- Agent deployed → agent-browser macht Screenshots → Vergleich mit Konzept
- Automatische Bewertung ob "Awwwards-Niveau" erreicht

### Chris-Benachrichtigung bei "fertig"
- Agent soll E-Mail schicken wenn er denkt eine Website ist fertig
- Ist im Prompt beschrieben, aber noch nie passiert
- **Prüfen:** Funktioniert der E-Mail-Skill im autonomen Modus?

### Scout-Run aktivieren
- run-scout.sh existiert, wurde aber noch nie ausgeführt
- **Idee:** Einmal am Tag (z.B. 6:00 morgens) einen Scout-Run starten

---

## Zusammenfassung Prioritäten

| Prio | Thema | Aufwand |
|------|-------|---------|
| P0 | ~~Process-Check Bug~~ | ~~Gefixt~~ |
| P1 | Session-Output loggen | Klein |
| P1 | Tote tmux Sessions aufräumen | Klein |
| P2 | Agent soll sich selbst beenden | Mittel |
| P2 | Daily Notes pro Run statt pro Tag | Klein |
| P3 | Deployment-Monitoring | Mittel |
| P3 | Scout-Run Cron einrichten | Klein |
| P3 | E-Mail bei "fertig" testen | Klein |
