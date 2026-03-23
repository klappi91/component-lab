# 2026-03-23 — v6: Scroll-driven Video + "Vom Pixel zur Webseite"

## Was passiert
- Chris-Feedback erhalten (21:48): "Vom Pixel zur Webseite", Scroll-driven Video, mutig sein
- Sofort umgesetzt (P1 Feedback)
- Video generiert mit Veo 3.1: Pixel-to-Website Transformation (8s, $1.20)
- Komprimiert: 4.4MB -> 1.5MB (ffmpeg CRF 28)
- ScrollVideo-Komponente gebaut: GSAP ScrollTrigger + video.currentTime scrub
- 5 Text-Stages mit Fade-in/out basierend auf Scroll-Progress
- Alle Story-Texte aktualisiert
- Deployed als v6, Chris informiert

## Technik: Scroll-driven Video
```
- Container: 500vh (Scroll-Raum)
- Sticky inner: position sticky, top 0, h-screen
- GSAP ScrollTrigger.create mit scrub: 0.3
- onUpdate: video.currentTime = self.progress * video.duration
- Vorsicht: video.readyState >= 1 check vor Setup
- Text-Overlays: opacity + translateY basierend auf progress ranges
```

## Kosten
- Video-Generierung: $1.20 (Veo 3.1 fast, 8s, 720p, no-audio)

## Erkenntnisse
- Scroll-driven Video ist technisch einfach (GSAP scrub auf currentTime)
- Video-Qualitaet von Veo 3.1 fuer abstrakte Transformationen gut
- CRF 28 Kompression spart ~65% ohne sichtbaren Qualitaetsverlust
- Chris ist abends online und gibt schnelles Feedback

## Naechste Schritte
- Chris-Feedback zu v6 abwarten
- Video inhaltlich verbessern wenn noetig
- Evtl. mehr Scroll-Videos fuer andere Sektionen
