@echo off
echo ==============================================================================
echo EyeGuard-XAI Services Runner
echo ==============================================================================
echo.
echo Launching the project services...
powershell -ExecutionPolicy Bypass -File "%~dp0run.ps1"
echo.
echo All services have been instructed to start in new terminal windows.
echo You can close this window now.
pause
