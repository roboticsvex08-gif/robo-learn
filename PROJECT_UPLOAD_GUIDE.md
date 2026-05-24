# Project Upload & Gallery Feature

## Overview
Your RoboLearn website now has a complete project sharing system where users can upload their projects and everyone can view them in a gallery.

## Features

### 1. **Upload Project Page** (`/upload-project`)
- **Project Name**: Title of your project
- **Your Name/Team Name**: Who created the project
- **Description**: Detailed description of what the project does
- **File Upload**: Drag & drop or click to upload project files
  - Supported formats: ZIP, RAR, 7Z, HTML, PDF, DOC, DOCX, TXT, JS, PY, JAVA, CPP, SQL, JSON
  - Maximum file size: 50MB
  - Progress bar shows upload progress

### 2. **Projects Gallery** (`/projects-gallery`)
- View all uploaded projects in a beautiful card layout
- **Search**: Find projects by name, uploader, or description
- **Sort Options**:
  - Newest First (default)
  - Oldest First
  - Alphabetical (A to Z)
- **Download**: Direct download link for each project
- **Real-time Updates**: Gallery auto-refreshes every 30 seconds

## Accessing the Features

### From Your Computer
- Upload Project: `http://localhost:5000/upload-project`
- Projects Gallery: `http://localhost:5000/projects-gallery`

### From Other Devices (Same WiFi)
- Upload Project: `http://YOUR_IP:5000/upload-project`
- Projects Gallery: `http://YOUR_IP:5000/projects-gallery`

### Access Links Page
Visit `http://localhost:5000/access` to see all links including the new Upload and Gallery pages.

## Backend Structure

### New Folders
- `/uploads/` - Stores all uploaded project files
- `uploads/projects.json` - Metadata for all projects

### New Routes
- `GET /upload-project` - Upload page
- `GET /projects-gallery` - Gallery page
- `POST /api/upload-project` - Handle file uploads
- `GET /api/projects` - Get all projects data
- `GET /uploads/<filename>` - Download project files
- `DELETE /api/projects/<id>` - Delete a project (admin)

### File Storage
- Uploaded files are stored in the `/uploads/` folder
- Filenames are randomized for security using UUID
- Original filename is preserved in metadata

## How It Works

1. **Upload Flow**:
   - User fills in project details
   - Selects file(s) to upload
   - File is validated (size, type, extension)
   - File is saved with unique filename
   - Project metadata is saved to `projects.json`
   - User gets success confirmation

2. **Gallery Flow**:
   - Page loads all projects from `projects.json`
   - Displays as cards with project info
   - User can search, sort, and download
   - Gallery auto-refreshes every 30 seconds for new uploads

## File Validation

- **Size Limit**: 50MB maximum
- **Allowed Extensions**: zip, rar, 7z, html, pdf, doc, docx, txt, js, py, java, cpp, sql, json
- **Empty Files**: Rejected
- **Filename**: Sanitized for security

## Data Stored for Each Project

```json
{
  "id": "unique-uuid",
  "projectName": "Project Title",
  "uploaderName": "Your Name/Team",
  "description": "Project description",
  "fileName": "unique-uuid_projectname.zip",
  "fileSize": 1024000,
  "uploadDate": "2026-05-21T10:30:45.123456",
  "downloadUrl": "/uploads/unique-uuid_projectname.zip"
}
```

## Tips for Users

1. **Zip Your Projects**: For complex projects with multiple files, create a ZIP file first
2. **Clear Descriptions**: Write helpful descriptions so others understand your project
3. **File Size**: Keep files under 50MB. If larger, consider compression
4. **Naming**: Use clear, descriptive project names
5. **Share Links**: Copy the upload/gallery URLs to share with classmates

## Security Notes

- File names are randomized to prevent directory traversal
- File extensions are validated against a whitelist
- File sizes are checked before upload
- Original filenames are sanitized
- Files are stored outside the web root temporarily

## Future Enhancements

Consider adding:
- Project categories/tags
- User authentication for uploads
- Project ratings/comments
- Project edit/update functionality
- File preview functionality
- Email notifications for new uploads
- Automatic cleanup of old files
