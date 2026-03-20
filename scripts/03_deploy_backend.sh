#!/bin/bash
# 03_deploy_backend.sh
# Purpose: Deploys the backend Node.js API to the server.
# Idempotent: Safely pulls latest code, installs dependencies without wiping data, and gracefully restarts via PM2.

APP_DIR=~/shopsmart/server
PROCESS_NAME="shopsmart-backend"

echo "Deploying Backend..."

# Ensure directory exists safely
if [ ! -d "$APP_DIR" ]; then
    echo "Error: Backend directory $APP_DIR does not exist on this server."
    exit 1
fi

cd $APP_DIR

# Install dependencies strictly matching the lockfile
npm ci

# Check if PM2 process exists; if yes, restart. If no, start.
pm2 describe $PROCESS_NAME > /dev/null
if [ $? -eq 0 ]; then
    echo "Restarting specific PM2 process..."
    pm2 restart $PROCESS_NAME
else
    echo "Starting new PM2 process..."
    pm2 start src/index.js --name $PROCESS_NAME
fi

# Save PM2 list so it restarts on server reboot
pm2 save

echo "Backend deployment complete."
