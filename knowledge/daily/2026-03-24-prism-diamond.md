# 2026-03-24 — hero-v017-a: PRISM (Glass Diamond)

## Session: run-20260324-1420

### Trigger
Chris-Feedback (UID 25): "Gute Idee aber sinnvolle 3D-Objekte erstellen und herausfinden wie man das macht mit Skills"

### Was passiert ist
1. **3 Skills installiert:**
   - `meshy-3d-generation` — Meshy AI Text-to-3D API (braucht Pro-Plan API-Key)
   - `blender-web-pipeline` — Blender → GLTF → Web
   - `3d-model-generation` — EachLabs AI 3D

2. **Recherche: Wege zu sinnvollen 3D-Objekten:**
   - **Meshy AI** = vielversprechendster Weg (Text → 3D → GLB → Three.js). Pro-Plan ~$20/Monat. Free Tier ohne API.
   - **Sketchfab** = 800k+ CC-lizenzierte Modelle, manueller Download
   - **Procedural** = LatheGeometry, ExtrudeGeometry, CSG in Three.js
   - **Blender** = Python-scripted Export, braucht Blender installiert

3. **hero-v017-a: PRISM gebaut:**
   - Erster TRANSPARENTER WebGL-Hero
   - Glas-Diamant mit `MeshTransmissionMaterial` (drei)
   - Refraction, Chromatic Aberration, Environment-HDRI
   - LatheGeometry mit echtem Diamond-Profil (pavilion + crown + table)
   - Scroll: Heavy distortion → crystal clarity
   - 80 orange ember-Partikel + Light-Ring als Akzente
   - Metapher: Rohdiamant → geschliffenes Erlebnis

### Technische Erkenntnisse
- `MeshTransmissionMaterial` von drei: State-of-the-art Glass-Shader in R3F
  - Macht echte Screen-Space Refraction (FBO-based)
  - Props animierbar via ref: `matRef.current.distortion = X`
  - Braucht `Environment` für Refraction-Content (sonst nichts zu sehen)
  - GPU-intensiv: `resolution={256}` und `samples={6}` für Performance
- `LatheGeometry` für Diamond-Silhouette: 6 Punkte + 8 Segmente = facettierter Edelstein
- `Environment preset="city"` + `background={false}` = HDRI für Reflections ohne sichtbaren Background
- `ACESFilmicToneMapping` + `toneMappingExposure: 1.2` für cinematischen Look

### Material-Paradigmen bisher
1. v015-a: Custom Fragment Shader (2D Distortion auf Bild)
2. v016-a: Custom Vertex+Fragment Shader (opaker 3D-Blob, Blinn-Phong)
3. v017-a: MeshTransmissionMaterial (transparenter 3D-Diamant, Refraction) ← NEU

### Chris-Mail
Feedback + v017-a Link + Meshy-Vorschlag gesendet. Warte auf Antwort zu Meshy API-Key.

### Nächste Schritte
- Chris Feedback zu v017-a abwarten
- Wenn Meshy-Key: Echte 3D-Modelle generieren (Laptop, Tools, Logo)
- useGLTF-Workflow testen (GLB laden → Custom Material drauf)
