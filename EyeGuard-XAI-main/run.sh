#!/bin/bash

# Function to kill all background processes on exit
cleanup() {
    echo ""
    echo "🛑 Stopping all EyeGuard-XAI services..."
    # Kill all background jobs
    kill $(jobs -p) 2>/dev/null
    exit
}

# Trap SIGINT (Ctrl+C), SIGTERM, and EXIT
trap cleanup SIGINT SIGTERM EXIT

echo "🚀 Starting EyeGuard-XAI project..."
echo "Press Ctrl+C to stop all services."
echo "-----------------------------------"

ROOT_DIR=$(pwd)

# 1. Backend (FastAPI)
echo "⚙️  Starting FastAPI Backend (Port 8000)..."
cd "$ROOT_DIR/eyeguard-backend"
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000 --reload > /dev/null 2>&1 &

# 2. Web Server (Node.js/Express)
echo "🖥️  Starting Express Server (Port 5000)..."
cd "$ROOT_DIR/eyeguard-web/server"
npm start > /dev/null 2>&1 &

# 3. Web Frontend (Vite)
echo "🌐 Starting Web Frontend (Port 5173)..."
cd "$ROOT_DIR/eyeguard-web"
npm run dev > /dev/null 2>&1 &

# 4. Mobile App (Expo)
echo "📱 Starting Mobile App (Expo)..."
cd "$ROOT_DIR/eyeguard-mobile"
npx expo start > /dev/null 2>&1 &

echo "-----------------------------------"
echo "✨ All services are initializing!"
echo "- Web: http://localhost:5173"
echo "- API Server: http://localhost:5000"
echo "- ML Backend: http://localhost:8000"
echo "- Mobile: Scan QR code from terminal (if using physical device)"
echo ""

# Keep the script running
wait
