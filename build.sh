#!/bin/bash
echo "Installing JDK..."

# Define JDK version and download URL
jdk_version="23"
jdk_download_url="https://download.oracle.com/java/23/latest/jdk-23_linux-x64_bin.tar.gz"
jdk_install_dir="./jdk"  # Change to a writable directory within the project

# Create a directory for JDK installation
mkdir -p "$jdk_install_dir"

# Download the JDK
curl -L -o jdk.tar.gz "$jdk_download_url"

# Extract the JDK
tar -xzvf jdk.tar.gz -C "$jdk_install_dir" --strip-components=1

# Set environment variables for JDK
export JAVA_HOME="$(pwd)/$jdk_install_dir"
export PATH="$JAVA_HOME/bin:$PATH"

# Print JAVA_HOME and PATH to verify
echo "JAVA_HOME is set to: $JAVA_HOME"
echo "PATH is set to: $PATH"

# Verify if javac is found in the current PATH
echo "Checking javac path..."
which javac

# Print the location of javac
echo "javac is located at: $(which javac)"

# Verify installation
javac -version

echo "JDK installation completed."
