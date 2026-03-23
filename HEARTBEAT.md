# HEARTBEAT — Was ich bei jeder Session checke

Diese Datei ist meine Checkliste. Am Anfang JEDER Session lese ich sie und arbeite sie durch.
Das Ergebnis bestimmt was ich in dieser Session tue.

---

## 1. Feedback checken
```bash
node ~/.claude/skills/imap-smtp-email/scripts/imap.js search --from christian.klapproth@pixintcreators.de --subject "Component Lab" --recent 24h --limit 5
```
- Gibt es Antworten auf meine Mails?
- Gibt es neues Feedback zu deployed Websites?
- → Wenn ja: Feedback einarbeiten hat PRIORITAET

## 2. Ziele checken
- `GOALS.md` lesen — was ist das aktuelle Hauptziel?
- Welche Teilziele sind offen?
- Bin ich auf dem richtigen Weg oder brauche ich einen Kurswechsel?

## 3. Experimente checken
- `knowledge/experiments/` durchgehen — welche Websites gibt es?
- Status pro Website: deployed? Feedback erhalten? Naechste Schritte?
- Gibt es ein Experiment das kurz vor "fertig" ist? → Prioritaet

## 4. Wissen checken
- `knowledge/constitution.md` lesen — kuratiertes Wissen
- Letzte Daily Notes ueberfliegen — was war der letzte Run? Was kam raus?
- Hat sich ein Pattern bewaehrt das in die Constitution gehoert?

## 5. Improvements checken
- `IMPROVEMENTS.md` lesen — hat der Weekly Reflector Vorschlaege?
- Offene Improvements = konkrete, umsetzbare Aufgaben (Skill bauen, Script schreiben, Prompt aendern)
- Wenn umgesetzt: als [DONE] markieren oder loeschen

## 6. Entscheiden
Basierend auf 1-5 entscheide ich WAS ich in dieser Session tue. Prioritaet:

### P1: Feedback von Chris
→ Feedback einarbeiten. Website iterieren oder neu angehen.

### P2: Experiment kurz vor fertig
→ Polishen, QA, deployen. Ggf. Mail an Chris.

### P3: Offene Improvements
→ Einen Improvement-Vorschlag umsetzen (Skill bauen, Script schreiben, Fehler-Pattern fixen).
→ Das macht mich langfristig effizienter — hat Vorrang vor "einfach weiterbauen".

### P4: Am Hauptziel weiterarbeiten
→ Aus GOALS.md. Das kann sein:
- Neues Experiment starten
- An bestehendem Experiment weiterarbeiten
- Prozess-Experiment durchfuehren (Builder-Agent testen, Skill-Kombination testen, etc.)
- Recherche (neue Skills, Award-Sites, Design-Patterns)
- Assets generieren (gemini-image, gemini-video)

### P5: Nichts zu tun
→ Erkenntnisse destillieren, Constitution pflegen, Skills aufraeuemen.
→ Wenn auch das erledigt: `HEARTBEAT_OK` — Session sauber beenden.

## 6. Self-Improvement checken

Nach dem Handeln, VOR dem Abschliessen:

### Wiederholungen erkennen
- Mache ich etwas zum 3. Mal manuell? → **Script oder Skill daraus bauen**
  - Beispiel: E-Mail-Check ist immer derselbe IMAP-Befehl → eigenes Script
  - Beispiel: Immer gleiche GSAP-Patterns → als Skill verpacken (skill-creator)
  - Beispiel: Immer gleiche QA-Schritte → agent-browser Workflow automatisieren

### Token-Effizienz
- Was hat in dieser Session unnoetig viele Tokens verbraucht?
- Kann ich das naechstes Mal effizienter machen? (Script, Skill, besserer Prompt)
- Gibt es Schritte die ein guenstigeres Modell (Sonnet/Haiku) uebernehmen kann?

### Fehler-Patterns
- Sind in dieser Session Fehler aufgetreten die ich schon mal hatte?
- → In Constitution oder knowledge/workflows/ dokumentieren damit ich sie nicht wiederhole
- Build-Fehler, TypeScript-Fehler, API-Fehler — alles was Zeit gekostet hat

### Prozess verbessern
- Funktioniert der Heartbeat-Ablauf? Fehlt ein Schritt? Ist einer ueberfluessig?
- → HEARTBEAT.md anpassen
- Sind meine GOALS.md noch aktuell oder muss ich umpriorisieren?
- Hat sich ein Workflow bewaehrt? → Als Skill verpacken (`skill-creator`)
- Hat sich ein Agent-Setup bewaehrt? → Als .claude/agents/ Template speichern

### Eigenen Prompt verbessern
- Wenn fundamentale Erkenntnisse: `scripts/agent-prompt.md` anpassen
- Alles ist in Git — nichts geht verloren

---

## Nach der Session
1. Daily Note schreiben (`knowledge/daily/YYYY-MM-DD.md`)
2. GOALS.md updaten (Fortschritt, naechste Schritte)
3. Constitution updaten (wenn neue Erkenntnisse)
4. Self-Improvement Aenderungen committen (wenn welche)
5. Git commit + push
