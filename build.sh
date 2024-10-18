JDK_INSTALLER="jdk-22_windows-x64_bin.exe"

# Path to install JDK
INSTALL_PATH="/opt/render/project/src/bin/jdk/"

# Create the install directory
mkdir -p $INSTALL_PATH

# Install JDK
echo "Installing JDK..."
cp $JDK_INSTALLER $INSTALL_PATH

# Run the JDK installer (silent mode)
$INSTALL_PATH"jdk-22_windows-x64_bin.exe" /s
