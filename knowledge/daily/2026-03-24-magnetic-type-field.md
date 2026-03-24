# 2026-03-24 — hero-v009-a: MAGNETIC TYPE FIELD (run-20260324-0840)

## Entscheidung
P2: Inspiration (shed.design SOTD) + Neues Erlebnis. Kein neues Chris-Feedback (v005-v008 gesendet, keine Antwort auf v2+).

## Heartbeat-Check
- Mail: uid 19 (07:30) + uid 18 (Server Error) bereits verarbeitet. Kein neues Feedback.
- Inspiration: shed.design (SOTD 23.03, Isaac Powell) — massive 308px Type, char-spaced headings, 3-Font System (OwnersWeb + RecklessWeb + SequelWeb), Electric Blue + Orange. Solide Agency-Site, Creativity nur 7.31.
- Darknode (SOTD 21.03, Qream) — 3D + stealth UI + video hero, Creativity 7.69.
- Unseen Studio 2025 Wrapped (SOTD 24.03) — bereits analysiert.
- Improvements: alle 5 [DONE].
- Build OK (alle 16 Seiten).

## Was gebaut wurde
**hero-v009-a: MAGNETIC TYPE FIELD — Physics-Based Word Interaction**

### Konzept
ERSTES Erlebnis mit eigener PHYSIK-SIMULATION:
- 30 Webdesign-Worte als physikalische Entitaeten (Position, Velocity, Mass, Rotation)
- Mouse = Magnet: Worte innerhalb 350px Radius werden angezogen
- Scroll transformiert 4 Phasen: Chaos → Gravitation → Formation → Brand
- Golden-Angle Spirale fuer die Formation (Fibonacci-Pattern)
- Word-Word Repulsion verhindert Ueberlappung

### Signature Moments
1. **Erste Mausbewegung** — 30 Worte RASEN zum Cursor, orbiten
2. **Chaos-Phase** — Worte treiben, kollidieren, driften — organisch
3. **Gravitation** — wichtige Worte werden orange, sinken, ordnen sich
4. **Golden-Angle Formation** — Worte spiralen zu einer geordneten Komposition (WOW → 1% center)
5. **Brand Reveal** — Worte orbiten nach aussen, PIXINT CREATORS erscheint

### Technisches
- DOM-basierte Physik (kein Canvas fuer Text — echte Typography!)
- requestAnimationFrame Physics Loop (~60fps)
- Kraeftemodell: Magnetische Anziehung + Gravitation + Repulsion + Daempfung + Random Drift
- GSAP ScrollTrigger fuer Phasen-Steuerung + Brand Reveal
- Canvas-Overlay nur fuer Cursor-Glow (radial gradient + magnetic field lines)
- Touch-Support fuer Mobile
- Clash Display Font via Fontshare
- SVG Grain + Vignette

### Choreografie
- **Phase 0 CHAOS (0-15%):** Free drift, strong magnetic mouse (800 force), random sine movement
- **Phase 1 GRAVITATION (15-45%):** Gravity 0.15, damping 0.97, colors lerp to orange by importance
- **Phase 2 FORMATION (45-70%):** Golden Angle spiral, spring force 0.08, rotation dampens
- **Phase 3 BRAND (70-100%):** Words orbit outward, fade. PIXINT/CREATORS scale in (expo.out), tagline follows

## Self-Eval
- **Konzept:** 8/10 — Physik + Interaktion = genuinely neu
- **Physics-Feel:** 7/10 — springy, responsive, aber koennte smoother sein
- **Formation:** 7.5/10 — Golden Angle sieht mathematisch schoen aus
- **Brand Reveal:** 7/10 — solide, aber wenig ueberraschend
- **Gesamt:** 7.5/10 (chris_estimate: ~5.5/10)
- **Potenzial:** 8.5/10 — mit Lenis, Sound-Feedback, besseren Easings → viel Luft

## Was ich gelernt habe
- **DOM-basierte Physik** funktioniert fuer 30 Elemente problemlos bei 60fps
- **Golden Angle (137.5°)** = Fibonacci-Spirale = natuerlich aussehende Anordnung
- **Magnetic Cursor** ist ein starkes Interaction Pattern — sofortiges Feedback
- **Word-Word Repulsion** ist essentiell — ohne: alles klumpt zu einem unlesbaren Haufen
- **Physics braucht Tuning** — die Konstanten (force, damping, maxSpeed) sind der Unterschied zwischen "physisch" und "janky"

## Naechste Schritte
- [ ] Chris-Feedback einholen
- [ ] Physics-Konstanten feintunlen (vielleicht A/B mit verschiedenen force-Werten)
- [ ] Lenis Smooth Scroll integrieren
- [ ] Sound: subtile Klang-Partikel wenn Worte am Cursor vorbeiziehen
- [ ] Phase 2 Message: anstatt nur Spirale → Worte bilden lesbaren Satz
