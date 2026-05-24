# Robo Learn Platform - Complete Troubleshooting & Testing Guide

## ✅ Pre-Flight Checklist

Before running the project, verify all requirements:

```
✓ Node.js v14+ installed (check: node --version)
✓ npm installed (check: npm --version)
✓ MongoDB installed/account created
✓ Backend folder has node_modules (npm install done)
✓ .env file exists in backend folder
✓ Port 5000 is available (not used by other apps)
```

---

## 🚀 Step-by-Step Startup

### Terminal 1: Start MongoDB
```bash
# Choose ONE option:

# Option A: MongoDB Atlas (cloud) - No action needed

# Option B: Local MongoDB Windows
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath "C:\data\db"

# Option C: Local MongoDB Mac
brew services start mongodb-community

# Option D: MongoDB Service (Windows)
net start MongoDB
```

### Terminal 2: Start Backend Server
```bash
cd robolearn-platform/backend
npm start
```

**Expected Output:**
```
╔════════════════════════════════════════╗
║  Robo Learn Platform Backend Started   ║
║  Server running on port 5000            ║
║  Environment: development              ║
╚════════════════════════════════════════╝

MongoDB Connected Successfully
```

### Browser: Open Frontend
```
http://localhost:5000/api/health  (test API)
file:///path/to/frontend/public/index.html  (main site)
file:///path/to/frontend/admin/login.html  (admin panel)
```

---

## 🔍 Testing Backend Connection

### Test 1: Health Check API
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Backend server is running",
  "timestamp": "2026-05-22T05:43:05.459Z"
}
```

### Test 2: Root API
```bash
curl http://localhost:5000/api/
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Robo Learn Platform Backend API",
  "version": "1.0.0",
  "endpoints": {
    "auth": "/api/auth",
    "projects": "/api/projects"
  }
}
```

### Test 3: Get Public Projects
```bash
curl http://localhost:5000/api/projects
```

**Expected Response:**
```json
{
  "success": true,
  "count": 0,
  "total": 0,
  "pages": 0,
  "currentPage": 1,
  "data": []
}
```

### Test 4: Admin Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "username": "admin",
    "email": "admin@example.com"
  }
}
```

---

## ⚠️ Common Issues & Solutions

### Issue 1: Backend Won't Start - Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**
```bash
# Option A: Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Option B: Kill process on port 5000 (Mac/Linux)
lsof -i :5000
kill -9 <PID>

# Option C: Use different port
# Edit backend/server.js, change:
# const PORT = process.env.PORT || 5001;
```

### Issue 2: MongoDB Connection Failed
```
MongoDB Connection Error: connect ECONNREFUSED ::1:27017
```

**Solutions:**
1. Check MongoDB is running (see MongoDB Setup Guide)
2. Verify .env MONGODB_URI is correct:
   ```
   MONGODB_URI=mongodb://localhost:27017/robolearn
   ```
3. Try MongoDB Atlas instead:
   ```
   MONGODB_URI=mongodb+srv://admin:password@cluster0.xxxxx.mongodb.net/robolearn
   ```
4. Restart backend after fixing .env

### Issue 3: "Failed to fetch" on Login Page
```
Network Error: Failed to fetch http://localhost:5000/api/auth/login
```

**Solutions:**
1. Verify backend is running (check terminal)
2. Check API_BASE_URL in frontend/js/main.js:
   ```javascript
   const API_BASE_URL = 'http://localhost:5000/api';
   ```
3. Clear browser cache (Ctrl+Shift+Delete)
4. Open http://localhost:5000/api/health to test backend
5. Check CORS settings in backend/server.js

### Issue 4: Images/Files Not Uploading
```
Error: Files not found in uploads folder
```

**Solutions:**
1. Verify /uploads folder exists:
   ```bash
   ls -la robolearn-platform/backend/uploads
   ```
2. Create if missing:
   ```bash
   mkdir robolearn-platform/backend/uploads
   ```
3. Check file permissions (write access needed)
4. Verify file size < 50MB
5. Check file type is supported (JPEG, PNG, PDF, ZIP)

### Issue 5: Projects Not Showing Publicly
```
All Projects section shows "No projects found"
```

**Solutions:**
1. Check projects are "published" status (not draft)
2. Verify MongoDB connection is working
3. Check project data in MongoDB:
   ```bash
   mongosh
   use robolearn
   db.projects.find()
   ```
4. Refresh browser and clear cache
5. Check browser console (F12) for errors

### Issue 6: Login Credentials Don't Work
```
Invalid credentials error
```

**Solutions:**
1. Create new admin account at /admin/register.html
2. Use credentials you registered with
3. Check username/password match exactly (case-sensitive)
4. Verify Admin model has correct schema
5. Check MongoDB connection

### Issue 7: CORS Errors
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solutions:**
Update backend/server.js CORS settings:
```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5000',
    'http://127.0.0.1:5000',
    'file://' // Add this for local file access
  ],
  credentials: true,
}));
```

### Issue 8: JWT Token Errors
```
Not authorized to access this route
```

**Solutions:**
1. Ensure token is saved: `localStorage.getItem('authToken')`
2. Check Authorization header in API calls
3. Verify JWT_SECRET in .env matches server
4. Token may be expired (7 days) - login again
5. Check token format: `Bearer <token>`

---

## 🧪 Full Testing Workflow

### Step 1: Register Admin Account
1. Open `file:///path/to/admin/register.html`
2. Fill in:
   - Username: `testadmin`
   - Email: `test@example.com`
   - Password: `TestPass123`
   - Confirm: `TestPass123`
3. Click Register
4. Should redirect to dashboard

### Step 2: Upload Test Project
1. From dashboard, click "Upload Project"
2. Fill in all required fields:
   - Title: "Smart Robot Arm"
   - Category: "Robotics"
   - Difficulty: "Intermediate"
   - Student Name: "Your Name"
   - Description: "A robotic arm project..."
   - Upload main image
3. Click "Upload Project"
4. Should see success message

### Step 3: View Project Publicly
1. Open `file:///path/to/index.html`
2. Check "Latest Projects" section
3. Your project should appear
4. Click to view details
5. Check all information displays correctly

### Step 4: Test All Features
- ✅ Search projects
- ✅ Filter by category
- ✅ View project details
- ✅ Download files
- ✅ View statistics (views, downloads)
- ✅ Admin login/logout
- ✅ Dashboard stats
- ✅ Edit/delete projects

---

## 📊 Performance Testing

### API Response Times
```bash
# Benchmark projects endpoint
curl -w "@format.txt" -o /dev/null -s http://localhost:5000/api/projects

# Format.txt content:
# time_connect:  %{time_connect}
# time_starttransfer: %{time_starttransfer}
# time_total: %{time_total}
```

Expected: < 500ms

### Database Performance
Check MongoDB indexes are created:
```bash
mongosh
use robolearn
db.projects.getIndexes()
```

Should show text index on title, description, tags

### File Upload Performance
Upload time depends on:
- File size
- Internet speed
- Server hardware
- Multer settings

Typical times:
- Small image (1MB): 100-500ms
- Large ZIP (20MB): 2-5 seconds
- Multiple files: sum of individual times

---

## 🔒 Security Checklist

Before production deployment:

```
Security Checks:
☐ Change JWT_SECRET in .env (random 32+ char string)
☐ Change admin default password
☐ Enable HTTPS (production)
☐ Restrict CORS origin to your domain
☐ Add input validation to all forms
☐ Sanitize user inputs (prevent XSS)
☐ Hash passwords with bcrypt (already done)
☐ Set secure cookies (production)
☐ Rate limiting on auth endpoints
☐ Environment variables not exposed
☐ Hide error details in production
☐ Regular security audits
```

---

## 📝 Browser Console Debugging

Open DevTools (F12) and check:

### Console Tab
- Look for red error messages
- Check API response errors
- Verify fetch requests succeed

### Network Tab
- Check request/response for each API call
- Look for CORS errors
- Verify response status 200, 201, etc.

### Application Tab
- Check localStorage for token
- Verify cookies set correctly
- Check cache storage

### Common Console Errors

```javascript
// Error: main.js not loaded
// Solution: Ensure script tag in HTML: <script src="../js/main.js"></script>

// Error: api is not defined
// Solution: main.js must load BEFORE other scripts

// Error: Cannot read properties of null
// Solution: DOM element doesn't exist, check HTML IDs match JavaScript
```

---

## 🔄 Restart Procedures

### Quick Restart
```bash
# Terminal with backend running: Ctrl+C
# Then:
npm start
```

### Full Restart
```bash
# Terminal 1: Stop backend (Ctrl+C)
# Terminal 2: Stop MongoDB (Ctrl+C or net stop MongoDB)
# Wait 5 seconds
# Terminal 2: Start MongoDB again
# Terminal 1: npm start
# Browser: Refresh page (Ctrl+Shift+R for hard refresh)
```

### Clear All & Restart
```bash
# Delete uploaded files
rm -rf robolearn-platform/backend/uploads/*

# Delete database (WARNING: Loses data!)
mongosh
use robolearn
db.dropDatabase()

# Restart backend
npm start

# Create new admin account via register.html
```

---

## 📞 Getting Help

If you still have issues:

1. **Check Logs**
   - Backend terminal for errors
   - Browser console (F12)
   - Browser Network tab

2. **Isolate Problem**
   - Is MongoDB running? Test: `mongosh`
   - Is backend running? Test: `curl http://localhost:5000/api/health`
   - Is frontend loading? Test: Open in browser
   - Are requests reaching backend? Check Network tab (F12)

3. **Try Solutions in Order**
   - Restart MongoDB
   - Restart backend server
   - Clear browser cache
   - Hard refresh (Ctrl+Shift+R)
   - Restart everything

4. **Verify Setup**
   - Re-run npm install
   - Check Node version (v14+)
   - Verify all files present
   - Test with fresh admin account

---

## ✨ You're Ready!

If all tests pass, your Robo Learn Platform is ready for:
- ✅ Local testing & development
- ✅ Adding new features
- ✅ Deploying to production

**Happy coding! 🚀**
