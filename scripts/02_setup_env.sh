#!/bin/bash
# 02_setup_env.sh
# Purpose: Installs necessary dependencies (Node, NPM, PM2) on an Ubuntu server.
# Idempotent: Can be run multiple times safely without breaking existing installations.

echo "Setting up server environment..."

# Update packages safely
sudo apt-get update -y

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    echo "Node.js not found. Installing..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "Node.js is already installed."
fi

# Install PM2 globally if not present
if ! command -v pm2 &> /dev/null; then
    echo "PM2 not found. Installing..."
    sudo npm install -g pm2
else
    echo "PM2 is already installed."
fi

# Create logs directory idempotently
mkdir -p ~/shopsmart/logs

echo "Environment setup complete!"
