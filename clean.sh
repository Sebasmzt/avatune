#!/bin/bash

echo "Cleaning builds and node_modules..."

# Remove node_modules directories
find . -name "node_modules" -type d -prune -exec rm -rf {} + 2>/dev/null

# Remove build output directories
find . -name "dist" -type d -prune -exec rm -rf {} + 2>/dev/null
find . -name ".next" -type d -prune -exec rm -rf {} + 2>/dev/null
find . -name ".turbo" -type d -prune -exec rm -rf {} + 2>/dev/null
find . -name ".rsbuild" -type d -prune -exec rm -rf {} + 2>/dev/null

# Remove lock files (optional - uncomment if needed)
# rm -f bun.lockb package-lock.json yarn.lock pnpm-lock.yaml

echo "Clean complete!"
