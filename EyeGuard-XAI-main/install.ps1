# ==============================================================================
# EyeGuard-XAI Dependency Installation Script
# This script sets up the local environment by installing all required dependencies
# for the four main components of the project: Web Frontend, Web Server, Mobile App, and Backend.
# ==============================================================================

# Halt script execution immediately if any command encounters an error
$ErrorActionPreference = "Stop"

Write-Host "Installing dependencies for EyeGuard-XAI..."

# Define the absolute root directory of the project
$ROOT_DIR = "c:\Users\Talha Hanif\EyeGuard-XAI-FYP-\EyeGuard-XAI-main"

# ------------------------------------------------------------------------------
# 1. Web Frontend (React/Vite)
# Installs the node_modules necessary for the web user interface
# ------------------------------------------------------------------------------
Write-Host "Installing Web Frontend dependencies..."
Set-Location "$ROOT_DIR\eyeguard-web"
npm install

# ------------------------------------------------------------------------------
# 2. Web Server (Node.js/Express with Prisma ORM)
# Installs backend server dependencies and generates the Prisma database client
# ------------------------------------------------------------------------------
Write-Host "Installing Web Server dependencies..."
Set-Location "$ROOT_DIR\eyeguard-web\server"
npm install
npx prisma generate
npx prisma db push --skip-generate
node prisma/seed.js

# ------------------------------------------------------------------------------
# 3. Mobile App (Expo/React Native)
# Installs dependencies for the mobile application
# ------------------------------------------------------------------------------
Write-Host "Installing Mobile App dependencies..."
Set-Location "$ROOT_DIR\eyeguard-mobile"
npm install

# ------------------------------------------------------------------------------
# 4. Backend (Python/FastAPI)
# Creates an isolated Python virtual environment (if it doesn't exist)
# and installs the required Python packages (e.g. for ML models and API)
# ------------------------------------------------------------------------------
Write-Host "Installing Backend dependencies..."
Set-Location "$ROOT_DIR\eyeguard-backend"
if (-Not (Test-Path "venv")) {
    Write-Host "Creating Python virtual environment..."
    python -m venv venv
}
# Execute pip using the virtual environment's executable to ensure packages
# are installed locally and not system-wide
& "$ROOT_DIR\eyeguard-backend\venv\Scripts\pip.exe" install -r requirements.txt

Write-Host "`nAll dependencies installed successfully!"
