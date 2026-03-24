# exp-codex-test — Codex gpt-5.4 als Builder

## Status
- **Score:** ~6.5/10 (geschaetzt, konservativ)
- **Deployed:** NEIN (Vercel-Token abgelaufen)
- **GitHub:** https://github.com/klappi91/weblab-exp-codex-test
- **Build:** 0 Fehler

## Setup
- Gleiche Spec wie exp-haiku-test / exp-parallel-dark (386 Zeilen, Dark Cinematic)
- Gleiche 7 Assets (Bilder)
- Codex gpt-5.4, reasoning: high, sandbox: workspace-write
- Kommando: `codex exec` mit creative-brief.md Referenz

## Ergebnisse
- **110,445 Tokens**, 727 Zeilen page.tsx, 4 Dateien geaendert
- Alle 7 Sektionen implementiert (Hero, Statement, Services, Portfolio, Process, CTA, Footer)
- Alle 7 Bilder + beide Logos verwendet
- GSAP ScrollTrigger korrekt integriert (4 ScrollTrigger Instanzen, 15 gsap Aufrufe)

## Architektur-Highlights
- **useGSAP Hook** mit proper scope und cleanup (nicht raw useEffect)
- **gsap.matchMedia()** fuer responsive Animationen (Mobile vs Desktop)
- **mm.revert()** Cleanup bei Unmount
- **prefers-reduced-motion** Support fuer Marquee
- **overflow-x: hidden** auf html UND body (korrekt!)
- Horizontaler Portfolio-Scroll: Pin + scrub (Desktop), Stagger (Mobile)
- Next 16 Turbopack-Bug erkannt → Build-Script auf --webpack geaendert

## Extras ueber die Spec hinaus
- Navigation Bar im Hero (Logo + Links)
- Stat-Cards im Hero ("01%", "GSAP")
- Glasmorphism-Effekte (backdrop-blur, border-white/10)
- Radial Gradients als visuelle Tiefe
- Abgerundete Karten (border-radius 2rem)
- Body-Gradient (radial orange glow oben)
- Logo in CTA + Footer eingebaut

## Vergleich
| Modell | Tokens | Score | GSAP ok? | Extras |
|--------|--------|-------|----------|--------|
| Haiku | 61k | 3.0 | NEIN | Keine |
| Sonnet | ~80k | 5.3 | JA | Keine |
| **Codex** | **110k** | **~6.5** | **JA+** | **Viele** |
| Opus (direkt) | ~200k | 8.0 | JA++ | Kreativ |

## Erkenntnisse
1. **Codex gpt-5.4 > Sonnet als Builder** — bessere Architektur, erweitert Spec kreativ
2. **Codex versteht React-Patterns tiefer** — useGSAP statt useEffect, matchMedia, proper cleanup
3. **Codex adaptiert an Umgebung** — erkannte Turbopack-Bug und fixte Build-Script selbst
4. **Kosten hoeher als Sonnet** — 110k vs ~80k Tokens, aber Output-Qualitaet rechtfertigt es
5. **KEIN Ersatz fuer Opus** — Codex erweitert Spec, aber erfindet keine WOW-Momente (kein Shader, keine Custom Cursor)
6. **Vercel-Token abgelaufen** — Deployment blockiert, muss erneuert werden

## Modell-Hierarchie (final)
- **Opus** = Kreative WOW-Module, Deep Understanding (8/10)
- **Codex gpt-5.4** = Bester Spec-Following Builder, gute Architektur (6.5/10)
- **Sonnet** = Solider Builder, folgt Spec exakt (5.3/10)
- **Haiku** = Billig aber unbrauchbar fuer Awwwards (3.0/10)

## Naechste Schritte
- [ ] Vercel-Token erneuern und deployen
- [ ] Codex als Builder im "Opus Signature + Builder" Workflow testen (statt Sonnet)
- [ ] Vergleich: Opus Signature + Codex Builder vs. Opus Signature + Sonnet Builder
