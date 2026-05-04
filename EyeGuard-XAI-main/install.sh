#!/bin/bash

# Exit on error
set -e

echo " Installing dependencies for EyeGuard-XAI..."

# Get the root directory
ROOT_DIR=$(pwd)

# 1. Web Frontend
echo " Installing Web Frontend dependencies..."
cd "$ROOT_DIR/eyeguard-web"
npm install

# 2. Web Server (Node.js/Prisma)
echo " Installing Web Server dependencies..."
cd "$ROOT_DIR/eyeguard-web/server"
npm install
npx prisma generate

# 3. Mobile App (Expo)
echo " Installing Mobile App dependencies..."
cd "$ROOT_DIR/eyeguard-mobile"
npm install

# 4. Backend (FastAPI)
echo " Installing Backend dependencies..."
cd "$ROOT_DIR/eyeguard-backend"
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi
source venv/bin/activate
pip install -r requirements.txt

echo ""
echo " All dependencies installed successfully!"
echo "Run the project using: ./run.sh"
