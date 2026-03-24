# 2026-03-24 — run-20260324-1220: STILL POINT + Pixel Fix

## Was passiert ist
- **Chris-Feedback UID 23:** hero-v011-a v2 "ist zu pixelig" → v3: PIXEL_SCALE 5→2
- **Chris-Feedback UID 24:** hero-v012-a "auf der Stelle stehen bleiben, alles fliegt vorbei" → neues Experiment
- **hero-v014-a: STILL POINT gebaut** — Erste pinned experience im Lab

## hero-v011-a v3: Pixel Fix
- PIXEL_SCALE von 5 auf 2 reduziert (subtiler Digital-Look statt grobe Pixel)
- Stream-Breiten, Partikel-Groessen, Mouse-Radius proportional skaliert (Faktor 2.5)
- Visuell gleich gross, aber weniger blocky

## hero-v014-a: STILL POINT
- **Konzept:** Gesamter Viewport PINNED. User scrollt, Elemente fliegen DURCH den Raum.
- **Choreografie:** VOID → AWAKENING → STORM → CONVERGENCE → CLARITY
- **18 fliegende Worte** in verschiedenen Groessen, Richtungen und Geschwindigkeiten
- **10 geometrische Formen** (Kreise, Quadrate, Linien, Dot-Grids)
- **Services-Phase:** WEBDESIGN / KI-INTEGRATION / CREATIVE DEV schweben kurz
- **Brand Reveal:** Letter-spacing Animation + Tagline + CTA
- **Rein DOM-basiert** — GSAP pin + scrub, CSS transforms, kein Canvas/WebGL
- **Atmosphaere:** Grain, Vignette, Custom Cursor, Center Pulse

## Technik-Erkenntnisse
- GSAP pin + scrub + timeline = perfekt fuer "alles fliegt vorbei" Effekt
- 600vh scroll space gibt genug Raum fuer 5 Phasen
- DOM-Elemente mit CSS transforms performen gut (kein Canvas noetig)
- Vignette (radial-gradient) verstaerkt den "Zentrum" Effekt enorm

## Inspiration
- Chris' direkte Idee (UID 24) war der Ausgangspunkt
- Utopia Tokyo (SOTD 16.03.2026, 8/8/8/8) — GSAP + immersive scroll

## Offen
- Chris v014-a Feedback abwarten
- Evtl. Lenis Smooth Scroll integrieren
- Evtl. Mouse-Interaction (Worte weichen der Maus aus)
- Mobile QA
