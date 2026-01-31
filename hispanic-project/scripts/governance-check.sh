#!/bin/bash
# Maketier Governance Check
# Enforces Brand Pack Boundary: colors must live ONLY in brand.css and brand/*

set -e

echo "🔍 Checking for governance violations..."

VIOLATIONS=0
TS_DIRS="frontend/src/app frontend/src/components"
CSS_DIR="frontend/src"

# === A) Tailwind arbitrary colors in TS/TSX ===
ARB_PATTERNS=(
  'text-\[#'
  'bg-\[#'
  'border-\[#'
  'fill-\[#'
  'stroke-\[#'
  'from-\[#'
  'via-\[#'
  'to-\[#'
)

for pattern in "${ARB_PATTERNS[@]}"; do
  FOUND=$(grep -rn --include="*.tsx" --include="*.ts" \
    --exclude-dir="brand" \
    "$pattern" $TS_DIRS 2>/dev/null || true)
  if [ -n "$FOUND" ]; then
    echo "❌ Tailwind arbitrary color: $pattern"
    echo "$FOUND"
    VIOLATIONS=$((VIOLATIONS + 1))
  fi
done

# === B) Raw hex in TS/TSX ===
HEX=$(grep -rEn --include="*.tsx" --include="*.ts" \
  --exclude-dir="brand" \
  '#[0-9a-fA-F]{3,8}' $TS_DIRS 2>/dev/null || true)
if [ -n "$HEX" ]; then
  echo "❌ Raw hex color:"
  echo "$HEX"
  VIOLATIONS=$((VIOLATIONS + 1))
fi

# === B) rgb/hsl in TS/TSX ===
COLOR_FNS=$(grep -rEn --include="*.tsx" --include="*.ts" \
  --exclude-dir="brand" \
  '(rgb|rgba|hsl|hsla)\(' $TS_DIRS 2>/dev/null || true)
if [ -n "$COLOR_FNS" ]; then
  echo "❌ rgb/hsl color function:"
  echo "$COLOR_FNS"
  VIOLATIONS=$((VIOLATIONS + 1))
fi

# === C) Inline style colors ===
INLINE=$(grep -rEn --include="*.tsx" --include="*.ts" \
  --exclude-dir="brand" \
  'style=\{\{[^}]*(#[0-9a-fA-F]|rgb|hsl)' $TS_DIRS 2>/dev/null || true)
if [ -n "$INLINE" ]; then
  echo "❌ Inline style with color:"
  echo "$INLINE"
  VIOLATIONS=$((VIOLATIONS + 1))
fi

# === D) CSS files (excluding brand.css and brand/) ===
CSS_HEX=$(grep -rEn --include="*.css" --include="*.module.css" \
  --exclude="brand.css" \
  --exclude-dir="brand" \
  --exclude-dir="docs" \
  --exclude-dir="node_modules" \
  --exclude-dir="styles" \
  '#[0-9a-fA-F]{3,8}' $CSS_DIR 2>/dev/null || true)
if [ -n "$CSS_HEX" ]; then
  echo "❌ CSS literal color outside Brand Pack:"
  echo "$CSS_HEX"
  VIOLATIONS=$((VIOLATIONS + 1))
fi

# === RESULT ===
if [ $VIOLATIONS -gt 0 ]; then
  echo ""
  echo "❌ Governance failure: colors must live in Brand Pack only."
  echo "   Allowed: frontend/src/styles/brand.css, frontend/src/brand/*"
  echo "   See: docs/CONTRACT.md (Theming Contract)"
  exit 1
fi

echo "✅ Governance check passed"
