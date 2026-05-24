# Server Control Panel - Quick Start Guide

## What's New?

A new **Server Control Panel** has been added to make it easy to start and stop your server from a web interface.

## How to Use

### Step 1: Start the Flask Backend
1. Open PowerShell or Command Prompt
2. Navigate to your project folder
3. Run: `python app.py`
4. The Flask app will start on `http://localhost:5000`

### Step 2: Access the Server Control Panel
Open your browser and go to:
```
http://localhost:5000/server-control
```

### Step 3: Use the Control Panel
- **Start Server Button**: Click to start the Python HTTP server on port 8000
- **Stop Server Button**: Click to stop the running server
- **Status Indicator**: Shows if the server is Online (green) or Offline (red)
- **Access Server**: Once started, click the link to open the server in your browser

## Features

✅ Start the Python HTTP server (port 8000) with one click  
✅ Stop the server safely with confirmation  
✅ Real-time status indicator  
✅ Direct link to access your server  
✅ Automatic status checking every 5 seconds  
✅ Professional, user-friendly interface

## What Happens When You Click "Start Server"?

1. The Flask backend receives the request
2. A new Python HTTP server process starts on port 8000
3. The control panel shows "Online" status
4. The "Access Server" link becomes available
5. Your project files are accessible at `http://localhost:8000`

## What Happens When You Click "Stop Server"?

1. A confirmation popup appears
2. The Flask backend terminates the server process
3. The status changes to "Offline"
4. The "Access Server" link is hidden

## Port Information

- **Flask Backend (Control Panel)**: Port 5000
- **HTTP Server (Your Project)**: Port 8000

## Troubleshooting

**Q: "Connection error. Make sure the control server is running."**
- Make sure you're running `python app.py` first
- Check that Flask is installed: `pip install flask flask-cors`

**Q: Server doesn't start**
- Check if port 8000 is already in use
- Look for error messages in the terminal

**Q: Status doesn't update**
- The panel auto-checks every 5 seconds
- Try refreshing the page manually

## Files Added

- `server-control.html` - The control panel interface
- Updated `app.py` - Added server control endpoints

## API Endpoints (For Advanced Users)

- `POST /api/start-server` - Start the HTTP server
- `POST /api/stop-server` - Stop the HTTP server
- `GET /api/server-status` - Check server status
- `GET /server-control` - Serve the control panel

Enjoy your new server control panel! 🚀
