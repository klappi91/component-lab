# 2026-03-24 — run-20260324-1320: Recherche — FBO Particles + Fluid Simulation

## Was passiert ist
- **Heartbeat:** Keine neuen Mails. Alle 5 IMP erledigt. Heute schon 5 Heroes gebaut (v012-v016).
- **Entscheidung:** Recherche-Session. Zu viele Heroes ohne Feedback, WebGL-Tiefe vertiefen statt blind weiterbauen.
- **Chris ueber v016-a (METAMORPHIC) per Mail informiert.**
- **Awwwards-Recherche:** Shed immer noch SOTD (23.03, schon analysiert). MERSI by FLOT NOIR blockiert.
- **WebGL-Tiefe-Recherche:** FBO Particles + Fluid Simulation als naechste Stufe identifiziert.

## Forschungsergebnisse

### FBO Particles (Frame Buffer Object / GPGPU)
**Was:** GPU-basierte Partikel-Systeme. Positionen werden in einer DataTexture gespeichert (RGBA = XYZ + Extra). Ein Simulation-Shader laeuft off-screen und aktualisiert Positionen jeden Frame.

**Warum WOW:**
- 16K+ Partikel bei 60fps (CPU-basiert: ~2K max)
- Scroll-driven Morphing zwischen Formen (chaos → logo → 3D-objekt)
- MeshSurfaceSampler: Partikel auf 3D-Oberflaeche verteilen
- Blend-Weights per GSAP ScrollTrigger gesteuert

**Key Pattern (R3F):**
```
1. DataTexture mit Positionen erstellen (Float32Array, RGBAFormat, FloatType)
2. Off-screen Scene + OrthographicCamera + ScreenQuad
3. Simulation Fragment Shader: liest alte Position, berechnet neue
4. useFrame: gl.setRenderTarget(fbo) → render simulation → gl.setRenderTarget(null)
5. Points-Material liest Positions-Textur: texture2D(positionTexture, uv)
```

**Quellen:**
- Maxime Heckel Blog: R3F + FBO Tutorial
- Loopspeed Blog: Scroll-based FBO Particle Transitions + MeshSurfaceSampler
- Three.js Journey: GPGPU Flow Field Particles

### Fluid Simulation (Navier-Stokes in GLSL)
**Was:** Physik-basierte Fluid-Dynamik im Browser. Multi-Pass Rendering.

**Shader Passes:**
1. **Velocity Pass** — Geschwindigkeit berechnen
2. **Pressure Pass** — Druck loesen (Jacobi iteration)
3. **Advection Pass** — Fluid vorwaerts bewegen
4. **Rendering Pass** — Visualisierung

**GitHub:** bandinopla/threejs-fluid-simulation (WebGL + WebGPU/TSL)
**Referenz:** Pavel Dogreat's WebGL Fluid Simulation (Classic, mobile-friendly)

### Konzept-Idee: hero-v017-a — PARTICLE GENESIS (FBO Morph)
- 16K Partikel schweben im Raum (chaos, Brownian motion)
- Scroll treibt Morphing: Chaos → Wolke → Kristall → PixIntCreators Text/Logo
- MeshSurfaceSampler fuer 3D-Text-Geometrie als Ziel
- Farbe morpht mit: weiss/grau (chaos) → orange (brand)
- Mouse-Interaction: Partikel weichen aus, fliegen zurueck
- GPU-powered, 60fps, smooth wie Lusion/Immersive Garden

**Warum das WOW sein koennte:**
- Erster GPGPU-Hero (neue Technik-Tiefe)
- Partikel die sich zu TEXT formen = visuell verstaendlich + beeindruckend
- Scroll-driven = User steuert den Moment
- Brand-Integration natuerlich (kein aufgeklebtes Logo)

## Entscheidung
Noch NICHT bauen. Warte auf Chris-Feedback zu v015-a/v016-a. Wenn WebGL-Richtung bestaetigt → FBO Particles als naechster Build. Wenn nicht → andere Richtung.

## Offen
- Chris-Feedback zu v015-a (LIQUID GLASS) und v016-a (METAMORPHIC) abwarten
- Bei positivem Feedback: hero-v017-a FBO Particle Morph als naechster Build
- Bei negativem Feedback: Richtung ueberdenken
