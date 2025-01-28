#!/bin/bash
# Lavateinn - Tiny and flexible microservice framework.
# SPDX-License-Identifier: BSD-3-Clause (https://ncurl.xyz/s/mI23sevHR)

# Shell options
set -e

# Grant sudo permission
SUDO=""
if [ "$EUID" != 0 ]; then
    SUDO="sudo"
fi

# Update package list
$SUDO apt-get update

# Install nodejs packages
npm install

# Echo success message
echo "Setup completed successfully!"
