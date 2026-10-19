#!/usr/bin/env bash
# After `pnpm registry:build`, keep the generated JSON of the given items and
# apps/web/public/r/registry.json, and restore every other modified file under apps/web/public/r.
# Usage: restore-registry-churn.sh <name> [<name>...]   (run from anywhere inside the pdfcn repo)
set -euo pipefail

if [ "$#" -lt 1 ]; then
  echo "usage: restore-registry-churn.sh <name> [<name>...]" >&2
  exit 2
fi
root="$(git rev-parse --show-toplevel)"
cd "$root"

index="apps/web/public/r/registry.json"
restored=0
while IFS= read -r file; do
  [ -n "$file" ] || continue
  [ "$file" != "$index" ] || continue
  keep=0
  for item in "$@"; do
    if [ "$(basename "$file" .json)" = "$item" ]; then keep=1; fi
  done
  if [ "$keep" -eq 0 ]; then
    git checkout -- "$file"
    restored=$((restored + 1))
  fi
done <<EOF
$(git diff --name-only -- apps/web/public/r)
EOF

echo "restored $restored unrelated file(s); kept: $* and public/r/registry.json"
git status --short -- apps/web/public/r
