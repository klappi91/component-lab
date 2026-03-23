# Stacking Services + Film Grain — 2026-03-23

## Run-ID: run-20260323-1440

## Was wurde gemacht
Opus-Overdrive-Push #3 auf exp-signature-hero fuer den Push von ~8.8 auf ~9.0/10.

### 1. Services-Sektion komplett neu — Full-Screen Stacking Cards
- Alte alternating Image/Text Blocks (standard, template-like) ersetzt
- Jeder Service ist jetzt eine eigene FULL-SCREEN Card (h-screen, sticky top-0)
- Stacking-Effekt: hoeherer z-index ueberlagert vorherige Cards beim Scroll
- Vorherige Cards werden per GSAP gedimmt (scale: 0.92, brightness: 0.4)
- Parallax auf Bilder (GSAP fromTo y: -8% to 8%)
- Full-bleed Image mit Gradient-Overlay (L→R Desktop, B→T Mobile)
- Giant Service-Nummern (01/02/03) in semi-transparent Orange (15rem)
- Progress-Indicator Dots unten rechts (aktiver Service hervorgehoben)
- Content-Entrance Animation (opacity + y, toggleActions)
- Spacer am Ende (h-screen) damit letzte Card genug Scroll-Raum hat

### 2. Film Grain Overlay
- SVG feTurbulence + feColorMatrix fixed overlay
- opacity: 0.04, mixBlendMode: overlay
- Adds subtle texture, barely visible but adds depth

### 3. Section Dividers
- Animierte horizontale Linien zwischen Services→Portfolio und Portfolio→Methode
- GSAP scaleX 0→1 Animation beim Scroll-Enter
- Orange (#FF6B00, opacity 0.25) und Grau (#333, opacity 0.4)

### 4. Kleine Fixes
- Footer Jahr: 2025 → 2026
- Mobile Menu Jahr: 2025 → 2026
- imageLeft Property aus Services-Daten entfernt (nicht mehr benoetigt)

## QA Score: ~8.8 → ~9.0/10
| Sektion | v3 | v4 | Delta |
|---------|-----|-----|-------|
| Hero | 9/10 | 9/10 | — |
| Services | 8/10 | 9.5/10 | +1.5 |
| Portfolio | 9/10 | 9/10 | — |
| Methode | 8.5/10 | 8.5/10 | — |
| CTA | 8.5/10 | 8.5/10 | — |
| Footer | 8/10 | 8/10 | — |
| Mobile | 9/10 | 9/10 | — |
| Custom Cursor | 8.5/10 | 8.5/10 | — |
| Film Grain | — | + | NEU |

## Schluesselerkenntnisse

### Stacking Cards = Game-Changer fuer Services
Die alte alternating layout war das schwächste Stueck der Seite (8/10). Die neuen Full-Screen Stacking Cards sind ein echtes Awwwards-Pattern. Jeder Service bekommt seinen eigenen Viewport-Moment.

### Spacer-Bug bei Sticky Stacking
Die letzte Card braucht einen Spacer NACH sich (h-screen), damit sie genug Scroll-Raum hat um sichtbar zu bleiben. Ohne den Spacer blitzt sie nur kurz auf und scrollt sofort weiter. → In Constitution dokumentieren.

### GSAP Dim-Effekt auf vorherige Cards
`scale: 0.92 + brightness(0.4)` erzeugt einen schoenen "wegtauchen" Effekt. Scrub-basiert (0.6) damit es smooth ist.

## Kosten
- Opus-Zeit: ~20 Min (Services umbauen + Film Grain + QA)
- Keine Asset-Kosten (bestehende Bilder wiederverwendet)

## Naechste Schritte fuer 9.5/10+
- Methode aufwerten (aktuell 8.5/10) — groessere Nummern? Animated Timeline?
- CTA aufwerten (8.5/10) — Parallax auf Background? Text-Animation?
- impeccable:overdrive Skill testen (bisher nur manuelle Overdrive)
- Footer aufwerten (8/10)
