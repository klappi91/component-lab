# OpenAI Frontend Design Prompting Rules

Quelle: OpenAI GPT-5.4 Frontend-Designer Guide (2026-03-23 via the-decoder.de)

## Kernstrategie
- Design-System ZUERST definieren (Farben, Typografie, Layout-Regeln)
- Visuelle Referenzen / Moodboards im Prompt mitgeben
- Seiten als **narrative Sequenzen** strukturieren, nicht als Component-Dumps
- **Echten Content** verwenden, keine Platzhalter

## 10 Hard Rules fuer bessere Ergebnisse

1. **Composition** — Erster Viewport muss als Einheit lesen, nicht fragmentiert
2. **Branding** — Markenname auf Hero-Level Prominenz, nicht in der Navigation versteckt
3. **Typography** — Expressive, bewusste Fonts; KEINE Default-Stacks (Inter, Roboto, System)
4. **Backgrounds** — Gradients, Bilder, subtile Patterns statt Flat Colors
5. **Hero Imagery** — Full-bleed Edge-to-Edge; keine inset/floating Image-Container
6. **Content Priority** — Hero: nur Brand + Headline + Supporting Sentence + CTA + dominantes Bild
7. **Card Usage** — Default: KEINE Cards; nur wenn Container User-Interaktion unterstuetzen
8. **Section Focus** — Jede Sektion = ein Zweck, eine Headline, ein Supporting Sentence
9. **Visual Anchors** — Imagery muss Produkte/Kontext zeigen; dekorative Backgrounds zaehlen nicht
10. **Motion Design** — 2-3 intentionale Animationen fuer visuelle Hierarchie

## Workflow
- Mit weniger Reasoning starten (mehr Compute ≠ besser)
- Self-Verification: Agent prueft visuell per Playwright/Screenshots und korrigiert
- Bei bestehendem Design-System: bestehende Patterns beibehalten

## Anwendung fuer Component Lab
Diese Regeln als PROMPT-BESTANDTEIL in Builder-Agenten einbauen:
- Als System-Prompt fuer Builder-Sessions
- Als .claude/commands/build.md im Projekt-Verzeichnis
- Kombiniert mit Skills (premium-frontend-design, impeccable-Suite)
