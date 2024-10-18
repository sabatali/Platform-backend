#!/bin/bash

# Update the package list
echo "Updating package list..."
apt-get update

# Install OpenJDK 17
echo "Installing OpenJDK 17..."
apt-get install -y openjdk-17-jdk

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm install

# Any other build steps can be added here
# For example, building your application, running tests, etc.

echo "Build completed successfully!"
