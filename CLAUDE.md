@AGENTS.md

# Component Lab

Autonomes Creative Research Lab — täglich neue Web-Komponenten mit fundamental verschiedenen Ansätzen.

## Architektur
- Next.js App Router + TypeScript + Tailwind v4
- Gallery (/) → Compare (/compare/[pairId]) → Hero (/heroes/[id])
- components.json = zentrale Metadaten-Datei
- knowledge/constitution.md = selbst-evolvierende Design-Prinzipien
- briefs/ = Aufträge für Creative Agents

## Datenfluss
1. Preparer würfelt Erlebnis-Kategorie + Branche + Persona
2. Asset Generator erstellt nötige Assets (Gemini Image/Video)
3. Creative Agent A (Claude) + B (Codex) bauen parallel
4. Integrator: Screenshots, Skill-Audit, Metadaten
5. AI Judges (Claude + Codex) bewerten
6. Chris bewertet auf der Website

## Erlebnis-Kategorien
video-hero, typografie-only, 3d-szene, editorial, fullscreen-image, interaktiv, generative-art, scroll-storytelling, single-element, collage-mixed-media

## Wichtig
- NIEMALS `next dev` im Hintergrund — nur `npm run build` für Validierung
- Neue Heroes als eigene Verzeichnisse unter src/app/heroes/
- Immer components.json aktualisieren nach neuem Build
- constitution.md nach jedem Judge-Urteil aktualisieren
