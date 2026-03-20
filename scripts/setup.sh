#!/bin/bash
# Idempotent deploy setup script
# Creates necessary log and data directories

echo "Setting up project structure..."

# Create logs directory idempotently
mkdir -p logs

# Create database data directory safely
if [ ! -d "server/prisma" ]; then
    mkdir -p server/prisma
fi

# Set permissions safely
chmod -R 755 logs

echo "Setup completed successfully."
