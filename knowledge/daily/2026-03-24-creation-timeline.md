# 2026-03-24 — hero-v013-a: CREATION TIMELINE

## Session: run-20260324-1200

### Was passiert ist
- Heartbeat: Keine neuen Mails, alle Improvements done
- Awwwards-Recherche: The Camel Fabric Game (Adoratorio Studio, 8/8/8/8) — Three.js Immersive Storytelling
- Web Design Trends 2026: "Full-bleed video + oversized typography" als Trend — aber zu standard
- Entscheidung: Erster VIDEO-HERO — komplett neuer Erlebnis-Typ

### Was ist CREATION TIMELINE?
Scroll-driven Video. Der User kontrolliert ZEIT. Video zeigt einen Schoepfungsprozess (orange Embers entstehen aus Dunkelheit). Die Brand-Story "Vom Pixel zum Erlebnis" ALS Video-Erlebnis.

### Video-Generierung
- gemini-video Veo 3.1 (fast, 720p, 8s, no-audio)
- Prompt: "Cinematic dark void, orange ember emerges, more particles form patterns..."
- Ergebnis: 5.6MB MP4, ~61 Sekunden Generierung, $1.20
- Qualitaet: muss noch visuell geprueft werden

### Choreografie (5 Phasen, 500vh, pinned)
1. **VOID (0-20%)** — Letterbox bars retract (cinematic opening), Video bei 0-1.6s
2. **GENESIS (20-45%)** — Video scrubbt zu ~3.6s, Licht entsteht
3. **EMERGENCE (45-65%)** — "WIR" clip-path reveal + "ERSCHAFFEN" per-letter stagger + accent line
4. **STATEMENT (65-82%)** — "ERLEBNISSE" scale+deblur, Video backdrop-blur 30px
5. **BRAND (82-100%)** — Pulse ring, PixIntCreators letter-spacing 1.5em→0.15em, Tagline + CTA

### Technik
- HTML5 video + GSAP ScrollTrigger scrub → video.currentTime
- Lenis smooth scroll
- clip-path inset reveals (expo.out)
- backdrop-filter: blur (progressive)
- Letter-spacing animation (expo.inOut)
- Custom cursor (ring + dot, magnetic)
- Film grain (SVG feTurbulence)
- Fallback BG (radial gradient) wenn Video nicht geladen

### Key Insight
VIDEO IST ZEIT, SCROLL IST ZEITKONTROLLE. Der User scrubbt buchstaeblich durch Schoepfung. Das ist ein fundamentales Konzept: der User hat Agency ueber den kreativen Prozess. Das ist anders als alle bisherigen Heroes die nur auf Scroll reagieren — hier KONTROLLIERT der User was passiert.

### Erlebnis-Typ: video-hero
Bisherige Typen: typografie-only, generative-art, scroll-storytelling, 3d-szene, interaktiv, horizontal-scroll, single-element, editorial. VIDEO-HERO ist neu — 9. Kategorie.

### hero-v012-a ebenfalls
- QA-Agent gestartet (Code-Review)
- Chris per Mail informiert (v012 + v013 zusammen)

### Offen
- Video visuell pruefen (wie sieht es tatsaechlich aus?)
- Desktop + Mobile QA (agent-browser)
- Chris-Feedback abwarten
- Optional: Video in hoeherer Qualitaet generieren (1080p/4K)
- Optional: Video-Poster-Frame extrahieren fuer Fallback
