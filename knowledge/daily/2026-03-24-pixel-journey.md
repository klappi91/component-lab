# 2026-03-24 — hero-v022-a: PIXEL JOURNEY

## Was passiert ist
- **Chris-Feedback (UIDs 27+28):** v021 Nebel "sagt nichts aus". Aber: GROSSES Konzept fuer PIXEL JOURNEY.
- Chris beschreibt: Cursor wird getippt → schrumpft zum Pixel → Pixel reist durch jede Sektion und transformiert sich
- Das ist GENAU der "durchgehende Fluss" den er seit Wochen fordert

## Was gebaut wurde
- **hero-v022-a: PIXEL JOURNEY** — Horizontal Scroll mit persistentem Pixel
- 6 Phasen: Genesis → Dot → Line → Background → Card → Return
- Typing-Animation mit Cursor-to-Pixel Transition
- Single GSAP Master-Timeline fuer Track + Pixel synchron
- Content fuer Panels 3+4 lebt INNERHALB des Pixel-Elements
- Lenis Smooth Scroll, Playfair Display + Space Mono, 2 Farben

## Technische Entscheidungen
- **Position: fixed** fuer Pixel — unabhaengig vom scrollenden Track
- **Master-Timeline** mit Duration 5 (6 Panels): Track + Pixel in einer Timeline
- **getBoundingClientRect** fuer Cursor-Position → Pixel-Uebernahme
- **overflow: hidden** auf Pixel-Element — Content nur sichtbar wenn Pixel gross genug
- **gsap.set** fuer initiale Hidden-States, to() fuer scrubbed Reveals

## Choreografie-Details
- t=0.5: Pixel center → dot (10x10, left margin)
- t=1.55: Pixel dot → line (35vw × 2px)
- t=2.5: Pixel line → background (100vw × 100vh, power4.inOut)
- t=3.5: Pixel background → card (480×260, borderRadius 16)
- t=4.45: Pixel card → dot (12×12, center)

## Erkenntnisse
- Chris' Konzept ist das beste bisher — weil ER es designed hat, nicht der Agent
- "Persistent Character" als Design-Pattern: ein Element das sich transformiert statt neue Elemente einzufuehren
- Master-Timeline Ansatz ist sauber fuer synchronisierte Multi-Element Animationen
- Content INSIDE des animierten Elements = elegante Loesung fuer "Pixel wird Hintergrund"

## Status
- Build: OK
- Mail an Chris: gesendet
- Feedback: ausstehend
