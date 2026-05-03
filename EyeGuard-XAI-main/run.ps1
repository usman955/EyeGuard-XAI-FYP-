$ROOT_DIR = "c:\Users\usm76\Desktop\EyeGuard-XAI-main\EyeGuard-XAI-main"

Write-Host "Starting EyeGuard-XAI project..."
Write-Host "Four terminal windows will open for each service."

# 1. Backend (FastAPI)
Write-Host "Starting FastAPI Backend (Port 8000)..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$ROOT_DIR\eyeguard-backend'; .\venv\Scripts\activate; uvicorn main:app --host 0.0.0.0 --port 8000 --reload" -WorkingDirectory "$ROOT_DIR\eyeguard-backend"

# 2. Web Server (Node.js/Express)
Write-Host "Starting Express Server (Port 5000)..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$ROOT_DIR\eyeguard-web\server'; npm start" -WorkingDirectory "$ROOT_DIR\eyeguard-web\server"

# 3. Web Frontend (Vite)
Write-Host "Starting Web Frontend (Port 5173)..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$ROOT_DIR\eyeguard-web'; npm run dev" -WorkingDirectory "$ROOT_DIR\eyeguard-web"

# 4. Mobile App (Expo)
Write-Host "Starting Mobile App (Expo)..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$ROOT_DIR\eyeguard-mobile'; npx expo start" -WorkingDirectory "$ROOT_DIR\eyeguard-mobile"

Write-Host "All services are initializing!"
Write-Host "- Web: http://localhost:5173"
Write-Host "- API Server: http://localhost:5000"
Write-Host "- ML Backend: http://localhost:8000"
Write-Host "- Mobile: Scan QR code from the Expo terminal window"
Write-Host "To stop the services, simply close the terminal windows."
