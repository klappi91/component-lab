# Component Lab — Constitution v15

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

### Design-Feedback (2026-03-23/24)
- **DURCHGEHENDER FLUSS** — "die ganze Zeit irgendein Element sich mitbewegt" = DAS macht Awwwards-Sites aus. Score 7.5/10 fuer exp-signature-hero v7 WEIL dieser Fluss fehlt. "Man hat sie vergessen nachdem man sie verlassen hat."
- **UEBERGAENGE SPIELERISCH** — Sektions-Uebergaenge duerfen nicht nur Scrollen sein, sie brauchen visuelle Verbindung
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
- **Continuous Flow Stream** (Canvas fixed + Catmull-Rom spline + Partikel) — persistentes lebendes Element das den gesamten Scroll-Journey verbindet. Sinusoidal path mit scroll-driven Amplitude/Frequenz/Phase. Motion-Trail via semi-transparent clear (rgba statt clearRect). Glow-Layers (5 passes, wide/faint → narrow/bright). Branching-Stream in Energiephase. Partikel fliessen IMMER (auch ohne Scrollen) = "always alive". Mouse-Displacement auf Pfad-Kontrollpunkte + Partikel-Repulsion.
- **Low-Res Pixel Rendering** (Offscreen Canvas + imageSmoothingEnabled=false) — Offscreen Canvas bei 1/N Aufloesung erstellen, ALLES dort zeichnen (Strom, Partikel, Glow), dann per `drawImage` auf volle Groesse hochskalieren. Nearest-Neighbor Interpolation gibt automatisch Pixel-Look. `pixSnap()` fuer Grid-Snapping, `fillRect` statt `arc`, `lineCap:"square"`. PIXEL_SCALE=5 = chunky, =3 = feiner. Performant weil weniger Pixel gezeichnet werden.
- **WebGL Image Distortion Shader** (react-three-fiber + custom GLSL) — Bild als Textur auf Plane, 3 Octaves Simplex Noise fuer fluessige Verzerrung, Mouse-Position als Ripple-Displacement, Scroll-Progress steuert Distortion-Amplitude (exponentieller Falloff: `dist*dist`). Chromatic Aberration proportional zur Verzerrung. Cover-UV-Berechnung im Shader fuer responsives Aspect-Ratio. Mouse-Lerp im useFrame (`factor 0.06`) gibt physisches Gefuehl. `dynamic(() => ..., { ssr: false })` noetig fuer Next.js. `dpr={[1, 1.5]}` fuer Performance.
- **3D Vertex Displacement Blob** (IcosahedronGeometry detail 6 + custom Vertex Shader) — 3 Octaves 3D Simplex Noise displacen Vertices entlang Normalen. Finite-Difference Normal Computation: 2 Tangent-Offsets (eps=0.01) + Cross-Product fuer korrekte Specular-Highlights. World-Space Normals via `mat3(modelMatrix)` (NICHT `normalMatrix` — das ist View-Space). Blinn-Phong Three-Point Lighting: Orange Key (follows mouse, lerp 0.05), Cool Fill, White Rim. Fresnel-Glow (power 3.5) + Irideszenz (view-angle dependent sine-based hue shift). Reinhard Tonemapping (`color/(color+1)`) verhindert Specular-Clipping. Scroll-driven Parameter-Curves via smoothstep-Blending zwischen Phasen. Lenis Smooth Scroll + GSAP ScrollTrigger Integration.

- **MeshTransmissionMaterial Glass Diamond** (drei MeshTransmissionMaterial + LatheGeometry) — Transparentes 3D-Objekt mit Screen-Space Refraction. Props animierbar via ref (`matRef.current.distortion = X`). Braucht `Environment` HDRI fuer Refraction-Content (sonst nichts sichtbar durch Glass). Performance: `resolution={256}`, `samples={6}`. `backside` fuer Innenseiten-Rendering. `ACESFilmicToneMapping` + `toneMappingExposure: 1.2` fuer Kino-Look. LatheGeometry mit 6 Profil-Punkten + 8 Segmenten = Diamond-Silhouette (pavilion + girdle + crown + table). `Environment preset="city" background={false}` = HDRI nur fuer Reflections, nicht als Background.

- **GPGPU FBO Particle System** (react-three-fiber + FBO Ping-Pong) — 16K+ Partikel-Positionen in Float-Texturen (128x128 DataTexture). Zwei WebGLRenderTarget fuer Ping-Pong: Frame N liest FBO-A, Simulation-Shader schreibt nach FBO-B, Swap. Simulation-Scene: eigene THREE.Scene + OrthographicCamera(-1,1,1,-1,0,1) + PlaneGeometry(2,2) als Fullscreen-Quad. `gl.setRenderTarget(fbo); gl.clear(); gl.render(simScene, simCam); gl.setRenderTarget(null)`. Render: Points-Geometry mit `reference` Attribut (UV ins FBO), Vertex Shader liest Position per `texture2D(uPositions, reference)`. WICHTIG: `gl_PointSize` bei 16K Partikeln + AdditiveBlending KLEIN halten (factor ~40, nicht 250!) — sonst saturiert alles zu Weiss. Alpha ~0.4 pro Partikel. `frustumCulled={false}` + manuelle `boundingSphere` da position-Attribut Dummy ist. DataTexture braucht `NearestFilter` fuer Vertex Texture Fetch. Curl Noise (6x Simplex Noise Ableitungen) fuer divergenz-freie Turbulenz.

## Wege zu sinnvollen 3D-Objekten
1. **Meshy AI** (meshy.ai) — Text/Image → 3D → GLB. Pro-Plan ~$20/Monat fuer API. Skill: meshy-3d-generation
2. **Sketchfab** — 800k+ CC-lizenzierte GLB-Modelle (manueller Download)
3. **Procedural** — LatheGeometry, ExtrudeGeometry, CSG in Three.js
4. **Blender Pipeline** — Python-scripted GLTF Export. Skill: blender-web-pipeline
5. **useGLTF** (drei) — Laedt GLB/GLTF in R3F. Custom Materials drauf anwendbar.

### Meshy AI Pipeline (GETESTET, funktioniert)
```
Text-Prompt → POST /openapi/v2/text-to-3d (preview, 20cr, ~90s)
→ POST /openapi/v2/text-to-3d (refine, 10cr, ~110s)
→ Download GLB (20-30 MB)
→ npx @gltf-transform/cli optimize input.glb output.glb --compress draco --texture-compress webp
→ Output: ~1-2 MB GLB (97% Reduktion!)
→ useGLTF("/models/model.glb") in R3F
→ scene.clone(true) + traverse + custom MeshStandardMaterial
```
**Kosten:** 30 Credits pro Modell (~$0.60). Balance: 1.500 Credits.
**Qualitaet:** Gut fuer stilisierte Heroes, aber AI-Artefakte sichtbar. Nicht photoreal.
**Tipp:** Sprite mit RadialGradient-Texture > Plane fuer Glow-Effekte in 3D-Szenen.
**Tipp:** Emissive und Lichtintensitaet ZURUECKHALTEN — mehrere orange Lichtquellen + Emissive = alles wird orange.

## Paradigmenwechsel: WebGL > Canvas 2D > DOM

Award-Studios (Lusion, Immersive Garden, makemepulse) nutzen WebGL/GLSL als KERN. Nicht als Add-On. Canvas 2D und DOM-Animationen sind fuer 7/10. Fuer 9+/10 braucht es Shader. Die Reihenfolge fuer Impressivitaet:
1. **Custom GLSL Shader** (Distortion, Fluid, Particles) → WOW
2. **Three.js 3D Scenes** (Interactive Objects, Environments) → Impressive
3. **Canvas 2D** (Particles, Streams, Effects) → Good
4. **DOM + GSAP** (Transforms, Reveals, Pins) → Baseline

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
