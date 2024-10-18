#!/bin/bash
echo "Installing JDK..."

# Create a local directory for the JDK
mkdir -p ./jdk

# Download Linux-compatible JDK installer
curl -L -o jdk-23_linux-x64_bin.tar.gz "https://download.oracle.com/java/23/latest/jdk-23_linux-x64_bin.tar.gz"

# Extract the JDK tarball to the local directory
tar -xzf jdk-23_linux-x64_bin.tar.gz -C ./jdk --strip-components=1

# Set JDK environment variables to use the locally installed JDK
export JAVA_HOME=$(pwd)/jdk
export PATH=$JAVA_HOME/bin:$PATH

# Verify the JDK installation
java -version

echo "JDK installation completed."
