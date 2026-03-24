# Component Lab — Constitution v14

Kuratiertes Wissen. Wird bei JEDEM Run gelesen — klein und wertvoll halten.
Identitaet, Ziele, Heartbeat leben jetzt in eigenen Workspace-Dateien (SOUL.md, GOALS.md, HEARTBEAT.md).

## Kern-Identitaet: Experience Lab

Wir bauen keine "Heroes" oder "Komponenten". Wir choreografieren **Erlebnisse**.
Ein Erlebnis kann ein einzelner Hero sein, eine Mini-Site, oder 4 Sektionen — egal.
Was zaehlt: Hat es einen FLOW? Fuehlt es sich choreografiert an? Bleibt es im Kopf?

**99% aller Websites sind gleich. Wir machen das 1%.**

## Autonomer Loop

1. **HEARTBEAT.md ausfuehren** — Feedback? Inspiration? Skills? → Entscheiden
2. **Inspiration suchen** — Awwwards-Sites, Referenzen, Design-Blogs analysieren
3. **Choreografie verstehen** — NICHT "sieht cool aus" sondern: Welches Easing? Welche Uebergaenge? Welches Timing? Wie funktioniert der Flow?
4. **Skills suchen/nutzen** — Gibt es einen Skill der das kann? Neuen installieren? (find-skills)
5. **Erlebnis erschaffen** — direkt im Component Lab unter /heroes/, KEIN neues Repo
6. **Tracken** — components.json: Inspiration, Skills, Choreografie-Entscheidungen
7. **Abschliessen** — Daily Note, GOALS.md, Constitution, Git
8. **Session beenden** — Cron startet mich automatisch neu

## Chris-Feedback (destilliert)

### Fundamentale Prinzipien (2026-03-24)
- **ERLEBNISSE, KEINE KOMPONENTEN** — nicht "baue Hero + 3 Sections" sondern "choreografiere ein Erlebnis"
- **POTENZIAL > PERFEKTION** — muss nicht bugfrei sein, wenn man das WOW-Potenzial erkennt
- **ZUSAMMEN ITERIEREN** — frueh zeigen, nicht autonom bis v12 polieren. Wenn WOW-Potenzial da: zusammen weiterarbeiten
- **SKILLS AKTIV NUTZEN** — installierte Skills MUESSEN ins Konzept einfliessen, nicht nur Code-Hilfe
- **PROMPTS/SKILLS ITERIEREN > MODELLE VERGLEICHEN** — gleiche Prompts + anderes Modell = aehnliches Ergebnis
- **INSPIRATION SUCHEN + CHOREOGRAFIE VERSTEHEN** — Awwwards-Sites analysieren, den ABLAUF verstehen, dann selber erschaffen
- **NEUE SKILLS SUCHEN** — aktiv nach Skills suchen die neue Moeglichkeiten eroeffnen

### Design-Feedback (2026-03-23)
- **DURCHGEHENDER FLUSS** — "die ganze Zeit irgendein Element sich mitbewegt" = DAS macht Awwwards-Sites aus
- **STORY FIRST** — erst Geschichte, dann Design, dann Code
- **DURCHDACHT > EFFEKTE** — jeder Effekt muss der Erzaehlung dienen
- **"SEI MUTIG UND ERFINDE NEUE DINGE"**
- **Self-Eval immer zu optimistisch** — Formel: `chris_score = self_eval - 2.0`

## Was Awwwards-Gewinner KONKRET anders machen (Recherche 2026-03-24)

### Tech-Stack der Gewinner
- **GSAP + ScrollTrigger** = 100% aller SOTD-Gewinner, Industriestandard
- **Lenis** = ~80%, hat Locomotive abgeloest, Smooth Scroll Standard
- **Three.js + custom GLSL** = ~40%, nur bei 3D-lastigen Sites
- **Lottie** = ~20%, NUR fuer Micro-Animations (Icons, Loader), NIE fuer Heroes
- **KEINE Preset-Libraries** — kein animate.css, kein AOS, kein wow.js. ALLES custom GSAP.

### Der Unterschied ist CHOREOGRAFIE, nicht Tools
Reksa Andhika gewinnt SOTD mit NUR Nuxt + GSAP + Lenis. Kein 3D, kein Lottie.
Der Unterschied:
1. **Easing-Praezision** — custom curves, nicht Standard ease-in-out
2. **Timeline-Choreografie** — exaktes Stagger, Overlap, Sequencing
3. **ScrollTrigger-Feintuning** — exakte Start/End-Punkte
4. **Micro-Interactions** — Cursor, Hover-States, magnetische Buttons
5. **60fps durchgehend** — Performance ist kein Afterthought

### Sektions-Uebergaenge (die 6 Patterns)
1. **Color/Background Morphing** — BG-Farbe wechselt smooth beim Scrollen
2. **Clip-Path Wipe** — inset() animiert, neue Sektion wischt ueber alte
3. **Stacking Cards** — CSS sticky, vorherige dimmt (scale 0.92 + brightness 0.4)
4. **Parallax-Layering** — verschiedene Geschwindigkeiten = Tiefe ohne 3D
5. **Horizontal Scroll** — pinned Container + scrub translateX
6. **Dissolve/Blur** — blur() + opacity Transition, cinematic

### Animations-Choreografie (Standard-Ablauf)
- **Preloader → Hero** = EINE Timeline, overlapping (-2.4s)
- **Hero Reveal** = clipPath/scale Bild → SplitText Headline (expo.out) → Subtext → CTA
- **Section Reveals** = trigger "top 80%", toggleActions (NICHT scrub!), SplitText + mask
- **Signature Moment** = EINER der im Kopf bleibt, 3-5x mehr Scroll-Raum
- **Easing-Standard:** expo.out (Text), power4.inOut (Wipes), power2.out (Fades)
- **Timing:** Stagger Buchstaben 0.03-0.05s, Woerter 0.08-0.12s, Zeilen 0.1-0.15s

## Skills — AKTIV nutzen, nicht nur installieren

### Pflicht-Skills (bei JEDEM Erlebnis laden)
- **awwwards-animations** — Design-Philosophien, algorithmische Art-Patterns, Magnetic Cursor, Text Effects
- **gsap-plugins** — SplitText (mask!), MorphSVG, Flip, DrawSVG, ScrambleText, CustomEase

### Konzept-Skills (je nach Erlebnis-Typ)
- **scroll-storyteller** — Narrativ-Framework, Kapitel-Struktur, Mood-Paletten
- **svg-animations** — Path Drawing, Morphing, SMIL fuer self-contained SVGs
- **lottie-animator** — Micro-Interactions, animierte Icons/Logos
- **3d-web-experience** — Scroll-driven 3D, WebGL-Szenen

### Skill-Discovery (regelmaessig)
- `find-skills` nutzen um neue Skills zu entdecken
- Nach Inspiration-Analyse: gibt es einen Skill der das Pattern abdeckt?
- Neuen Skill installieren wenn er eine Luecke fuellt

## Build-Workflow (aktualisiert)

### Experience-Build
1. **Inspiration analysieren** — konkrete Referenz-Site choreografie-technisch zerlegen
2. **Skills laden** — awwwards-animations + gsap-plugins + relevante Konzept-Skills
3. **Choreografie-Konzept** — Ablauf, Easings, Uebergaenge, Timing BEVOR Code
4. **Assets generieren** — gemini-image/video Batch, komprimieren
5. **Opus baut Erlebnis** — mit Skills geladen, Choreografie-Konzept als Input
6. **Build-Verification** — npm run build (KEIN next dev!)
7. **QA** — agent-browser Desktop + Mobile
8. **Tracken** — components.json aktualisieren

### WICHTIG: Alles im Component Lab
- KEIN neues Repo, KEIN Vercel Deploy fuer jedes Erlebnis
- Direkt unter src/app/heroes/ als eigenes Verzeichnis
- Gallery (/) zeigt alle Erlebnisse
- Naming: hero-vXXX-[a|b] (naechste freie Nummer aus components.json)

## Was funktioniert (technisch)
- **Progressive Depixelation** (Canvas drawImage + imageSmoothingEnabled=false + Offscreen Canvas) — stufenloser Pixel→Scharf Uebergang. Pixelgroesse exponentiell verkleinern: `maxCellSize^(1-t)` fuer perceptually linear sharpening. Depixelation an Reassembly-Progress koppeln, nicht an scrollP.
- Lenis + GSAP Integration
- Full-bleed Hero mit generiertem Bild
- WebGL Shader als Signature Moment
- CSS sticky Stacking Cards
- toggleActions > scrub fuer Content-Reveals
- Word-by-Word Text Reveal (GSAP stagger, y:110%, rotateX:-15)
- Scroll-driven Video (GSAP ScrollTrigger + video.currentTime)
- Clip-path Wipe-Reveals
- Grain-Overlay (SVG feTurbulence, opacity ~0.04)
- Custom Cursor (GSAP smooth follow, magnetic)
- CSS Marquee (infinite scroll, kein JS)
- Pinned Scroll Showcase (CSS sticky + GSAP scrub-Timeline)
- gemini-image Batch ($0.50, ~60 Sek)
- gemini-video ambient ($1.20/8s)
- agent-browser fuer QA

## Was NICHT funktioniert
- **CSS 3D perspective + camera zoom:** Wenn Container `perspective: Xpx` hat und Camera-Kind per GSAP `translateZ(Y)` bekommt mit Y > X → alles HINTER dem Betrachter = unsichtbar. Elemente die NACH dem Zoom sichtbar sein muessen (Brand, CTA) MUESSEN ausserhalb des perspective-Containers leben.
- Websites ohne echte Assets = langweilig
- AI-Template Tells (corner marks, mono labels, cheesy copy)
- scrub-Animationen fuer Reveals (opacity-0-Bug)
- Konzept ueberspringen → generisch
- CSS @import fuer Fontshare — IMMER `<link>` in layout.tsx
- ASCII-Umlaute in Specs — IMMER UTF-8
- mix-blend-difference auf hellem BG
- body overflow:hidden (ohne -x) bricht GSAP ScrollTrigger
- Modelle vergleichen statt Prompts/Skills iterieren
- 7 Sektionen mittelmäßig statt 2 Sektionen WOW
- Autonom bis v12 polieren ohne Chris einzubinden

## Self-Eval Kalibrierung
- **Formel:** `chris_score_estimate = self_eval - 2.0`
- **Entscheidungsregel:** Iterationen nur wenn chris_score_estimate < 8.0. Darueber: Chris fragen.

## Prozess-Experimente (Archiv)
Siehe: knowledge/daily/ — 14 Experimente dokumentiert (2026-03-22 bis 2026-03-24)
Wichtigste Erkenntnisse:
- Opus fuer Kreativ/WOW, Sonnet fuer systematische Arbeit
- Skills informieren SPEC, nicht BUILD
- Builder = Spec-Qualitaet (Investition in Spec = direkter ROI)
- Modell-Hierarchie: Opus (8/10) > Codex (6.5) > Sonnet (5.3) > Haiku (3.0)
- Agent-Tool > tmux
