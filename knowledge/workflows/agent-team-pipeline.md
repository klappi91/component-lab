# Agent-Team Pipeline — Multi-Agent Website Build

## Konzept
Statt einer monolithischen Session: 6 spezialisierte Agenten die jeweils eine Phase uebernehmen.
Kommunikation via Dateien im `specs/` Verzeichnis des Projekts.

## Architektur: Sequential Pipeline mit Iteration Loop

```
Story Architect → Asset Director → Creative Engineer → Frontend Builder → Design Critic → Polish Push
     (Opus)         (Sonnet)          (Opus)              (Sonnet)          (Sonnet)        (Opus)
                                                                               ↓               ↑
                                                                           critique.md → fixes loop
```

## Phase 1: Story Architect (Opus)
**Rolle:** Definiert Narrativ, emotionale Reise, Design-Richtung
**Skills:** premium-frontend-design, impeccable:frontend-design
**Input:** Brief (brand/info.json, services.json, structure.json), Referenz-URLs
**Output:**
- `specs/story-arc.md` — Narrativ mit Sektions-Sequenz
- `specs/design-system.md` — Farben, Fonts, Spacing, Signature Moments
- `specs/asset-list.md` — Alle benoetigten Bilder/Videos mit Prompts
- `specs/animation-spec.md` — Welche Animationen wo und warum

**Prompt-Fokus:** "Du bist ein Creative Director. Dein Job ist NICHT Code schreiben sondern eine GESCHICHTE erzaehlen die eine Webdesign-Agentur verkauft. Jede Sektion dient der Erzaehlung. Jeder Effekt hat einen Grund. Denke zuerst an das ERLEBNIS, dann an die Umsetzung."

## Phase 2: Asset Director (Sonnet/Haiku)
**Rolle:** Generiert alle visuellen Assets passend zur Story
**Skills:** gemini-image, gemini-video, image-optimize, image-remove-bg, image-icons
**Input:** `specs/asset-list.md`
**Output:**
- `public/images/*.webp` — Alle Bilder optimiert
- `public/videos/*.mp4` — Alle Videos komprimiert (CRF 28)
- `specs/image-manifest.json` — Pfade + Beschreibungen + Dimensionen

**Prompt-Fokus:** "Generiere ALLE Assets aus der Asset-Liste. Qualitaet > Quantitaet. Editorial-Fotografie-Stil, keine Stock-Photo-Aesthetik. Jedes Bild muss die Story stuetzen."

**Parallel moeglich mit:** Phase 3 (Creative Engineer), wenn Signature Module keine Assets braucht

## Phase 3: Creative Engineer (Opus)
**Rolle:** Baut das WOW-Stueck — das "How did they do that?" Element
**Skills:** gsap-scrolltrigger, creative-effects, text-animation, threejs-webgl, shadertoy, motion-framer
**Input:** `specs/story-arc.md`, `specs/animation-spec.md`, `specs/design-system.md`
**Output:**
- `src/components/signature/` — Fertiger Code fuer Signature Module(s)
- WebGL Shader, 3D Szene, Kinetische Typografie, Custom Cursor, etc.

**Prompt-Fokus:** "Baue EIN technisches Meisterwerk das Besucher staunen laesst. Kein generischer Effekt sondern etwas NEUES. Orientiere dich am Animation-Spec aber uebertriff ihn. Code muss production-ready sein (TypeScript, React, performant)."

## Phase 4: Frontend Builder (Sonnet)
**Rolle:** Assembliert alles zu einer funktionierenden Website
**Skills:** vercel-react-best-practices, gsap-react, ui-styling, locomotive-scroll, gsap-scrolltrigger
**Input:** `specs/*`, `public/*`, `src/components/signature/*`
**Output:** Komplette Website (alle Seiten, Komponenten, Styles, Responsive)

**Prompt-Fokus:** "Baue die Website EXAKT nach dem Design-Konzept in specs/. Nutze ALLE Assets aus image-manifest.json. Integriere die Signature-Module aus src/components/signature/. Next.js App Router + TypeScript + Tailwind. KEINE generischen Patterns. Jede Sektion muss dem Story-Arc folgen."

## Phase 5: Design Critic (Sonnet)
**Rolle:** Visuelles QA + Design-Bewertung
**Skills:** impeccable:critique, agent-browser
**Input:** Deployed URL
**Output:** `specs/critique.md` — Bewertung mit konkreten Issues

**Prompt-Fokus:** "Oeffne die Website in Desktop UND Mobile. Bewerte: Erster Eindruck (1-10), Story-Kohaerenz, Typografie, Spacing, Animationen, Mobile UX, Performance. Liste KONKRETE Issues mit Prioritaet (P1=must-fix, P2=should-fix, P3=nice-to-have)."

## Phase 6: Polish Push (Opus)
**Rolle:** Fixt Issues aus der Kritik, pusht Qualitaet hoch
**Skills:** impeccable:overdrive, impeccable:polish, impeccable:delight
**Input:** `specs/critique.md` + bestehender Code
**Output:** Verbesserte Website

**Prompt-Fokus:** "Lies die Kritik in specs/critique.md. Fixe alle P1 Issues. Dann: Finde 2-3 Stellen wo du den WOW-Faktor erhoehen kannst. Keine neuen Features die die Story brechen — nur POLISH und DELIGHT."

## Iteration
Phase 5+6 koennen wiederholt werden bis die Qualitaet stimmt (max 2-3 Loops).

## Implementierung

### Option A: Agent-Tool Pipeline (bevorzugt)
```
Orchestrator (ich) → Agent(Phase 1, Opus) → Agent(Phase 2, Sonnet) → Agent(Phase 3, Opus) → Agent(Phase 4, Sonnet) → Agent(Phase 5, Sonnet) → Agent(Phase 6, Opus)
```
- Vorteile: Zuverlaessig, auto-cleanup, Ergebnis kommt zurueck
- Nachteile: Sequentiell, jeder Agent muss Code/Assets lesen

### Option B: tmux Pipeline (fuer Parallelitaet)
```
Orchestrator → tmux: Story Architect → (tmux: Asset Director || tmux: Creative Engineer) → tmux: Builder → tmux: Critic → tmux: Polish
```
- Vorteile: Phase 2+3 parallel moeglich
- Nachteile: tmux Management, manuelles Cleanup noetig

### Option C: Hybrid
- Phase 1 (Story): Orchestrator selbst (Opus) — braucht vollen Kontext
- Phase 2+3: Parallel via Agent-Tool
- Phase 4: Agent-Tool (Sonnet)
- Phase 5+6: Orchestrator selbst — braucht Urteilsvermoegen

## Geschaetzte Resourcen
- Phase 1: ~50k Tokens, ~5 Min
- Phase 2: ~30k Tokens, ~5 Min (+ Generierungskosten ~$2-3)
- Phase 3: ~80k Tokens, ~10 Min
- Phase 4: ~100k Tokens, ~15 Min
- Phase 5: ~40k Tokens, ~5 Min
- Phase 6: ~80k Tokens, ~10 Min
- **Gesamt: ~380k Tokens, ~50 Min, ~$3-5 Assets**

## Status: ENTWURF — noch nicht getestet
Erstellt: 2026-03-23, Session run-20260323-2220
Basierend auf: Chris-Feedback ("Agent-Team mit bestimmten Aufgaben und Skills")
