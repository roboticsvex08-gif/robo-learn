# 🚀 Project Upload & Gallery System - Quick Start

## What's New?
Your RoboLearn website now has a complete **Project Sharing System**! Users can upload projects, and everyone can view them in a beautiful gallery.

## Two New Pages

### 📤 Upload Project Page
**URL**: `/upload-project`
- Beautiful upload interface with drag-and-drop support
- Users fill in project details
- Upload files up to 50MB
- Supports ZIP, RAR, HTML, PDF, and many file types
- Real-time upload progress

### 🎨 Projects Gallery Page  
**URL**: `/projects-gallery`
- View all uploaded projects in a card grid layout
- Search projects by name or uploader
- Sort by: Newest, Oldest, or Alphabetically
- Download projects directly
- Auto-refreshes every 30 seconds

## How to Use

### For Users (Uploading Projects)
1. Go to `/upload-project`
2. Enter project name
3. Enter your name or team name
4. Add project description (optional)
5. Upload your project file
6. Click "Upload Project"
7. Done! Your project appears in the gallery

### For Users (Viewing Projects)
1. Go to `/projects-gallery`
2. Browse all community projects
3. Use search to find specific projects
4. Sort by date or name
5. Click "Download" to get the project file

## Backend Changes

### New Routes Added
```
GET  /upload-project              → Upload page HTML
GET  /projects-gallery            → Gallery page HTML
POST /api/upload-project          → Handle file uploads
GET  /api/projects                → Get all projects as JSON
GET  /uploads/<filename>          → Download project file
DELETE /api/projects/<project_id> → Delete a project
```

### New Folders
- `/uploads/` - Stores all uploaded files
- `uploads/projects.json` - Project metadata

### Configuration
- **Max file size**: 50MB
- **Allowed formats**: ZIP, RAR, 7Z, HTML, PDF, DOC, DOCX, TXT, JS, PY, JAVA, CPP, SQL, JSON
- **Auto-refresh**: Gallery refreshes every 30 seconds

## Access Links

### From Your Computer
- Upload: `http://localhost:5000/upload-project`
- Gallery: `http://localhost:5000/projects-gallery`

### From Other Devices (Same WiFi)
- Upload: `http://YOUR_IP:5000/upload-project`
- Gallery: `http://YOUR_IP:5000/projects-gallery`

### View All Links
Visit: `http://localhost:5000/access`

## File Structure

```
School Project/
├── upload-project.html           (New upload page)
├── projects-gallery.html         (New gallery page)
├── app.py                        (Updated with new routes)
├── uploads/                      (New folder for files)
│   ├── projects.json            (Project metadata)
│   └── [uploaded files...]
├── PROJECT_UPLOAD_GUIDE.md       (Detailed documentation)
└── ... (existing files)
```

## Features

✅ **File Upload**
- Drag & drop interface
- File size validation
- File type validation
- Progress bar

✅ **Project Gallery**
- Card-based layout
- Search functionality
- Multiple sort options
- Direct downloads
- Real-time updates

✅ **Security**
- Filename sanitization
- File type whitelist
- Size limit enforcement
- Random file naming

✅ **User Experience**
- Beautiful UI with gradient backgrounds
- Responsive design (mobile-friendly)
- Real-time feedback
- Error handling
- Success messages

## Sample Project Entry

When a project is uploaded, it stores:
```json
{
  "id": "uuid",
  "projectName": "My Awesome Robot",
  "uploaderName": "John & Team",
  "description": "A robot that can navigate obstacles",
  "fileName": "unique-filename.zip",
  "fileSize": 2048576,
  "uploadDate": "2026-05-21T10:30:45",
  "downloadUrl": "/uploads/unique-filename.zip"
}
```

## Testing

1. Start your Flask server: `python app.py`
2. Go to upload page: `http://localhost:5000/upload-project`
3. Upload a test file
4. Go to gallery: `http://localhost:5000/projects-gallery`
5. See your project in the gallery!

## Troubleshooting

**File won't upload**
- Check file size (max 50MB)
- Check file extension (must be in allowed list)
- Ensure file is not empty

**Gallery shows no projects**
- Ensure `projects.json` exists in uploads folder
- Check browser console for errors
- Try refreshing the page

**Download link broken**
- Check file exists in `/uploads/` folder
- Verify `projects.json` has correct download URL

## Next Steps (Optional Enhancements)

Consider adding:
- User authentication for uploads
- Project ratings/comments
- Categories/tags for projects
- Email notifications
- Project preview functionality
- File preview in browser
- Edit/update capabilities

---

**Enjoy your new project sharing system! 🎉**
