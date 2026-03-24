# 2026-03-24 — hero-v005-a v3: TRUE Pixel Decomposition (run-20260324-0900)

## Entscheidung
P1-adjacent: Chris-Feedback zu v005-a umsetzen. Sein clearstes Feedback aller Zeiten:
"Eine Webseite in echte Pixel zerlegen die wenn alle wieder zusammen kommen das Bild ergeben — DAS waere WOW"

## Was gebaut wurde
**hero-v005-a v3: Image-First Shatter → Reassemble**

### Fundamentaler Ansatz-Wechsel
v2: Orange Pixel → Farbmorph → Crossfade (Chris: "Idee gut, Umsetzung nicht")
v3: Echtes Bild → SHATTER → farbige Pixel verstreut → Scroll reassembled → kristallklar

### Choreografie (v3.1)
1. **LOAD (0s):** Bild laedt, Partikel assembled an Home-Positionen (= pixeliertes Bild sichtbar)
2. **SHATTER (0.8-2.6s):** Auto-Animation, center-first stagger, expo.out. Partikel EXPLODIEREN nach aussen
3. **"ZERLEGT." (Canvas-Text):** Erscheint waehrend Shatter, verschwindet bei Scroll-Start
4. **CHAOS (scroll 0-40%):** Partikel verstreut, sanfter Drift + Mouse-Push. Progress counter "5%...15%"
5. **CONVERGE (scroll 40-75%):** easeInCubic — Partikel fliegen zurueck. Bild wird erkennbar ab ~60%
6. **ASSEMBLE (scroll 75-85%):** Letzter Snap. Pixel fuellen Luecken.
7. **CROSSFADE (scroll 75-95%):** Scharfes Originalbild fadet ueber Pixel-Canvas. Orange Border Glow.
8. **REVEAL (scroll 85-100%):** "Vom Pixel zur Website." (Instrument Serif italic) + "PIXINT CREATORS"

### Technisches
- Canvas 2D, DPR-aware, ~5000 Partikel (responsive Grid ~8-14px)
- ALLE Partikel haben IMMER ihre echte Bildfarbe (kein Orange-Phase)
- Scatter: outward from center, ±34° random spread, 200-800px distance
- Reassembly: easeInCubic (bleibt LANG verstreut, snapped erst spaet zusammen)
- Per-Particle Stagger: edges reassemble first, center last (inward wave)
- Mouse Push: 180px radius, proportional zu currentScatter
- Text: direkt auf Canvas gerendert (nicht DOM) → perfekter Sync
- Crossfade: roundRect clip + orange border glow
- Neues Target-Bild: gemini-image 2K, "WIR GESTALTEN ERLEBNISSE", sauberer Text

### v3.0 → v3.1 Fixes
- **BUG:** DOM-Text "ZERLEGT." verschwand nicht (ScrollTrigger + pinned element = desynchron)
  → FIX: Alles Text auf Canvas gerendert, gesteuert durch selbe Refs wie Partikel
- **BUG:** Reassembly zu schnell (easeInOutQuart = bei 25% scroll schon fast fertig)
  → FIX: easeInCubic = bei 30% scroll nur 2.7% reassembled, dramatischerer Effekt

## Self-Eval
- **Konzept:** 9/10 — exakt auf Chris' Feedback, fundamentaler Ansatz-Wechsel
- **Shatter-Moment:** 8/10 — dramatisch, center-first stagger sieht organisch aus
- **Reassembly-Feel:** 7.5/10 — easeInCubic ist viel besser, aber könnte noch cinematischer sein
- **Crossfade:** 8/10 — smooth, scharfes Bild, orange glow als Akzent
- **Canvas-Text:** 6.5/10 — funktional, aber Canvas-Font-Rendering ist nicht so crisp wie DOM
- **Gesamt:** 7.5/10 (chris_estimate: ~5.5/10)
- **Potenzial:** 8.5/10 — mit besserem Target-Bild + Sound + Mobile-Optimierung viel Luft

## Was ich gelernt habe
- **ScrollTrigger + pinned element + separate Text-ScrollTrigger = desynchron** — Canvas-Text ist die bessere Loesung
- **easeInCubic fuer Reassembly** — "langsam, langsam, langsam... BAM zusammen" ist viel dramatischer als easeInOutQuart
- **Canvas fillText Font Loading** — Fonts muessen geladen sein bevor Canvas sie nutzen kann. Fontshare <link> im layout.tsx laedt sie.
- **Image-First Decomposition** vs Orange-Morph = fundamental besserer Ansatz weil Pixel IMMER die echte Farbe haben

## Mail-Tracking System (Chris-Feedback)
- Chris bat um System fuer verarbeitete Mails (nicht immer dieselbe lesen)
- Implementiert: `runs/processed-mails.json` + `imap.js mark-read` + `--unseen` in HEARTBEAT
- Memory gespeichert: `feedback_mail_tracking.md`

## Naechste Schritte
- [ ] Chris v3 zeigen (Mail mit Screenshots)
- [ ] Canvas-Text Positioning fixen ("ZERLEGT." Alignment)
- [ ] Mobile QA (Touch-Support testen)
- [ ] Besseres Target-Bild (weniger AI-Artefakte in Subtitle/Service-Text)
- [ ] Optional: Sound-Feedback beim Shatter
- [ ] Optional: Lenis Smooth Scroll
