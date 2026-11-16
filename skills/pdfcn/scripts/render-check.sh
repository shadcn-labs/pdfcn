#!/usr/bin/env bash
# Render a pdfcn example on both bases and report page count, overflow, and PNG paths.
# Usage: render-check.sh <name> [server-url]   (default server-url: http://localhost:3000)
# Needs a running dev server; page checks and PNGs need Poppler (pdfinfo, pdftotext, pdftoppm).
# Exits 0 when both bases render without warnings, 1 otherwise.
set -euo pipefail

name="${1:?usage: render-check.sh <name> [server-url]}"
url="${2:-http://localhost:3000}"
out="${TMPDIR:-/tmp}"
out="${out%/}/pdfcn-render"
mkdir -p "$out"
have() { command -v "$1" >/dev/null 2>&1; }
status=0

for base in takumi forme; do
  pdf="$out/$base-$name.pdf"
  prev="$out/$base-$name.previous.pdf"
  if [ -f "$pdf" ]; then mv "$pdf" "$prev"; fi
  code="$(curl -s -o "$pdf" -w '%{http_code}' "$url/api/pdf/$base?name=$name" || true)"
  echo "$base: HTTP ${code:-000}"

  if [ "$code" != "200" ]; then
    status=1
    if [ -z "$code" ] || [ "$code" = "000" ]; then
      echo "  no server at $url: start one with pnpm dev"
    else
      echo "  response: $(head -c 300 "$pdf")"
    fi
    continue
  fi

  if [ -f "$prev" ] && cmp -s "$pdf" "$prev"; then
    echo "  note: byte-identical to the previous render. If the source changed since, restart next dev;"
    echo "        if it is still identical after a restart, the edit has no visual effect."
  fi

  if ! have pdfinfo; then
    echo "  install Poppler (pdfinfo, pdftotext, pdftoppm) for page counts and PNGs"
    continue
  fi
  pages="$(pdfinfo "$pdf" | awk '/^Pages:/ { print $2 }')"
  echo "  pages: $pages"

  if [ "${pages:-0}" -gt 1 ] && have pdftotext; then
    lines="$(pdftotext -f "$pages" -l "$pages" "$pdf" - | grep -c '[^[:space:]]' || true)"
    if [ "$lines" -le 3 ]; then
      echo "  WARN: last page has only $lines line(s) of text: blank or footer-only overflow"
      status=1
    fi
  fi

  if have pdftoppm; then
    rm -f "$out/$base-$name"-*.png
    pdftoppm -png -r 100 "$pdf" "$out/$base-$name"
    echo "  pngs: $out/$base-$name-*.png"
  fi
done

exit "$status"
