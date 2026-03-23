# Recherche: Self-Improvement / Self-Reflection fuer autonome AI-Agenten

**Datum:** 2026-03-23
**Ziel:** Konkrete, praktische Ansaetze fuer einen Claude Code Agent der per Cron stuendlich startet und nur Dateien als Persistenz hat.

---

## 1. Pattern-Erkennung ueber Sessions hinweg (frischer Context)

### Problem
Jede Session startet bei Null. Der Agent sieht nicht, dass er denselben Fehler zum 5. Mal macht.

### Loesung: Datestamped Lessons + Frequency Detection

**Ian Paterson (22 Tage Praxis, 34 Projekte)** hat das geloest:
- Jede Lesson bekommt ein Datum: `[2026-02-22] Immer downstream consumers pruefen vor Loeschen`
- Eine Lesson die an 3+ verschiedenen Tagen auftaucht = **strukturelles Problem** → wird in permanentes Topic-File promoted
- Wochentlicher Cron (`rotate-memory-lessons.sh`) laesst Claude die Lessons analysieren und Duplikate/Veraltetes archivieren

**Reflexion-Paper (Shinn et al., NeurIPS 2023):**
- Agent schreibt nach jedem Fehlschlag eine **natuerlichsprachliche Reflexion** in einen "episodic memory buffer"
- Naechster Versuch bekommt diese Reflexion als Context → verbale Verstaerkung statt Gewichts-Updates
- HumanEval pass@1 von GPT-4 Baseline auf ~91% gesteigert
- **Key Insight:** Reflexionen muessen **persistiert** werden, sonst sind Verbesserungen ephemeral

**Praktische Umsetzung fuer Component Lab:**
```
knowledge/daily/2026-03-23.md  →  Rohe Notizen des Tages
knowledge/skills/*.md          →  Destillierte Skill-Erkenntnisse
knowledge/constitution.md      →  Kuratiertes Top-Level Wissen
```
Ein Reflection-Agent (z.B. 1x taeglich per Cron) liest alle Daily-Logs der Woche, erkennt Wiederholungen, und promoted sie nach skills/ oder constitution.md.

---

## 2. Effizientes Logging ohne Speicher-Ueberflutung

### Das Overflow-Problem
Ian Paterson: MEMORY.md wuchs auf 501 Zeilen, Claude laedt aber nur 200. **60% der Lessons waren unsichtbar.**

### Bewaehrte Patterns

**A) Append-Only + Rotation (Ian Paterson):**
- Daily Logs sind append-only (eine Datei pro Tag)
- MEMORY.md hat ein **200-Zeilen Hard Cap**
- Wochentlicher Cron archiviert alte Entries nach OLD-MEMORY-ENTRIES.md
- Rotation generiert **Summaries** mit Pointern auf Archiv
- Kosten: ~$2/Woche fuer Claude-Rotation, $8/Monat

**B) OpenClaw/MemOS: Markdown + Vector Index:**
- Alle Memory = plain Markdown auf Disk (Source of Truth)
- Vector-DB (Milvus) indexiert die Markdown-Dateien fuer semantische Suche
- Hybrid Search: 70% Vector + 30% BM25 Keyword
- **Compact-Workflow:** LLM summariert historische Memory, loescht/archiviert Originale
- Wenn Vector-Index kaputt → aus Markdown neu aufbauen (keine Daten verloren)
- memsearch (Open Source): `pip install memsearch` — extrahiertes OpenClaw Memory als standalone Library

**C) claude-mem Plugin:**
- Captured automatisch alle Tool-Usage waehrend Sessions
- Komprimiert mit Claude Agent SDK
- Speichert in SQLite
- Injiziert relevanten Context in zukuenftige Sessions

**D) 4-Layer Architecture (OblivionLabz):**
1. **Conversation Logs** (Short-Term): JSON pro Session, nach 24h archiviert
2. **Entity Knowledge Base** (Long-Term): Strukturierte JSON pro Entity (Projekte, Systeme, Personen)
3. **Episodic Memory**: Zeitlich geordnete Erinnerungen an vergangene Interaktionen
4. **Semantic Memory**: Abstrahierte Konzepte und Beziehungen

### Empfehlung fuer Component Lab
Einfachste effektive Variante:
- **1 Datei pro Tag** in knowledge/daily/ (append-only, max ~200 Zeilen)
- **Structured Header** pro Run: Timestamp, Strategie, Ergebnis, Lessons
- **Woechentlicher Reflector** komprimiert 7 Daily-Logs → Weekly Summary
- **constitution.md** bleibt unter 150 Zeilen (wird immer geladen)

---

## 3. Etablierte Reflection-Patterns

### A) Reflexion Framework (Shinn et al., 2023)
Der Standard-Ansatz. 5 Schritte:
1. **Task definieren**
2. **Trajectory generieren** (Agent versucht Aufgabe)
3. **Evaluieren** (erfolgreich/gescheitert)
4. **Reflexion durchfuehren** (natuerlichsprachliche Selbstkritik)
5. **Naechste Trajectory generieren** (mit Reflexion als zusaetzlichem Context)

Reflexionen werden als **episodic memory** gespeichert. Kein Weight-Update noetig.

### B) GEPA: Reflective Prompt Evolution (ICLR 2026 Oral)
**Genetic-Pareto Approach** — der fortgeschrittenste praktische Ansatz:
1. Agent fuehrt Aufgaben aus, Trajectories werden geloggt
2. LLM **reflektiert** ueber Trajectories: Was lief gut? Was nicht?
3. LLM schlaegt **Prompt-Revisionen** vor basierend auf Reflexion
4. **Pareto-Front**: Statt einen "besten" Prompt zu waehlen, haelt GEPA mehrere Varianten mit verschiedenen Tradeoffs
5. Kombiniert Ideen der Top-Kandidaten
6. Validiert optimierte Prompts gegen held-out Tests

**Integriert in:** MLflow, Pydantic AI, Comet ML Opik, OpenAI Cookbook
**Repo:** github.com/gepa-ai/gepa

### C) Perceive-Plan-Act-Reflect Loop (Microsoft Metacognition)
Erweitert den klassischen Agent-Loop um eine Reflect-Phase:
- **Perceive:** Umgebung wahrnehmen (Dateien lesen, State pruefen)
- **Plan:** Strategie waehlen
- **Act:** Ausfuehren
- **Reflect:** Eigene Performance bewerten, Strategie anpassen
- Metacognition = "Denken ueber das Denken"

### D) Self-Generated In-Context Examples (NeurIPS 2025)
Simpelster aber erstaunlich effektiver Ansatz:
- Agent speichert **erfolgreiche Trajectories**
- Zukuenftige Tasks bekommen ein paar vergangene Erfolge als In-Context Examples
- ALFWorld Performance: 73% → 89-93%
- **Ist im Prinzip Experience Replay fuer Prompting**

### E) Dual-Loop Reflection (Nature, 2025)
Inspiriert von kognitiver Psychologie:
- **Extrospection:** Externen Feedback analysieren (Build-Errors, Scores, User-Bewertungen)
- **Introspection:** Eigene Reasoning-Prozesse hinterfragen (Warum habe ich X gewaehlt?)
- Beide Loops fuettern in Memory-Updates

---

## 4. OpenClaw Memory-System im Detail

### Architektur
- **Source of Truth:** Plain Markdown auf lokaler Disk
- **Vector Index:** Optional, rebuildet sich aus Markdown
- **Hybrid Search:** FTS5 + Vector → RRF(k=60) → MMR(lambda=0.7) → Decay(14d) → Normalize → Filter(>=0.45) → Top-K
- **Auto-Links:** Memory automatisch mit Tasks und Skills verknuepft

### Memory-Typen
- `MEMORY.md` — Handgeschriebene langfristige Memory (nur in privaten Sessions geladen)
- `YYYY-MM-DD.md` — Automatische Tages-Logs
- Tasks — Konversations-Bubbles
- Skills — Versioniert, herunterladbar

### MemOS (Open Source Memory OS)
- github.com/MemTensor/MemOS
- Persistent SQLite + Hybrid Search (FTS5 + Vector)
- Task Summarization + **Skill Evolution**
- Multi-Agent Collaboration
- Memory Viewer Dashboard
- Tool Memory fuer Agent Planning

### memsearch (Extrahiertes OpenClaw Memory)
- github.com/zilliztech/memsearch — MIT License
- 4 Workflows: **Watch → Index → Search → Compact**
- Watch: 1500ms Debounce, auto-reindex bei File-Save
- Index: Semantic Chunking, SHA-256 Dedup, versioned Chunk-IDs
- Search: 70% Vector + 30% BM25, Top-K (default 3)
- Compact: LLM summariert historische Memory
- Milvus Lite lokal oder Zilliz Cloud fuer Production

---

## 5. Konzepte: Action Journal, Reflection Loop, Meta-Cognition

### Action Journal
Strukturiertes Log jeder Agent-Aktion:
```markdown
## Run 2026-03-23T14:00
**Strategie:** editorial-hero mit Typografie-Focus
**Modell:** claude-opus-4
**Schritte:**
1. Constitution geladen (15 Regeln)
2. Referenz analysiert (awwwards.com/xyz)
3. Hero gebaut: hero-v004-a
4. Build: ERFOLG
5. Lighthouse: Performance 92, Accessibility 98
**Ergebnis:** Fertig, components.json aktualisiert
**Lessons:**
- CSS-only Animationen performen besser als JS fuer Hero-Transitions
- Tailwind v4 @theme Syntax hat sich geaendert seit letztem Build
```

### Reflection Loop (Periodisch)
```
DAILY (nach jedem Run):
  → Kurze Selbst-Bewertung ins Daily Log
  → Was hat funktioniert? Was nicht?

WEEKLY (Cron, Sonntags):
  → Agent liest alle 7 Daily-Logs
  → Erkennt Patterns (3+ Wiederholungen = strukturell)
  → Promoted Erkenntnisse nach skills/ oder constitution.md
  → Archiviert alte Dailies

MONTHLY (oder nach 30 Runs):
  → Groessere Retrospektive
  → Welche Kategorien laufen gut/schlecht?
  → Welche Skills fehlen?
  → Constitution.md Revision
```

### Meta-Cognition fuer LLM-Agents
**OpenReview Paper "Truly Self-Improving Agents Require Intrinsic Metacognitive Learning":**
- Agents muessen reflektieren ueber:
  1. **Was sie wissen** (Knowledge Assessment)
  2. **Wie sie lernen** (Learning Strategy Assessment)
  3. **Wie gut ihre Lern-Strategien funktionieren** (Meta-Strategy Assessment)
- Dann Strategien entsprechend anpassen
- Aktuelle Systeme haben nur **fixe, extern designte** Self-Improvement Loops
- Echte Self-Improvement braucht **adaptive** Loops

### Self-Improving Code Agents (Yohei Nakajima / NeurIPS 2025 Synthese)
6 Mechanismen fuer Self-Improvement:
1. **Self-Reflection** (Prompt-Level, keine Weight-Updates) — Reflexion, Self-Refine
2. **Self-Generated Data** (Agent erzeugt eigene Trainings-Daten) — Self-Challenging
3. **Self-Adapting Models** (Agent editiert sich selbst) — SEAL
4. **Self-Improving Code** (Agent schreibt eigenen Code um) — STO, SICA, Voyager
5. **Embodied Self-Practice** (Agent uebt in Umgebung) — EFMs
6. **Verification & Safety** (Tests und Constraints) — Guardrails

**Wichtigstes Pattern fuer Code-Agents:**
> Skills und Strategien als ausfuehrbare Artefakte (Code) repraesentieren, und dem Agent die Faehigkeit geben, diese zu debuggen, umzuschreiben und zu reorganisieren.

---

## 6. Konkrete Architektur fuer Component Lab

### Was wir haben
- Cron-getriebener Agent (stuendlich)
- Nur Dateien als Persistenz
- knowledge/constitution.md (kuratiert, immer geladen)
- knowledge/daily/ (rohe Run-Notizen)
- knowledge/skills/ + knowledge/workflows/

### Was wir bauen sollten

**Phase 1: Structured Action Journal**
Jeder Run schreibt strukturiertes Log in knowledge/daily/YYYY-MM-DD.md:
```
## Run HH:MM — [hero-id]
Kategorie: [kategorie]
Strategie: [beschreibung]
Ergebnis: ERFOLG/FEHLER
Build: OK/FAIL (reason)
Lessons: [liste]
Score: [self-assessment 1-10]
```

**Phase 2: Weekly Reflector (Cron, 1x/Woche)**
Ein separater Claude-Run der:
1. Alle Daily-Logs der Woche liest
2. Patterns erkennt (wiederholte Fehler, erfolgreiche Strategien)
3. Skills-Dateien aktualisiert
4. constitution.md Vorschlaege macht (nicht direkt schreibt — Chris approved)
5. Weekly Summary schreibt

**Phase 3: Self-Generated Examples**
- Erfolgreiche Runs werden als "Exemplar-Trajectories" gespeichert
- Zukuenftige Runs bekommen 2-3 relevante Erfolgs-Beispiele als Context
- Einfachstes Self-Improvement Pattern mit groesstem ROI

**Phase 4: Prompt Evolution (GEPA-inspiriert)**
- Nach 20+ Runs: Agent analysiert alle Trajectories
- Schlaegt Prompt-Varianten vor fuer verschiedene Kategorien
- A/B Testing der Varianten
- Beste Varianten werden in constitution.md uebernommen

### 8 Design-Regeln (adaptiert von Ian Paterson)
1. Jede Datei muss via Index/Mapping auffindbar sein
2. Jede Lesson braucht ein Datum
3. Jeder Write-Target braucht ein fixes Schema
4. Jeder Cron-Job braucht Budget-Limit und Failure-Alert
5. Jeder Index braucht einen Staleness-Detector
6. Jeder Fakt lebt an genau einem kanonischen Ort
7. Jede Datei muss in ihren Loading-Mechanismus passen (constitution.md < 150 Zeilen)
8. Nicht bauen was Claude Code nativ kann

---

## Quellen

### Artikel (gescrapt und gelesen)
- Ian Paterson: "Claude Code Memory System" — https://ianlpaterson.com/blog/claude-code-memory-architecture/
- Yohei Nakajima: "Better Ways to Build Self-Improving AI Agents" — https://yoheinakajima.com/better-ways-to-build-self-improving-ai-agents/
- Milvus/Zilliz: "We Extracted OpenClaw's Memory System (memsearch)" — https://milvus.io/blog/we-extracted-openclaws-memory-system-and-opensourced-it-memsearch.md
- OblivionLabz: "4-Layer File-Based Memory Architecture" — https://dev.to/oblivionlabz/building-persistent-ai-agent-memory-a-4-layer-file-based-architecture-for-cross-session-recall-ffd

### Papers
- Shinn et al.: "Reflexion: Language Agents with Verbal Reinforcement Learning" (NeurIPS 2023) — arxiv.org/abs/2303.11366
- GEPA: "Reflective Prompt Evolution Can Outperform RL" (ICLR 2026 Oral) — arxiv.org/abs/2507.19457
- A-MEM: "Agentic Memory for LLM Agents" (NeurIPS 2025) — arxiv.org/abs/2502.12110
- "Truly Self-Improving Agents Require Intrinsic Metacognitive Learning" — OpenReview
- MAR: "Multi-Agent Reflexion" — arxiv.org/html/2512.20845

### Tools & Repos
- memsearch: github.com/zilliztech/memsearch (MIT, OpenClaw Memory standalone)
- MemOS: github.com/MemTensor/MemOS (Memory OS fuer Agents)
- claude-mem: github.com/thedotmack/claude-mem (Claude Code Session Memory Plugin)
- GEPA: github.com/gepa-ai/gepa (Reflective Prompt Evolution)
- Reflexion: github.com/noahshinn/reflexion
- Microsoft AI Agents for Beginners (Metacognition): microsoft.github.io/ai-agents-for-beginners/09-metacognition/
- OpenClaw Memory Docs: docs.openclaw.ai/concepts/memory
