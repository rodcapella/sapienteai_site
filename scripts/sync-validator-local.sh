#!/usr/bin/env bash
set -euo pipefail

target="${1:-}"
if [[ -z "$target" || ! -d "$target/.git" ]]; then
  echo "Usage: $0 <validator-repository-directory>" >&2
  exit 1
fi

files=(
  "api/visibility.ts"
  "client/src/pages/VisibilityValidator.tsx"
  "client/src/styles/visibilityValidator.css"
)

for file in "${files[@]}"; do
  mkdir -p "$target/$(dirname "$file")"
  cp "$file" "$target/$file"
done

echo "Shared validator files synchronized. The destination rate-limit policy was preserved."
