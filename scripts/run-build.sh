#!/bin/bash
cd ~/projects/component-lab

# Prüfe ob claude noch aktiv arbeitet
# #{pane_pid} IST der claude-Prozess selbst (nicht dessen Parent)
PANE_PID=$(tmux list-panes -t component-lab-build -F '#{pane_pid}' 2>/dev/null)
if [ -n "$PANE_PID" ]; then
  if ps -p "$PANE_PID" -o comm= 2>/dev/null | grep -q claude; then
    # Prüfe ob Prozess wirklich arbeitet (CPU > 5%) oder nur idle wartet
    CPU=$(ps -p "$PANE_PID" -o %cpu --no-headers 2>/dev/null | tr -d ' ' | cut -d. -f1)
    ELAPSED=$(ps -p "$PANE_PID" -o etimes --no-headers 2>/dev/null | tr -d ' ')
    # Erst nach 30min (1800s) Laufzeit die CPU prüfen — frische Sessions brauchen Anlaufzeit
    if [ "${ELAPSED:-0}" -gt 1800 ] && [ "${CPU:-100}" -lt 5 ]; then
      echo "$(date): Claude idle (PID $PANE_PID, CPU ${CPU}%, ${ELAPSED}s), starte neu." >> runs/cron.log
    else
      echo "$(date): Claude arbeitet noch (PID $PANE_PID, CPU ${CPU}%), ueberspringe." >> runs/cron.log
      exit 0
    fi
  fi
fi

# Alte Session killen (Claude ist fertig oder idle)
tmux kill-session -t component-lab-build 2>/dev/null || true

RUN_ID="build-$(date +%Y%m%d)-$(date +%H%M)"
mkdir -p "runs/${RUN_ID}"
echo "$(date): Starte ${RUN_ID}" >> runs/cron.log
tmux new-session -d -s component-lab-build \
  -x 220 -y 50 \
  -c ~/projects/component-lab \
  "claude --dangerously-skip-permissions --model 'claude-opus-4-6[1m]' --append-system-prompt-file scripts/agent-prompt.md 'Build-Run ${RUN_ID}. Arbeite an deinen Websites. Was brauchst du heute? Neues Projekt, Iteration, Polish? Waehle einen anderen Ansatz als beim letzten Mal.'"
