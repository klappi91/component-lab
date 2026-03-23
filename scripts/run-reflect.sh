#!/bin/bash
# Component Lab — Weekly Reflector
# Laeuft woechentlich (Sonntag 3:00). Liest Session-Logs, findet Patterns, schreibt IMPROVEMENTS.md.
# Nutzt Sonnet (guenstiger) weil es nur liest und analysiert, nicht baut.

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

# WICHTIG: Befehl OHNE Anführungszeichen übergeben (kein sh -c)
tmux new-session -d -s "$SESSION_NAME" \
  -x 220 -y 50 \
  -c ~/projects/component-lab \
  claude --dangerously-skip-permissions \
    --model claude-sonnet-4-6 \
    --append-system-prompt-file scripts/agent-prompt.md \
    "Weekly Reflection. Lies runs/session-log.jsonl und knowledge/daily/ der letzten 7 Tage. Finde Patterns, schreibe Vorschlaege in IMPROVEMENTS.md. Git commit + push. Dann Session beenden."
