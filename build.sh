#!/bin/bash
echo "Installing JDK..."

# Download Linux-compatible JDK installer
curl -L -o jdk-23_linux-x64_bin.tar.gz "https://download.oracle.com/java/23/latest/jdk-23_linux-x64_bin.tar.gz"

# Extract the JDK tarball
mkdir -p /opt/jdk
tar -xzf jdk-23_linux-x64_bin.tar.gz -C /opt/jdk

# Set JDK environment variables
export JAVA_HOME=/opt/jdk/jdk-23
export PATH=$JAVA_HOME/bin:$PATH

# Verify the JDK installation
java -version

echo "JDK installation completed."
