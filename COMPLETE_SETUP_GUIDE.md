# Robo Learn Platform - Complete Setup & Installation Guide

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** (optional)

### Step 1: Install Dependencies

```bash
# Open terminal/PowerShell in the backend folder
cd robolearn-platform/backend

# Install npm packages
npm install
```

### Step 2: Configure Environment

The `.env` file is already configured with default values:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/robolearn
JWT_SECRET=RoboLearnsecretkey12345678901234567890secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### Step 3: Start MongoDB

**Option A: Local MongoDB**
```bash
# Windows
mongod

# Mac/Linux
mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Create account at https://www.mongodb.com/cloud/atlas
- Create cluster
- Update `MONGODB_URI` in `.env` file
- Example: `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/robolearn`

### Step 4: Start Backend Server

```bash
# In the backend folder
npm start

# Output should show:
# ╔════════════════════════════════════════╗
# ║  Robo Learn Platform Backend Started   ║
# ║  Server running on port 5000           ║
# ║  Environment: development              ║
# ╚════════════════════════════════════════╝
```

### Step 5: Open Frontend

1. Open `robolearn-platform/frontend/public/index.html` in your browser
   - Or use a live server extension in VS Code
2. Or navigate to: `file:///path/to/robolearn-platform/frontend/public/index.html`

### Step 6: Login to Admin Panel

1. Click "Admin Login" button
2. Use credentials:
   - **Username:** `admin`
   - **Password:** `admin123`
3. Upload your first project!

---

## 📋 Project Structure

```
robolearn-platform/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   └── upload.js            # Multer file upload
│   ├── models/
│   │   ├── Admin.js             # Admin user schema
│   │   └── Project.js           # Project schema
│   ├── routes/
│   │   ├── auth.js              # Auth endpoints
│   │   └── projects.js          # Project CRUD endpoints
│   ├── uploads/                 # User uploaded files
│   ├── .env                     # Environment variables
│   ├── package.json             # Dependencies
│   └── server.js                # Main server file
│
├── frontend/
│   ├── admin/
│   │   ├── login.html           # Admin login page
│   │   ├── register.html        # Admin registration
│   │   ├── dashboard.html       # Admin dashboard
│   │   ├── upload.html          # Upload project form
│   │   ├── projects.html        # Manage projects
│   │   └── edit.html            # Edit project
│   │
│   ├── public/
│   │   ├── index.html           # Main showcase page
│   │   └── project-detail.html  # Project details page
│   │
│   ├── css/
│   │   └── style.css            # Global styles
│   │
│   └── js/
│       ├── main.js              # API client & utilities
│       ├── api.js               # API functions (legacy)
│       └── app.js               # App logic
```

---

## 🔧 API Endpoints Reference

### Authentication
- `POST /api/auth/register` - Register admin
- `POST /api/auth/login` - Login admin
- `GET /api/auth/verify` - Verify token

### Public Projects (No Auth Required)
- `GET /api/projects` - Get all projects (paginated)
- `GET /api/projects/:id` - Get single project
- `GET /api/projects/category/:category` - Get by category
- `GET /api/projects/trending/latest` - Get latest projects
- `GET /api/projects/trending/popular` - Get popular projects
- `POST /api/projects/:id/download` - Increment download counter

### Admin Projects (Requires Auth)
- `GET /api/projects/admin/all` - Get all admin projects
- `POST /api/projects` - Create new project (with file upload)
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

---

## 🔐 Authentication

### Login Flow
1. Admin enters username & password on login page
2. Frontend sends to `POST /api/auth/login`
3. Backend verifies credentials with bcrypt
4. JWT token returned and stored in localStorage
5. Token used in `Authorization: Bearer <token>` header for protected routes

### Token Structure
```javascript
{
  id: admin._id,
  expiresIn: '7d'
}
```

---

## 📤 File Upload

### Supported File Types
- **Images:** JPG, PNG, GIF, WebP (50MB max)
- **Documents:** PDF, ZIP, PPT, DOC (50MB max)

### Upload Fields
- `mainImage` - Main project thumbnail
- `additionalImages` - Gallery images (up to 5)
- `projectFiles` - Downloadable files (up to 10)

### Files Stored
- Location: `/uploads/` directory in backend
- URL format: `/uploads/filename-timestamp.ext`
- Accessible via: `http://localhost:5000/uploads/filename`

---

## 🗄️ Database Schema

### Admin Model
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed with bcrypt),
  role: String (admin/super_admin),
  createdAt: Date
}
```

### Project Model
```javascript
{
  title: String,
  description: String,
  shortDescription: String,
  studentName: String,
  studentEmail: String,
  category: String (enum: Robotics, IoT, AI/ML, Automation, Drone, Other),
  difficulty: String (enum: Beginner, Intermediate, Advanced, Expert),
  image: { filename, path, url },
  images: Array,
  files: Array,
  videoUrl: String,
  tags: Array,
  views: Number,
  downloads: Number,
  status: String (draft/published),
  createdAt: Date,
  updatedAt: Date
}
```

---

## ⚠️ Troubleshooting

### Issue: "Failed to fetch" on login
**Solution:**
1. Ensure backend is running: `npm start` in backend folder
2. Check MongoDB is running
3. Check port 5000 is available
4. Verify `.env` file has correct values

### Issue: "Cannot POST /api/auth/login"
**Solution:**
- Restart backend server
- Clear browser cache
- Check that auth.js route is properly exported

### Issue: Files not uploading
**Solution:**
1. Check `/uploads` folder exists
2. Verify file size < 50MB
3. Check file type is supported
4. Ensure backend has write permissions

### Issue: "Project not found"
**Solution:**
- Verify MongoDB is connected
- Check project status is "published"
- Ensure projectId is correct

### Issue: Images not loading
**Solution:**
1. Verify image URL is correct: `http://localhost:5000/uploads/filename`
2. Check file actually exists in `/uploads` folder
3. Restart backend server

---

## 🚀 Production Deployment

### Backend (Heroku)
```bash
# 1. Create Heroku app
heroku create your-app-name

# 2. Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_atlas_url

# 3. Deploy
git push heroku main
```

### Frontend (GitHub Pages / Netlify)
```bash
# 1. Push frontend folder to GitHub
# 2. Connect to Netlify
# 3. Set build command: (none for static files)
# 4. Deploy!
```

---

## 📝 Adding New Features

### Add New Category
1. Edit `robolearn-platform/backend/models/Project.js`
2. Update category enum
3. Update frontend selects in HTML files

### Add New Admin Users
1. Go to `/admin/register.html`
2. Create new account
3. Use credentials to login

### Customize Styling
1. Edit `robolearn-platform/frontend/css/style.css`
2. Modify CSS variables at top of file
3. Changes apply globally

---

## 🛠️ Development Commands

```bash
# Start backend with auto-reload (requires nodemon)
npm run dev

# Start backend normally
npm start

# Check Node version
node --version

# Check npm version
npm --version

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 Support

If you encounter issues:

1. **Check the console** - Open browser DevTools (F12) and check Console tab
2. **Check backend logs** - Look at terminal where `npm start` is running
3. **Verify connections** - Make sure MongoDB and backend are running
4. **Clear cache** - Clear browser cache and localStorage
5. **Restart everything** - Restart MongoDB, backend, and browser

---

## ✨ Key Features Implemented

✅ User Authentication (Admin Login/Register)
✅ Project Upload with Multiple Files & Images
✅ Project Showcase with Pagination
✅ Search & Filter by Category
✅ Project Statistics (Views, Downloads)
✅ Admin Dashboard
✅ Responsive Design
✅ Error Handling & Validation
✅ JWT Token Authentication
✅ MongoDB Database Integration
✅ File Upload & Storage
✅ Modern UI with Gradient Designs

---

**Happy Coding! 🚀**
