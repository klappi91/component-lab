# Agent-Team Architecture for Award-Winning Web Development

Research-based specification. Designed for PixIntCreators and Component Lab projects.

## Research Summary

### Industry Patterns (2025-2026)
- **CrewAI model:** Role-based agents with goal + backstory, sequential or parallel processes
- **Claude Code Agent Teams (Feb 2026):** Native feature — lead + teammates, shared task list, JSON mailbox, file-based coordination. Already enabled in this environment (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`)
- **Common architecture:** Orchestrator/Lead coordinates specialists. Each specialist has own context window, file ownership, skill set
- **Key insight from web research:** "Clear task scoping, domain separation, quality criteria — best practices from managing real engineering teams apply to agent teams too"

### What Already Works Here (Component Lab Experiments)
- Experiment #1: Designer -> Builder pipeline (5/10) — concept quality excellent, asset integration failed
- Experiment #4: Signature Module (Opus) + Sonnet Builder (8/10) — BEST single-agent result
- Experiment #8: impeccable:overdrive Skill-Push (9.5/10) — Sonnet + Skill matches Opus quality at half cost
- Key learning: Assets FIRST + Manifest. Agent-Tool > tmux. Opus for creative, Sonnet for systematic work

### What's Missing from Current Workflow
- No dedicated animation specialist (GSAP/Framer Motion decisions are ad-hoc)
- No asset creation phase with creative direction (gemini-image/video prompts are generic)
- No structured QA pass (agent-browser used reactively, not as systematic review)
- No creative brief phase (story/mood decided during building, not before)
- Single agent context window overloads on full-site builds

---

## The Team: 5 Roles

### Implementation Strategy: Two Options

**Option A: Claude Code Agent Teams (RECOMMENDED)**
- Use native Agent Teams feature (already enabled)
- Lead orchestrator spawns teammates with explicit role prompts
- Shared task list with dependency tracking
- Teammates can message each other directly via mailbox
- tmux display mode shows all agents working in parallel
- Teammates auto-load CLAUDE.md, MCP servers, and skills

**Option B: Manual Orchestration (Fallback)**
- Orchestrator runs in main session
- Each role spawned via Agent tool (subagent) sequentially
- Output files on disk serve as handoff artifacts
- More control, less parallelism

**Recommendation:** Use Option A for the full build pipeline. Use Option B when you need surgical single-role work (e.g., just an overdrive push).

---

## Role 1: Creative Director

**Purpose:** Decides the story, mood, visual identity, and design system BEFORE any code is written.

**Model:** Opus 4.6 (creativity-critical role)

**Skills to load:**
- impeccable:critique (evaluates design quality)
- impeccable:bolder (pushes beyond safe choices)
- premium-frontend-design (global skill)
- web-design-guidelines (global skill)

**Agent definition file:** `.claude/agents/creative-director.md`

**Prompt focus:**
```
Du bist der Creative Director. Du entscheidest Story, Stimmung, und visuelles System.

DEIN OUTPUT ist ein Creative Brief (specs/creative-brief.md) mit:

1. STORY — Was ist die Erzaehlung? Welche Emotion beim Besucher? Was ist der rote Faden?
   (Denk an: "Vom Pixel zur Website", "Wir bauen die Zukunft", etc.)

2. MOODBOARD — 3-5 Referenz-Websites mit KONKRETEN Elementen die uebernommen werden
   (Nicht "inspiriert von" sondern "Scroll-Verhalten wie bei X, Typografie wie bei Y")

3. DESIGN-SYSTEM — Farbpalette (Hex), Typografie (konkrete Fonts), Spacing, Shapes
   (KEINE Inter/Roboto. KEINE Standard-Paletten. MUTIG sein.)

4. SEKTIONS-ARCHITEKTUR — Fuer JEDE Sektion:
   - Name + Zweck (eine Zeile)
   - Signature Moment (was loest "How did they do that?" aus)
   - Konkreter Content (kein Lorem Ipsum, echter Text)
   - Layout-Beschreibung (was steht wo)

5. ASSET-LISTE — Jedes Asset mit:
   - Dateiname (z.B. hero-bg.webp)
   - gemini-image oder gemini-video Prompt (ausfuehrlich, 2-3 Saetze)
   - Abmessungen und Stil-Vorgabe

6. ANIMATION-KONZEPT — Max 5 bewusste Animationen:
   - Welche Technik (GSAP scrub, Framer Motion, CSS, WebGL)
   - Welchen Zweck sie erfuellen (nicht Effekte der Effekte wegen)
   - Durchgehender Fluss: mindestens 1 Element das sich die ganze Zeit mitbewegt

REGELN:
- Du schreibst KEINEN Code
- Du sagst nicht "koennte man" — du ENTSCHEIDEST
- Alles muss konkret und umsetzbar sein
- STORY FIRST — erst Geschichte, dann Design, dann Code
- DURCHDACHT > EFFEKTE — jeder Effekt dient der Erzaehlung
- Mindestens 1 "How did they do that?" Moment
```

**Output artifact:** `specs/creative-brief.md`
**Depends on:** Nothing (first in pipeline)
**Estimated time:** 3-5 minutes
**Estimated tokens:** ~30k

---

## Role 2: Asset Creator

**Purpose:** Generates all visual assets (images, videos) based on the Creative Brief.

**Model:** Sonnet (systematic execution, lower cost)

**Skills to load:**
- gemini-image (image generation via Gemini)
- gemini-video (video generation via Veo 3.1)
- image-optimize (compression, format conversion)

**Agent definition file:** `.claude/agents/asset-creator.md`

**Prompt focus:**
```
Du bist der Asset Creator. Du generierst ALLE visuellen Assets basierend auf dem Creative Brief.

DEIN INPUT: specs/creative-brief.md (Abschnitt 5: Asset-Liste)

DEIN WORKFLOW:
1. Lies den Creative Brief — verstehe Story, Stimmung, Farbpalette
2. Generiere ALLE Bilder per gemini-image Batch (6-10 Bilder, ~60 Sek)
3. Generiere Videos per gemini-video wenn im Brief spezifiziert
4. Optimiere alle Assets (WebP, komprimiert, passende Groessen)
5. Schreibe specs/image-manifest.json mit JEDEM Asset:
   {
     "filename": "hero-bg.webp",
     "path": "public/images/hero-bg.webp",
     "description": "Dunkle abstrakte Komposition mit orange Akzenten",
     "dimensions": "1920x1080",
     "usage": "Hero Section Background, full-bleed"
   }

REGELN:
- ALLE Assets aus dem Brief muessen generiert werden — keine auslassen
- Prompts an die Story/Stimmung des Briefs anpassen
- Manifest MUSS vollstaendig sein — der Builder kennt nur was im Manifest steht
- Videos: ffmpeg CRF 28 + faststart komprimieren (spart ~65%)
- Bilder: WebP Format, max 500KB pro Bild
- Asset-Naming: kebab-case, beschreibend (hero-bg, service-webdev, team-portrait)
```

**Output artifacts:**
- `public/images/*.webp` (all generated images)
- `public/videos/*.mp4` (if applicable)
- `specs/image-manifest.json` (CRITICAL — the bridge to the builder)

**Depends on:** Creative Director (needs creative-brief.md)
**Can run parallel with:** Animation Expert (both read the brief, don't conflict)
**Estimated time:** 3-5 minutes (image batch) + 2-3 minutes (video, optional)
**Estimated cost:** ~$0.50-1.20 for assets

---

## Role 3: Animation Expert

**Purpose:** Designs the animation architecture and builds signature interactive modules.

**Model:** Opus 4.6 (creative/technical role — needs to invent, not just implement)

**Skills to load:**
- gsap-scrolltrigger (GSAP + ScrollTrigger patterns)
- motion-framer (Framer Motion patterns)
- locomotive-scroll (Lenis smooth scroll)
- impeccable:animate (animation best practices)
- impeccable:delight (micro-interactions)

**Agent definition file:** `.claude/agents/animation-expert.md`

**Prompt focus:**
```
Du bist der Animation Expert. Du entwirfst die Animations-Architektur und baust Signature Modules.

DEIN INPUT: specs/creative-brief.md (Abschnitt 6: Animation-Konzept)

DEIN OUTPUT:
1. specs/animation-spec.md — Technische Animations-Spezifikation:
   - Fuer JEDE Animation: Technik, Trigger, Dauer, Easing, Code-Snippet
   - Scroll-Flow-Diagramm: Was passiert bei welcher Scroll-Position?
   - Durchgehender Fluss: Welches Element verbindet die Sektionen?
   - Performance-Budget: Max 3 GSAP ScrollTrigger instances gleichzeitig

2. src/components/SignatureModule.tsx — DAS kreative Herzstück:
   - WebGL Shader, Scroll-driven Video, Partikel-System, oder Canvas-Animation
   - Der "How did they do that?" Moment
   - Muss als eigenstaendige React-Komponente funktionieren
   - Muss in Next.js 16 App Router mit 'use client' laufen

REGELN:
- KEIN ganzes Layout bauen — nur die Animation-Infrastruktur + Signature Module
- Lenis ist Standard fuer Smooth Scroll (nicht native)
- GSAP ScrollTrigger: toggleActions > scrub fuer Content-Reveals
- scrub NUR fuer Scroll-driven Effekte (Video, Parallax, Progress)
- Performance: requestAnimationFrame, will-change sparsam, GPU-Layers bewusst
- ERFINDERISCH sein — "Sei mutig und erfinde neue Dinge"
- Durchgehender Fluss = DAS was Awwwards-Sites ausmacht
```

**Output artifacts:**
- `specs/animation-spec.md`
- `src/components/SignatureModule.tsx` (+ related files)

**Depends on:** Creative Director (needs creative-brief.md)
**Can run parallel with:** Asset Creator (different output files, no conflict)
**Estimated time:** 5-8 minutes
**Estimated tokens:** ~80k (Opus, creative work)

---

## Role 4: Frontend Builder

**Purpose:** Implements the complete website from brief, assets, and animation spec.

**Model:** Sonnet (systematic implementation, fast, cost-effective)

**Skills to load:**
- impeccable:frontend-design (design system implementation)
- impeccable:normalize (code consistency)
- gsap-scrolltrigger (animation integration)
- modern-web-design (layout patterns)
- vercel-react-best-practices (Next.js patterns)

**Agent definition file:** `.claude/agents/frontend-builder.md`

**Prompt focus:**
```
Du bist der Frontend Builder. Du implementierst die komplette Website.

DEINE INPUTS (ALLE lesen vor dem Start):
1. specs/creative-brief.md — Story, Design-System, Sektions-Architektur
2. specs/image-manifest.json — Alle verfuegbaren Assets mit Pfaden
3. specs/animation-spec.md — Animations-Architektur und Scroll-Flow
4. src/components/SignatureModule.tsx — Fertige Signature-Komponente (einbinden!)

DEIN OUTPUT: Komplette, lauffaehige Website

WORKFLOW:
1. Layout-Grundstruktur (layout.tsx mit Fonts, Metadata, Lenis)
2. Design-System in globals.css (CSS Variables aus dem Brief)
3. Sektionen bauen — EXAKT nach Brief-Architektur
4. SignatureModule.tsx einbinden (NICHT neu bauen!)
5. ALLE Assets aus image-manifest.json einbinden (KEINS auslassen!)
6. Animationen nach animation-spec.md implementieren
7. Responsive (Mobile-First, Breakpoints bei 768px und 1024px)
8. Build pruefen: npm run build (0 Fehler, 0 Warnungen)

REGELN:
- KEIN Asset erfinden — nur was im Manifest steht verwenden
- KEIN Design-System aendern — Brief-Vorgaben 1:1 umsetzen
- SignatureModule NICHT modifizieren — nur importieren und platzieren
- Erster Viewport = Einheit (nicht fragmentiert)
- KEINE leeren Cards, KEINE Platzhalter
- overflow-x: hidden auf body (PFLICHT fuer Mobile)
- Fontshare: IMMER <link> Tags, NIEMALS CSS @import
- 'use client' nur wo noetig (Interaktion, Animation, State)
```

**Output artifacts:** Complete website in `src/`
**Depends on:** ALL three previous roles (brief, assets, animation spec)
**Estimated time:** 7-12 minutes
**Estimated tokens:** ~100k

---

## Role 5: QA Reviewer

**Purpose:** Tests the built website visually and provides scored critique with fix instructions.

**Model:** Sonnet (systematic evaluation, impeccable:critique is the brain)

**Skills to load:**
- agent-browser (visual testing via Playwright)
- impeccable:critique (design quality evaluation)
- impeccable:overdrive (improvement suggestions)

**Agent definition file:** `.claude/agents/qa-reviewer.md`

**Prompt focus:**
```
Du bist der QA Reviewer. Du testest und bewertest die fertige Website.

DEIN WORKFLOW:
1. agent-browser: Oeffne die Website (localhost oder Vercel URL)
2. Screenshots: Desktop (1440px) + Mobile (390px) fuer JEDE Sektion
3. impeccable:critique: Evaluiere Design-Qualitaet
4. Vergleich mit Creative Brief (specs/creative-brief.md):
   - Wurden alle Sektionen umgesetzt?
   - Sind alle Assets sichtbar?
   - Stimmt das Design-System (Farben, Fonts)?
   - Funktioniert die Scroll-Story?
   - Ist der "How did they do that?" Moment vorhanden?

DEIN OUTPUT: specs/qa-report.md
- Score pro Sektion (1-10) mit Begruendung
- Gesamt-Score (WICHTIG: Immer mindestens 1.5 Punkte konservativer als du denkst!)
- Screenshot-Referenzen
- Top-3 Fixes (konkret, mit Datei + Zeile + was aendern)
- Top-3 Overdrive-Opportunities (was wuerde den groessten Score-Sprung bringen)

SCORING-KRITERIEN:
- Visuell (35%): Aesthetik, WOW-Faktor, Einheitlichkeit
- Performance (25%): Ladezeit, Scroll-Smoothness, keine Jank
- Interaktion (20%): Hover, Scroll, Touch — fuehlt es sich gut an?
- Code-Qualitaet (20%): Lesbar, wartbar, keine Hacks

REGELN:
- KEIN Code aendern — nur bewerten und Fixes beschreiben
- Immer BEIDE Viewports testen (Desktop + Mobile)
- Self-Eval Bias: Du bist IMMER zu optimistisch. Zieh 1.5 Punkte ab.
- Vergleich mit Referenz (mersi-architecture.com): Scroll-Flow, Zoom-Effekte, Struktur
```

**Output artifact:** `specs/qa-report.md`
**Depends on:** Frontend Builder (needs built website)
**Estimated time:** 3-5 minutes
**Estimated tokens:** ~40k

---

## Pipeline: End-to-End Flow

```
                    +-----------------------+
                    |    ORCHESTRATOR       |
                    |    (Team Lead)        |
                    +-----------+-----------+
                                |
                    Phase 1: STORY
                                |
                    +-----------v-----------+
                    |  CREATIVE DIRECTOR    |
                    |  (Opus, ~4 min)       |
                    |  → creative-brief.md  |
                    +-----------+-----------+
                                |
                    Phase 2: PREPARE (parallel)
                                |
               +----------------+----------------+
               |                                 |
    +----------v----------+         +-----------v-----------+
    |   ASSET CREATOR     |         |  ANIMATION EXPERT     |
    |   (Sonnet, ~4 min)  |         |  (Opus, ~7 min)       |
    |   → images + manifest|         |  → animation-spec.md  |
    |                      |         |  → SignatureModule.tsx |
    +----------+----------+         +-----------+-----------+
               |                                 |
               +----------------+----------------+
                                |
                    Phase 3: BUILD
                                |
                    +-----------v-----------+
                    |   FRONTEND BUILDER    |
                    |   (Sonnet, ~10 min)   |
                    |   → complete website  |
                    +-----------+-----------+
                                |
                    Phase 4: REVIEW
                                |
                    +-----------v-----------+
                    |    QA REVIEWER        |
                    |    (Sonnet, ~4 min)   |
                    |    → qa-report.md     |
                    +-----------+-----------+
                                |
                    Phase 5: OVERDRIVE (optional, iterative)
                                |
                    +-----------v-----------+
                    |   BUILDER + OVERDRIVE |
                    |   (Sonnet + impeccable|
                    |    :overdrive skill)  |
                    +-----------+-----------+
                                |
                        Back to Phase 4
                        (iterate until score >= 9)
```

### Timeline

| Phase | Duration | Cost (approx) |
|-------|----------|---------------|
| Phase 1: Story | ~4 min | ~$0.30 (Opus) |
| Phase 2: Prepare | ~7 min (parallel) | ~$0.80 (Opus) + ~$0.60 (assets) |
| Phase 3: Build | ~10 min | ~$0.40 (Sonnet) |
| Phase 4: Review | ~4 min | ~$0.20 (Sonnet) |
| Phase 5: Overdrive | ~8 min/push | ~$0.30/push (Sonnet) |
| **TOTAL (no overdrive)** | **~25 min** | **~$2.30** |
| **TOTAL (2x overdrive)** | **~45 min** | **~$2.90** |

---

## Implementation: Claude Code Agent Teams Prompt

Copy-paste this into Claude Code to launch the full team:

```
Build an award-winning website for PixIntCreators using an agent team.

Project: /home/chris/projects/pixintcreators
Read CLAUDE.md first for design system and context.

## Team Structure

Create a team with these roles. Execute in phases:

### Phase 1 — Creative Director (FIRST, blocks everything)
Teammate: creative-director
Task: Read .claude/agents/creative-director.md for full instructions. Create specs/creative-brief.md with story, moodboard, design system, section architecture, asset list, and animation concept. Focus on the "Vom Pixel zur Website" narrative. Dark mode (schwarz + orange). Awwwards quality.

### Phase 2 — Asset Creator + Animation Expert (PARALLEL, after Phase 1)
Teammate: asset-creator
Task: Read .claude/agents/asset-creator.md. Generate ALL assets from specs/creative-brief.md section 5. Use gemini-image batch. Write specs/image-manifest.json. Optimize all images to WebP.

Teammate: animation-expert
Task: Read .claude/agents/animation-expert.md. Design animation architecture from specs/creative-brief.md section 6. Build the Signature Module (WebGL/Canvas/Scroll-driven). Write specs/animation-spec.md.

### Phase 3 — Frontend Builder (after Phase 2 complete)
Teammate: frontend-builder
Task: Read .claude/agents/frontend-builder.md. Build complete website using specs/creative-brief.md + specs/image-manifest.json + specs/animation-spec.md + src/components/SignatureModule.tsx. Integrate ALL assets. npm run build must pass.

### Phase 4 — QA Reviewer (after Phase 3)
Teammate: qa-reviewer
Task: Read .claude/agents/qa-reviewer.md. Test with agent-browser (desktop 1440px + mobile 390px). Run impeccable:critique. Score each section. Write specs/qa-report.md with top-3 fixes and top-3 overdrive opportunities.

Dependencies: Phase 1 → Phase 2 → Phase 3 → Phase 4
```

---

## Implementation: Manual Orchestration (Option B)

For when you want more control or Agent Teams has issues:

```python
# Pseudocode — Orchestrator runs this sequentially

# Phase 1: Creative Director (Agent tool, Opus)
agent_tool(
    model="opus",
    prompt=read_file(".claude/agents/creative-director.md"),
    skills=["impeccable:critique", "impeccable:bolder"]
)
# Wait, verify specs/creative-brief.md exists

# Phase 2a: Asset Creator (Agent tool, Sonnet)
agent_tool(
    model="sonnet",
    prompt=read_file(".claude/agents/asset-creator.md"),
    skills=["gemini-image", "gemini-video", "image-optimize"]
)

# Phase 2b: Animation Expert (tmux, Opus — runs parallel with 2a)
tmux_session(
    name="animation-expert",
    prompt=read_file(".claude/agents/animation-expert.md"),
    skills=["gsap-scrolltrigger", "motion-framer"]
)

# Wait for both 2a and 2b to complete

# Phase 3: Frontend Builder (Agent tool, Sonnet)
agent_tool(
    model="sonnet",
    prompt=read_file(".claude/agents/frontend-builder.md"),
    skills=["impeccable:frontend-design", "gsap-scrolltrigger"]
)

# Phase 4: QA Reviewer (Agent tool, Sonnet)
agent_tool(
    model="sonnet",
    prompt=read_file(".claude/agents/qa-reviewer.md"),
    skills=["agent-browser", "impeccable:critique"]
)
```

---

## Handoff Artifacts (the contract between roles)

Each role produces specific files that the next role consumes. This is the critical coordination layer:

| File | Producer | Consumer | Format |
|------|----------|----------|--------|
| `specs/creative-brief.md` | Creative Director | ALL others | Markdown with 6 sections |
| `specs/image-manifest.json` | Asset Creator | Frontend Builder | JSON array of asset objects |
| `public/images/*.webp` | Asset Creator | Frontend Builder | Optimized images |
| `public/videos/*.mp4` | Asset Creator | Frontend Builder | Compressed videos |
| `specs/animation-spec.md` | Animation Expert | Frontend Builder | Markdown with code snippets |
| `src/components/SignatureModule.tsx` | Animation Expert | Frontend Builder | React component |
| `src/**/*` | Frontend Builder | QA Reviewer | Complete website code |
| `specs/qa-report.md` | QA Reviewer | Orchestrator/Builder | Scored report with fixes |

**Critical rule:** The Builder ONLY uses assets from image-manifest.json. No manifest entry = asset doesn't exist for the builder. This was the #1 failure point in Experiment #1.

---

## Agent Definition Files to Create

These files go in `.claude/agents/` and are loaded by each teammate:

1. `.claude/agents/creative-director.md` — Expand existing designer.md with story-first approach
2. `.claude/agents/asset-creator.md` — New: gemini-image/video batch workflow
3. `.claude/agents/animation-expert.md` — New: GSAP/WebGL signature module builder
4. `.claude/agents/frontend-builder.md` — New: systematic builder with manifest-first approach
5. `.claude/agents/qa-reviewer.md` — New: agent-browser + impeccable:critique evaluator

The existing `.claude/agents/designer.md` can be kept as a simpler alternative for quick builds.

---

## When to Use What

| Scenario | Approach |
|----------|----------|
| Full new website build | Full 5-role Agent Team (Option A) |
| Quick component build | Single agent + impeccable:overdrive |
| Overdrive push on existing site | QA Reviewer → Builder (2-role subset) |
| Asset refresh | Asset Creator only |
| Design exploration | Creative Director only |
| A/B variant testing | 2x Frontend Builder in parallel with different briefs |

---

## Cost Comparison

| Approach | Time | Cost | Expected Score |
|----------|------|------|---------------|
| Current: Signature Module + Sonnet Builder | ~25 min | ~$1.50 | 8/10 |
| Agent Team (no overdrive) | ~25 min | ~$2.30 | 8.5-9/10 |
| Agent Team (2x overdrive) | ~45 min | ~$2.90 | 9-9.5/10 |
| Agent Team (full pipeline + 3x overdrive) | ~60 min | ~$3.50 | 9.5+/10 |

The team approach costs ~$1 more per build but should consistently produce higher scores because:
- Story is decided BEFORE building (not during)
- Assets are ALL generated and manifested (no missing images)
- Animations are architectured (not ad-hoc)
- QA catches issues systematically (not by chance)

---

## Open Questions / Next Steps

1. **Test the pipeline once** — Build one PixIntCreators section with full team, measure actual time/cost/score
2. **Agent Teams stability** — Feature is experimental; have Option B ready as fallback
3. **Opus budget** — Creative Director + Animation Expert both use Opus. Monitor if Sonnet could work for Animation Expert
4. **Parallel builds** — Could Phase 2 include 2 parallel builders for A/B variants?
5. **Memory between runs** — How do agents learn from previous builds? Promote QA findings to constitution.md
