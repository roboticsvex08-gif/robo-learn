# 🚀 Robo Learn Platform - Complete Setup & Deployment Guide

## ✅ All Issues Fixed & Website Status

### **Fixed Issues Summary**
- ✅ Fixed 3 missing JavaScript functions in upload.html
- ✅ Created complete edit.html admin page
- ✅ Fixed editProject() function in projects.html
- ✅ Created comprehensive .env configuration
- ✅ Verified all backend routes and API endpoints
- ✅ Verified all frontend pages (admin & public)
- ✅ All middleware and authentication complete
- ✅ All database models and schemas complete

### **Website Status**
- **Backend**: 100% Complete ✅
- **Admin Panel**: 100% Complete ✅  
- **Public Frontend**: 100% Complete ✅
- **Database**: Ready to Connect ✅
- **File Upload**: Fully Configured ✅

---

## 📋 Prerequisites

Before starting, ensure you have:
- **Node.js** v14 or higher (Download from nodejs.org)
- **npm** (comes with Node.js)
- **MongoDB** (either local or MongoDB Atlas account)
- **Git** (optional, for version control)
- **A modern web browser** (Chrome, Firefox, Safari, or Edge)

---

## 🔧 Installation Steps

### Step 1: Set Up MongoDB

#### Option A: Local MongoDB (Windows)
```bash
# Download MongoDB Community Edition from: https://www.mongodb.com/try/download/community

# Start MongoDB service (Windows)
# Press Win+R and type: services.msc
# Find "MongoDB Server" and Start the service

# Verify MongoDB is running on localhost:27017
```

#### Option B: MongoDB Atlas (Cloud - Recommended)
```bash
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Add to .env file as MONGODB_URI
   Example: mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/robolearn?retryWrites=true&w=majority
```

#### Option C: Docker (If you have Docker installed)
```bash
# Run MongoDB in a Docker container
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Verify it's running
docker ps
```

---

### Step 2: Install Backend Dependencies

```bash
# Navigate to the backend directory
cd robolearn-platform/backend

# Install all required packages
npm install

# Expected packages:
# - express (web framework)
# - mongoose (MongoDB connection)
# - multer (file upload)
# - jsonwebtoken (authentication)
# - bcryptjs (password hashing)
# - cors (cross-origin requests)
# - dotenv (environment variables)
```

### Step 3: Verify & Update .env File

The `.env` file should be located at: `robolearn-platform/backend/.env`

**Check current configuration:**
```bash
# Current .env file location: robolearn-platform/backend/.env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/robolearn
JWT_SECRET=RoboLearnsecretkey12345678901234567890secret
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000,http://localhost:3001,http://127.0.0.1:3000,http://127.0.0.1:3001
MAX_FILE_SIZE=52428800
UPLOAD_DIR=uploads
```

**If using MongoDB Atlas, update MONGODB_URI:**
```bash
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/robolearn?retryWrites=true&w=majority
```

---

### Step 4: Start the Backend Server

```bash
# Navigate to backend directory
cd robolearn-platform/backend

# Start the server
npm start

# Expected output:
# ✅ MongoDB Connected Successfully
# 🚀 Server running on port 5000
# 🔗 API ready at http://localhost:5000/api
```

**Verify Backend is Running:**
- Open browser: http://localhost:5000/api/health
- You should see: `{"success": true, "message": "Backend server is running"}`

---

### Step 5: Set Up Frontend

**No installation needed!** The frontend files are static HTML/CSS/JS.

However, you need to serve them via a local server:

#### Option A: Using Python (Easiest)
```bash
# Navigate to robolearn-platform/frontend
cd robolearn-platform/frontend

# Python 3 (recommended)
python -m http.server 8000

# Or Python 2
python -m SimpleHTTPServer 8000

# Access frontend at: http://localhost:8000
```

#### Option B: Using Node.js http-server
```bash
# Install globally
npm install -g http-server

# Navigate to frontend
cd robolearn-platform/frontend

# Start server
http-server

# Access at: http://localhost:8080
```

#### Option C: Using VS Code Live Server Extension
- Install "Live Server" extension in VS Code
- Right-click on `frontend/public/index.html`
- Click "Open with Live Server"
- Frontend will open in browser

---

## 🔐 Admin Setup

### Creating First Admin Account

1. **Navigate to Admin Register Page:**
   ```
   http://localhost:8000/admin/register.html
   ```

2. **Fill in Registration Form:**
   - Username: `admin` (or any username)
   - Email: `admin@example.com`
   - Password: `admin123` (min 6 characters)
   - Confirm Password: `admin123`

3. **Click "Create Account"**
   - You'll be logged in automatically
   - Redirected to Admin Dashboard

4. **Verify Access to Admin Panel:**
   - Dashboard: `http://localhost:8000/admin/dashboard.html`
   - Upload Project: `http://localhost:8000/admin/upload.html`
   - My Projects: `http://localhost:8000/admin/projects.html`

### Logging In
```
Username: admin
Password: admin123
```

---

## 📤 Uploading Projects

### From Admin Dashboard:

1. **Go to "Upload Project"** in admin sidebar
2. **Fill in Required Fields:**
   - Project Title *(required)*
   - Category *(required)* - Choose from: Robotics, IoT, AI/ML, Automation, Drone, Other
   - Difficulty Level *(required)* - Beginner, Intermediate, Advanced, Expert
   - Student Name *(required)*
   - Full Description *(required)*
   - Short Description *(required)*

3. **Upload Media (Optional):**
   - Main Project Image - Click to upload
   - Additional Images - Up to 5 images
   - YouTube Video URL - Paste YouTube link

4. **Upload Project Files (Optional):**
   - PDF, ZIP, PPT, DOC files supported
   - Up to 10 files, 50MB size limit each

5. **Click "Upload Project"**
   - Project saves to database
   - Files uploaded to `/backend/uploads/`
   - **Immediately appears publicly** on home page

---

## 🌐 Viewing Projects

### Public Website
```
Home Page: http://localhost:8000/index.html
```

### Features:
- ✅ Browse all published projects
- ✅ Filter by category
- ✅ Search by project name/description
- ✅ View detailed project pages
- ✅ Download project files
- ✅ See related projects
- ✅ Track view & download counts

---

## 📊 Admin Dashboard Features

### Dashboard
- View total projects, views, and downloads
- Recent uploads
- Quick stats

### Upload Project
- Full form with validation
- Image preview before upload
- File size checking
- Category and difficulty selection

### My Projects
- List all uploaded projects
- Edit projects
- Delete projects
- View project statistics

### Edit Project
- Modify existing projects
- Update images and files
- Change description and metadata
- Keep or replace files

---

## 🔗 API Endpoints Reference

### Authentication
```
POST   /api/auth/register    - Register new admin
POST   /api/auth/login       - Admin login
GET    /api/auth/verify      - Verify JWT token
```

### Projects (Public)
```
GET    /api/projects                      - Get all published projects (paginated)
GET    /api/projects/:id                  - Get single project (increments views)
GET    /api/projects/category/:category   - Get projects by category
GET    /api/projects/trending/latest      - Get 6 latest projects
GET    /api/projects/trending/popular     - Get 6 most viewed projects
POST   /api/projects/:id/download         - Increment download counter
```

### Projects (Admin Only - Requires JWT Token)
```
POST   /api/projects                  - Create new project (with file upload)
PUT    /api/projects/:id              - Update project (with file upload)
DELETE /api/projects/:id              - Delete project
GET    /api/projects/admin/all        - Get all projects (admin list)
```

---

## 📁 Project Structure

```
robolearn-platform/
├── backend/
│   ├── server.js                 # Main server file
│   ├── package.json              # Node dependencies
│   ├── .env                       # Environment configuration
│   ├── config/
│   │   └── database.js            # MongoDB connection
│   ├── middleware/
│   │   ├── auth.js                # JWT authentication
│   │   └── upload.js              # Multer file upload
│   ├── models/
│   │   ├── Admin.js               # Admin schema
│   │   └── Project.js             # Project schema
│   ├── routes/
│   │   ├── auth.js                # Auth endpoints
│   │   └── projects.js            # Project endpoints
│   └── uploads/                   # Uploaded files (auto-created)
│
└── frontend/
    ├── admin/
    │   ├── login.html             # Admin login page
    │   ├── register.html          # Admin registration
    │   ├── dashboard.html         # Admin dashboard
    │   ├── upload.html            # Project upload form
    │   ├── edit.html              # Project edit form
    │   └── projects.html          # My projects list
    │
    ├── public/
    │   ├── index.html             # Home page (projects showcase)
    │   └── project-detail.html    # Project details page
    │
    ├── js/
    │   └── api.js                 # Frontend API client
    │
    └── css/
        └── style.css              # Global styles
```

---

## 🚨 Troubleshooting

### Problem: "Cannot connect to MongoDB"
**Solution:**
- Verify MongoDB is running (check port 27017)
- Check MONGODB_URI in .env file
- If using MongoDB Atlas, verify whitelist IP: https://www.mongodb.com/docs/atlas/security/ip-access-list/

### Problem: "Port 5000 already in use"
**Solution:**
```bash
# Windows: Find process using port 5000
netstat -ano | findstr :5000

# Kill the process
taskkill /PID [PID] /F

# Or change PORT in .env to 5001, 5002, etc.
```

### Problem: "Uploads folder not found"
**Solution:**
- Upload middleware automatically creates `/backend/uploads/`
- If not created, manually create: `robolearn-platform/backend/uploads/`
- Ensure folder has write permissions

### Problem: "CORS error when uploading"
**Solution:**
- Verify CORS_ORIGIN in .env includes your frontend URL
- Restart backend server after changing .env

### Problem: "Images not displaying"
**Solution:**
- Verify `/uploads` static route in server.js
- Check file paths in database
- Ensure uploaded files exist in `/backend/uploads/`

---

## 🔒 Security Tips

### For Production Deployment:
1. **Change JWT_SECRET** to a strong random string
2. **Update MONGODB_URI** to production database
3. **Set NODE_ENV=production**
4. **Add password hashing** in registration (already implemented)
5. **Enable HTTPS** on server
6. **Add rate limiting** to prevent abuse
7. **Implement CSRF tokens**
8. **Add file upload limits** (already set to 50MB)
9. **Sanitize user inputs** (add express-validator)
10. **Regular database backups**

---

## 🚀 Production Deployment

### Using Heroku:
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Add MongoDB Atlas URI to Heroku
heroku config:set MONGODB_URI="your-atlas-uri"

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Using Vercel (Frontend) + Railway/Render (Backend):
```bash
# Deploy frontend to Vercel (automatic from GitHub)
# Deploy backend to Railway or Render
# Update API_BASE_URL in api.js to production backend
```

---

## 📞 Support & Debugging

### Enable Debug Logging:
```javascript
// In server.js, add:
const debug = require('debug')('app');
debug('Server is running');
```

### Check Network Requests:
- Open browser DevTools (F12)
- Go to Network tab
- Check API requests and responses
- Look for CORS errors or 404s

### MongoDB Compass (GUI Tool):
```bash
# Download from: https://www.mongodb.com/products/compass
# Connect to: mongodb://localhost:27017
# Browse database and collections
# Verify data is being saved
```

---

## ✨ Features Implemented

### Backend
- ✅ JWT Authentication
- ✅ User Registration & Login
- ✅ File Upload (Multer)
- ✅ Project CRUD operations
- ✅ Pagination & Search
- ✅ Category filtering
- ✅ View/Download tracking
- ✅ CORS support
- ✅ Error handling
- ✅ Validation

### Frontend
- ✅ Admin Login/Register
- ✅ Project Upload with preview
- ✅ Project Editing
- ✅ Project Deletion
- ✅ Admin Dashboard
- ✅ Public Project Showcase
- ✅ Project Details Page
- ✅ Search & Filter
- ✅ Pagination
- ✅ Responsive Design
- ✅ Image gallery
- ✅ Video embedding
- ✅ File downloads

---

## 🎓 Example Workflow

### 1. Admin Uploads Project
```
1. Go to Admin Panel → Upload Project
2. Fill form: Title, Category, Difficulty, Description, etc.
3. Upload main image
4. Add additional images
5. Upload project files
6. Click "Upload Project"
```

### 2. Project Appears Publicly
```
1. Go to Home Page → Browse Projects
2. Project appears in:
   - "All Projects" section
   - Category filter results
   - Latest projects section
3. Can be searched by title/description
```

### 3. Users View Project Details
```
1. Click on project card
2. View detailed description
3. See images in gallery
4. Watch embedded video
5. Download project files
6. See related projects
```

### 4. Admin Edits Project
```
1. Go to My Projects
2. Click "Edit"
3. Update information
4. Upload new files/images
5. Click "Update Project"
6. Changes live immediately
```

---

## 📈 Database Schema

### Admin Collection
```javascript
{
  _id: ObjectId,
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  role: String (admin/super_admin),
  createdAt: Date
}
```

### Project Collection
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  shortDescription: String (required),
  studentName: String (required),
  studentEmail: String,
  category: String (enum),
  difficulty: String (enum),
  image: {
    filename: String,
    path: String,
    url: String
  },
  images: Array,
  files: Array,
  videoUrl: String,
  tags: Array,
  views: Number (default: 0),
  downloads: Number (default: 0),
  status: String (draft/published),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎯 Next Steps

1. **Install MongoDB** locally or use MongoDB Atlas
2. **Configure .env** with MongoDB URI
3. **Install backend dependencies**: `npm install`
4. **Start backend**: `npm start`
5. **Serve frontend**: Use Python/http-server/Live Server
6. **Create admin account**: Register at /admin/register.html
7. **Upload test project**: Use admin upload form
8. **View projects**: Browse at /index.html

---

## 📚 Additional Resources

- **MongoDB Documentation**: https://docs.mongodb.com/
- **Express.js Guide**: https://expressjs.com/
- **JWT Auth**: https://jwt.io/
- **Multer Documentation**: https://github.com/expressjs/multer
- **MDN Web Docs**: https://developer.mozilla.org/

---

## ✅ Final Checklist Before Launch

- [ ] MongoDB is set up and running
- [ ] Backend dependencies installed (`npm install`)
- [ ] .env file configured with MongoDB URI
- [ ] Backend server started (`npm start`)
- [ ] Frontend server started (port 8000)
- [ ] Admin account created
- [ ] At least one project uploaded
- [ ] Admin can view projects list
- [ ] Can edit and delete projects
- [ ] Public page shows uploaded projects
- [ ] Project details page works
- [ ] File downloads work
- [ ] Images display correctly
- [ ] Search and filter work
- [ ] Responsive design tested on mobile
- [ ] No console errors in DevTools

---

**🎉 Congratulations! Your Robo Learn Platform is ready!**

For any issues, check the Troubleshooting section or review the console logs.

**Backend Logs**: Terminal/Console running `npm start`  
**Frontend Logs**: Browser DevTools (F12 → Console)  
**Database Logs**: MongoDB Compass or MongoDB command line

Good luck with your platform! 🚀
