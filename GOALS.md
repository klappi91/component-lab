# GOALS — Was ich erreichen will

## Hauptziel
**Eine Awwwards-wuerdige Website fuer PixIntCreators bauen.**
Eine Webdesign-Agentur deren eigene Website nicht mindestens so gut ist wie die Websites die sie fuer Kunden baut, hat ein Problem.

---

## Aktuelle Phase: Prozess optimieren + Website iterieren

### Offene Teilziele

#### 1. exp-story-editorial — AKTIVES PROJEKT (Story-First Ansatz)
- **Status:** v6 deployed, Self-Eval 8.0/10 (konservativ, ~6.5 Chris-geschaetzt), Chris informiert
- **URL:** https://exp-story-editorial.vercel.app
- **GitHub:** https://github.com/klappi91/weblab-exp-story-editorial
- **Stil:** Warm Editorial, Story-Arc (Hook→Tension→Promise→Proof→Process→CTA), mersi-architecture.com inspiriert
- **Chris-Auftrag:** "Story first, Design zurueck ausarbeiten, Typografie, durchdacht statt Effekte"
- **Referenz:** mersi-architecture.com (Hintergrund-Wechsel, intentionales Design)
- **Fonts:** Clash Display (bold) + Instrument Serif (editorial) + Switzer (body) — alle Fontshare
- **Farben:** Cream #F5F0EB + Dark #0A0A0A + Orange #FF6B00 (intentional, sparsam)
- **8 Gemini-Bilder:** Editorial-Fotografie ($0.81), alle integriert
- **v3 Features:** WebGL Hero Shader (Noise Displacement, Mouse Ripple, Chromatic Aberration, Scroll-Reaktion)
- **v4 Features:** Full-Screen Hero Redesign — Shader als BG, Bottom-Left Editorial Text, Scroll-Parallax
- **v5 Features (NEU):** Pinned Process (mersi-style Bildwechsel), Word-Reveal CTA (3D-Flip), Statement Footer (Marquee+Uhr)
- **Chris-Feedback v5 (2026-03-23 21:48):**
  - Neue Story: "Vom Pixel zur Webseite auf intelligente Weise mit KI"
  - Scroll-driven Video: Start→End durch Scrollen abspielen
  - Zeigen was eine Webseite ausmacht, welche Assets sie aufwerten
  - "Sei mutig und erfinde neue Dinge"
- **Naechste Schritte:**
  - [x] v6: Neue Story "Vom Pixel zur Webseite" implementieren (deployed)
  - [x] Scroll-driven Video generieren und einbauen (Veo 3.1, GSAP scrub)
  - [x] Story-Arc komplett ueberarbeiten
  - [x] Chris-Feedback erhalten (2026-03-23 21:48)
  - [ ] Chris-Feedback zu v6 abwarten
  - [ ] v7: Agent-Team-Pipeline mit neuen Skills testen (gsap-plugins, awwwards-animations)
  - [x] Signature WOW-Moment hinzufuegen (WebGL/3D subtil) — v3 Hero Shader
  - [x] Hero-Layout ueberarbeiten — v4 Full-Screen (kein verbotenes Pattern mehr)
  - [x] Process-Sektion upgraden — v5 Pinned Scroll Showcase (mersi-style)
  - [x] CTA upgraden — v5 Word-by-Word 3D-Flip Reveal
  - [x] Footer upgraden — v5 Statement Footer mit Marquee

#### 1b. exp-signature-hero — ABGESCHLOSSEN
- **Status:** v12 deployed, Chris-Bewertung: **8/10**, PROJEKT ABGESCHLOSSEN
- **URL:** https://exp-signature-hero.vercel.app
- **Ergebnis:** Solide, aber "nicht ideal" — Chris will Story-First Ansatz

#### 2. exp-cinematic-dark (bisheriger Spitzenreiter)
- **Status:** v2 deployed, QA Score 7.5/10
- **URL:** https://exp-cinematic-dark.vercel.app
- **Entscheidung:** exp-signature-hero ist besser. Cinematic-dark als Referenz behalten.

#### 3. Naechste Prozess-Experimente (Prioritaet)
- [ ] **Agent-Team-Pipeline testen** — 5-Rollen-Team (Creative Director→Asset Creator+Animation Expert→Builder→QA)
  - Hypothese: Spezialisierte Agents + neue Skills (gsap-plugins, awwwards-animations) → konsistent 9+/10
  - Agent-Definitionen ready in .claude/agents/
  - Neue Skills: SplitText, MorphSVG, Flip, DrawSVG, Generative Art, Physics
- [ ] **Reproduzierbarkeit testen** — Bewiesenen Workflow auf NEUES Projekt anwenden (anderer Stil)
- [ ] **Parallel-Build** — 2 Builder mit verschiedenen Prompts, gleiche Reference-Daten, vergleichen
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
- **Websites deployed:** 6 (shader-forge, editorial-light, warm-brutal, cinematic-dark, signature-hero, story-editorial)
- **Bester Score (Chris):** 8/10 (exp-signature-hero v12) — Story-Editorial v6 wartet auf Bewertung
- **Chris-Feedback "WOW":** 0 (Ziel: mindestens 1) — "solide aber vergessen nachdem man sie verlassen hat"
- **Prozess-Experimente durchgefuehrt:** 8 (Ziel: mindestens 3 ✓✓)
- **Skills installiert:** 6 neue (gsap-plugins, awwwards-animations, 3d-web-experience, scroll-storyteller, svg-animations, lottie-animator)
- **Agent-Team:** 5-Rollen-Architektur designed, Agent-Definitionen ready, noch nicht getestet
- **Sessions am 2026-03-23:** 24
- **Bewaehrte Workflows:**
  - **Signature Module (Opus) + Sonnet Builder** ← BESTER Build-Workflow (8/10 in ~25 Min)
  - **impeccable:overdrive Skill-Push (Sonnet)** ← BESTER Overdrive-Workflow (+0.2-0.5, 8 Min, 82k Tokens)
  - Assets-First + Image-Manifest (Builder nutzt alle Bilder)
  - Opus direkt fuer chirurgische Overdrive-Pushes (+0.2-0.5 pro Push)
  - agent-browser fuer Desktop + Mobile QA
