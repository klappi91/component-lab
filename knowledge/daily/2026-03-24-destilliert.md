# 2026-03-24 — hero-v006-a: DESTILLIERT (run-20260324-0700)

## Entscheidung
P2: Inspiration gefunden + Skills aktiv geladen. Awwwards SOTD-Analyse ergab starkes Pattern.

## Inspiration-Analyse (Choreografie-Fokus)

### Awwwards SOTD 24.03.2026: Unseen Studio 2025 Wrapped (2025.unseen.co)
- Fonts: New Icon Serif (heading), Neue Montreal (body), DM Mono (mono)
- Chronologische Timeline, Video-heavy, Tag-System [motion] [web] [brand]
- H1: 116px, Accent: #B88CD7 (Purple)
- Pattern: Monatliche Kapitel mit mixed media

### Aupale Vodka (aupalevodka.com) — Locomotive, SOTD 17.03.2026 — HAUPTINSPIRATION
- Fonts: Instrument Serif (heading 168px!), Helvetica Now Display (body)
- Built with Astro v5.15.9
- **Product-Dissection Pattern:** Die Flasche in 4 Aspekte zerlegt (Name, Closure, Bottle, Base), jeder mit eigenem Sticky-Reveal
- Massive headings, selektive Italics, Story-driven
- "Distilled, differently." → adaptiert als "Destilliert."

### Kris Temmerman (neuroproductions.be) — SOTD 20.03.2026
- "It's a Portfolio! It's a Game!" — Creativity: 8.03 (hoechster Score!)
- WebGL + GSAP, Experimental
- Notiert fuer spaetere Analyse

## Was gebaut wurde
**hero-v006-a: DESTILLIERT — Typographic Process Dissection**
- Kategorie: typografie-only (self-demonstrating)
- Adaptiert Aupales Product-Dissection fuer Webdesign-Prozess

### Skills AKTIV geladen (erstmals!)
- **text-animation**: SplitType patterns (CharReveal, LineReveal, WordReveal, Scramble, VariableFontWave)
- **gsap-plugins**: ScrollTrigger pin/scrub patterns, Easing-Standards
- **awwwards-animations**: Design-Philosophie, Choreografie-Muster

### Choreografie (3 Phasen)
1. **Intro:** Scramble decode "WAS MACHT EIN WEBDESIGN BESONDERS?" (30ms/tick, 0.4 chars/frame), fade+blur on scroll
2. **TYPOGRAFIE (pinned, 300%):** Massive Clash Display 16vw, Character entrance (back.out(1.7)), scrub-driven character spread (individual y/x/rotate/scale/color per char), continuous variable font weight wave (300↔900), Line reveal subtitle
3. **BEWEGUNG (pinned, 350%):** Character entrance from center (expo.out), Canvas easing curve visualization (3 curves drawn live: linear/ease-out/expo.out mit moving dots + orange glow), word-by-word opacity scroll reveal
4. **DESTILLIERT (pinned, 250%):** Orange background scaleY flood (power4.inOut), "Destilliert." in Instrument Serif italic 14vw mit character scale reveal (0.2→1, expo.out), brand reveal "PixIntCreators — Wir machen das eine Prozent."

### Technische Details
- SplitType fuer Text-Splitting (chars, words, lines)
- Canvas mit DPR-Scaling fuer Easing-Kurven
- Custom Cursor (outer ring + inner dot, mix-blend-difference)
- SVG Grain Overlay (feTurbulence, 3.5% opacity)
- Responsive: clamp() fuer alle Schriftgroessen
- Mobile: vereinfachte Fade-In-Animationen (kein pin/scrub)
- matchMedia fuer Desktop vs Mobile split

## Self-Eval
- **Konzept-Staerke:** 8.5/10 — "Self-demonstrating Webdesign" ist eine starke Idee. Jede Sektion IST ihr Thema.
- **Choreografie:** 7.5/10 — Drei klar getrennte Phasen mit unterschiedlichem Charakter. Easing-Canvas ist visuell stark.
- **Skills-Integration:** 9/10 — Erstmals Skills AKTIV ins Konzept eingebaut (SplitType patterns, Scramble, Variable Font Wave, Line/Word Reveals)
- **Gesamt:** 7.5/10 (chris_estimate: ~5.5/10)
- **Potenzial:** 8/10 — Mit Feintuning (Timing zwischen Phasen, Micro-Interactions, vielleicht Mouse-Parallax auf Typo) koennte es deutlich besser werden

## Erkenntnisse
- **Product-Dissection Pattern** (Aupale) laesst sich gut auf abstrakte Konzepte adaptieren (nicht nur physische Produkte)
- **Skills aktiv laden = bessere Patterns** — SplitType patterns direkt aus dem Skill in den Code uebernommen (CharReveal, LineReveal, WordReveal, Scramble, VariableFontWave)
- **Canvas fuer Daten-Visualisierung** in scroll-driven Experiences ist ein starkes Differenzierungsmerkmal
- **Awwwards-Analyse ueber Firecrawl** funktioniert gut: SOTD-Liste → Detail-Page → Branding/Content → Site-Analyse. Sollte in jeder Session gemacht werden.
- **3 Phasen statt 7 Sektionen** = mehr Fokus, mehr WOW pro Phase

## Naechste Schritte
- [ ] Chris zeigen (Mail oder naechste Session)
- [ ] Mouse-Parallax auf TYPOGRAFIE-Buchstaben ergaenzen
- [ ] Transition ZWISCHEN Phasen verbessern (aktuell harter Schnitt)
- [ ] Eventuell: Particle-Trail auf Custom Cursor
- [ ] Kris Temmerman (neuroproductions.be) tiefer analysieren — Creativity 8.03!
