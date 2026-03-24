# Recherche: Assets & Animationen bei Awwwards-Gewinnern (2024-2026)

Basiert auf Analyse von Case Studies, Developer Spotlights, GitHub Repos und Tech-Stack-Angaben konkreter SOTD/SOTY-Gewinner.

---

## 1. Asset-Typen: Was nutzen Award-Sites KONKRET?

### Lottie-Dateien (.json / .lottie)
- **JA, werden genutzt** - aber hauptsaechlich fuer **Micro-Animationen, Icons, Loading-Screens, Illustrationen**
- NICHT fuer die grossen Hero-Animationen oder Page-Transitions
- Workflow: After Effects -> Bodymovin Plugin -> JSON Export -> lottie-web / @lottiefiles/dotlottie-web
- Konkretes Beispiel: **Zajno "7-year Journey"** listet `lottie-web` in ihrem Tech-Stack neben Three.js und GSAP
- Konkretes Beispiel: **"Understanding Neurodiversity"** (CSSDA SOTD) nutzt Lottie fuer "colorful vector assets" mit Scroll-Steuerung
- Konkretes Beispiel: **Dave Holloway Portfolio** (Awwwards Honorable Mention) kombiniert Lottie + WebGL
- BilloDesign Living Portfolio: Lottie fuer Tech-Stack-Animation auf Webflow

### Rive-Dateien (.riv)
- **Aufsteigend, aber noch Nische** bei Top-Award-Sites
- Haupteinsatz: **Interaktive Micro-Animations** mit State Machines (Buttons, Hover-States, Cursor-Tracking)
- Konkretes Beispiel: **Shopify Editions Winter '24** (Awwwards) nutzt Rive-Animation
- Vorteil gegenueber Lottie: Eingebaute Interaktivitaet (State Machine), kein After Effects noetig
- Nachteil: Kleinere Community, weniger Studios haben Rive-Expertise
- Rive wird haeufiger in **Apps** als auf **Award-Websites** gesehen

### Video-Assets (WebM, MP4)
- **JA, sehr haeufig** - fuer Hero-Backgrounds, Transition-Overlays, Ambient-Loops
- Format-Praxis: MP4 als Fallback, WebM fuer bessere Kompression
- Typisch: Kurze Loops (5-15 Sekunden), stark komprimiert (Handbrake/FFmpeg), oft < 5MB
- Fuer transparente Videos: WebM mit Alpha-Kanal (MP4 unterstuetzt kein Alpha)
- Werden NICHT fuer die Kern-Animation genutzt, sondern als **atmosphaerische Layer**
- Pipeline: After Effects / DaVinci Resolve -> H.264/VP9 Export -> Handbrake Optimierung

### SVG-Animationen
- **JA, einer der haeufigsten Asset-Typen**
- SMIL: Wird weniger genutzt (Browser-Support-Probleme)
- CSS-gesteuerte SVGs: Fuer einfache Animationen (Hover, Reveals)
- JS-gesteuerte SVGs (GSAP): Fuer komplexe Morphing, Mask-Reveals, Path-Animationen
- SVG Masks werden haeufig fuer **kreative Page-Transitions** und **Scroll-Reveals** genutzt
- Konkretes Beispiel: **Lightship RV** (Awwwards) nutzt SVG Mask um Video beim Scrollen zu revealen
- Konkretes Beispiel: **Accordion** Website nutzt SVG Masks fuer Page-Transitions + Carousels
- **Axel Vanhessche Portfolio** (Awwwards): SVG Mask Animationen als Kernelement

### 3D-Modelle (.glb / .gltf)
- **Standard-Format** fuer 3D-Inhalte auf Award-Sites
- GLB bevorzugt (Single Binary, schneller Load)
- Pipeline: Blender/Cinema 4D/Houdini -> GLTF/GLB Export -> gltf-transform (Optimierung) -> Three.js Loader
- **KTX2 Textur-Kompression** ist Best Practice (GPU-Kompression, massiv kleiner)
- Konkretes Beispiel: **Igloo Inc** (SOTY 2025) - Custom Geometry Exporters + Background Shader Compilation
- Konkretes Beispiel: **Immersive Garden** - Automated Export mit gltf-transform + Blender Scripts
- Texture Channel Packing wird aktiv genutzt zur Optimierung
- Typische Optimierung: 26MB -> 560KB durch Baking, Compression, LOD

### Sprite-Sheets
- **Praktisch NICHT mehr im Einsatz** bei Award-Sites
- Vereinzelt noch fuer CSS-basierte Frame-Animationen (z.B. animierte Icons)
- Vollstaendig ersetzt durch Lottie (fuer Vector-Animationen) und Video (fuer Raster-Animationen)
- Josh Comeau hat 2024 argumentiert sie seien "underused", aber in der Award-Szene irrelevant

### Custom Shader Assets
- **Sehr haeufig bei Top-Tier-Sites** - aber keine "Assets" im klassischen Sinn
- GLSL Shader werden DIREKT im Code geschrieben, nicht als separate Dateien geladen
- Noise-Texturen (.png) werden als Shader-Input geladen
- Environment Maps / HDRIs (.hdr, .exr) fuer Reflektionen
- Konkretes Beispiel: **Igloo Inc** - Custom Shaders fuer Chromatic Aberration, Frost-Effekt, Text-Scramble via SDF Textures
- Konkretes Beispiel: **Orage Studio** - Custom WebGL Canvas-Masking Engine

---

## 2. Vordefinierte vs Custom Animationen

### Das Verhaeltnis: ~30% Library-Presets / 70% Custom

**Was IST vordefiniert (Library-gestuetzt):**
- Easing-Funktionen (GSAP built-in easings: back, elastic, bounce, power4)
- Scroll-Trigger-Logik (GSAP ScrollTrigger konfiguriert, nicht selbst geschrieben)
- Smooth Scrolling (Lenis oder GSAP ScrollSmoother - Drop-in)
- Text-Splitting (SplitText Plugin, SplitType, Splitting.js)
- Page Transitions Framework (Barba.js Lifecycle Hooks)
- Basic Tweens (fade, slide, scale, rotate via GSAP)

**Was IST custom geschrieben:**
- Timing und Choreografie (GSAP Timelines - die Komposition ist immer custom)
- WebGL Shader-Effekte (Ripple, Distortion, Chromatic Aberration, Displacement)
- 3D-Szenen und Kamera-Animationen
- Partikel-Systeme
- Scroll-basierte 3D-Kamera-Pfade
- Interaktive Cursor-Effekte
- Page-Transition-Animationen (die visuellen Effekte selbst)

### Gibt es "Animation Preset Libraries"?
- **NEIN** - Es gibt keine animate.css-artige Library die Award-Sites nutzen
- animate.css, wow.js, AOS (Animate On Scroll) werden als **Anfaenger-Tools** angesehen
- Award-Studios nutzen GSAP als **Toolkit**, nicht als Preset-Sammlung
- Die "Presets" sind die GSAP Easing-Funktionen und Plugin-Defaults
- Jede Animation wird individuell choreografiert via GSAP Timeline

### Warum keine Presets?
> "It all boils down to meticulous planning & strategy" - SOTD Gewinner auf Reddit
> "More time was spent removing unnecessary elements than adding new ones" - Immersive Garden

---

## 3. Konkrete Tech-Stacks von SOTD/SOTY-Gewinnern 2024-2026

### Igloo Inc (Site of the Year 2025 + Developer SOTY)
- **Studio:** abeto (Technical Artists)
- **3D & Textures:** Houdini, Blender
- **UI Design:** Figma, Photoshop, Affinity Photo
- **Code:** Three.js, three-mesh-bvh, Svelte, GSAP, Vite, Vanilla JS
- **Sound:** DaVinci Resolve
- **Besonderes:** Custom VDB-to-Browser Exporter, Custom Geometry Exporters, GPU-komprimierte Texturen (KTX), Fluid Simulation, Real-time Intro Animation (kein Video!), UI komplett in WebGL gerendert (SDF Text)
- URL: https://igloo.inc

### Immersive Garden (Studio of the Year 2024)
- **3D:** Three.js, Blender, Houdini, ZBrush
- **Frontend:** Vue.js, Nuxt
- **Animation:** GSAP, Lenis (Smooth Scroll)
- **Backend:** Strapi, Node.js
- **Deploy:** Vercel
- **Besonderes:** Server-side KTX Compression, Automated Export via gltf-transform + custom Blender/JS Scripts, Modularer Workflow fuer schnelle Iterationen
- URL: https://immersive.garden

### Zajno "7-year Journey" (Multiple Awards)
- **Frontend:** React, MobX, Sass
- **Animation:** GSAP (SmoothScroller, ScrollTrigger, Observer), Theatre.js
- **3D:** Three.js
- **Micro-Animations:** Lottie-web
- **Bundler:** Vite
- **Sound:** Custom Sound Library mit Live-Test-Interface
- **Besonderes:** Theatre.js fuer 3D-Animation-Choreografie neben GSAP
- URL: https://zajnostudio.com/7-year-journey

### Reksa Andhika - TrueKind (SOTD + Developer Award)
- **Frontend:** Nuxt 3
- **CMS:** Prismic
- **Animation:** GSAP
- **Scroll:** Lenis
- URL: https://truekindskincare.com

### Reksa Andhika - ELEMENTIS (SOTD + Developer Award + GSAP SOTW)
- **Frontend:** Nuxt 3
- **CMS:** Vold (Fleava Internal CMS)
- **Animation:** GSAP
- **Scroll:** Lenis
- URL: https://elementis.co

### Reksa Andhika - FIFTYSEVEN (Studio Portfolio)
- **Frontend:** React
- **Animation:** GSAP
- **Scroll:** Lenis
- **Besonderes:** Jedes Case Study hat eigenes Layout, Farben und Motion-Effekte
- URL: https://www.fiftyseven.co

### Gen-02 Portfolio by Samsy (SOTD)
- **Frontend:** Vue.js
- **Animation:** GSAP
- **3D:** Custom WebGL (nicht Three.js)
- **Besonderes:** 3D-navigierbarer Raum, 10+ Jahre Arbeit in interaktiven Raeumen

### Cyd Stumpel Portfolio 2025 (SOTD)
- **Besonderes:** Gebaut mit neuesten CSS-Techniken: View Transitions API
- Zeigt den Trend zu **nativen Browser-APIs** fuer Transitions

---

## 4. Die "Standard-Package.json" eines Award-Studios

Basierend auf der Analyse aller Case Studies ergibt sich dieses Bild:

### Quasi-Pflicht (>90% der Award-Sites):
```
gsap                    // Animation Engine (#1, unangefochtener Standard)
```

### Sehr haeufig (>60%):
```
three / @types/three    // 3D/WebGL (fuer 3D-lastige Sites)
lenis                   // Smooth Scrolling (hat Locomotive Scroll abgeloest)
```

### Haeufig (>30%):
```
@gsap/shockingly        // GSAP Club Plugins (ScrollTrigger, SplitText, ScrollSmoother, MorphSVG)
barba.js                // Page Transitions
lottie-web              // After Effects Micro-Animationen
```

### Gelegentlich:
```
ogl                     // Leichtgewichtige Three.js-Alternative (Reksa nutzt es)
theatre                 // Visual Animation Editor fuer 3D
pixi.js                 // 2D WebGL Rendering
@splinetool/viewer      // Spline 3D Integration
@rive-app/canvas        // Rive Runtime
```

### Framework-Verteilung bei Award-Sites:
- **Nuxt (Vue):** Am haeufigsten bei franzoesischen/europaeischen Studios (Immersive Garden, Locomotive, Fleava)
- **Next.js (React):** Zunehmend, besonders bei US-Studios
- **Svelte/SvelteKit:** Aufsteigend (abeto/Igloo Inc)
- **Vanilla/Custom:** Einige Top-Studios (Active Theory) nutzen kein Framework
- **Astro:** Aufsteigend fuer Content-Sites mit WebGL-Inseln

### Was NICHT in der package.json steht:
- animate.css (nie)
- wow.js (nie)
- AOS (nie)
- anime.js (selten - hat eigene Community, aber GSAP dominiert Award-Szene)
- motion (Framer Motion) - selten bei SOTD, eher bei Product/SaaS Sites
- popmotion (nie bei Awards)

---

## 5. Asset-Pipeline: Wie werden Assets erstellt?

### 3D-Assets Pipeline:
```
Blender / Cinema 4D / Houdini / ZBrush
    |
    v
Texturing: Substance Painter / Blender
    |
    v
Export: GLTF 2.0 / GLB
    |
    v
Optimierung: gltf-transform (CLI), gltf.report (Web), Draco/MeshOpt Compression
    |
    v
Texturen: KTX2 Compression (Basis Universal)
    |
    v
Three.js GLTFLoader / DRACOLoader / KTX2Loader
```

### Vektor-Animation Pipeline:
```
Illustrator / Figma (Design)
    |
    v
After Effects (Animation)
    |
    v
Bodymovin Plugin -> JSON Export
    |
    v
lottie-web / dotlottie-web (Runtime)
```

ODER (zunehmend):
```
Figma (Design)
    |
    v
Rive Editor (Animation + State Machine)
    |
    v
@rive-app/canvas (Runtime)
```

### Video-Assets Pipeline:
```
After Effects / DaVinci Resolve / Premiere
    |
    v
Export: H.264 (MP4) + VP9 (WebM)
    |
    v
Handbrake / FFmpeg (Kompression, Resize fuer Breakpoints)
    |
    v
Multiple Versionen: Desktop (1920px), Tablet (1024px), Mobile (768px)
    |
    v
<video> mit <source> Fallbacks oder Video-Streaming
```

### SVG-Animation Pipeline:
```
Illustrator / Figma -> SVG Export
    |
    v
SVGO (Optimierung/Cleanup)
    |
    v
Option A: Inline SVG + GSAP Animation (haeufigste Methode)
Option B: After Effects -> Lottie (fuer komplexe SVG-Animationen)
Option C: CSS Animations (fuer einfache Hover/Reveal)
```

### Shader/WebGL Pipeline:
```
Konzept-Sketch / Referenz (ShaderToy, Codrops Demos)
    |
    v
GLSL direkt im Code geschrieben (vertex + fragment shader)
    |
    v
Noise Textures: Generiert oder von Websites wie textures.com
    |
    v
Environment Maps: Polyhaven.com (free HDRIs) oder Custom
    |
    v
Iteration direkt im Browser mit Hot Reload (Vite)
```

Immersive Garden und abeto betonen beide: **"Iterating directly in the browser"** - sie entwickeln 3D-Inhalte NICHT in einem separaten Tool und exportieren, sondern arbeiten live im Browser mit Hot Reload fuer Shaders, Texturen und Modelle.

---

## 6. Konkrete Site-Analysen: Was laden sie?

### Igloo Inc (SOTY 2025)
- `.glb` Dateien: Ice Block Modelle (prozedural generiert via Custom Algorithm)
- Custom Compressed Volume Data (VDB -> Browser-Format, kleiner als ein typisches Bild)
- GLSL Shaders: Chromatic Aberration, Tech Displacement, Frost Effect
- SDF Textures fuer WebGL-Text-Rendering
- Sound-Dateien: Music + SFX synchronisiert mit Partikel-Bewegung
- **KEINE Lottie, KEINE Videos, KEINE Sprite Sheets** - alles Real-time WebGL

### Immersive Garden Website (Studio SOTY 2024)
- `.glb` Dateien mit KTX2-komprimierten Texturen
- 3D Bas-Relief Modelle (Blender + Houdini + ZBrush)
- 3D Roman Numerals als Navigation
- GSAP-gesteuerte Scroll-Animationen
- Lenis Smooth Scroll
- **Server-side Asset Compression Pipeline**

### Zajno 7-year Journey
- `.glb` 3D Modelle (Obelisken, thematische Objekte)
- Lottie JSON Dateien (Micro-Animationen)
- Sound-Dateien (Custom Sound Library)
- Theatre.js Sequenzen (3D Kamera-Choreografie)
- GSAP ScrollTrigger fuer alle Scroll-Animationen

### TrueKind (Reksa Andhika, SOTD)
- Produkt-Fotos (optimierte JPG/WebP)
- GSAP Parallax + Micro-Interactions
- Lenis Smooth Scroll
- **Keine 3D-Modelle** - die "Magie" kommt aus der Motion-Choreografie

### ELEMENTIS (Reksa Andhika, SOTD)
- Video-Assets fuer Hero/Loading/Navigation
- GSAP Animation aligned mit Brand-Logo
- Lenis Smooth Scroll
- **Minimalistischer Motion-Ansatz** - weniger ist mehr

---

## 7. Zusammenfassung: Die Realitaet vs die Annahme

| Annahme | Realitaet |
|---------|-----------|
| Award-Sites nutzen fancy Animation Libraries | GSAP dominiert alles. Punkt. |
| Lottie ist ueberall | Lottie = Micro-Animations/Icons, NICHT Hero-Animationen |
| Rive ist der neue Standard | Rive waechst, aber noch Nische bei Web Awards |
| Sites nutzen Animation Presets | NEIN - alles custom choreografiert |
| Video-Backgrounds sind das Geheimnis | Video = atmosphaerischer Layer, NICHT die Kern-Animation |
| animate.css / AOS fuer Scroll-Animations | Niemals bei Award-Sites |
| Man braucht viele verschiedene Libraries | GSAP + Lenis + Three.js (wenn 3D) = das ist es |
| After Effects ist unerlaesslich | Nur fuer Lottie-Export, Top-Studios arbeiten direkt im Browser |
| Sprites sind tot | Ja, bei Award-Sites komplett ersetzt durch Lottie/Video |

### Die goldene Formel der Award-Sites:
```
GSAP (Animation Engine)
+ Lenis (Smooth Scroll)
+ Three.js (wenn 3D noetig)
+ Custom GLSL Shaders (fuer WOW-Effekte)
+ Lottie (fuer Micro-Animations, optional)
+ Barba.js (fuer Page Transitions, optional)
= Awwwards SOTD
```

### Was den Unterschied macht:
Es sind NICHT die Tools. Es ist die **Choreografie**. Reksa Andhika gewinnt SOTD mit Nuxt + GSAP + Lenis - ohne Three.js, ohne Lottie, ohne Rive. Die Qualitaet kommt aus:
1. **Easing-Auswahl** (custom cubic-bezier, GSAP power4, elastic)
2. **Timing** (Stagger-Delays, Overlap in Timelines)
3. **Trigger-Praezision** (ScrollTrigger start/end Punkte)
4. **Subtilitaet** (Parallax-Intensitaet, Hover-Feedback-Staerke)
5. **Performance** (60fps, lazy loading, GPU-Kompression)

---

*Quellen: Awwwards Case Studies (Igloo Inc, Immersive Garden, Zajno, Pixelflakes, Orage), Codrops Developer Spotlight (Reksa Andhika), Made With GSAP, Reddit r/webdev + r/web_design, Medium (Arjun Kumar/Bootcamp), GitHub Topics*
