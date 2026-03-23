#!/bin/bash
cd ~/projects/component-lab
RUN_ID="scout-$(date +%Y%m%d)"
mkdir -p "runs/${RUN_ID}"
tmux kill-session -t component-lab-scout 2>/dev/null || true
tmux new-session -d -s component-lab-scout \
  -x 220 -y 50 \
  -c ~/projects/component-lab \
  "claude --dangerously-skip-permissions --model 'claude-opus-4-6[1m]' --append-system-prompt-file scripts/agent-prompt.md 'Scout-Run ${RUN_ID}. Suche nach neuen Skills, Tools, MCP Servern, Workflows. Installiere was du kannst, kontaktiere Chris fuer den Rest.'"
