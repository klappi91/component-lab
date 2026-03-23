# Component Lab — Constitution v10

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

## Was funktioniert (technisch)
- WebGL Shader als Signature Moment
- gemini-image fuer Projekt-Mockups UND Service-Visuals
- Horizontal Scroll mit GSAP pin
- CSS sticky Stacking Cards
- toggleActions > scrub fuer Content-Reveals
- Lenis + GSAP Integration
- agent-browser fuer visuelles QA
- Unbounded Font (distinctive), Instrument Serif (elegant)
- impeccable:critique → overdrive Pipeline
- Clip-path Wipe-Reveals fuer Portfolio-Projekte
- Custom Cursor (12px dot, ring auf hover)
- Grain-Overlay (SVG feTurbulence)

## Was NICHT funktioniert
- Websites ohne echte Assets = langweilig
- Leere Karten/Flaechen mit nur Text
- AI-Template Tells (corner marks, mono labels, cheesy copy)
- scrub-Animationen fuer Reveals (opacity-0-Bug)
- Konzept ueberspringen → generisch
- **CSS @import fuer Fontshare in Next.js** — wird im Build nicht zuverlaessig aufgeloest. IMMER `<link>` Tags im layout.tsx `<head>` verwenden!
- **Builder kennt parallel generierte Assets nicht** — Assets muessen VOR dem Builder fertig sein, oder ein Manifest muss den Builder informieren
- **tmux-Sessions IMMER beenden** — Nach erfolgreichem Build: `tmux kill-session -t name`. Alternative: Agent-Tool statt tmux (beendet sich selbst). Vor Session-Ende: `tmux ls` pruefen.

## Prozess-Experimente

### Getestet: Designer → Builder Pipeline (2026-03-23)
- **Ergebnis:** Funktioniert grundsaetzlich. Klares Konzept = schnellerer, fehlerfreierer Build.
- **Designer-Agent:** Exzellentes Konzept (5 Min), 7 Akte, konkreter Content, Asset-Prompts
- **Builder-Agent:** 10 Min, 14 Dateien, 8 Sektionen, 0 Build-Fehler
- **Problem:** Builder nutzte generierte Bilder nicht (weil parallel generiert). Fix: manuell.
- **Verbesserung:** Assets ZUERST generieren, dann Builder starten. Oder Asset-Manifest.

### Noch nicht getestet
- Builder-Agent mit OpenAI Design Rules als System-Prompt
- Codex als Design-Input (run-codex Skill)
- Multi-Session Build (ueber 3-4 Sessions)
- Parallel-Build (2 Builder, verschiedene Prompts)

## Verfuegbare Agents & Tools
- **Builder-Agent** — tmux-Session, eigene Claude Code Instanz
- **designer.md** — .claude/agents/designer.md (Creative Director)
- **web-lab setup.sh** — Projekt-Setup Script
- **find-skills** — Skill-Discovery
- **agent-browser** — Visuelles QA
- **gemini-image / gemini-video** — Asset-Generierung
- **run-codex** — OpenAI Codex als zweite Meinung
- **Brave Search / Firecrawl** — Web-Recherche
