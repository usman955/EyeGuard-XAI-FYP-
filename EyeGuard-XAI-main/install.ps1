$ErrorActionPreference = "Stop"

Write-Host "📦 Installing dependencies for EyeGuard-XAI..."

$ROOT_DIR = "c:\Users\usm76\Desktop\EyeGuard-XAI-main\EyeGuard-XAI-main"

# 1. Web Frontend
Write-Host "🌐 Installing Web Frontend dependencies..."
Set-Location "$ROOT_DIR\eyeguard-web"
npm install

# 2. Web Server (Node.js/Prisma)
Write-Host "🖥️ Installing Web Server dependencies..."
Set-Location "$ROOT_DIR\eyeguard-web\server"
npm install
npx prisma generate

# 3. Mobile App (Expo)
Write-Host "📱 Installing Mobile App dependencies..."
Set-Location "$ROOT_DIR\eyeguard-mobile"
npm install

# 4. Backend (FastAPI)
Write-Host "⚙️ Installing Backend dependencies..."
Set-Location "$ROOT_DIR\eyeguard-backend"
if (-Not (Test-Path "venv")) {
    Write-Host "Creating Python virtual environment..."
    python -m venv venv
}
& "$ROOT_DIR\eyeguard-backend\venv\Scripts\pip.exe" install -r requirements.txt

Write-Host "`n✅ All dependencies installed successfully!"
