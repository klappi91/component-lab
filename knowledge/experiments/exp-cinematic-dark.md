# exp-cinematic-dark

## Meta
- **Konzept:** "Cinematic Dark" — filmisch, dramatisch, dark base mit orange Akzenten, full-bleed imagery
- **URL:** https://exp-cinematic-dark.vercel.app
- **GitHub:** https://github.com/klappi91/weblab-exp-cinematic-dark
- **Status:** v1 deployed, QA Score 7/10 — BESTES Ergebnis bisher
- **Erstellt:** 2026-03-23
- **Prozess-Experiment:** Builder mit OpenAI Design Rules (OHNE Designer-Agent)

## Prozess-Experiment #2: OpenAI Rules als Builder System-Prompt

### Hypothese
Die OpenAI Frontend Design Rules als direkter System-Prompt fuer den Builder (OHNE separaten Designer-Agent) liefern vergleichbare oder bessere Ergebnisse, weil:
- Die Regeln konkret und actionable sind
- Weniger Context-Loss (kein Designer→Builder Handoff)
- Builder macht In-the-moment Design-Entscheidungen geleitet von Regeln
- Schneller (kein separater Design-Schritt)

### Verbesserungen gegenueber exp-warm-brutal
1. **Assets ZUERST generiert** — 7 Bilder via gemini-image batch ($0.51)
2. **Image-Manifest** — Builder weiss genau welche Bilder existieren und wofuer
3. **Kein Designer-Zwischenschritt** — OpenAI Rules direkt ins Konzept eingebettet
4. **Full-bleed Hero** — OpenAI Rule #5 explizit, hero-cinematic.png als Hintergrund
5. **Explizite Verboten-Liste** — gegen AI-Template Tells und generische Patterns

### Setup
- **Modell:** Sonnet (statt Opus — kosteneffizienter, Geschwindigkeitstest)
- **Assets:** 7 gemini-image Bilder (batch, $0.51, 48 Sek)
- **Konzept:** Manuell geschrieben mit OpenAI Rules eingebettet
- **Builder:** tmux-Session, build-homepage.md als System-Prompt
- **Skills verfuegbar:** gsap-scrolltrigger, premium-frontend-design, motion-framer, text-animation

### Assets (vor Builder generiert)
1. hero-cinematic.png (16:9, 2K) — Dark Studio, Monitore, orange Ambient-Light
2. service-webdesign.png (3:4) — Screen mit Wireframe, orange Reflektionen
3. service-ki.png (3:4) — Orange Neural-Network-Knoten auf Schwarz
4. service-creative.png (3:4) — 3D Glas-Skulptur mit orangem Licht
5. mockup-website.png (16:9) — Website auf Monitor im dunklen Raum
6. mockup-mobile.png (3:4) — Smartphone UI, schwebend im Dunkeln
7. studio-atmosphere.png (21:9) — Film-Noir Studio-Stimmung

### Zu evaluieren
- [ ] Nutzt der Builder alle 7 generierten Bilder?
- [ ] Ist hero-cinematic.png full-bleed implementiert?
- [ ] Sind die OpenAI Rules im Ergebnis erkennbar?
- [ ] WOW-Faktor im Vergleich zu exp-warm-brutal?
- [ ] Build-Fehler?
- [ ] Modell-Vergleich: Sonnet vs. Opus als Builder?

## Design
- Dark Base (#0A0A0A), Orange Akzent (#FF6B00 max 3-4x)
- Full-bleed Hero mit generiertem Studio-Bild
- Expressive Fonts (Builder waehlt)
- Asymmetrische Layouts, Services vertikal gestapelt
- GSAP: Hero-Entrance, Clip-Path-Reveals, Parallax
