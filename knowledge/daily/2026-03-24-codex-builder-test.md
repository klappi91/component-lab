# 2026-03-24 — Codex gpt-5.4 als Builder (run-20260324-0340)

## Entscheidung
P4: Letztes offenes Modell-Experiment "Codex als Builder" aus GOALS.md.

## Was passiert ist
- Neues Projekt exp-codex-test aufgesetzt (web-lab setup.sh)
- Spec + Assets von exp-haiku-test kopiert (386 Zeilen, 7 Bilder)
- Codex gpt-5.4 (high reasoning) als Builder via `codex exec --sandbox workspace-write`
- Codex: 110,445 Tokens, 727 Zeilen page.tsx, 4 Dateien, 0 Build-Fehler
- Git push erfolgreich, Vercel-Deployment BLOCKIERT (Token abgelaufen)

## Codex vs andere Modelle (gleiche Spec)
- Haiku: 3.0/10 (broken GSAP, 61k tokens)
- Sonnet: 5.3/10 (solide, 80k tokens)
- **Codex: ~6.5/10 geschaetzt (110k tokens)** — bester Builder
- Opus: 8.0/10 (kreativ, ~200k tokens)

## Codex-Staerken
1. useGSAP Hook statt raw useEffect (korrekte React-Integration)
2. gsap.matchMedia() fuer responsive Animationen
3. Proper cleanup (mm.revert())
4. Erweitert Spec kreativ (Nav, Stats, Glasmorphism, a11y)
5. Erkennt + fixt Umgebungs-Bugs (Turbopack → --webpack)
6. prefers-reduced-motion Support

## Codex-Grenzen
1. KEIN Ersatz fuer Opus — erweitert Spec, erfindet aber keine WOW-Momente
2. 110k Tokens (teurer als Sonnet)
3. Keine kreativen Signaturen (kein Shader, kein Custom Cursor)

## Erkenntnisse
1. **MODELL-HIERARCHIE KOMPLETT:** Opus (8) > Codex (6.5) > Sonnet (5.3) > Haiku (3)
2. **Codex = Bester Spec-Follower** — versteht React-Patterns tiefer als Sonnet
3. **Neuer moeglicher Workflow:** Opus Signature + Codex Builder (statt Sonnet)
4. **Vercel-Token muss erneuert werden** — blockiert alle zukuenftigen Deployments

## Token-Effizienz
- Codex-Build: 110k Tokens (direkt von OpenAI)
- Session gesamt: moderat (~150k geschaetzt inkl. Overhead)
