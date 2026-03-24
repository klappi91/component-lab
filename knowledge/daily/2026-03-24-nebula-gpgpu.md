# 2026-03-24 — hero-v018-a: NEBULA (GPGPU Particle Morph)

## Session: run-20260324-1440

### Trigger
P2 — Inspiration (Immersive Garden SOTD 18.03.2026) + naechster Schritt in WebGL-Evolution.

### Inspiration-Analyse: Immersive Garden
- **SOTD 18.03.2026** — eines DER WebGL-Studios
- Kunden: Louis Vuitton, Cartier, Dior, Omega (Luxury WebGL Experiences)
- Screenshot war BLANK/GREY — gesamte Site ist WebGL-gerendert, statischer Scrape erfasst nur Loading-State
- Branding: PSTimes Serif + hellgrau (#E8E8E8), minimal, editorial
- Sound Toggle = immersives Audio
- **Key Insight:** WebGL ist nicht Add-On, es IST die Site. Bestaetigt unsere Richtung.

### Was passiert ist
**Erster GPGPU/FBO Hero gebaut** — fundamentaler Schritt:

1. **16.384 Partikel** deren Positionen KOMPLETT auf der GPU berechnet werden
2. **Ping-Pong FBO Setup:**
   - Zwei WebGLRenderTarget (128x128, FloatType)
   - Simulation shader liest von FBO A, schreibt nach FBO B, dann Swap
   - Render shader liest finale Positionen + zeichnet Points
3. **Simulation shader:**
   - Curl Noise (3D, divergenz-frei) fuer fluessige Turbulenz
   - Morph-Force mit soft-spring zu Zielposition
   - Mouse-Repulsion
   - Orbit-Rotation in morphed state
4. **Scroll-driven Phases:**
   - CHAOS (0-20%): Nebula mit Curl Noise
   - CONVERGE (20-55%): Turbulenz faellt, Morph steigt
   - FORM (55-80%): Tight Sphere, langsame Rotation
   - REVEAL (80-100%): Brand text erscheint

### Technische Erkenntnisse
- **FBO Ping-Pong in R3F:** Separate THREE.Scene + OrthographicCamera + PlaneGeometry(2,2) als Fullscreen-Quad. `gl.setRenderTarget(fbo)` + `gl.render(simScene, simCam)` + `gl.setRenderTarget(null)`. Kein useFBO von drei noetig.
- **Initialisierung:** Erster Frame nutzt Passthrough-Shader um DataTexture in beide FBOs zu kopieren. Danach Simulation-Shader uebernimmt.
- **useEffect vs useMemo:** Quad zu simScene hinzufuegen MUSS in useEffect (nicht useMemo) wegen Cleanup. Guard `sceneReady.current` im useFrame noetig weil useEffect nach Paint feuert.
- **Custom Attributes:** `reference` (vec2 UV ins FBO) auf Points-Geometry per `geo.setAttribute('reference', ...)`. THREE.js handelt GLSL-Version-Konvertierung automatisch.
- **Curl Noise:** 6 Simplex-Noise-Aufrufe fuer finite-difference Ableitungen. Ergibt divergenz-freie Vektorfelder = fluessig aussehende Bewegung ohne "Quellen" oder "Senken".

### WebGL-Evolution
1. v015-a: 2D Fragment Shader (Image Distortion)
2. v016-a: 3D Vertex+Fragment (Displacement Blob)
3. v017-a: MeshTransmissionMaterial (Glass Diamond)
4. **v018-a: GPGPU FBO Particles** (GPU-computed positions) <-- NEU

### Noch zu tun
- [ ] Visuelles QA (Vercel Deployment)
- [ ] Chris informieren
- [ ] Optional: Mehr Partikel (SIZE=256 = 65K)
- [ ] Optional: Zweites Morph-Target (Text oder Logo)
- [ ] Optional: Farb-Variationen basierend auf Position/Phase
