#!/bin/bash
# Setzt Cooldown-Flag wenn die letzten 2 Sessions HEARTBEAT_OK waren.
# Aufgerufen am Ende einer HEARTBEAT_OK Session.
# Cooldown = 2h keine neuen Sessions (spart Tokens).

cd ~/projects/component-lab

LAST_TWO=$(tail -2 runs/session-log.jsonl | python3 -c "
import json, sys
lines = [json.loads(l) for l in sys.stdin if l.strip()]
hb_count = sum(1 for l in lines if 'heartbeat' in l.get('action','').lower())
print(hb_count)
" 2>/dev/null)

if [ "${LAST_TWO:-0}" -ge 2 ]; then
  touch runs/.cooldown
  echo "$(date): Cooldown gesetzt (2x HEARTBEAT_OK in Folge)" >> runs/cron.log
fi
