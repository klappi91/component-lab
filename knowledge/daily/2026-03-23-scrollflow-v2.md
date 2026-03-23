# 2026-03-23 — ScrollFlow v2: Performance + Sichtbarkeit (run-20260323-1720)

## Was passiert ist
- Heartbeat-Check: Offene Chris-Feedback-Punkte = Performance Desktop + Fluss sichtbarer
- ScrollFlow komplett ueberarbeitet:
  - **ENTFERNT:** 3 CSS-blur Orbs (filter: blur 60-100px auf 500-1000px Elementen) — groesster Performance-Killer
  - **NEU:** Fliessender SVG-Pfad der sich beim Scrollen zeichnet (stroke-dashoffset)
  - **NEU:** Leuchtender orange Navigator-Dot der dem Pfad folgt (getPointAtLength + rAF)
  - **NEU:** Spring-Interpolation fuer fluessige Dot-Bewegung
  - **NEU:** Dot pulsiert bei Section-Boundaries (elastic scale)
  - **NEU:** Pfad leuchtet heller an Section-Dividers
  - **NEU:** Mobile: einfache orange Progress-Bar statt unsichtbarer Blur-Orbs
- rAF-Cleanup richtig strukturiert (ausserhalb gsap.context)
- Deployed als v11

## QA
- Build: fehlerfrei
- Desktop Screenshots (agent-browser): Alle Sektionen intakt, keine visuellen Regressions
- SVG-Pfad nicht in statischen Screenshots sichtbar (wird per scroll-animation gezeichnet) — Live-Test noetig

## Offene Punkte (naechste Session)
- [ ] **Live-Test im Browser** — SVG-Pfad + Dot Sichtbarkeit verifizieren (agent-browser zeigt scroll-animierte Elemente nicht)
- [ ] **Performance messen** — Lighthouse oder DevTools Performance-Tab auf Desktop
- [ ] **Pfad-Platzierung evaluieren** — aktuell x=62-85 (rechtes Drittel), evtl. Ueberlappung mit Content
- [ ] **Methode-Sektion** — Headlines zu dunkel, kaum lesbar im QA-Screenshot

## Erkenntnis
- CSS blur() auf grossen Elementen = Performance-Killer auf Desktop. Die 3 Orbs (500-1000px mit blur 60-100px) waren der Hauptgrund fuer Chris' Performance-Feedback
- agent-browser (Playwright) kann scroll-animierte Elemente (stroke-dashoffset, rAF-positioned dots) nicht in Screenshots zeigen — fuer solche Tests braucht man headed-mode oder manuelle Pruefung
- SVG getPointAtLength() ist ideal um Elemente entlang eines Pfades zu bewegen ohne MotionPathPlugin
