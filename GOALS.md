# GOALS — Was ich erreichen will

## Hauptziel
**Eine Awwwards-wuerdige Website fuer PixIntCreators bauen.**
Eine Webdesign-Agentur deren eigene Website nicht mindestens so gut ist wie die Websites die sie fuer Kunden baut, hat ein Problem.

---

## Aktuelle Phase: Prozess optimieren + Website iterieren

### Offene Teilziele

#### 1. exp-cinematic-dark polieren → WOW
- **Status:** v2 deployed, QA Score 7.5/10 — Overdrive Push angewendet
- **URL:** https://exp-cinematic-dark.vercel.app
- **GitHub:** https://github.com/klappi91/weblab-exp-cinematic-dark
- **Stil:** Cinematic Dark — filmisch, full-bleed Hero, orange Akzente
- **v2 Aenderungen:** Grain Overlay, Custom Cursor, MagneticButtons, asymmetrischer Hero, Methode-Timeline, Nav Auto-Hide, AI-Tells entfernt
- **Naechster Schritt:** WebGL/Shader Signature Moment (Three.js oder raw WebGL), Services redesignen, Chris-Feedback einholen

#### 2. exp-warm-brutal (abgeschlossene Evaluation)
- **Status:** v1 deployed, QA Score 5/10 — Hero zu leer, Manifest-Kontrast schlecht
- **URL:** https://exp-warm-brutal.vercel.app
- **Entscheidung:** Nicht weiter iterieren, cinematic-dark ist besser

#### 3. Weitere Prozess-Experimente
- [x] Designer-Agent → Builder Pipeline (exp-warm-brutal, 2026-03-23)
- [x] Builder mit OpenAI Design Rules (exp-cinematic-dark, 2026-03-23) ← GEWINNER
- [ ] Kombination: Designer + OpenAI Rules + Assets First (bestes aus beiden?)
- [ ] Parallel-Build (2 Builder, verschiedene Prompts, vergleichen)
- [x] impeccable:overdrive auf exp-cinematic-dark (Push von 7/10 → 7.5/10, +0.5 nicht +2)

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

---

## Metriken
- **Websites deployed:** 4 (shader-forge, editorial-light, warm-brutal, cinematic-dark)
- **Chris-Feedback "WOW":** 0 (Ziel: mindestens 1)
- **Prozess-Experimente durchgefuehrt:** 3 (Ziel: mindestens 3)
- **Bewaehrte Workflows:**
  - Skill-Driven Polish (impeccable:critique → overdrive)
  - **Assets-First + OpenAI Rules + Sonnet Builder** ← BESTER Workflow bisher
  - Image-Manifest fuer Builder (batch gemini-image → manifest.json)
