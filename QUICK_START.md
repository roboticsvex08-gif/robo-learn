# ⚡ QUICK START - 5 MINUTES TO LAUNCH

## 🎯 Fastest Way to Get Running

### Prerequisites Check
- [ ] Node.js installed? (Check: `node --version`)
- [ ] MongoDB running OR MongoDB Atlas account ready?

---

## 🚀 Let's Go! (5 minute setup)

### Step 1: Start MongoDB (2 minutes)

**Windows - Already running?**
```bash
# Open Task Manager → Services
# Look for "MongoDB Server" → should be "Running"
# If not, start it
```

**OR use MongoDB Atlas (Cloud)**
```
Go to: https://www.mongodb.com/cloud/atlas
Create free account → Create cluster → Get connection string
Copy the connection string
```

---

### Step 2: Start Backend (2 minutes)

**Open PowerShell/Terminal/CMD and run:**
```bash
# Go to backend folder
cd robolearn-platform/backend

# Install dependencies (first time only, takes 1 min)
npm install

# Start server
npm start
```

**✅ You should see:**
```
MongoDB Connected Successfully
Server running on port 5000
Backend API ready at http://localhost:5000/api
```

**Copy your MongoDB URI to .env if needed** (see .env file)

---

### Step 3: Start Frontend (1 minute)

**Open another PowerShell/Terminal/CMD:**

**Using Python (Easiest):**
```bash
# Go to frontend folder
cd robolearn-platform/frontend

# Start server
python -m http.server 8000

# Then visit: http://localhost:8000
```

**OR using Node.js:**
```bash
npm install -g http-server
cd robolearn-platform/frontend
http-server
# Visit: http://localhost:8080
```

**OR using VS Code Live Server:**
- Install "Live Server" extension
- Right-click `frontend/public/index.html`
- Click "Open with Live Server"

---

### Step 4: Create Admin Account (1 minute)

1. **Open browser:** `http://localhost:8000/admin/register.html`
2. **Fill in:**
   - Username: `admin`
   - Email: `admin@example.com`
   - Password: `admin123`
   - Confirm: `admin123`
3. **Click "Create Account"**

---

### Step 5: Upload First Project (1 minute)

1. **You're now logged in! Go to:** Upload Project in sidebar
2. **Fill in:**
   - Title: `My First Robot`
   - Category: `Robotics`
   - Difficulty: `Beginner`
   - Student Name: `John Doe`
   - Description: `A cool robot I built`
   - Short Description: `My awesome robot`
3. **Upload an image if you want**
4. **Click "Upload Project"**

---

### Step 6: View Your Project (30 seconds)

**Visit:** `http://localhost:8000/index.html`

✅ **Your project should appear on the home page!**

---

## 🔗 Quick Links

| What | URL |
|------|-----|
| Home (Public Showcase) | http://localhost:8000/index.html |
| Admin Login | http://localhost:8000/admin/login.html |
| Admin Register | http://localhost:8000/admin/register.html |
| Admin Dashboard | http://localhost:8000/admin/dashboard.html |
| Upload Project | http://localhost:8000/admin/upload.html |
| My Projects | http://localhost:8000/admin/projects.html |
| Backend Health Check | http://localhost:5000/api/health |

---

## 🆘 Quick Troubleshooting

### Backend won't start
```bash
# Error: Port 5000 in use?
# Change PORT in backend/.env to 5001, restart

# Error: MongoDB connection failed?
# Make sure MongoDB is running on port 27017
# Or check MONGODB_URI in .env is correct
```

### Frontend shows blank
```bash
# Check browser console (F12 → Console tab)
# Should show NO errors if API is working
# Verify backend URL in frontend/js/api.js line 1
```

### Can't upload files
```bash
# Check /backend/uploads/ folder exists
# If not, create it manually
# Restart backend server
```

### Admin can't login
```bash
# Make sure you completed Step 4 (Create Admin Account)
# Try username: admin, password: admin123
```

---

## 📚 Full Documentation

For detailed setup, configuration, and features:
📖 Read: `SETUP_COMPLETE_GUIDE.md`

For complete list of what was fixed:
📖 Read: `FIXES_SUMMARY.md`

---

## ✅ Success Checklist

- [ ] Backend running (see "Server running on port 5000")
- [ ] Frontend accessible (browser loads http://localhost:8000)
- [ ] Admin account created
- [ ] First project uploaded
- [ ] Project visible on home page
- [ ] Can view project details
- [ ] Can edit/delete project as admin
- [ ] Everything working? 🎉

---

## 🎓 Next Steps

After everything works:

1. **Upload More Projects** - Add images, files, YouTube videos
2. **Explore Admin Features** - Edit projects, manage uploads
3. **Test Public Site** - Search, filter, pagination
4. **Invite Others** - Share home page link
5. **Deploy** - Read SETUP guide for production deployment

---

## 💡 Pro Tips

- **Create test accounts** for different students
- **Upload different categories** to test filtering
- **Try searching** to test search functionality
- **Use YouTube links** to embed project videos
- **Upload multiple images** to test gallery
- **Download files** to test download tracking

---

## 🚀 Ready?

**Your Robo Learn Platform is now live!**

If anything doesn't work, check the console (F12) for error messages and refer to the full setup guide.

**Enjoy your project showcase platform!** 🎉
