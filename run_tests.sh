#!/bin/bash
echo "Running tests from test-plan.md"

grep -E "Command:" docs/tests/test-plan.md | while read -r line; do
  cmd=$(echo "$line" | sed -E 's/.*Command:\*\* `(.*)`/\1/')
  echo "--- RUNNING: $cmd"
  eval "$cmd"
  if [ $? -eq 0 ]; then
    echo "PASS"
  else
    echo "FAIL"
  fi
done
