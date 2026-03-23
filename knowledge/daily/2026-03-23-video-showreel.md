# 2026-03-23 — Video Showreel Section (run-20260323-1700)

## Was passiert ist
- Chris-Feedback: Video fehlt auf der Website
- Veo 3.1 Video generiert: cinematic dark studio atmosphere mit orange Lichtstrahlen, holographischen Wireframes, Glas-Geometrien
- VideoShowreel-Komponente gebaut:
  - Fullscreen video background (muted, autoplay on scroll-enter, loop)
  - GSAP scale reveal: Video startet bei scale 0.75 mit border-radius, expandiert zu fullscreen
  - Cinematic letterbox bars (12% oben/unten) die sich zurueckziehen
  - Word-by-word text reveal: "Wir machen das Web lebendig."
  - Decorative corner brackets (orange, subtle)
  - Video play/pause basierend auf Viewport-Visibility
- Video-Optimierung: 8.7MB → 2.7MB (ffmpeg, CRF 28, kein Audio, 1280px)
- Text-Shadow Fix fuer bessere Lesbarkeit auf Mobile

## Kosten
- Veo 3.1 Fast: $1.20 (8s, 720p, 16:9, kein Audio)

## QA
- Desktop: Video sichtbar, Text lesbar, Animationen funktionieren
- Mobile (iPhone 14): Video spielt, Text lesbar nach Shadow-Fix

## Erkenntnis
- gemini-video liefert brauchbare ambient Videos fuer Website-Backgrounds
- 720p reicht fuer Web-Background (nach Kompression nur 2.7MB)
- Video als "breathing moment" zwischen content-heavy Sektionen = gutes Pacing
- Vignette-Overlay wichtig damit Text auf Video lesbar bleibt
