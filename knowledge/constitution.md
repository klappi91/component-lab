# Component Lab — Constitution v12

Kuratiertes Wissen. Wird bei JEDEM Run gelesen — klein und wertvoll halten.
Identitaet, Ziele, Heartbeat leben jetzt in eigenen Workspace-Dateien (SOUL.md, GOALS.md, HEARTBEAT.md).

## Autonomer Loop (OpenClaw-inspiriert)

Ich arbeite wie ein autonomer Agent:
1. **HEARTBEAT.md ausfuehren** — Feedback? Ziele? Experimente? → Entscheiden
2. **Handeln** — Was der Heartbeat ergeben hat
3. **Abschliessen** — Daily Note, GOALS.md, Constitution, Git
4. **Session beenden** — Cron startet mich automatisch neu

Kein externer Auftrag noetig. Ich entscheide selbst.

## Chris-Feedback (destilliert)
- **"Weit weg von WOW"** — solide Handwerksarbeit reicht nicht
- **"Mutiger werden"** — groessere Typografie, dramatischere Animationen
- **"Leere Flaechen vermeiden"** — Cards mit nur Text + Zahl = "hier fehlt was"
- **Delegieren** — Builder-Agents, Designer-Agents, Sub-Agents nutzen
- **Prozess experimentieren** — nicht nur Produkt. WIE baut man am besten?
- **Autonom sein** — selbst entscheiden, experimentieren, lernen
- **Flexibel sein** — kein starres "jeder Run anderer Ansatz", Multi-Session-Builds OK

## OpenAI Frontend Design Rules
Siehe: knowledge/skills/openai-frontend-design-rules.md
Kernregeln: Design-System zuerst, erster Viewport = Einheit, expressive Fonts, full-bleed Imagery, Hero = Brand + Headline + CTA + dominantes Bild, KEINE leeren Cards, jede Sektion = ein Zweck, 2-3 intentionale Animationen, echter Content.

## BESTER Workflow (Stand 2026-03-23, aktualisiert nach Experiment #4)

**Signature Module (Opus) + Assets-First + Sonnet Builder — Score: 8/10:**
1. Projekt mit web-lab setup.sh aufsetzen
2. gemini-image Batch: 6-8 Bilder generieren ($0.50-0.60, ~60 Sek)
3. Image-Manifest schreiben (specs/image-manifest.json)
4. **Opus baut kreativstes Modul** (z.B. WebGL Shader Hero)
5. Detailliertes Design-Konzept mit Sektions-Specs
6. **Sonnet Builder via Agent-Tool** (NICHT tmux!) (~7 Min)
7. QA via agent-browser
8. Deploy via Vercel

**Warum das funktioniert:**
- Opus fuer den WOW-Faktor, Sonnet fuer den Rest
- Assets FIRST + Manifest = Builder nutzt sie alle
- Agent-Tool statt tmux = zuverlaessiger
- Gesamtzeit: ~25 Min fuer eine 8/10 Website

Vorheriger Workflow (Assets-First + OpenAI Rules, OHNE Opus-Modul): 7/10

## Was funktioniert (technisch)
- **Full-bleed Hero mit generiertem Bild** — der groesste visuelle Impact
- gemini-image Batch fuer Projekt-Mockups UND Service-Visuals
- Alternating asymmetric Layouts fuer Services
- WebGL Shader als Signature Moment
- CSS sticky Stacking Cards
- toggleActions > scrub fuer Content-Reveals
- Lenis + GSAP Integration
- agent-browser fuer visuelles QA
- Bebas Neue (bold display), Space Grotesk (clean body)
- Unbounded (distinctive), Instrument Serif (elegant)
- impeccable:critique → overdrive Pipeline
- Clip-path Wipe-Reveals fuer Portfolio-Projekte
- Grain-Overlay (SVG feTurbulence)

## Was NICHT funktioniert
- Websites ohne echte Assets = langweilig
- Leere Karten/Flaechen mit nur Text
- AI-Template Tells (corner marks, mono labels, cheesy copy)
- scrub-Animationen fuer Reveals (opacity-0-Bug)
- Konzept ueberspringen → generisch
- **CSS @import fuer Fontshare in Next.js** — IMMER `<link>` Tags im layout.tsx `<head>` verwenden!
- **Builder kennt parallel generierte Assets nicht** — Assets muessen VOR dem Builder fertig sein + Manifest
- **tmux-Sessions IMMER beenden** — Nach Build: `tmux kill-session -t name`. Vor Session-Ende: `tmux ls` pruefen
- **Designer-Konzept allein reicht nicht** — Designer liefert kreativere Ideen, aber Builder ignoriert Assets ohne Manifest

## Prozess-Experimente

### #1: Designer → Builder Pipeline (2026-03-23, exp-warm-brutal)
- **Score: 5/10** — Kreatives Konzept, aber Asset-Integration gescheitert
- Designer-Agent liefert exzellentes Konzept (7 Akte, Asset-Prompts)
- Builder nutzte generierte Bilder nicht (parallel generiert, kein Manifest)
- Learning: Assets ZUERST + Manifest

### #2: OpenAI Rules → Builder (2026-03-23, exp-cinematic-dark) ← GEWINNER
- **Score: 7/10** — Full-bleed Hero, alle Bilder integriert, kohaerent
- Assets-First + Manifest = perfekte Integration (7/7 Bilder)
- Sonnet statt Opus: schneller, guenstiger, gleiche Qualitaet
- Learning: Rules > Designer fuer zuverlaessigen Output

### #3: Overdrive via Delegated Builder (2026-03-23, exp-cinematic-dark v2)
- **Score: 7→7.5/10** — Alle 6 Aufgaben umgesetzt, aber nur +0.5
- Dateibasierte Spec (overdrive-push.md) funktioniert als Builder-Input
- Sonnet setzt exakt um was in der Spec steht, aber denkt nicht darueber hinaus
- Groesster Impact: Methode-Sektion radikal umgebaut (Template→Editorial)
- Fuer echtes WOW braucht es ein technisches Signature Piece (WebGL/3D)
- Learning: **Delegierter Overdrive = chirurgische Verbesserungen, nicht Game-Changer**

### #4: Signature Module (Opus) + Builder (Sonnet) (2026-03-23, exp-signature-hero) ← BESTES ERGEBNIS
- **Score: 8/10** — Neuer Spitzenreiter
- Opus baut WebGL Shader Hero selbst (noise displacement, mouse ripple, chromatic aberration)
- Sonnet Builder baut den Rest (Layout, Sektionen, Responsive)
- Alle 8 Assets integriert, Editorial Layouts, GSAP Animationen
- Agent-Tool statt tmux (zuverlaessiger!)
- Learning: **Opus fuer Kreativ-Module + Sonnet fuer systematische Arbeit = BESTER Workflow**
- Learning: **Agent-Tool > tmux** — tmux war stuck, Agent-Tool funktioniert sofort

### #5: Opus Overdrive Push (2026-03-23, exp-signature-hero v2)
- **Score: 8→8.5/10** — Gezielte chirurgische Verbesserungen
- Opus macht Overdrive direkt (kein Builder delegiert)
- 4 gezielte Fixes: Mobile Nav, Portfolio Redesign, Methode Nummern, Footer
- Groesster Impact: Mobile Nav (+2), Portfolio (+1)
- Token-effizient (~15 Min, kein Builder-Overhead)
- Learning: **Opus-Overdrive > Delegierter Overdrive** — Opus versteht Design-Intent besser

### Noch nicht getestet
- Designer + Rules + Assets-First (Kombination)
- Parallel-Build (2 Builder, verschiedene Prompts)
- Weiterer Push auf 9/10 (Custom Cursor, mehr Portfolio)

## Was fehlt fuer WOW (8.5/10 → 9/10)
- ~~WebGL/Shader Signature Moment~~ — ERLEDIGT
- ~~Mobile Nav~~ — ERLEDIGT (Full-Screen Menu mit nummerierten Links)
- ~~Portfolio redesignen~~ — ERLEDIGT (Editorial Info-Bar statt Overlay)
- ~~Overdrive Push~~ — ERLEDIGT (8→8.5)
- **Mehr Portfolio-Content** — Nur 2 Items, braucht mindestens 4
- **Custom Cursor** — Magnetic, Context-aware (Opus-Modul)
- **Scroll-Transitions** — Page-level Transitions zwischen Sektionen
- **impeccable:overdrive** — Noch nicht mit dem Skill gepusht, nur manuell

## BESTER Workflow (Stand 2026-03-23, aktualisiert)

**Signature Module (Opus) + Assets-First + Sonnet Builder:**
1. Projekt mit web-lab setup.sh aufsetzen
2. gemini-image Batch: 6-8 Bilder generieren ($0.50-0.60, ~60 Sek)
3. Image-Manifest schreiben (specs/image-manifest.json)
4. **Opus baut Signature Module** (WebGL Shader, Custom Cursor, etc.)
5. Detailliertes Design-Konzept mit Sektions-Specs
6. **Sonnet Builder via Agent-Tool** (NICHT tmux!) (~7 Min)
7. QA via agent-browser
8. Deploy via Vercel

**Warum das funktioniert:**
- Opus = kreativster Teil (WOW-Faktor)
- Sonnet = systematischer Rest (zuverlaessig, schnell, guenstig)
- Agent-Tool = zuverlaessiger als tmux (kein stuck, auto-cleanup)
- Assets FIRST + Manifest = Builder nutzt sie alle
- Gesamtzeit: ~25 Min fuer 8/10 Website

## Verfuegbare Agents & Tools
- **Agent-Tool** — Bevorzugt fuer Builder (zuverlaessiger als tmux)
- **tmux** — Nur fuer langlaeufer die parallel laufen muessen
- **designer.md** — .claude/agents/designer.md (Creative Director)
- **web-lab setup.sh** — Projekt-Setup Script
- **find-skills** — Skill-Discovery
- **agent-browser** — Visuelles QA
- **gemini-image / gemini-video** — Asset-Generierung (Batch!)
- **run-codex** — OpenAI Codex als zweite Meinung
- **Brave Search / Firecrawl** — Web-Recherche
