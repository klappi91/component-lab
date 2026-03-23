# Component Lab — Constitution v6

Kuratiertes Wissen des autonomen Agenten. Wird bei JEDEM Run gelesen — klein und wertvoll halten.

## NAECHSTER RUN: Chris-Feedback oder neues Experiment

exp-shader-forge wurde ge-polished (v2: custom cursor, 3D tilt cards, Lenis, AI-tell cleanup).
Moegliche naechste Schritte:
1. **Chris-Feedback einarbeiten** — wenn vorhanden
2. **Neues Experiment** — anderer Stil (3D-Szene mit react-three-fiber, Video-Hero mit gemini-video)
3. **Skills testen** — awwwards-landing-page, premium-frontend-design, locomotive-scroll noch ungetestet
4. **Builder-Agenten ausprobieren** — tmux-basierte Builder fuer parallele Experimente
5. **exp-shader-forge Services** — koennte noch aufregender sein (interaktiv, visuell)

## Session-Management
- **Am Ende jeder Session: `exit`** — Cron-Job startet automatisch eine neue Session
- **Kontinuierlicher Loop:** arbeiten → testen → probieren → notieren → exit → neu starten → weitermachen
- **Nicht auf Anweisungen warten** — das Ziel ist autonomes, fortlaufendes Experimentieren
- **Alles Wichtige in Constitution + Daily Notes festhalten** bevor exit

## Chris-Feedback (destilliert)
- **"Nicht super, nicht schlecht, aber weit weg von WOW"** — solide Handwerksarbeit reicht nicht
- **Textlastig kann funktionieren** — aber nur mit VIEL Kreativitaet, nicht grosse Schrift + Gradient
- **Nicht alles selber machen** — Builder, Sub-Agenten, Skills, find-skills nutzen
- **Autonomer sein** — wie OpenClaw: selbst entscheiden, experimentieren, lernen
- **Spielwiese** — API Keys anfordern wenn noetig, eigenen Prompt anpassen

## Bestaetigt: Was funktioniert
- **WebGL Shader als Signature Moment** — Domain-Warp FBM Noise erzeugt wunderschoene organische Patterns
- **gemini-image fuer Projekt-Mockups** — dramatischer Unterschied zu leeren Gradient-Boxen
- **Sub-Agent fuer parallele Asset-Generierung** — spart Zeit, Assets kommen waehrend Code geschrieben wird
- **Raw WebGL2 Canvas > R3F fuer 2D Shader** — weniger Overhead, direktere Kontrolle
- **Konzept-First Workflow** — Inspiration suchen → Konzept → Assets → Build ist effizienter
- **Skill-Driven Polish Workflow** — impeccable:critique → Plan → Implement → QA ist effektiv
- **impeccable:critique als Startpunkt** — identifiziert AI-Tells die man selbst uebersieht
- **3D Tilt Cards** — einfach (GSAP rotateY/X), sieht gut aus, kein WebGL noetig
- **Lenis + GSAP Integration** — unkompliziert, ticker-basiert, smoothes Feeling
- **Custom Cursor** — magnetic ember dot, data-cursor Attribute fuer verschiedene Hover-States
- **Iteratives QA mit agent-browser** — Screenshots nach Deploy zeigen Probleme sofort
- **Web-Lab Setup Script** — schnelles Projekt-Setup mit allen Dependencies
- **Unbounded Font** — geometrisch, heavy, industrial — distinctive Display-Font
- Asymmetrische Layouts statt Card-Grids
- GSAP ScrollTrigger fuer Scroll-Animationen

## Bestaetigt: Was NICHT funktioniert
- Websites ohne echte Assets (Bilder/Video/3D) = langweilig
- Canvas-Gradients als Bild-Ersatz = generisch
- UI-Patterns kopieren ohne das zentrale Element = seelenlos
- Konzept ueberspringen → generische Ergebnisse
- Alles selber bauen → verschenktes Potential
- **Fixed Shader MUSS mit solidem Content-Hintergrund** — Shader darf nicht durch Content bluten
- **Hero ueber Shader braucht Dark Overlay** — sonst Text nicht lesbar
- Marquees unter opacity 0.10 sind unsichtbar
- **AI-Template Tells vermeiden:** Corner marks, font-mono tracking-[0.3em] ueberall, "CRAFTED WITH CODE" Copy, numbered service lists ohne visuelle Unterscheidung, standard hover overlays

## Getestete Workflows (jeden Run ANDEREN waehlen!)
1. **Konzept-First + Selbst gebaut** — zuletzt 2026-03-22 (exp-shader-forge v1)
2. **Skill-Driven Polish** — zuletzt 2026-03-23 (exp-shader-forge v2)
3. **Inspiration-Driven** — zuletzt 2026-03-22 (exp-editorial-light)
4. **Builder-Delegation** — NOCH NIE getestet
5. **Skill-Experiment** — NOCH NIE getestet (einzelnen Skill gezielt ausprobieren)

## Installierte Skills
### Getestet
- **gemini-image** — Bilder generieren (funktioniert gut fuer Mockups)
- **impeccable:critique** — Design evaluieren (identifiziert AI-Tells, gibt konkrete Fixes)
- **impeccable:overdrive** — Technisch ambitioniert (3 Richtungen vorschlagen, dann waehlen)

### Noch ungetestet
- shadertoy, awwwards-landing-page, premium-frontend-design
- gemini-video, react-three-fiber, locomotive-scroll
- impeccable: bolder, typeset, polish, delight, arrange, distill

## Aktive Experimente
| Experiment | Konzept | URL | Status |
|---|---|---|---|
| exp-shader-forge | WebGL Shader + echte Assets + Custom Cursor + 3D Tilt | https://exp-shader-forge.vercel.app | v2 deployed, Chris-Feedback ausstehend |
| exp-editorial-light | Light Editorial, Lusion-inspired | https://exp-editorial-light.vercel.app | FEEDBACK: solide aber kein WOW |
| exp-ref-norris | landonorris.com Reference, Dark | - | Gebaut, nicht deployed |
| exp-combo-a-1845 | Cinematic Immersive, Text-Mask | - | Gebaut, nicht deployed |
