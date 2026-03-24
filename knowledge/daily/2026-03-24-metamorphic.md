# 2026-03-24 — run-20260324-1300: METAMORPHIC — Erster 3D-Objekt-Hero

## Was passiert ist
- **Heartbeat:** Keine neuen Mails. Awwwards-Recherche: Artem Shcherban (SOTD 22.03), PARTICOLARE STUDIO (SOTD 20.03) — niedrige Scores, keine tiefe Inspiration
- **WebGL-Recherche:** Fluid simulation, morphing spheres, Codrops twisted spheres. Award-Studios nutzen 3D-Objekte als Brand-Signature
- **hero-v016-a: METAMORPHIC gebaut** — Zweiter WebGL-Hero, erster mit 3D-Objekt

## hero-v016-a: METAMORPHIC

### Konzept
- Lebende, atmende 3D-Form (IcosahedronGeometry, detail 6, ~41K vertices)
- 3 Octaves 3D Simplex Noise im Vertex Shader verzerren die Oberflaeche
- Blinn-Phong Three-Point Lighting: oranges Key (folgt Mouse), kuehles Fill, weisses Rim
- Fresnel-Glow (orange) + subtile Irideszenz (view-angle dependent)
- Scroll steuert Chaos-Level: BREATHE → STORM → REFINE → REVEAL
- Lenis Smooth Scroll integriert (erster Hero mit Lenis!)

### Signature Moment
Der STORM→REFINE Snap: Amplitude faellt von 0.55 auf 0.06 in nur 10% Scroll.
Chaos → ploetzliche Ruhe. Die kreative Kristallisation.

### Was anders ist als v015-a (LIQUID GLASS)
| v015-a | v016-a |
|--------|--------|
| 2D Plane | 3D IcosahedronGeometry |
| Fragment-Shader (UV distortion) | Vertex-Shader (geometry displacement) |
| Bild als Textur | Reine Geometrie + Lighting |
| Chromatic Aberration | Three-Point Lighting + Fresnel |
| Kein Smooth Scroll | Lenis integriert |

### Technik (neu gelernt)
- **3D Simplex Noise in GLSL:** ~50 Zeilen Ashima Arts Implementation, 3 Octaves fuer organische Displacement
- **Finite-Difference Normals:** Displaced normal via 2 Tangent-Offsets + Cross-Product. eps=0.01 fuer stabile Gradienten
- **World-Space Normals:** `mat3(modelMatrix) * displacedNormal` statt `normalMatrix` (das waere View-Space)
- **Blinn-Phong in GLSL:** Half-Vector `H = normalize(L + V)`, Shininess 40-120 je nach Licht
- **Reinhard Tonemapping:** `color / (color + 1.0)` — simpel, verhindert Clipping bei hellen Speculars
- **Scroll-Driven Parameter Curves:** smoothstep-basierte Blending zwischen Phasen (breathe, chaos, refine, resolve)

## Offen
- Chris Feedback abwarten (oder proaktiv zeigen?)
- Visuelles QA (Desktop + Mobile)
- Optional: Post-Processing (Bloom wuerde den Glow dramatisch verstaerken)
- Optional: Environment Map fuer realistischere Reflektionen
- Optional: Blob reagiert auf Cursor-Naehe (Vertex-Displacement near mouse)
