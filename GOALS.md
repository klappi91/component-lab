# GOALS — Was ich erreichen will

## Hauptziel
**Erlebnisse choreografieren die WOW ausloesen.**
Nicht "solide Websites" sondern das 1% das im Kopf bleibt.
99 Websites sind gleich — wir machen das eine Prozent.

---

## Aktuelle Phase: Experience Lab (ab 2026-03-24)

### Neuer Ansatz
- **Erlebnisse statt Komponenten** — ob 1 Screen oder Mini-Site, egal. Flow zaehlt.
- **Skills aktiv nutzen** — awwwards-animations + gsap-plugins = Pflicht, Konzept-Skills je nach Typ
- **Inspiration → Choreografie verstehen → selber erschaffen**
- **Direkt im Component Lab** — kein neues Repo, kein Vercel pro Erlebnis
- **Potenzial > Perfektion** — frueh zeigen, zusammen mit Chris iterieren
- **Neue Skills suchen** — aktiv nach Inspiration und passenden Skills suchen

### Offene Aufgaben

#### hero-v005-a: Pixel Genesis v3 — TRUE Pixel Decomposition
- [x] Chris-Feedback einarbeiten (scroll-driven transformation, "Vom Pixel zur Website")
- [x] Erlebnis choreografieren und bauen (canvas particle system, 4 Phasen)
- [x] In components.json tracken
- [x] Echtes Bild mit gemini-image generieren (2K, PixIntCreators brand)
- [x] Neues Chris-Feedback (24.03. 07:30): "echte Pixel → Bild zusammensetzen = WOW"
- [x] v2 gebaut: ~6000 Partikel, smooth color-morph, Crossfade zu echtem Bild
- [x] **v3 gebaut: Fundamentaler Ansatz-Wechsel — Image-First Shatter → Reassemble**
- [x] **v3.1: Canvas-Text statt DOM, easeInCubic fuer langsamere Reassembly**
- [x] **Besseres Target-Bild generiert (WIR GESTALTEN ERLEBNISSE, sauberer)**
- [x] **Desktop QA: Shatter ✓, Chaos ✓, Reassembly ✓, Crossfade ✓, Text ✓**
- [ ] Chris v3 zeigen (Mail mit Screenshots)
- [ ] Mobile testen (agent-browser)
- [ ] Canvas-Text Alignment fixen

#### hero-v006-a: DESTILLIERT — Typographic Process Dissection
- [x] Awwwards SOTD analysieren (Aupale Vodka/Locomotive, Unseen Studio, Kris Temmerman)
- [x] Product-Dissection Pattern adaptieren fuer Webdesign-Prozess
- [x] Skills aktiv laden (text-animation, gsap-plugins, awwwards-animations)
- [x] 3 Phasen choreografieren und bauen (TYPOGRAFIE, BEWEGUNG, DESTILLIERT)
- [x] In components.json tracken
- [ ] Chris zeigen, Feedback einholen
- [ ] Uebergaenge zwischen Phasen verbessern
- [ ] Mouse-Parallax auf TYPOGRAFIE-Buchstaben

#### hero-v007-a: VOM PIXEL ZUR WEBSITE — Scroll-Driven Creation (VERWORFEN)
- [x] Chris-Feedback: "passiert nicht viel, langweilig" → nicht weiterverfolgt

#### hero-v008-a: TYPOGRAPHIC DEPTH — 3D Parallax Typography
- [x] Kris Temmerman recherchiert (neuroproductions.be, WebGPU, "Portfolio = Game")
- [x] Key Insight: Interaktivitaet fehlt in allen bisherigen Erlebnissen
- [x] Konzept: 3D Typography-Raum, Mouse steuert Perspektive, Scroll zoomt durch
- [x] Build: CSS 3D perspective + Canvas particles + Layer-Flash + Brand Reveal
- [x] components.json aktualisiert
- [x] Chris ueber v005-v007 per Mail informiert (3 neue Erlebnisse)
- [x] Chris-Feedback: "hat Potenzial, aber am Ende fehlt abschliessendes Element"
- [x] **v2: Impact-Finale — Partikel-Konvergenz → Orange Pulse → Brand materialisiert → CTA**
- [x] **Bug: Brand/Impact aus 3D-Camera extrahiert (z>perspective = unsichtbar)**
- [x] **QA: Alle 5 Phasen verifiziert (Initial → Zoom → Impact → Brand → CTA)**
- [x] **Chris per Mail informiert**
- [ ] Chris v2 Feedback abwarten
- [ ] Optional: WebGL-Upgrade fuer dramatischere Tiefe

#### hero-v009-a: MAGNETIC TYPE FIELD — Physics-Based Word Interaction
- [x] Awwwards SOTD analysiert (shed.design SOTD 23.03, Darknode SOTD 21.03)
- [x] Konzept: 30 Worte als Physik-Entitaeten, Mouse = Magnet, Scroll = Chaos→Ordnung→Brand
- [x] Build: DOM-Physics + Golden-Angle Formation + Cursor-Glow Canvas + Touch-Support
- [x] components.json aktualisiert
- [ ] Chris-Feedback einholen
- [ ] Physics-Konstanten feintunlen
- [ ] Lenis Smooth Scroll integrieren

#### Naechstes Erlebnis
- [ ] Neues Erlebnis: Horizontal Scroll, Clip-Path Wipe, oder Video-Integration
- [ ] Awwwards SOTD als Inspiration weiter analysieren

#### Skill-Discovery
- [ ] find-skills nach neuen Animations/Design-Skills durchsuchen
- [ ] Pruefen ob es Skills fuer Patterns gibt die bei Inspiration aufgefallen sind
- [ ] Neue Skills installieren und in naechstem Erlebnis testen

---

## Abgeschlossene Phase: Prozess-Optimierung (2026-03-22 bis 2026-03-24)

### Erkenntnisse (behalten)
- Opus fuer Kreativ/WOW, Sonnet fuer systematische Arbeit
- Assets-First + Manifest = Builder nutzt sie alle
- Agent-Tool > tmux
- Builder = Spec-Qualitaet
- Modell-Hierarchie: Opus > Codex > Sonnet > Haiku
- GSAP + Lenis = Industriestandard (100% der Awwwards-Gewinner)
- Choreografie-Qualitaet > Tools/Assets (Easing, Timing, Uebergaenge)
- Keine Preset-Libraries bei Award-Sites (kein animate.css, AOS etc.)

### Was sich geaendert hat
- ~~Verschiedene Modelle vergleichen~~ → Verschiedene Skills/Prompts iterieren
- ~~Neue Repos + Vercel Deploys~~ → Direkt im Component Lab
- ~~"Baue Hero + 7 Sektionen"~~ → "Choreografiere ein Erlebnis"
- ~~Autonom bis v12 polieren~~ → Frueh zeigen, zusammen iterieren
- ~~Skills nur installieren~~ → Skills AKTIV ins Konzept laden

### Externe Experimente (Archiv, nicht fortgesetzt)
- exp-signature-hero: 8/10 Chris — Bestes Ergebnis, abgeschlossen
- exp-story-editorial v6: deployed, wartet auf Feedback
- exp-cinematic-dark v2: 7.5/10, Referenz
- exp-morphic-flow v3: ~7/10, Pipeline-Test
- exp-kinetic-type: ~6.5/10, Reproduzierbarkeit
- exp-parallel-dark/light: 5.3/4.6, Parallel-Test
- exp-haiku-test: 3.0/10, Modell-Test
- exp-codex-test: ~6.5/10, Codex-Test
- exp-scroll-story: ~4.5/10, Skill-Test
- 15 Prozess-Experimente insgesamt

---

## Metriken
- **Erlebnisse im Lab:** 9 (hero-v001 bis v009)
- **Chris "WOW":** 0 (Ziel: mindestens 1)
- **Skills aktiv genutzt:** 3 von 6 (text-animation, gsap-plugins, awwwards-animations) — hero-v006-a
- **Neue Technik:** DOM-Physics + Magnetic Mouse (hero-v009-a) — erster Hero mit eigener Physik-Simulation
- **Inspiration-Analysen:** 7 (mersi, DD.NYC, Aupale/Locomotive, Unseen Studio, Kris Temmerman, shed.design, Darknode)
- **Bester Chris-Score (extern):** 8/10 (exp-signature-hero)
