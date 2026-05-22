#!/bin/bash
set -e

ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
NODE_APP_DIR="$ROOT_DIR/node-app"

echo "=== Building ==="
cd "$NODE_APP_DIR"
npm run build

echo ""
echo "=== GitHub Pages ==="
npm run deploy

echo ""
echo "=== Vercel: node-app ==="
npx vercel --prod

echo ""
echo "=== Git commit & push → triggers portfolio auto-deploy ==="
cd "$ROOT_DIR"
git add -A
git diff --cached --quiet && echo "No changes to commit" || \
  git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M')"
git push origin main

echo ""
echo "✓ Done — GitHub Pages, node-app.vercel.app, portfolio.vercel.app all updated"
