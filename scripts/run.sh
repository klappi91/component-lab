#!/bin/bash
# Component Lab — Autonomer Agent Loop
# Ein einziges Script. Der Agent entscheidet selbst was er tut.
# Wird per Cron (stuendlich) oder manuell gestartet.

cd ~/projects/component-lab

SESSION_NAME="component-lab"
LOG_FILE="runs/cron.log"

# === Pruefen ob Agent noch arbeitet ===
PANE_PID=$(tmux list-panes -t "$SESSION_NAME" -F '#{pane_pid}' 2>/dev/null)
if [ -n "$PANE_PID" ]; then
  if ps -p "$PANE_PID" -o comm= 2>/dev/null | grep -q claude; then
    CPU=$(ps -p "$PANE_PID" -o %cpu --no-headers 2>/dev/null | tr -d ' ' | cut -d. -f1)
    ELAPSED=$(ps -p "$PANE_PID" -o etimes --no-headers 2>/dev/null | tr -d ' ')

    # Nach 45min Laufzeit + CPU < 5% = idle → neu starten
    if [ "${ELAPSED:-0}" -gt 2700 ] && [ "${CPU:-100}" -lt 5 ]; then
      echo "$(date): Agent idle (PID $PANE_PID, CPU ${CPU}%, ${ELAPSED}s), starte neu." >> "$LOG_FILE"
    else
      echo "$(date): Agent arbeitet (PID $PANE_PID, CPU ${CPU}%, ${ELAPSED}s), ueberspringe." >> "$LOG_FILE"
      exit 0
    fi
  fi
fi

# === Alte Session beenden ===
tmux kill-session -t "$SESSION_NAME" 2>/dev/null || true

# === Neue Session starten ===
RUN_ID="run-$(date +%Y%m%d)-$(date +%H%M)"
mkdir -p "runs/${RUN_ID}"
echo "$(date): Starte ${RUN_ID}" >> "$LOG_FILE"

# Der Agent bekommt KEINEN festen Auftrag.
# Er liest HEARTBEAT.md und entscheidet selbst.
# WICHTIG: Befehl OHNE Anführungszeichen übergeben, damit tmux ihn direkt ausführt
# (nicht via sh -c). Sonst erscheint der Bypass-Permissions-Dialog.
tmux new-session -d -s "$SESSION_NAME" \
  -x 220 -y 50 \
  -c ~/projects/component-lab \
  claude --dangerously-skip-permissions \
    --model claude-opus-4-6[1m] \
    --append-system-prompt-file scripts/agent-prompt.md \
    "Session ${RUN_ID}. Lies HEARTBEAT.md und fuehre den Heartbeat-Check durch. Entscheide selbst was du in dieser Session tust."
