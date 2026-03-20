#!/bin/bash
# 04_deploy_frontend.sh
# Purpose: Deploys the React frontend by building the static Vite files.
# Idempotent: Does a clean installation and builds static files into the /dist folder.

APP_DIR=~/shopsmart/client

echo "Deploying Frontend..."

if [ ! -d "$APP_DIR" ]; then
    echo "Error: Frontend directory $APP_DIR does not exist on this server."
    exit 1
fi

cd $APP_DIR

# Clean exact install of JS dependencies
echo "Installing dependencies..."
npm ci

# Build static production files
echo "Building static React app..."
npm run build

echo "Frontend static files built in $APP_DIR/dist."
echo "You can now serve these using NGINX or Apache."
