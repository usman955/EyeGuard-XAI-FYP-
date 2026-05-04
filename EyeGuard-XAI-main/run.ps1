# ==============================================================================
# EyeGuard-XAI Services Runner Script
# This script automatically launches all four microservices required for the
# project in their own separate terminal windows for easy monitoring and debugging.
# ==============================================================================

# Define the absolute root directory of the project
$ROOT_DIR = "c:\Users\Talha Hanif\EyeGuard-XAI-FYP-\EyeGuard-XAI-main"

Write-Host "Starting EyeGuard-XAI project..."
Write-Host "Four terminal windows will open for each service."

# ------------------------------------------------------------------------------
# 1. Backend (FastAPI / Python)
# Runs the machine learning backend on Port 8000 using Uvicorn.
# -ExecutionPolicy Bypass ensures the virtual environment activate script can run.
# ------------------------------------------------------------------------------
Write-Host "Starting FastAPI Backend (Port 8000)..."
Start-Process powershell -ArgumentList "-ExecutionPolicy", "Bypass", "-NoExit", "-Command", "cd '$ROOT_DIR\eyeguard-backend'; .\venv\Scripts\activate; .\venv\Scripts\uvicorn.exe main:app --host 0.0.0.0 --port 8000 --reload" -WorkingDirectory "$ROOT_DIR\eyeguard-backend"

# ------------------------------------------------------------------------------
# 2. Web Server (Node.js / Express / Prisma)
# Runs the intermediary API and database server on Port 5000.
# ------------------------------------------------------------------------------
Write-Host "Starting Express Server (Port 5000)..."
Start-Process powershell -ArgumentList "-ExecutionPolicy", "Bypass", "-NoExit", "-Command", "cd '$ROOT_DIR\eyeguard-web\server'; npm start" -WorkingDirectory "$ROOT_DIR\eyeguard-web\server"

# ------------------------------------------------------------------------------
# 3. Web Frontend (Vite / React)
# Runs the clinical dashboard and diagnostic web interface on Port 5173.
# ------------------------------------------------------------------------------
Write-Host "Starting Web Frontend (Port 5173)..."
Start-Process powershell -ArgumentList "-ExecutionPolicy", "Bypass", "-NoExit", "-Command", "cd '$ROOT_DIR\eyeguard-web'; npm run dev" -WorkingDirectory "$ROOT_DIR\eyeguard-web"

# ------------------------------------------------------------------------------
# 4. Mobile App (Expo / React Native)
# Runs the mobile app bundler. Will display a QR code in the terminal to scan.
# ------------------------------------------------------------------------------
Write-Host "Starting Mobile App (Expo)..."
Start-Process powershell -ArgumentList "-ExecutionPolicy", "Bypass", "-NoExit", "-Command", "cd '$ROOT_DIR\eyeguard-mobile'; npx expo start" -WorkingDirectory "$ROOT_DIR\eyeguard-mobile"

Write-Host "All services are initializing!"
Write-Host "- Web: http://localhost:5173"
Write-Host "- API Server: http://localhost:5000"
Write-Host "- ML Backend: http://localhost:8000"
Write-Host "- Mobile: Scan QR code from the Expo terminal window"
Write-Host "To stop the services, simply close the terminal windows."
