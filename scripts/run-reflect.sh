#!/bin/bash
# Component Lab — Weekly Reflector
# Laeuft woechentlich (Sonntag 3:00).
# Analysiert die Woche, findet EINE gute Verbesserung, mailt Chris.

cd ~/projects/component-lab

SESSION_NAME="component-lab-reflect"
LOG_FILE="runs/cron.log"

# Nicht starten wenn der normale Agent laeuft
PANE_PID=$(tmux list-panes -t component-lab -F '#{pane_pid}' 2>/dev/null)
if [ -n "$PANE_PID" ] && ps -p "$PANE_PID" -o comm= 2>/dev/null | grep -q claude; then
  echo "$(date): Reflector uebersprungen — Agent laeuft." >> "$LOG_FILE"
  exit 0
fi

tmux kill-session -t "$SESSION_NAME" 2>/dev/null || true
echo "$(date): Starte Weekly Reflector" >> "$LOG_FILE"

# WICHTIG: Befehl OHNE Anfuehrungszeichen uebergeben (kein sh -c)
tmux new-session -d -s "$SESSION_NAME" \
  -x 220 -y 50 \
  -c ~/projects/component-lab \
  claude --dangerously-skip-permissions \
    --model claude-opus-4-6[1m] \
    --append-system-prompt-file scripts/reflector-prompt.md \
    "Weekly Reflection starten."
