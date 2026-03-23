# 2026-03-23 — exp-story-editorial v5 Overdrive Push

## Was passiert ist
- exp-story-editorial v4 (8.2/10) → v5 mit Overdrive auf die 3 schwächsten Sektionen
- **Process:** Standard-Alternating → Pinned Scroll Showcase (400vh, sticky, mersi-style)
  - Full-Screen Hintergrundbilder crossfaden beim Scrollen
  - GSAP scrub-Timeline mapped Scroll auf autoAlpha/scale-Transitionen
  - Ghost-Numbers, Step-Counter, Dark-Gradient Overlay
- **CTA:** Zentrierter Text → Word-by-Word 3D-Flip Reveal
  - CTAWordReveal-Komponente (y:115%, rotateX:-15, stagger 0.12s)
  - Animierter Radial-Gradient + Grid-Textur als Hintergrund
  - Email-Button mit Border-Animation
- **Footer:** Minimal → Statement Footer
  - Infinite CSS Marquee (16 Items, WebkitTextStroke Outline auf jedem 2.)
  - Live-Uhr (Intl.DateTimeFormat, Europe/Berlin)
  - 4-Spalten Grid + Slide-Up Hover + Spring Back-to-Top
- QA: 3 Bugs gefunden und gefixt
  - KRITISCH: CTA "Unvergessliches" overflow auf Mobile → clamp min 3.2→2.4rem
  - MITTEL: Process Text-Kontrast über Fotos → stärkerer Gradient + text-shadow
  - KLEIN: Process Transition-Ghosting → Timing verschärft (fade-out duration 0.12, fade-in delay 0.55)

## Self-Eval
- v5: **8.5/10** (konservativ, -1.5 Korrektur angewendet = ~7.0 Chris-geschätzt)
- Process: von 7.0 → 8.5 (größter Sprung, bestätigt Constitution: "langweiligste Sektion upgraden bringt am meisten")
- CTA: von 8.5 → 9.0
- Footer: von 7.5 → 8.5

## Kosten
- Overdrive Agent (Sonnet): ~48k Tokens, ~4 Min
- QA Agent (Sonnet): ~46k Tokens, ~13 Min
- Manuelle Fixes: 4 Edits, ~3 Min
- Gesamt: ~20 Min inkl. Deploy

## Erkenntnisse
1. Pinned Scroll Showcase (CSS sticky + GSAP scrub) funktioniert HERVORRAGEND für mersi-style Bildwechsel
2. autoAlpha braucht explizite duration in scrub-Timelines, sonst Ghosting zwischen Steps
3. clamp() min-Werte immer auf 390px Mobile testen — lange deutsche Wörter wie "Unvergessliches" brauchen mehr Platz
4. Text-shadow ist PFLICHT bei Text über variablen Foto-Hintergründen (Gradient allein reicht nicht)
5. Chris per Mail informiert — wartet auf Feedback
