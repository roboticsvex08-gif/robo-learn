@echo off
echo.
echo ========================================
echo    ROBO LEARN CONTACT PAGE SETUP
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.x from https://www.python.org
    pause
    exit /b 1
)

echo [1/3] Installing Python dependencies...
pip install -r requirements.txt

if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/3] Setup complete!
echo.
echo IMPORTANT: Before starting the backend, please configure the email:
echo.
echo 1. Open .env file
echo 2. Set SENDER_PASSWORD to your Gmail App Password
echo    (Get it from: https://myaccount.google.com/apppasswords)
echo.
echo [3/3] Starting backend server...
echo.
echo The backend will run on http://localhost:5000
echo.

python app.py

pause
