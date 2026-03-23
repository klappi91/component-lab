# Prozess-Experiment #2: OpenAI Rules als Builder System-Prompt — 2026-03-23

## Run-ID: run-20260323-1015

## Was wurde getestet
Zweites Prozess-Experiment: OpenAI Frontend Design Rules direkt als Leitfaden ins Design-Konzept eingebettet (kein separater Designer-Agent). Assets wurden ZUERST generiert (Learning aus exp-warm-brutal).

## Ergebnis
- **Website deployed:** https://exp-cinematic-dark.vercel.app
- **GitHub:** https://github.com/klappi91/weblab-exp-cinematic-dark
- **Build:** Fehlerfrei, 7 Min 45 Sek (Sonnet)
- **Assets:** 7/7 Bilder korrekt integriert ($0.51 Batch)
- **QA Score:** 7/10 Gesamt (vs. 5/10 bei exp-warm-brutal)

## Vergleich: Designer→Builder vs. Rules→Builder

| Aspekt | Designer→Builder | Rules→Builder |
|--------|-----------------|---------------|
| Gesamtzeit | ~25 Min | ~15 Min |
| Builder-Modell | Opus | Sonnet |
| Asset-Integration | Gescheitert | Perfekt |
| WOW-Faktor | 5/10 | 7/10 |
| Kosten | Hoch | Niedrig |
| Kreativitaet | Designer war kreativer | Konventioneller aber solider |

## Schluesselerkenntnisse

### 1. Assets-First + Manifest ist ENTSCHEIDEND
Das wichtigste Learning: Bilder VOR dem Builder generieren UND ein Manifest bereitstellen. Bei warm-brutal hat der Builder die Bilder ignoriert. Bei cinematic-dark hat er alle 7 korrekt integriert.

### 2. OpenAI Rules funktionieren als Builder-Leitfaden
Die 10 Rules (Full-bleed, Hero-Komposition, Content-Priority, etc.) produzieren ein zuverlaessig kohaerenteres Ergebnis als ein Designer-Konzept. Weniger kreativ, aber soliderer Output.

### 3. Sonnet ist als Builder gut genug
Schneller UND guenstiger als Opus. Die Code-Qualitaet ist vergleichbar. Opus lohnt sich eher fuer kreative/konzeptionelle Aufgaben.

### 4. Full-bleed Hero-Imagery ist ein Game-Changer
Die OpenAI Rule #5 (Full-bleed Edge-to-Edge) macht einen enormen Unterschied. Der cinematic-dark Hero ist das staerkste einzelne Element ueber alle Experimente.

### 5. Noch nicht "WOW" genug
Score ist 7/10 — gut, aber nicht Awwwards-wuerdig. Es fehlt:
- Ein Signature Moment (WebGL Shader, 3D Element, oder technisch beeindruckende Animation)
- Mutigere Layouts (die Services sind gut aber konventionell)
- Micro-Interactions (Hover-Effekte, Custom Cursor, etc.)
- GSAP-Animationen sind im Headless-Browser nicht testbar

## Naechste Schritte
1. exp-cinematic-dark mit impeccable:overdrive polieren (Push to WOW)
2. Oder: Neues Experiment mit Kombination — Designer + OpenAI Rules + Assets First
3. Oder: Parallelbuild-Experiment (2 Builder, verschiedene Prompts)
