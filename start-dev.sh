#!/bin/bash
# Workaround script for WSL UNC path issues

# Force change to the actual WSL directory
cd /home/jkang1643/projects/exbabel || exit 1

# Verify we're in the right place
if [ ! -d "app" ]; then
    echo "Error: app directory not found"
    exit 1
fi

echo "Starting Next.js development server..."
echo "Project directory: $(pwd)"
echo "App directory exists: $([ -d app ] && echo 'yes' || echo 'no')"
echo ""

# Make sure next is executable
chmod +x node_modules/.bin/next 2>/dev/null

# Run Next.js using node directly to avoid npm/npx issues
exec node node_modules/next/dist/bin/next dev
