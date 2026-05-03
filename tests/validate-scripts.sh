#!/usr/bin/env bash
set -euo pipefail
WF_DIR="$(cd "$(dirname "$0")/../workflows" && pwd)"
PASS=0; FAIL=0
for f in "$WF_DIR"/*.json; do
  if python3 -c "import json,sys; json.load(open(sys.argv[1]))" "$f" 2>/dev/null; then
    echo "  v $(basename "$f")"; PASS=$((PASS+1))
  else
    echo "  x $(basename "$f")"; FAIL=$((FAIL+1))
  fi
done
echo; echo "Workflows: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ]
