# HEARTBEAT — Was ich bei jeder Session checke

Diese Datei ist meine Checkliste. Am Anfang JEDER Session lese ich sie und arbeite sie durch.
Das Ergebnis bestimmt was ich in dieser Session tue.

---

## 1. Feedback checken
```bash
# NUR ungelesene Mails suchen (--unseen)
node ~/.claude/skills/imap-smtp-email/scripts/imap.js search --from christian.klapproth@pixintcreators.de --subject "Component Lab" --unseen --limit 5
```
- **WICHTIG:** Nur `--unseen` Mails lesen! Bereits verarbeitete sind als gelesen markiert.
- Gibt es Antworten auf meine Mails?
- Gibt es neues Feedback zu Erlebnissen?
- → Wenn ja: Feedback einarbeiten hat PRIORITAET
- → Nach Verarbeitung: `mark-read <uid>` ausfuehren + UID in `runs/processed-mails.json` eintragen

## 2. Inspiration suchen
- Awwwards SOTD/SOTY checken (Brave Search: "awwwards site of the day" + aktuelles Datum)
- 1-2 Referenz-Sites analysieren:
  - NICHT "sieht cool aus" sondern:
  - Welche Easings? (expo.out? power4.inOut? custom?)
  - Welche Uebergaenge zwischen Sektionen? (Color-Morph? Clip-Path? Stacking?)
  - Welches Timing? (Stagger-Werte, Durations, Overlaps)
  - Was ist der EINE Moment der im Kopf bleibt?
  - Welcher Flow-Typ? (Vertikal, Horizontal, Pinned, Immersive)
- Choreografie-Analyse in Daily Note festhalten

## 3. Skills checken
- Neue Skills suchen: `find-skills` fuer Patterns die bei der Inspiration aufgefallen sind
- Installierte Skills reviewen: Kann einer davon das gefundene Pattern umsetzen?
- awwwards-animations + gsap-plugins = PFLICHT bei jedem Build
- Konzept-Skills je nach Erlebnis-Typ dazuladen

## 4. Ziele checken
- `GOALS.md` lesen — was ist das aktuelle Hauptziel?
- Welche Teilziele sind offen?
- Bin ich auf dem richtigen Weg oder brauche ich einen Kurswechsel?

## 5. Wissen checken
- `knowledge/constitution.md` lesen — kuratiertes Wissen
- Letzte Daily Notes ueberfliegen — was war der letzte Run? Was kam raus?
- Hat sich ein Pattern bewaehrt das in die Constitution gehoert?

## 6. Improvements checken
- `IMPROVEMENTS.md` lesen — hat der Weekly Reflector Vorschlaege?
- Offene Improvements = konkrete, umsetzbare Aufgaben
- Wenn umgesetzt: als [DONE] markieren

## 7. Entscheiden
Basierend auf 1-6 entscheide ich WAS ich in dieser Session tue. Prioritaet:

### P1: Feedback von Chris
→ Feedback einarbeiten. Erlebnis iterieren oder neuen Ansatz.

### P2: Inspiration gefunden + Choreografie verstanden
→ Erlebnis erschaffen das von der Inspiration LERNT (nicht kopiert).
→ Skills aktiv laden. Choreografie-Konzept BEVOR Code.

### P3: Offene Improvements
→ Skill bauen, Script schreiben, Fehler-Pattern fixen.

### P4: Neues Erlebnis experimentieren
→ Andere Skill-Kombination, andere Design-Philosophie, anderer Erlebnis-Typ.
→ NICHT gleicher Prompt mit anderem Modell!

### P5: Nichts Konkretes
→ Inspiration recherchieren fuer naechste Session.
→ Constitution pflegen, Skills aufraeuemen.
→ `HEARTBEAT_OK` — Session sauber beenden.

---

## WICHTIG: Erlebnisse bauen, nicht Websites

- Ein Erlebnis kann 1 Screen sein oder eine Mini-Site — egal
- Was zaehlt: Hat es FLOW? Fuehlt es sich choreografiert an? Bleibt es im Kopf?
- KEIN neues Repo. Direkt im Component Lab unter /heroes/
- components.json IMMER aktualisieren (skills_loaded, inspiration_source, choreography_notes)
- Frueh zeigen. Potenzial > Perfektion.

## Nach der Session
1. Daily Note schreiben (`knowledge/daily/YYYY-MM-DD-*.md`)
2. GOALS.md updaten
3. Constitution updaten (wenn neue Erkenntnisse)
4. components.json updaten (neues Erlebnis tracken)
5. Git commit + push
