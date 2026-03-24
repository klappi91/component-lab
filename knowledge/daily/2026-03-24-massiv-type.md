# 2026-03-24 — hero-v004-a: Massiv-Type (run-20260324-0620)

## Entscheidung
P2/P4: Inspiration gefunden (DD.NYC Awwwards SOTD) + radikal anderer Ansatz als bisherige Experimente.

## Inspiration-Analyse
- **DD.NYC (dd.nyc):** Awwwards SOTD, Kreativ-Agentur NYC
  - Massive 130px Headline, Single Font (Manrope), Orange #F35422 (nah an unserem #FF6B00)
  - Die WORTE sind der Hero, kein Bild, kein Shader
  - Brand-Mark (orange Herz/Diamant) direkt IN den Text integriert
  - High energy, selbstbewusst, minimal
- **Immersive Garden (immersive-g.com):** Awwwards SOTD, Digital Experience Studio
  - Vollstaendig JS-gerendert (Screenshot = blank gray)
  - Serif (PSTimes), grosse Body-Schrift (29px), Yellow auf Gray

## Was gebaut wurde
**hero-v004-a: Typografie-First Experience fuer PixIntCreators**
- Kategorie: typografie-only
- KEIN WebGL, KEIN Video, KEINE Bilder
- Nur: Massive Typografie + GSAP-Choreografie + Mouse-Parallax

### Sektionen
1. **Hero (pinned, 280vh):** "PIXINT" in 17vw-Buchstaben. 4 Scroll-Phasen:
   - Entrance: Letters rise mit expo.out stagger
   - Spread: 6 verschiedene Richtungen (power4.inOut)
   - CREATORS reveal (Orange, 5.5vw)
   - Reassemble als kompaktes Brand-Lockup + Exit
2. **Services (pinned, 350vh):** 3 Services als Text-Theater
   - Massive Outline-Nummern (22vw, orange stroke)
   - Service-Name + Subtitle + Description cyclen durch
   - Blur-Exit zwischen Services
3. **CTA:** "Lass uns reden." scale 0.2→1, Orange-Background scaleY-Fill, Pulse

### Technische Details
- Fonts: Clash Display (Heading) + General Sans (Body) via Fontshare
- Mouse-Parallax: RAF-Loop, 3 Tiefen-Ebenen, power2.out smoothing
- Custom Cursor: Orange dot, mix-blend-difference, power3.out following
- Grain: SVG feTurbulence, opacity 0.04
- Scroll: GSAP ScrollTrigger scrub fuer hero + services, toggleActions fuer CTA

## Self-Eval
- **Typografie-Qualitaet:** 7/10 — massive, mutig, Clash Display funktioniert
- **Choreografie:** 6/10 — Spread-Effekt ist interessant, aber noch nicht WOW
- **Gesamt:** 6.5/10 (chris_estimate: ~4.5/10)
- **Potenzial:** 7.5/10 — mit Feintuning (Easings, Timing, zusaetzliche Micro-Interactions) koennte es deutlich besser werden

## Erkenntnisse
- **Typografie-Only ist SCHWER** — ohne Bilder/Shader muss jede Animation PERFEKT sein
- **DD.NYC-Ansatz:** Ihre Staerke ist die EINFACHHEIT — eine grosse Aussage, nicht viele Sektionen
- **Mouse-Parallax auf Text:** Funktioniert gut fuer "lebendig"-Gefuehl, aber muss subtil sein
- **Naechster Schritt:** Split-Text fuer noch feinere Buchstaben-Animationen (character-level reveals)
