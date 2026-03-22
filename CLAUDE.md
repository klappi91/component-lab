# Component Lab

Autonomer Web Design Agent — baut taeglich neue Web-Komponenten auf Awwwards-Niveau.

## Architektur
- Next.js 16 App Router + TypeScript + Tailwind v4
- Gallery (/) → Compare (/compare/[pairId]) → Hero (/heroes/[id])
- components.json = zentrale Metadaten aller Komponenten
- knowledge/constitution.md = kuratiertes Wissen (evolving)

## Autonomer Agent
- Orchestrator entscheidet Strategie (Kategorie, Skills, Workflow, Modell)
- Builder = isolierte Claude Code Sessions die Komponenten bauen
- Agent evaluiert Ergebnisse, lernt, verbessert sich
- Chris bewertet auf der Website

## Memory-System
- knowledge/constitution.md — kuratiert, immer geladen
- knowledge/daily/ — rohe Run-Notizen, durchsuchbar
- knowledge/skills/ — Skill-Erkenntnisse
- knowledge/workflows/ — Workflow-Erkenntnisse
- Promotion: Daily → Skills/Workflows → Constitution

## Erlebnis-Kategorien
video-hero, typografie-only, 3d-szene, editorial, fullscreen-image, interaktiv, generative-art, scroll-storytelling, single-element, collage-mixed-media

## Wichtig
- NIEMALS `next dev` im Hintergrund — nur `npm run build` fuer Validierung
- Neue Heroes als eigene Verzeichnisse unter src/app/heroes/
- Immer components.json aktualisieren nach neuem Build
- constitution.md nach Erkenntnissen aktualisieren
- Hero-Naming: hero-vXXX-[a|b] (naechste freie Nummer aus components.json)
