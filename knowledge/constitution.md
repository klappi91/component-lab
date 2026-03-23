# Component Lab — Constitution v11

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

## BESTER Workflow (Stand 2026-03-23)

**Assets-First + OpenAI Rules + Sonnet Builder:**
1. Projekt mit web-lab setup.sh aufsetzen
2. gemini-image Batch: 6-8 Bilder generieren ($0.50, 50 Sek)
3. Image-Manifest schreiben (specs/image-manifest.json)
4. Minimales Design-Konzept mit OpenAI Rules eingebettet
5. Sonnet Builder via tmux starten (~8 Min)
6. QA via agent-browser
7. Deploy via Vercel

**Warum das funktioniert:**
- Assets FIRST = Builder nutzt sie (statt CSS-Gradients)
- OpenAI Rules = zuverlaessig kohaerent (besser als abstrakter Designer-Output)
- Sonnet = schneller + guenstiger als Opus, gleiche Build-Qualitaet
- Image-Manifest = Builder weiss GENAU was verfuegbar ist
- Gesamtzeit: ~15 Min fuer eine vollstaendige Website

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

### Noch nicht getestet
- Designer + Rules + Assets-First (Kombination)
- Parallel-Build (2 Builder, verschiedene Prompts)
- impeccable:overdrive auf bestem Experiment

## Was fehlt fuer WOW (7/10 → 9/10)
- **Signature Moment** — WebGL Shader, 3D Element, oder tech-beeindruckende Animation
- **Mutigere Layouts** — Services sind gut aber konventionell
- **Micro-Interactions** — Custom Cursor, Hover-Effekte, Magnetic Buttons
- **GSAP-Animationen perfektionieren** — im Headless-Browser nicht testbar

## Verfuegbare Agents & Tools
- **Builder-Agent** — tmux-Session, eigene Claude Code Instanz (Sonnet empfohlen)
- **designer.md** — .claude/agents/designer.md (Creative Director)
- **web-lab setup.sh** — Projekt-Setup Script
- **find-skills** — Skill-Discovery
- **agent-browser** — Visuelles QA
- **gemini-image / gemini-video** — Asset-Generierung (Batch!)
- **run-codex** — OpenAI Codex als zweite Meinung
- **Brave Search / Firecrawl** — Web-Recherche
