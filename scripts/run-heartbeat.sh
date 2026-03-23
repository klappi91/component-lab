#!/bin/bash
cd ~/projects/component-lab
tmux kill-session -t component-lab-heartbeat 2>/dev/null || true
tmux new-session -d -s component-lab-heartbeat \
  -x 220 -y 50 \
  -c ~/projects/component-lab \
  "claude --dangerously-skip-permissions --model 'claude-sonnet-4-6' --append-system-prompt-file scripts/agent-prompt.md 'Heartbeat. Neue Bewertungen von Chris? Antworten auf E-Mails? Wenn nichts zu tun: Antworte nur HEARTBEAT_OK.'"
