# 2026-03-24 — hero-v012-a: EDITORIAL CINEMA

## Session: run-20260324-1140

### Was passiert ist
- Heartbeat durchgefuehrt: keine neuen Mails, alle Improvements done
- Awwwards SOTD recherchiert:
  - **SOTD 24.03: Unseen Studio 2025 Wrapped** (Score 7.44) — Year-in-review mit editorial rhythm, chapter markers, mixed media
  - **SOTD 23.03: Shed.design** (by Isaac Powell) — Letter-spaced titles, clean editorial
- Entscheidung: KOMPLETT NEUER ANSATZ — design-driven statt tech-driven
- hero-v012-a gebaut: **EDITORIAL CINEMA**

### Was ist EDITORIAL CINEMA?
Erste Erlebnis OHNE Canvas, OHNE WebGL, OHNE Partikel. Pure GSAP Choreografie + Layout + Typography.
Inspiriert von Film Opening Credits und Magazine-Editorials.

### Choreografie
1. **OPENING** (auto): 3 Title-Worte "WIR CODIEREN ERLEBNISSE." mit clip-path reveal, diagonal versetzt (steigende ml-offsets). Orange Akzent-Linie. Subtitle.
2. **REVEAL** (scroll, pinned): Cinematic Image wipe von Mitte nach aussen. Generiertes Bild (orange Tinte in Wasser). Titel parallax hoch. Scale settle 1.12→1.0.
3. **SERVICES** (trigger): 3 Services asymmetrisch (links, mitte, rechts). Clip-path aus 3 verschiedenen Richtungen. Nummerierte Marker [01, 02, 03].
4. **BRAND CLOSE** (trigger): Orange Pulse circle → Letter-spacing kontrahiert (1em→0.3em) → Tagline → CTA mit Hover-Fill.

### Technik
- Lenis smooth scroll + GSAP ScrollTrigger (pinned hero)
- clip-path: inset() fuer alle Reveals
- Custom cursor (ring + dot, magnetic auf buttons)
- Film grain overlay (SVG feTurbulence)
- gemini-image: Orange Tinte in dunklem Wasser (170KB WebP)

### Key Insight
Alle bisherigen 11 Heroes waren tech-driven (Canvas, Partikel, 3D, Physics). Dieser ist der erste DESIGN-driven Hero. Die Awwwards-Recherche bestaetigt: "Der Unterschied ist CHOREOGRAFIE, nicht Tools" (Reksa Andhika gewinnt SOTD mit nur Nuxt + GSAP + Lenis).

### Erlebnis-Typ: editorial
Bisherige Typen: typografie-only, generative-art, scroll-storytelling, 3d-szene, interaktiv, horizontal-scroll, single-element. EDITORIAL ist neu.

### Offen
- Visual QA (Desktop + Mobile)
- Chris-Feedback einholen
- Optional: Echte Fotos statt generierten Bildern
- Optional: SplitText fuer character-level Brand-Reveal
