#!/bin/bash
echo "Installing JDK..."

# Define JDK version and download URL
jdk_version="22"
jdk_download_url="https://download.oracle.com/java/23/latest/jdk-23_linux-x64_bin.tar.gz"
jdk_install_dir="/opt/jdk"

# Create a directory for JDK installation
mkdir -p "$jdk_install_dir"

# Download the JDK
curl -L -o jdk.tar.gz "$jdk_download_url"

# Extract the JDK
tar -xzvf jdk.tar.gz -C "$jdk_install_dir"

# Set environment variables for JDK
export JAVA_HOME="$jdk_install_dir/jdk-$jdk_version"
export PATH="$JAVA_HOME/bin:$PATH"

# Verify installation
java -version

echo "JDK installation completed."
