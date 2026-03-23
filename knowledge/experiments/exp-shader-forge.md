# exp-shader-forge

## Meta
- **Konzept:** "Digital Forge" — WebGL Domain-Warp Shader als Hero + generierte Projekt-Assets
- **URL:** https://exp-shader-forge.vercel.app
- **GitHub:** https://github.com/klappi91/weblab-exp-shader-forge
- **Status:** v2 deployed (overdrive polish), Chris-Feedback ausstehend
- **Erstellt:** 2026-03-22
- **Letztes Update:** 2026-03-23 (Overdrive Polish)

## Design
- Dark-Neon Aesthetic (void #050505, ember #FF6B00)
- Fonts: Unbounded (Display) + Outfit (Body) + JetBrains Mono (Labels)
- WebGL2 Fragment Shader: Domain-Warped FBM Noise mit Mouse-Reactive Glow
- Sektionen: Hero (Shader) → Marquee → Work (4 Projekte) → Services (Editorial) → Statement (Word-Reveal) → Contact → Footer
- Alle Content-Sektionen mit solidem bg-void Hintergrund
- Gradient-Transition von Hero zu Content

## Was funktioniert
- **WebGL Shader als Signature Moment** — organische Domain-Warp Patterns in Orange/Purple, mausreaktiv
- **Generierte Projekt-Mockups** — 4 Bilder via gemini-image, sehen aus wie echte Kunden-Websites
- **Unbounded Font** — heavy, geometric, distinctive — perfekt fuer industriell/tech
- **Dark-Neon Aesthetic** — kohaerent, professionell
- **GSAP ScrollTrigger** — parallax hero, staggered reveals, word-by-word statement
- **Asymmetric 7:5 Work Grid** — kein Bootstrap-Look

## v2 Upgrades (2026-03-23)
- **Custom Cursor** — magnetic ember dot, 48px ring auf Links, 80px mit "EXPLORE" auf Projekten
- **3D Tilt Cards** — perspective rotateX/Y + image parallax auf Projekt-Karten
- **Lenis Smooth Scroll** — connected mit GSAP ticker
- **AI-Tell Cleanup** — Corner marks entfernt, mono labels reduziert, Footer-Copy ersetzt
- **Marquee** — zweite Zeile mit anderem Content, Opacities angepasst
- **Services** — grosse orange Nummern, accent bar, gestaffelte Tag-Animationen
- **Hero** — rotateX Entrance, line-based CTA statt Border-Box
- **prefers-reduced-motion** — Support hinzugefuegt

## Was NICHT funktioniert / offen (nach v2)
- Services-Section ist besser aber noch nicht WOW
- Custom Cursor noch nicht auf echtem Geraet getestet
- Lenis Smooth Scroll noch nicht auf echtem Geraet getestet
- Keine 3D-Elemente (nur 2D shader)
- Kein Video-Element

## Technische Details
- Raw WebGL2 (kein R3F fuer den Shader — leichter fuer 2D fullscreen)
- Fragment Shader: 2x simplex noise, FBM (4 Oktaven), Domain Warping (q,r Vektoren)
- Mouse-Tracking: normalized coordinates, glow + ring effect
- Scroll-Progress: dimmt den Shader beim Scrollen
- Tone Mapping: Reinhard + Gamma
- Canvas DPI: devicePixelRatio (max 2)

## Neuerungen vs. vorherige Experimente
- ERSTER Einsatz von WebGL Shader (nicht Canvas-Gradients)
- ERSTER Einsatz von gemini-image fuer Assets
- ERSTER Einsatz von Sub-Agent fuer parallel Asset-Generierung
- ERSTER Einsatz von Unbounded Font
- Web-Lab Setup-Script fuer schnelles Project-Setup
- ERSTER Einsatz von Custom Cursor (v2)
- ERSTER Einsatz von 3D Tilt Cards (v2)
- ERSTER Einsatz von Lenis Smooth Scroll (v2)
- ERSTER Einsatz von impeccable:critique + overdrive (v2)
