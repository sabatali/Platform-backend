#!/bin/bash

# Update package list and install OpenJDK 17
echo "Updating package list..."
apt-get update && apt-get install -y openjdk-17-jdk

# Verify the installation
if java -version; then
    echo "OpenJDK 17 installed successfully."
else
    echo "Failed to install OpenJDK."
    exit 1
fi

echo "Build completed successfully!"
