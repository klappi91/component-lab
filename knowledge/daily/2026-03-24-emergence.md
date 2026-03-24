# 2026-03-24 — hero-v021-a: EMERGENCE

## Run: run-20260324-1600

## Was passiert ist
- Heartbeat-Check: Keine neuen Mails, alle Improvements erledigt
- Chris per Mail ueber v020-a PARADIGMENWECHSEL informiert (Editorial Reel)
- Awwwards-Inspiration: Adam Bricker SOTD (7.4/10, CUSP, 2 Farben, Three.js + Video)
- Erkenntnis: **Synthese der beiden Paradigmen** ist der naechste Schritt

## Inspiration-Analyse

### Adam Bricker (SOTD 13.03.2026, 7.4/10)
- Cinematographer Portfolio von CUSP Studio
- 2 Farben: #F0F2F1 + #020202 (schwarz + fast-weiss)
- Three.js + Vercel + Figma
- Video-heavy Content
- Takeaway: Content-driven + technisch unterstuetzt, nicht andersrum

## Konzept: Paradigm Synthesis

**Paradigma 1** (v001-v019): Technik-Demos → 0 WOW
**Paradigma 2** (v020): Narrative + Restraint → richtige Richtung
**Paradigma 3** (v021): Narrative + Restraint + ONE WebGL Signature Moment

## Was ich gebaut habe

hero-v021-a: EMERGENCE — Brand emergiert aus WebGL Noise-Chaos.

### Choreografie
- **Pinned Hero (300vh)**: Fullscreen WebGL noise field (FBM, 5 Oktaven)
- **Phase 1 (0-20%)**: Voller Chaos, orangene Embers, lebendiger Noise
- **Phase 2 (20-45%)**: "WIR CODIEREN" emergiert char-by-char durch den Noise
- **Phase 3 (45-70%)**: "ERLEBNISSE" erscheint in Orange, Noise wird ruhig
- **Phase 4 (65-100%)**: Tagline, Noise fadet fast komplett aus
- **Services**: Editorial mit Restraint (01/02/03, Serif + Mono, orange Linien)
- **CTA**: "Das 1% das im Kopf bleibt."

### Technisch
- WebGL FBM Noise Shader (5 Octaves Simplex + Mouse Ripple)
- Scroll-driven Amplitude (chaos → calm via smoothstep)
- GSAP scrub-Timelines mit praezisem Timing (20-45%, 45-70%)
- Char-by-char Reveal (blur + y + rotateX)
- Lenis Smooth Scroll
- Film Grain Overlay
- 2 Farben: #0A0A0A + #FF6B00
- Playfair Display + Space Mono

### Narrative
- Das Noise-Feld = Kreatives Chaos
- Die Emergence = Unser Prozess (aus Chaos wird Klarheit)
- Der WebGL-Effekt DIENT der Geschichte, ist nicht Selbstzweck

## Self-Eval
- **Technik:** 7/10 (FBM shader gut, aber nicht groundbreaking)
- **Design:** 7.5/10 (editorial restraint, purposeful)
- **Choreografie:** 7/10 (emergence arc klar, timing TBD im Browser)
- **Narrative:** 8/10 (Chaos → Klarheit = starke Metapher fuer den Brand)
- **Geschaetzter Chris-Score:** 5.5/10 (neuer Synthesis-Ansatz, muss im Browser geprueft werden)

## Erkenntnisse
1. **Paradigm Synthesis** ist der logische naechste Schritt: weder nur Technik noch nur Editorial
2. FBM Noise mit scroll-driven Amplitude = einfach aber effektiv fuer atmosphaerische Hintergruende
3. Mouse ripple auf noise feld gibt subtile Interaktivitaet ohne aufdringlich zu sein
4. Die Metapher (Chaos → Klarheit) gibt dem WebGL-Effekt BEDEUTUNG statt nur Augen-Candy
5. Adam Bricker bestaetigt: 2 Farben + Content-driven reicht fuer SOTD

## Naechste Schritte
- Chris v020 Feedback abwarten (Mail gesendet)
- QA fuer v021 (Desktop + Mobile)
- Wenn Synthesis-Richtung bestaetigt: verfeinern (Easings, Timing)
- Optional: Grain-Textur statt SVG filter fuer bessere Performance
