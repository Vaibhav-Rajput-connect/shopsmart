#!/bin/bash
# 01_launch_ec2.sh
# Purpose: Launches an AWS EC2 instance strictly if one with the same Name tag doesn't already exist.
# Idempotent: Checks for existing generic instance before launching.

INSTANCE_NAME="ShopSmart-Production"
AMI_ID="ami-0c55b159cbfafe1f0" # Ubuntu Server (Update as needed)
INSTANCE_TYPE="t2.micro"

# Check if instance already exists
EXISTING_ID=$(aws ec2 describe-instances --filters "Name=tag:Name,Values=$INSTANCE_NAME" "Name=instance-state-name,Values=running,pending" --query "Reservations[0].Instances[0].InstanceId" --output text)

if [ "$EXISTING_ID" != "None" ] && [ -n "$EXISTING_ID" ]; then
    echo "Instance $INSTANCE_NAME is already running with ID: $EXISTING_ID"
    exit 0
fi

echo "Launching new EC2 instance: $INSTANCE_NAME..."
aws ec2 run-instances \
    --image-id $AMI_ID \
    --count 1 \
    --instance-type $INSTANCE_TYPE \
    --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=$INSTANCE_NAME}]"

echo "Instance launch command sent."
