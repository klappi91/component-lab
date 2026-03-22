# Component Lab — Constitution v5

Kuratiertes Wissen des autonomen Agenten. Wird bei JEDEM Run gelesen — klein und wertvoll halten.

## NAECHSTER RUN: Iterate on exp-shader-forge oder neues Experiment

exp-shader-forge ist deployed mit WebGL Shader + echten Assets. Chris-Feedback abwarten.
Moegliche naechste Schritte:
1. **exp-shader-forge polishen** — impeccable:overdrive, mobile-test, hover-distortion, services aufregender
2. **Neues Experiment** — anderer Stil (3D-Szene mit react-three-fiber, Video-Hero mit gemini-video)
3. **Skills testen** — awwwards-landing-page, premium-frontend-design, locomotive-scroll noch ungetestet
4. **Builder-Agenten ausprobieren** — tmux-basierte Builder fuer parallele Experimente

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
- **WebGL Shader als Signature Moment** — Domain-Warp FBM Noise erzeugt wunderschoene organische Patterns (exp-shader-forge)
- **gemini-image fuer Projekt-Mockups** — dramatischer Unterschied zu leeren Gradient-Boxen
- **Sub-Agent fuer parallele Asset-Generierung** — spart Zeit, Assets kommen waehrend Code geschrieben wird
- **Raw WebGL2 Canvas > R3F fuer 2D Shader** — weniger Overhead, direktere Kontrolle
- **Konzept-First Workflow** — Inspiration suchen → Konzept → Assets → Build ist effizienter
- **Iteratives QA mit agent-browser** — 3 Deploy-Zyklen mit Screenshots zeigen Probleme sofort
- **Web-Lab Setup Script** — schnelles Projekt-Setup mit allen Dependencies
- **Unbounded Font** — geometrisch, heavy, industrial — distinctive Display-Font
- Asymmetrische Layouts statt Card-Grids
- GSAP ScrollTrigger fuer Scroll-Animationen
- Inspiration-Driven Workflow

## Bestaetigt: Was NICHT funktioniert
- Websites ohne echte Assets (Bilder/Video/3D) = langweilig
- Canvas-Gradients als Bild-Ersatz = generisch
- UI-Patterns kopieren ohne das zentrale Element = seelenlos
- Konzept ueberspringen → generische Ergebnisse
- Alles selber bauen → verschenktes Potential
- **Fixed Shader MUSS mit solidem Content-Hintergrund** — Shader darf nicht durch Content bluten
- **Hero ueber Shader braucht Dark Overlay** — sonst Text nicht lesbar
- Marquees unter opacity 0.10 sind unsichtbar

## Installierte Skills
### Getestet
- **gemini-image** — Bilder generieren ✅ (funktioniert gut fuer Mockups)

### Noch ungetestet
- **shadertoy** — Shader Patterns/Referenzen (Skill nicht geladen, eigenen Shader gebaut)
- **awwwards-landing-page** — Awwwards-spezifische Patterns
- **premium-frontend-design** — Design-Qualitaet
- **gemini-video** — Videos generieren
- **react-three-fiber** — 3D in React
- **locomotive-scroll** — Smooth Scrolling
- **impeccable-Suite** — critique, overdrive, bolder, typeset, polish etc.

## Aktive Experimente
| Experiment | Konzept | URL | Status |
|---|---|---|---|
| exp-shader-forge | WebGL Shader Hero + echte Assets, Dark-Neon | https://exp-shader-forge.vercel.app | Deployed, Chris-Feedback ausstehend |
| exp-editorial-light | Light Editorial, Lusion-inspired | https://exp-editorial-light.vercel.app | FEEDBACK: solide aber kein WOW |
| exp-ref-norris | landonorris.com Reference, Dark | - | Gebaut, nicht deployed |
| exp-combo-a-1845 | Cinematic Immersive, Text-Mask | - | Gebaut, nicht deployed |
