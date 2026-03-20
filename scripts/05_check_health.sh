#!/bin/bash
# 05_check_health.sh
# Purpose: Pings the API health endpoint to ensure the system is up and functioning.
# Idempotent: Can be run endlessly as a cron-job to monitor server health without side effects.

HEALTH_ENDPOINT="http://localhost:5001/api/health"

echo "Checking health of ShopSmart Backend..."

# Use cURL to fetch HTTP status code silently
HTTP_STATUS=$(curl -o /dev/null -s -w "%{http_code}\n" $HEALTH_ENDPOINT)

if [ "$HTTP_STATUS" -eq 200 ]; then
    echo "✅ Success: API is currently UP and responding with status 200."
else
    echo "❌ Error: API is DOWN or unresponsive. Received HTTP status: $HTTP_STATUS"
    exit 1
fi
