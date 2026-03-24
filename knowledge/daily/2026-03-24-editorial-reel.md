# 2026-03-24 — hero-v020-a: EDITORIAL REEL

## Run: run-20260324-1540

## Was passiert ist
- Heartbeat-Check: Keine neuen Mails, alle Improvements erledigt, 19 Heroes gebaut heute
- Tiefe Inspiration-Recherche statt noch einen Hero draufzupacken
- **Fundamentale Erkenntnis** die den Ansatz aendert

## Recherche-Ergebnisse

### Unseen Studio 2025 Wrapped (Awwwards SOTD 24.03.2026, 7.44/10)
- Horizontales Scroll Year-in-Review
- NUR 2 Farben: #010101 + #E4B504 (schwarz + gold)
- WordPress-basiert (!) — Technik ist irrelevant, Choreografie zaehlt
- Features: Big Typography, Custom PreLoader, Horizontal Parallax
- School of Motion: "bold typography, unexpected cursor interactions, transitions both modern and timeless"

### Artiom Yakushev (Portfolio SOTD + Honors Dec 2025)
- Webflow + GSAP + Figma
- Grid layout, video backgrounds, custom cursor on hover
- Parallax, transitions, filters

### Lando Norris (Site of the YEAR)
- OFF+BRAND Studio
- WebGL + Rive + Webflow — Hybrid-Stack
- "Speed-inspired animations echo racing intensity"
- "Cinematic scrolling creates momentum throughout"
- Rive fuer stateful Motion Design (nicht nur GSAP-Tweens)

### 2026 Design Trends
- **Archival Index** — editorial grid, understated typography, catalog feel
- **Motion Narrative** — "where you scroll becomes the storyteller"
- **Creative Process** — showing the making-of
- **Glassmorphism** — translucent, frosted-glass
- **Card Play** — card-based UI

## Fundamentale Erkenntnis

**Unsere 19 Heroes = Technik-Demos ohne Story.**
**Award-Gewinner = Narrative-Erlebnisse mit Zurueckhaltung.**

Die SOTD-Gewinner:
1. Erzaehlen Geschichten durch CONTENT — Animation dient der Narrative
2. Haben EDITORIAL RESTRAINT — wenig Farben, praezise Typografie, Raum
3. Nutzen ONE signature moment — nicht 15 Techniken gleichzeitig
4. Zeigen echte INHALTE — nicht abstrakte Shader/Partikel

## Was ich gebaut habe

hero-v020-a: EDITORIAL REEL — fundamental anders als v001-v019.

### Unterschiede zu allen bisherigen Heroes
- **Content-driven**: Echte PixIntCreators Brand Story (Services, Tagline, CTA)
- **Editorial restraint**: NUR 2 Farben (#0A0A0A + #FF6B00), serif + mono
- **ONE moment per panel**: Nicht 10 Techniken pro Screen
- **Horizontal narrative**: Scroll = Story-Progression
- **Typografie als Kern**: Playfair Display (editorial serif) + Space Mono (tech labels)

### Choreografie
- Opening: Char-by-char "PixIntCreators" (expo.out, stagger 0.04s)
- 3 Service-Panels: Grosse Stroke-Nummern (01/02/03) mit PARALLAX + Content-Cascade
- Closing: Word-by-word "Bereit fuer das 1% das im Kopf bleibt?"
- Durchgehend: Lenis, Custom Cursor (quickTo), Progress Bar, Film Grain

### Technisch
- Horizontal Scroll: Track-basiert (gsap.to(track, { x: -totalScroll }))
- containerAnimation fuer Panel-spezifische Reveals
- once: true fuer einmalige Reveals
- gsap.quickTo fuer butterweichen Cursor
- Kein Canvas, kein WebGL, kein Three.js — pure GSAP + Typografie

## Self-Eval
- **Technik:** 6/10 (bewusst zurueckgehalten — das ist der Punkt)
- **Design:** 8/10 (editorial, restraint, purposeful)
- **Choreografie:** 7/10 (clear narrative arc, good timing)
- **Content-Relevanz:** 9/10 (erstes Erlebnis mit ECHTEM Brand-Content)
- **Geschaetzter Chris-Score:** 6-7/10 (neuer Ansatz, muss zeigen ob Richtung stimmt)

## Erkenntnisse
1. Editorial Restraint ist SCHWERER als maximale Effekte — jede Entscheidung zaehlt mehr
2. Content-driven macht den Hero sofort relevanter fuer die echte Website
3. Horizontal scroll + Lenis + containerAnimation ist ein solides Framework
4. gsap.quickTo fuer Cursor ist viel cleaner als manueller RAF-Loop
5. Serif + Mono Kombination fuer Agentur-Websites = starker Editorial-Kontrast
6. Nummern als Design-Elemente (grosse Stroke-Nummern) = klassisches Editorial-Pattern

## Naechste Schritte
- Chris zeigen — neuer Ansatz, Feedback ist kritisch
- Rive evaluieren (SOTY-Gewinner nutzt es) — find-skills checken
- Wenn Chris-Richtung bestaetigt: diesen Editorial-Ansatz weiter ausbauen
- Optional: Preloader hinzufuegen, hover states ausbauen
