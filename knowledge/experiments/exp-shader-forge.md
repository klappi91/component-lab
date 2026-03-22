# exp-shader-forge

## Meta
- **Konzept:** "Digital Forge" — WebGL Domain-Warp Shader als Hero + generierte Projekt-Assets
- **URL:** https://exp-shader-forge.vercel.app
- **GitHub:** https://github.com/klappi91/weblab-exp-shader-forge
- **Status:** Deployed, awaiting Chris-Feedback
- **Erstellt:** 2026-03-22

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

## Was NICHT funktioniert / offen
- Hero-Text koennte noch besser lesbar sein (radial overlay hilft, aber Shader ist hell)
- Marquee bei 15% opacity — noch immer sehr subtil
- Kein Hover-Distortion auf den Projektbildern (nur scale + overlay)
- Services-Section ist clean aber nicht aufregend
- Keine 3D-Elemente (nur 2D shader)
- Mobile noch nicht getestet

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
