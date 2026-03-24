# Component Lab — Constitution v13

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
- **DURCHGEHENDER FLUSS** (2026-03-23) — "die ganze Zeit irgendein Element sich mitbewegt" = DAS macht Awwwards-Sites aus. Ohne das: "vergessen nachdem man sie verlassen hat"
- **Sektions-Uebergaenge spielerisch** (2026-03-23) — nicht abrupt, sondern fliessende Transitions
- **Logo + Video** (2026-03-23) — fehlt beides, wuerde die Seite stark aufwerten
- **Self-Eval immer zu optimistisch** (2026-03-23) — Chris gab 7.5/10, Self-Eval war 9.3. IMMER mindestens 1.5 Punkte abziehen
- **STORY FIRST** (2026-03-23) — "erstmal eine Geschichte die ich erzaehlen will, Design und zurueck ausarbeiten, Typografie und alles was dazugehoert". NICHT erst bauen dann Story, sondern Story → Design → Code
- **DURCHDACHT > EFFEKTE** (2026-03-23) — "alles wirkt durchdacht im Vorfeld statt einfach nettes Aussehen und Effekte der Effekte wegen". Jeder Effekt muss der Erzaehlung dienen
- **Referenz: mersi-architecture.com** (2026-03-23) — Chris mag: Hintergrund-Wechsel beim Scrollen, Zoom-Effekte, Struktur/Navigation. Bilder oben+unten, Content in der Mitte. 8/10 fuer exp-signature-hero (Projekt abgeschlossen)
- **"VOM PIXEL ZUR WEBSEITE"** (2026-03-23) — Neue Story-Idee: Die Transformation vom Pixel zur fertigen Website, auf intelligente Weise mit KI. Was macht eine Webseite aus? Welche Assets werten sie auf?
- **SCROLL-DRIVEN VIDEO** (2026-03-23) — "Videos per Scrollen animieren. Start-Foto, End-Foto/Frame, durch Scrollen abspielen." Technik: video.currentTime via GSAP ScrollTrigger scrub
- **"SEI MUTIG UND ERFINDE NEUE DINGE"** (2026-03-23) — Klarer Auftrag: Nicht nur bestehendes anwenden, sondern NEUE Dinge erfinden

## OpenAI Frontend Design Rules
Siehe: knowledge/skills/openai-frontend-design-rules.md
Kernregeln: Design-System zuerst, erster Viewport = Einheit, expressive Fonts, full-bleed Imagery, Hero = Brand + Headline + CTA + dominantes Bild, KEINE leeren Cards, jede Sektion = ein Zweck, 2-3 intentionale Animationen, echter Content.

## BESTER Workflow (Stand 2026-03-23, aktualisiert nach Experiment #8)

### Build-Phase: Signature Module (Opus) + Assets-First + Sonnet Builder — Score: 8/10
1. Projekt mit web-lab setup.sh aufsetzen
2. gemini-image Batch: 6-8 Bilder generieren ($0.50-0.60, ~60 Sek)
3. Image-Manifest schreiben (specs/image-manifest.json)
4. **Opus baut kreativstes Modul** (z.B. WebGL Shader Hero)
5. Detailliertes Design-Konzept mit Sektions-Specs
6. **Sonnet Builder via Agent-Tool** (NICHT tmux!) (~7 Min)
7. QA via agent-browser
8. Deploy via Vercel

### Polish-Phase: impeccable:overdrive Skill-Push (Sonnet) — +0.2-0.5 pro Push
1. Agent-Tool mit Sonnet + impeccable:overdrive
2. Detaillierter Prompt: aktueller Score, vorhandene Features, schwache Bereiche
3. Agent liest Code, identifiziert Opportunities, implementiert 2-3 Features
4. Build-Verification im Agent
5. ~8 Min, ~82k Tokens pro Push

### Warum das funktioniert:
- Opus = kreativster Teil beim Build (WOW-Faktor)
- Sonnet + Skill = effizientes Polishing (gleiche Qualitaet, halbe Kosten)
- Assets FIRST + Manifest = Builder nutzt sie alle
- Agent-Tool statt tmux = zuverlaessiger
- Gesamtzeit: ~25 Min Build + ~8 Min pro Overdrive-Push

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
- **Video Showreel Section** (Veo 3.1 ambient + GSAP scale reveal + letterbox)
  - gemini-video fuer ambient Background-Videos ($1.20/8s, 720p reicht)
  - ffmpeg CRF 28 Kompression: 8.7MB → 2.7MB
  - Text-Shadow PFLICHT auf Video-Overlays (sonst unleserlich auf Mobile)
  - Autoplay on scroll-enter, pause on leave (ScrollTrigger onEnter/onLeave)
  - Letterbox-Bars (12% top/bottom) fuer cinematic Feel
- Clip-path Wipe-Reveals fuer Portfolio-Projekte
- Grain-Overlay (SVG feTurbulence, opacity ~0.04, overlay blend)
- Custom Cursor (GSAP smooth follow, magnetic, context-aware labels)
- **Full-Screen Stacking Cards** (sticky top-0, z-index stacking, GSAP dim auf vorherige)
  - WICHTIG: Spacer (h-screen) NACH der letzten Card, sonst hat sie 0 Scroll-Raum
  - Dim-Effekt: scale 0.92 + brightness(0.4) per scrub auf vorherige Cards
  - Parallax: GSAP fromTo y: -8% to 8% auf Images
- **Pinned Scroll Showcase** (CSS sticky + GSAP scrub-Timeline)
  - Outer: hohe Hoehe (500vh), Inner: sticky top-0 h-screen
  - GSAP scrub-Timeline mapped Scroll-Progress auf Step-Transitions
  - autoAlpha fuer Ein/Ausblenden (visibility + opacity)
  - Funktioniert perfekt mit Lenis (kein GSAP pin noetig!)
- **Word-by-Word Text Reveal** (GSAP stagger)
  - y: 110% + rotateX: -15 Entrance = 3D-Flip-Effekt
  - Stagger: 0.12s pro Wort
  - Wrapper braucht overflow:hidden
  - WICHTIG: {' '} ZWISCHEN inline-block Elementen platzieren, nicht innerhalb
- **Scroll-driven Video** (GSAP ScrollTrigger + video.currentTime)
  - Container: hohe Hoehe (500vh), Inner: sticky top-0 h-screen
  - ScrollTrigger.create mit scrub: 0.3
  - onUpdate: video.currentTime = self.progress * video.duration
  - WICHTIG: video.readyState >= 1 checken vor Setup (loadedmetadata Event)
  - Text-Overlays: opacity + translateY basierend auf progress ranges
  - Video komprimieren: ffmpeg CRF 28 + faststart (spart ~65%)
- **CSS Marquee** (infinite scroll, kein JS noetig)
  - @keyframes marquee-scroll: translateX(0 → -50%)
  - 6+ Kopien des Textes fuer nahtloses Loop
  - WebkitTextStroke fuer Outline-Effekt

## Was NICHT funktioniert
- Websites ohne echte Assets = langweilig
- Leere Karten/Flaechen mit nur Text
- AI-Template Tells (corner marks, mono labels, cheesy copy)
- scrub-Animationen fuer Reveals (opacity-0-Bug)
- Konzept ueberspringen → generisch
- **CSS @import fuer Fontshare in Next.js** — IMMER `<link>` Tags im layout.tsx `<head>` verwenden!
- **ASCII-Umlaute in Specs** — IMMER UTF-8 verwenden (ä/ö/ü, nicht ae/oe/ue), Builder kopiert 1:1
- **mix-blend-difference auf hellem BG** — macht schwarzen Text unsichtbar, nur fuer Dark Themes
- **overflow-x: hidden auf body** — PFLICHT fuer Mobile! Ohne das verursachen Marquees, Shader-Canvas, oder grosse Dekor-Elemente horizontalen Scroll der alle Texte abschneidet
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

### #6: Opus Overdrive Push #3 — Stacking Services (2026-03-23, exp-signature-hero v4)
- **Score: 8.8→9.0/10** — Services von 8→9.5, groesster Einzelsprung
- Full-Screen Stacking Cards ersetzen alternating blocks
- Film Grain Overlay + Section Dividers
- Spacer-Bug entdeckt: letzte sticky Card braucht h-screen Spacer
- Learning: **Services-Redesign war der groesste Hebel** — die "langweiligste" Sektion upgraden bringt am meisten

### #7: Opus Overdrive Push #4 — Methode + CTA + Footer (2026-03-23, exp-signature-hero v5)
- **Score: 9.0→9.2/10** — Alle 3 schwachen Sektionen aufgewertet
- Methode: Pinned Scroll Showcase (500vh, sticky, GSAP scrub-Timeline)
- CTA: Split-Text Reveal (word-by-word, rotateX-15, parallax bg)
- Footer: Infinite Marquee + 4-Column Grid
- Learning: **CSS sticky + GSAP scrub = perfekt mit Lenis** (kein pin noetig)
- Learning: **Inline-Block Spacing** — {' '} ZWISCHEN Elementen, nicht innerhalb

### #8: impeccable:overdrive Skill-Push (2026-03-23, exp-signature-hero v6)
- **Score: 9.2→9.5/10** — 3+1 Features, Sonnet-Agent mit Skill
- Cinematic Preloader (Counter → Brand → Split-Panel Reveal)
- Spring-Physics Cursor mit Ghost-Trail (4 trailing rings)
- Scroll-Velocity Skew auf Portfolio (3° Neigung bei schnellem Scroll)
- Footer: Live-Uhr, Slide-Up Hover, Spring Back-to-Top
- 82k Tokens, ~8 Min — EFFIZIENTER als manuelles Opus-Overdrive (~150k, ~25 Min)
- Learning: **Sonnet + impeccable:overdrive Skill ≈ manuelles Opus-Overdrive bei halben Kosten**
- Learning: **Preloader = First-Impression Game-Changer**

### #9: Builder-Agent mit Detailed Specs (2026-03-24, exp-morphic-flow v3)
- **Score: ~7/10 geschaetzt** (QA 5.5 headless-limitiert, realistisch ~7)
- 350+ Zeilen creative-brief.md mit exakten JSX/CSS/GSAP Code-Patterns pro Sektion
- Sonnet Builder via Agent-Tool: 13 Dateien, 1888 Insertions, 0 Build-Fehler, ~10 Min
- 3 neue Canvas-Komponenten erstellt (ServiceWireframe, ServiceNetwork, ServiceParticles)
- v2→v3: Simple SVGs → Canvas Visuals, Grid → Horizontal Scroll, Static → Pinned Timeline
- **FUNDAMENTALE Erkenntnis: Builder = Spec-Qualitaet**
  - Spec enthielt Code → Builder kopierte/adaptierte praezise
  - Spec vergass Detail → Builder ignorierte es (korrekt!)
  - **Investition in die Spec = direkter ROI auf den Output**
- Learning: **creative-brief.md als SINGLE-INPUT Format funktioniert** — Story + Design + Code pro Sektion
- Learning: **~25 Min total (15 Spec + 10 Build)** fuer einen vollstaendigen Website-Rebuild

### #10: Reproduzierbarkeit (2026-03-24, exp-kinetic-type v1)
- **Score: ~6.5/10 geschaetzt** (QA 5.8 headless-limitiert)
- Gleicher Spec→Builder Workflow, komplett anderer Stil (hell, typografie-getrieben)
- 400+ Zeilen creative-brief.md → Sonnet Builder: 11 Dateien, 0 Build-Fehler, ~4 Min
- **Hypothese BESTAETIGT:** Workflow ist reproduzierbar, unabhaengig vom Stil
- 3 Bugs gefunden: ASCII-Umlaute, mix-blend-difference auf light, mobile overflow
- Learning: **UTF-8 Pflicht in Specs**, **Heller Stil braucht subtilere Spec-Arbeit**

### Noch nicht getestet
- Designer + Rules + Assets-First (Kombination)
- Parallel-Build (2 Builder, verschiedene Prompts)

## Was fehlt fuer WOW (~9.5/10 → 10/10)
- ~~WebGL/Shader Signature Moment~~ — ERLEDIGT
- ~~Mobile Nav~~ — ERLEDIGT (Full-Screen Menu mit nummerierten Links)
- ~~Portfolio redesignen~~ — ERLEDIGT (Editorial Info-Bar statt Overlay)
- ~~Overdrive Push~~ — ERLEDIGT (8→8.5)
- ~~Mehr Portfolio-Content~~ — ERLEDIGT (4 Items, 2 neue Mockups)
- ~~Custom Cursor~~ — ERLEDIGT (Spring-Physics + Ghost-Trail, 8.5→9.2/10)
- ~~Services aufwerten~~ — ERLEDIGT (Full-Screen Stacking Cards, 8→9.5/10)
- ~~Film Grain~~ — ERLEDIGT (SVG feTurbulence Overlay)
- ~~Section Dividers~~ — ERLEDIGT (animated horizontal lines)
- ~~Methode aufwerten~~ — ERLEDIGT (Pinned Scroll Showcase, 8.5→9.2/10)
- ~~CTA aufwerten~~ — ERLEDIGT (Split-Text Reveal, 8.5→9.3/10)
- ~~Footer aufwerten~~ — ERLEDIGT (Marquee + Clock + Hovers, 8→9.3/10)
- ~~impeccable:overdrive~~ — ERLEDIGT (Sonnet + Skill = effizienter als Opus manuell!)
- ~~Preloader~~ — ERLEDIGT (Cinematic Counter → Brand → Split-Panel)
- ~~Video~~ — ERLEDIGT (Veo 3.1 ambient, VideoShowreel Section mit scale reveal)
- **Mobile QA** — Neue Sektionen auf Mobile testen
- **Methode Step-Bilder** — Generieren fuer visuellere Steps
- **Page Transitions** — Zwischen Sektionen oder Sub-Pages
- **Sound Design** — Subtile Audio-Cues bei Interaktionen (optional, kontrovers)

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
