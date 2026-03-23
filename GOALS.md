# GOALS — Was ich erreichen will

## Hauptziel
**Eine Awwwards-wuerdige Website fuer PixIntCreators bauen.**
Eine Webdesign-Agentur deren eigene Website nicht mindestens so gut ist wie die Websites die sie fuer Kunden baut, hat ein Problem.

---

## Aktuelle Phase: Prozess optimieren + Website iterieren

### Offene Teilziele

#### 1. exp-signature-hero — CHRIS-FEEDBACK EINARBEITEN
- **Status:** v11 deployed, Chris-Bewertung: **7.5/10** (Self-Eval war 9.3 — Bewertung kaputt!)
- **URL:** https://exp-signature-hero.vercel.app
- **GitHub:** https://github.com/klappi91/weblab-exp-signature-hero
- **Stil:** Cinematic Dark + WebGL Shader + ScrollFlow v2 + Stacking Services + Pinned Methode + Preloader + SVG Logo + Video Showreel
- **v11 Aenderungen:** ScrollFlow v2 — CSS-blur Orbs entfernt (Performance), SVG-Pfad + Navigator-Dot (Sichtbarkeit)
- **Chris-Feedback (offen):**
  - [x] Durchgehender Fluss — ScrollFlow v2: SVG-Pfad zeichnet sich beim Scrollen, orange Dot folgt dem Pfad
  - [x] Sektions-Uebergaenge — Gradient-Glow-Transitions
  - [x] **Logo fehlt** — SVG Logo-Komponente (P/C Monogram + Wordmark), GSAP-animierbar, in Nav/Preloader/Footer
  - [x] **Video fehlt** — Veo 3.1 cinematic ambient video, VideoShowreel-Sektion mit GSAP scroll reveal
  - [x] **Mobile Services** — Farbige Glow-Akzente (Orange/Cyan/Purple), leichterer Gradient, visuelles Erlebnis
  - [x] **Performance Desktop** — CSS-blur Orbs entfernt (3x blur 60-100px auf 500-1000px Elementen)
  - [x] **Fluss sichtbarer machen** — SVG-Pfad + Navigator-Dot ersetzt unsichtbare Blur-Orbs
- **Noch zu verifizieren (naechste Session):**
  - [ ] Live-Test: Ist der SVG-Pfad + Dot im Browser wirklich sichtbar genug?
  - [ ] Performance-Messung: Lighthouse Desktop-Score pruefen
  - [ ] Methode-Sektion: Headlines zu dunkel im QA

#### 2. exp-cinematic-dark (bisheriger Spitzenreiter)
- **Status:** v2 deployed, QA Score 7.5/10
- **URL:** https://exp-cinematic-dark.vercel.app
- **Entscheidung:** exp-signature-hero ist besser. Cinematic-dark als Referenz behalten.

#### 3. Naechste Prozess-Experimente (Prioritaet)
- [ ] **Reproduzierbarkeit testen** — Bewiesenen Workflow auf NEUES Projekt anwenden (anderer Stil)
  - Hypothese: Kann der Workflow (Opus Signature + Sonnet Builder + Overdrive) konsistent 9+/10 liefern?
  - Stil-Idee: Light Theme, Editorial, Typografie-fokussiert (Gegenstueck zu Cinematic Dark)
- [ ] **Parallel-Build** — 2 Builder mit verschiedenen Prompts, gleiche Reference-Daten, vergleichen
  - Hypothese: Diversitaet → bessere Auswahl. Oder: Kosten verdoppeln ohne Qualitaetsgewinn?
- [ ] **Designer + Rules + Assets-First** — Kombination aller bewaehrten Elemente
- [ ] **Anderes Modell testen** — Was liefert Haiku als Builder? Oder Codex?

#### 4. Abgeschlossene Prozess-Experimente (2026-03-23)
- [x] Designer-Agent → Builder Pipeline (exp-warm-brutal, 5/10)
- [x] Builder mit OpenAI Design Rules (exp-cinematic-dark, 7/10)
- [x] impeccable:overdrive auf exp-cinematic-dark (7→7.5/10)
- [x] Signature Module (Opus) + Builder (Sonnet) (exp-signature-hero, 8/10) ← BESTES ERGEBNIS
- [x] Overdrive Push (8→8.5/10)
- [x] Custom Cursor + Portfolio (8.5→8.8/10)
- [x] Stacking Services + Film Grain (8.8→9.0/10)
- [x] Methode + CTA + Footer (9.0→9.2/10)
- [x] impeccable:overdrive Skill-Push Sonnet (9.2→9.5 self-eval, 9.3 QA)
- [x] Mobile QA + Fix (v7 deployed)
- [x] Chris informiert

---

## Abgeschlossen
- [x] Component Lab Infrastruktur aufsetzen (Gallery, Compare, Heroes)
- [x] exp-shader-forge v1-v3 (WebGL Shader Hero, Overdrive Polish, Rebuild)
- [x] exp-editorial-light v1 (gescheitert — zu langweilig ohne Assets)
- [x] OpenAI Frontend Design Rules recherchiert und dokumentiert
- [x] Designer-Agent erstellt (.claude/agents/designer.md)
- [x] Constitution v8 — Meta-Experimentator Mindset
- [x] OpenClaw-inspiriertes Workspace-System (SOUL, HEARTBEAT, GOALS)
- [x] **Prozess-Experiment #1: Designer → Builder Pipeline** (exp-warm-brutal, 5/10)
- [x] **Prozess-Experiment #2: OpenAI Rules → Builder** (exp-cinematic-dark, 7/10)
- [x] **Prozess-Experiment #3: Overdrive via Delegated Builder** (exp-cinematic-dark v2, 7→7.5/10)
- [x] **Prozess-Experiment #4: Signature Module + Builder** (exp-signature-hero, 8/10) ← BESTES ERGEBNIS

---

## Metriken
- **Websites deployed:** 5 (shader-forge, editorial-light, warm-brutal, cinematic-dark, signature-hero)
- **Bester Score (Chris):** 7.5/10 (exp-signature-hero v7) — Self-Eval war 9.3 = KAPUTT
- **Chris-Feedback "WOW":** 0 (Ziel: mindestens 1) — "solide aber vergessen nachdem man sie verlassen hat"
- **Prozess-Experimente durchgefuehrt:** 8 (Ziel: mindestens 3 ✓✓)
- **Sessions am 2026-03-23:** 15
- **Bewaehrte Workflows:**
  - **Signature Module (Opus) + Sonnet Builder** ← BESTER Build-Workflow (8/10 in ~25 Min)
  - **impeccable:overdrive Skill-Push (Sonnet)** ← BESTER Overdrive-Workflow (+0.2-0.5, 8 Min, 82k Tokens)
  - Assets-First + Image-Manifest (Builder nutzt alle Bilder)
  - Opus direkt fuer chirurgische Overdrive-Pushes (+0.2-0.5 pro Push)
  - agent-browser fuer Desktop + Mobile QA
