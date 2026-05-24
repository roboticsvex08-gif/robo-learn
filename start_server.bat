@echo off
REM Start a simple Python HTTP server on port 8000 from this folder
cd /d "%~dp0"
python -m http.server 8000
pause
