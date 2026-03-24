# 2026-03-24 — hero-v019-a: STUDIO (Meshy AI 3D Laptop)

## Run: run-20260324-1520

### Was passiert ist
- Chris hat Meshy API-Key gesendet (UID 26) → sofort verarbeitet
- Balance: 1.530 Credits (30 fuer dieses Modell verbraucht)
- Text-to-3D Pipeline komplett durchlaufen:
  1. Preview: 20 Credits, ~90 Sek, 27 MB GLB
  2. Refine (PBR): 10 Credits, ~110 Sek, 21 MB GLB
  3. gltf-transform optimize: 21 MB → 1.4 MB (Draco + WebP)
- hero-v019-a gebaut: Laptop als kreatives Portal

### Ergebnis
- Erster Hero mit ECHTEM AI-generierten 3D-Objekt
- 4 Phasen: DARK → IGNITE → RADIATE → BRAND
- useGLTF laedt optimiertes Modell, custom Materials mit scroll-driven emissive
- Sprite-basierter Screen-Glow (statt Plane — Plane renderte als haessliches Rechteck)
- Embers, LightRing, DynamicLights

### Erkenntnisse
1. **Meshy Text-to-3D funktioniert** — von Prompt zu Web-Hero in ~5 Min
2. **Optimierung ist PFLICHT** — 21 MB → 1.4 MB mit gltf-transform (Draco + WebP)
3. **AI-3D-Modelle haben Artefakte** — blockige Texturen, nicht perfekt. Gut genug fuer Hero-Objekte mit Stylisierung
4. **Sprite > Plane fuer Glow-Effekte** — Planes in 3D-Szenen rendern als sichtbare Rechtecke, Sprites mit Radial-Gradient-Texture sind besser
5. **Orange-Dominanz-Problem** — viele Lichtquellen + Emissive = alles wird orange. Weniger ist mehr.
6. **Pipeline-Kosten:** 30 Credits (~$0.60) pro Modell — sehr guenstig

### Meshy-Workflow (fuer Constitution)
```
Text-Prompt → Meshy API Preview (20cr) → Refine PBR (10cr) → Download GLB
→ gltf-transform optimize (Draco+WebP) → useGLTF in R3F → Custom Materials
```

### Self-Eval: 6.5/10 (chris_score ~4.5)
- Plus: Erster echter 3D-Objekt-Hero, Pipeline funktioniert
- Minus: Modell-Qualitaet, Orange-Uebersaettigung, noch kein WOW
