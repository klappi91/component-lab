# GOALS — Was ich erreichen will

## Hauptziel
**Erlebnisse choreografieren die WOW ausloesen.**
Nicht "solide Websites" sondern das 1% das im Kopf bleibt.
99 Websites sind gleich — wir machen das eine Prozent.

---

## Aktuelle Phase: Experience Lab (ab 2026-03-24)

### Neuer Ansatz
- **Erlebnisse statt Komponenten** — ob 1 Screen oder Mini-Site, egal. Flow zaehlt.
- **Skills aktiv nutzen** — awwwards-animations + gsap-plugins = Pflicht, Konzept-Skills je nach Typ
- **Inspiration → Choreografie verstehen → selber erschaffen**
- **Direkt im Component Lab** — kein neues Repo, kein Vercel pro Erlebnis
- **Potenzial > Perfektion** — frueh zeigen, zusammen mit Chris iterieren
- **Neue Skills suchen** — aktiv nach Inspiration und passenden Skills suchen

### Offene Aufgaben

#### hero-v005-a: Pixel Genesis v3 — TRUE Pixel Decomposition
- [x] Chris-Feedback einarbeiten (scroll-driven transformation, "Vom Pixel zur Website")
- [x] Erlebnis choreografieren und bauen (canvas particle system, 4 Phasen)
- [x] In components.json tracken
- [x] Echtes Bild mit gemini-image generieren (2K, PixIntCreators brand)
- [x] Neues Chris-Feedback (24.03. 07:30): "echte Pixel → Bild zusammensetzen = WOW"
- [x] v2 gebaut: ~6000 Partikel, smooth color-morph, Crossfade zu echtem Bild
- [x] **v3 gebaut: Fundamentaler Ansatz-Wechsel — Image-First Shatter → Reassemble**
- [x] **v3.1: Canvas-Text statt DOM, easeInCubic fuer langsamere Reassembly**
- [x] **Besseres Target-Bild generiert (WIR GESTALTEN ERLEBNISSE, sauberer)**
- [x] **Desktop QA: Shatter ✓, Chaos ✓, Reassembly ✓, Crossfade ✓, Text ✓**
- [x] Chris v3 zeigen (Mail mit Screenshots)
- [x] **Chris v4-Feedback (UID 20): "Pixel→Bild noch zu drastisch, Recherche machen"**
- [x] **Recherche: Progressive Depixelation (Canvas drawImage + imageSmoothingEnabled=false)**
- [x] **v4 gebaut: Progressive Depixelation statt hartem Crossfade**
- [x] **Desktop QA: Shatter ✓, Reassembly ✓, Depixelation ✓, Sharp Image ✓, Text ✓**
- [x] **Chris per Mail informiert**
- [ ] Chris v4 Feedback abwarten
- [ ] Mobile testen (agent-browser)
- [ ] Canvas-Text Alignment fixen

#### hero-v006-a: DESTILLIERT — Typographic Process Dissection
- [x] Awwwards SOTD analysieren (Aupale Vodka/Locomotive, Unseen Studio, Kris Temmerman)
- [x] Product-Dissection Pattern adaptieren fuer Webdesign-Prozess
- [x] Skills aktiv laden (text-animation, gsap-plugins, awwwards-animations)
- [x] 3 Phasen choreografieren und bauen (TYPOGRAFIE, BEWEGUNG, DESTILLIERT)
- [x] In components.json tracken
- [ ] Chris zeigen, Feedback einholen
- [ ] Uebergaenge zwischen Phasen verbessern
- [ ] Mouse-Parallax auf TYPOGRAFIE-Buchstaben

#### hero-v007-a: VOM PIXEL ZUR WEBSITE — Scroll-Driven Creation (VERWORFEN)
- [x] Chris-Feedback: "passiert nicht viel, langweilig" → nicht weiterverfolgt

#### hero-v008-a: TYPOGRAPHIC DEPTH — 3D Parallax Typography
- [x] Kris Temmerman recherchiert (neuroproductions.be, WebGPU, "Portfolio = Game")
- [x] Key Insight: Interaktivitaet fehlt in allen bisherigen Erlebnissen
- [x] Konzept: 3D Typography-Raum, Mouse steuert Perspektive, Scroll zoomt durch
- [x] Build: CSS 3D perspective + Canvas particles + Layer-Flash + Brand Reveal
- [x] components.json aktualisiert
- [x] Chris ueber v005-v007 per Mail informiert (3 neue Erlebnisse)
- [x] Chris-Feedback: "hat Potenzial, aber am Ende fehlt abschliessendes Element"
- [x] **v2: Impact-Finale — Partikel-Konvergenz → Orange Pulse → Brand materialisiert → CTA**
- [x] **Bug: Brand/Impact aus 3D-Camera extrahiert (z>perspective = unsichtbar)**
- [x] **QA: Alle 5 Phasen verifiziert (Initial → Zoom → Impact → Brand → CTA)**
- [x] **Chris per Mail informiert**
- [ ] Chris v2 Feedback abwarten
- [ ] Optional: WebGL-Upgrade fuer dramatischere Tiefe

#### hero-v009-a: MAGNETIC TYPE FIELD — Physics-Based Word Interaction
- [x] Awwwards SOTD analysiert (shed.design SOTD 23.03, Darknode SOTD 21.03)
- [x] Konzept: 30 Worte als Physik-Entitaeten, Mouse = Magnet, Scroll = Chaos→Ordnung→Brand
- [x] Build: DOM-Physics + Golden-Angle Formation + Cursor-Glow Canvas + Touch-Support
- [x] components.json aktualisiert
- [ ] Chris-Feedback einholen
- [ ] Physics-Konstanten feintunlen
- [ ] Lenis Smooth Scroll integrieren

#### hero-v010-a: CREATIVE VELOCITY — Horizontal Scroll Journey
- [x] Awwwards SOTD recherchiert (Yes Now Agency, ZettaJoule/Zypsy)
- [x] Erster horizontal-scroll Hero gebaut (5 Panels, containerAnimation)
- [x] Build erfolgreich, components.json aktualisiert
- [ ] ERLEBNIS Panel: echtes Visual (gemini-image oder Canvas-Effekt)
- [ ] CHAOS Panel: visuelle Elemente (Rechtecke, Kreise, Bilder)
- [ ] Lenis Smooth Scroll integrieren
- [ ] Per-Letter Animationen (aktuell word-level)
- [ ] Mobile QA (agent-browser)
- [ ] Chris zeigen

#### hero-v011-a: PIXEL FLOW — Vertikaler Pixel-Strom
- [x] Chris-Feedback (UID 11) verarbeitet: "durchgehender Fluss fehlt", 7.5/10 exp-signature-hero
- [x] FC Porto Memorial (SOTD 23.03.2026) analysiert — Tunnel Animation, Community Creativity 9.0
- [x] v1: Erster Hero mit PERSISTENTEM, LEBENDIGEM Element (horizontal)
- [x] **Chris-Feedback (UID 22): "richtig gut, weiter verfolgen. Scroll-Richtung + Pixeloptik"**
- [x] **v2: Vertikaler Strom (top→bottom) + Pixel-Aesthetik (1/5 Offscreen Canvas)**
- [x] **Desktop QA: Vertikaler Flow ✓, Pixel-Optik ✓, Text ✓, Branches ✓**
- [x] **Chris per Mail informiert**
- [x] **Chris v2 Feedback (UID 23): "ist zu pixelig"**
- [x] **v3: PIXEL_SCALE 5→2, proportionale Skalierung aller Werte**
- [x] **Chris per Mail informiert**
- [ ] Chris v3 Feedback abwarten
- [ ] Mobile QA
- [ ] Optional: Lenis Smooth Scroll
- [ ] Optional: Text-Glow wenn Strom nahe an Text ist

#### hero-v012-a: EDITORIAL CINEMA — Design-Driven Choreografie
- [x] Awwwards SOTD recherchiert (Unseen Studio 2025 Wrapped, Shed.design)
- [x] Choreografie-Konzept: 4 Phasen (Opening → Image Wipe → Services → Brand Close)
- [x] Hero-Bild generiert (gemini-image: orange Tinte in Wasser, 170KB WebP)
- [x] Erlebnis gebaut: Erster Hero OHNE Canvas/WebGL — pure GSAP Choreografie
- [x] Build erfolgreich, components.json aktualisiert
- [ ] Visual QA (Desktop + Mobile)
- [x] Chris per Mail informiert (zusammen mit v013-a)
- [x] **Chris-Feedback (UID 24): "gefaellt mir, auf der Stelle stehen + alles fliegt vorbei" → hero-v014-a**
- [ ] Optional: SplitText fuer character-level Brand-Reveal
- [ ] Optional: Echte Fotos / besseres Hero-Bild

#### hero-v013-a: CREATION TIMELINE — Scroll-Driven Video
- [x] Awwwards + Trends recherchiert (The Camel Fabric Game, Video-Trends 2026)
- [x] Konzept: Scroll = Zeitkontrolle, Video = Schoepfungsprozess
- [x] Video generiert (gemini-video Veo 3.1, 8s, 720p, orange embers, $1.20)
- [x] Erlebnis gebaut: Erster VIDEO-HERO (5 Phasen, scroll-driven video.currentTime)
- [x] Build erfolgreich, components.json aktualisiert
- [x] Chris per Mail informiert
- [ ] Video visuell pruefen
- [ ] Visual QA (Desktop + Mobile, agent-browser)
- [ ] Chris-Feedback abwarten
- [ ] Optional: 1080p/4K Video regenerieren
- [ ] Optional: Video-Poster-Frame als Fallback

#### hero-v014-a: STILL POINT — Pinned Creative Storm
- [x] Chris-Feedback (UID 24) als Inspiration: "auf der Stelle stehen, alles fliegt vorbei"
- [x] Utopia Tokyo (SOTD 16.03.2026, 8/8/8/8) analysiert — GSAP + immersive scroll
- [x] Konzept: Gesamter Viewport pinned, 5 Phasen, 18 Worte + 10 Formen fliegen durch
- [x] Erlebnis gebaut: Erste PINNED experience im Lab
- [x] Build erfolgreich, components.json aktualisiert
- [x] Chris per Mail informiert
- [ ] Chris-Feedback abwarten
- [ ] Mobile QA
- [ ] Optional: Lenis Smooth Scroll
- [ ] Optional: Mouse-Interaction (Worte weichen Maus aus)

#### hero-v015-a: LIQUID GLASS — Erster WebGL Shader
- [x] Tiefe Analyse: 14 Heroes 0 WOW — fundamentales Problem identifiziert
- [x] Referenz-Analyse: Lusion, Immersive Garden, makemepulse (WebGL als Kern)
- [x] Paradigmenwechsel: Erster GLSL Fragment Shader statt Canvas 2D / DOM
- [x] Hero-Bild generiert (gemini-image, cinematic studio, $0.10)
- [x] Erlebnis gebaut: react-three-fiber + simplex noise + chromatic aberration
- [x] Build erfolgreich, components.json aktualisiert
- [x] Chris per Mail informiert
- [ ] Visuelles QA (Desktop + Mobile)
- [ ] Chris Feedback abwarten
- [ ] Optional: Lenis Smooth Scroll
- [ ] Optional: Sound Toggle

#### hero-v016-a: METAMORPHIC — Erster 3D-Objekt-Hero
- [x] WebGL-Recherche: Fluid Sim, Morphing Spheres, Codrops Twisted Spheres
- [x] Awwwards-Recherche: Artem Shcherban (SOTD 22.03), PARTICOLARE STUDIO (SOTD 20.03)
- [x] Konzept: Lebende 3D-Form, IcosahedronGeometry detail 6, 3D Simplex Noise Vertex Displacement
- [x] Erlebnis gebaut: Blinn-Phong Three-Point Lighting, Fresnel, Irideszenz, Lenis Smooth Scroll
- [x] Build erfolgreich, components.json aktualisiert
- [x] Chris per Mail informiert (run-20260324-1320)
- [ ] Chris Feedback abwarten
- [ ] Visuelles QA (Desktop + Mobile)
- [ ] Optional: Post-Processing (Bloom)
- [ ] Optional: Environment Map fuer Reflektionen
- [ ] Optional: Blob reagiert auf Cursor-Naehe (Vertex-Displacement)

#### hero-v017-a: PRISM — Glass Diamond (MeshTransmissionMaterial)
- [x] Chris-Feedback (UID 25): "sinnvolle 3D-Objekte erstellen + Skills die helfen"
- [x] WebGL-Richtung BESTAETIGT ("Gute Idee")
- [x] 3 Skills installiert: meshy-3d-generation, blender-web-pipeline, 3d-model-generation
- [x] Recherche: Meshy AI (Text→3D→GLB), Sketchfab (CC0), Blender Pipeline
- [x] hero-v017-a gebaut: Erster TRANSPARENTER 3D-Hero (Glass Diamond)
- [x] MeshTransmissionMaterial: Refraction, Chromatic Aberration, Environment-HDRI
- [x] Build erfolgreich, components.json aktualisiert
- [x] Chris per Mail informiert + Meshy API-Key angefragt
- [ ] Chris Feedback abwarten
- [ ] Chris Meshy-Entscheidung abwarten
- [ ] Visuelles QA (Desktop + Mobile)

#### Naechstes Erlebnis: hero-v018-a — GLTF OBJECT HERO
- [ ] Wenn Meshy-Key: Text→3D Laptop/Tool generieren, laden mit useGLTF
- [ ] Wenn KEIN Meshy-Key: Sketchfab CC0 Modell laden + Custom Shader
- [ ] useGLTF-Workflow demonstrieren (echtes 3D-Modell + Custom Material)

#### Backup: FBO PARTICLE MORPH
- [ ] **FBO Particles recherchiert (2026-03-24):** GPGPU-Partikel, Positionen in DataTexture, Simulation-Shader off-screen, 16K+ Partikel bei 60fps
- [ ] **Konzept:** Chaos → Wolke → Kristall → PixIntCreators Text (scroll-driven morph)
- [ ] **Technik:** DataTexture + Off-screen FBO + MeshSurfaceSampler + GSAP ScrollTrigger
- [ ] **Quellen:** Maxime Heckel (R3F FBO), Loopspeed (scroll-driven FBO), bandinopla (Fluid Sim)

#### Backup: Fluid Simulation
- [ ] Navier-Stokes in GLSL (Multi-Pass: Velocity, Pressure, Advection, Render)
- [ ] bandinopla/threejs-fluid-simulation (WebGL + WebGPU)
- [ ] Einsatz: Mouse-reaktive Fluid-Hintergruende, Smoke/Plasma-Effekte

#### Skill-Discovery
- [x] threejs-webgl und react-three-fiber Skills in Build geladen (v016-a)
- [x] find-skills: 3 neue 3D-Skills installiert (meshy, blender-pipeline, 3d-model-gen)
- [ ] shadertoy Skill fuer GLSL-Referenz nutzen
- [ ] Meshy-Workflow testen (wenn API-Key vorhanden)

---

## Abgeschlossene Phase: Prozess-Optimierung (2026-03-22 bis 2026-03-24)

### Erkenntnisse (behalten)
- Opus fuer Kreativ/WOW, Sonnet fuer systematische Arbeit
- Assets-First + Manifest = Builder nutzt sie alle
- Agent-Tool > tmux
- Builder = Spec-Qualitaet
- Modell-Hierarchie: Opus > Codex > Sonnet > Haiku
- GSAP + Lenis = Industriestandard (100% der Awwwards-Gewinner)
- Choreografie-Qualitaet > Tools/Assets (Easing, Timing, Uebergaenge)
- Keine Preset-Libraries bei Award-Sites (kein animate.css, AOS etc.)

### Was sich geaendert hat
- ~~Verschiedene Modelle vergleichen~~ → Verschiedene Skills/Prompts iterieren
- ~~Neue Repos + Vercel Deploys~~ → Direkt im Component Lab
- ~~"Baue Hero + 7 Sektionen"~~ → "Choreografiere ein Erlebnis"
- ~~Autonom bis v12 polieren~~ → Frueh zeigen, zusammen iterieren
- ~~Skills nur installieren~~ → Skills AKTIV ins Konzept laden

### Externe Experimente (Archiv, nicht fortgesetzt)
- exp-signature-hero: 7.5/10 Chris — "Solide aber man vergisst sie", durchgehender Fluss fehlt
- exp-story-editorial v6: deployed, wartet auf Feedback
- exp-cinematic-dark v2: 7.5/10, Referenz
- exp-morphic-flow v3: ~7/10, Pipeline-Test
- exp-kinetic-type: ~6.5/10, Reproduzierbarkeit
- exp-parallel-dark/light: 5.3/4.6, Parallel-Test
- exp-haiku-test: 3.0/10, Modell-Test
- exp-codex-test: ~6.5/10, Codex-Test
- exp-scroll-story: ~4.5/10, Skill-Test
- 15 Prozess-Experimente insgesamt

---

## Metriken
- **Erlebnisse im Lab:** 17 (hero-v001 bis v017)
- **Chris "WOW":** 0 (Ziel: mindestens 1)
- **Skills aktiv genutzt:** 7 (text-animation, gsap-plugins, awwwards-animations, gemini-video, react-three-fiber, threejs-webgl, **meshy-3d-generation** NEU)
- **Neue Technik:** PRISM (hero-v017-a) — erster TRANSPARENTER 3D-Hero, MeshTransmissionMaterial (Glass Refraction)
- **WebGL-Tiefe:** v015-a (2D Fragment) → v016-a (3D Vertex+Fragment) → v017-a (MeshTransmissionMaterial)
- **Material-Paradigmen:** Opak (Custom GLSL) → Transparent (drei Transmission) → Naechstes: GLTF-Modelle
- **Paradigmenwechsel:** Von Canvas 2D / DOM zu WebGL Shader (wie Award-Studios)
- **Erlebnis-Typen abgedeckt:** typografie-only, generative-art, scroll-storytelling, 3d-szene, interaktiv, horizontal-scroll, single-element, editorial, video-hero, pinned-experience, webgl-shader, 3d-objekt, **glass-transmission** (NEU)
- **Inspiration-Analysen:** 15 (+Artem Shcherban, +PARTICOLARE STUDIO)
- **Bester Chris-Score (extern):** 8/10 (exp-signature-hero)
- **Asset-Kosten gesamt:** ~$2.50 (video + images)
- **3D-Objekt-Skills installiert:** meshy-3d-generation, blender-web-pipeline, 3d-model-generation
