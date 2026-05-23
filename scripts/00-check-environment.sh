#!/usr/bin/env bash
# Scaly Wings — verify local tooling before device builds.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "=== Scaly Wings — Environment Check ==="
echo ""

fail=0

check_cmd() {
  local name="$1"
  local cmd="$2"
  if command -v "$cmd" >/dev/null 2>&1; then
    echo "✓ $name: $($cmd --version 2>/dev/null | head -1 || echo "found")"
  else
    echo "✗ $name: not found ($cmd)"
    fail=1
  fi
}

check_cmd "Node" "node"
check_cmd "npm" "npm"

if command -v npx >/dev/null 2>&1; then
  echo "✓ Expo CLI (npx): $(npx expo --version 2>/dev/null || echo "run npm install first")"
else
  echo "✗ npx not found"
  fail=1
fi

if command -v eas >/dev/null 2>&1; then
  echo "✓ EAS CLI: $(eas --version 2>/dev/null || true)"
else
  echo "⚠ EAS CLI not installed globally."
  echo "  Install with: npm install -g eas-cli"
  echo "  (Required for APK and iOS builds — not required for Expo Go only.)"
fi

echo ""
for f in package.json app.json eas.json; do
  if [[ -f "$f" ]]; then
    echo "✓ $f exists"
  else
    echo "✗ Missing $f"
    fail=1
  fi
done

if [[ -f assets/images/icon.png ]]; then
  echo "✓ App icon asset present"
else
  echo "⚠ TODO: add assets/images/icon.png before store builds"
fi

echo ""
echo "Git status:"
git status -sb 2>/dev/null || echo "(not a git repo or git unavailable)"

echo ""
if [[ $fail -eq 0 ]]; then
  echo "Environment looks ready for Expo Go. For EAS builds, ensure you have run:"
  echo "  npm install"
  echo "  eas login"
  echo "  npm run eas:configure"
else
  echo "Fix the issues above before continuing."
  exit 1
fi
