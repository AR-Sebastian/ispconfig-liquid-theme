#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
version="$(tr -d '[:space:]' < "$root/VERSION")"
dist="$root/dist"
stage="$(mktemp -d)"
trap 'rm -rf "$stage"' EXIT

"$root/scripts/validate-theme.sh"
mkdir -p "$dist"
cp -a "$root/theme/liquid" "$stage/liquid"

(
  cd "$stage"
  zip -q -r "$dist/ispconfig-liquid-theme-$version.zip" liquid
  tar -czf "$dist/ispconfig-liquid-theme-$version.tar.gz" liquid
)

(
  cd "$dist"
  sha256sum \
    "ispconfig-liquid-theme-$version.zip" \
    "ispconfig-liquid-theme-$version.tar.gz" > SHA256SUMS.txt
)

echo "Release assets created in $dist"

