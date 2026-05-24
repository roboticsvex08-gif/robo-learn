# Robo Learn Contact Page Backend Startup Script (PowerShell)

Write-Host ""
Write-Host "========================================"
Write-Host "    ROBO LEARN CONTACT PAGE SETUP"
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Python is installed
try {
    python --version | Out-Null
    Write-Host "[✓] Python is installed" -ForegroundColor Green
} catch {
    Write-Host "[✗] ERROR: Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Python 3.x from https://www.python.org" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[1/3] Installing Python dependencies..." -ForegroundColor Cyan
pip install -r requirements.txt

if ($LASTEXITCODE -ne 0) {
    Write-Host "[✗] ERROR: Failed to install dependencies" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[✓] Dependencies installed successfully" -ForegroundColor Green
Write-Host ""
Write-Host "[2/3] Configuration Check" -ForegroundColor Cyan
Write-Host ""
Write-Host "IMPORTANT: Before starting the backend, please configure the email:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Open .env file"
Write-Host "2. Set SENDER_PASSWORD to your Gmail App Password"
Write-Host "   (Get it from: https://myaccount.google.com/apppasswords)"
Write-Host ""
Write-Host "[3/3] Starting backend server..." -ForegroundColor Cyan
Write-Host ""
Write-Host "The backend will run on http://localhost:5000" -ForegroundColor Green
Write-Host ""

python app.py

Read-Host "Press Enter to exit"
