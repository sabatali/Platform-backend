#!/bin/bash

# Specify JDK version and download URL
jdk_version="17.0.8"
jdk_download_url="https://download.java.net/java/GA/jdk${jdk_version}/binaries/openjdk-17.0.8_linux-x64_bin.tar.gz"  # Update this URL as needed
jdk_install_dir="/opt/render/project/src/jdk"

# Create installation directory
mkdir -p "$jdk_install_dir"

# Download JDK
echo "Downloading OpenJDK $jdk_version..."
wget -q "$jdk_download_url" -O /tmp/openjdk.tar.gz

# Check if download was successful
if [ $? -eq 0 ]; then
    echo "OpenJDK downloaded successfully."
else
    echo "Failed to download OpenJDK."
    exit 1
fi

# Extract JDK
echo "Extracting OpenJDK..."
tar -xzf /tmp/openjdk.tar.gz -C "$jdk_install_dir" --strip-components=1

# Set JAVA_HOME and update PATH
echo "Setting JAVA_HOME and updating PATH..."
export JAVA_HOME="$jdk_install_dir"
export PATH="$JAVA_HOME/bin:$PATH"

# Verify the installation
if java -version; then
    echo "OpenJDK installed successfully."
else
    echo "Failed to install OpenJDK."
    exit 1
fi

echo "Build completed successfully!"
