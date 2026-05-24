# 🚀 Quick Start - Robo Learn Contact Page

## ⚡ 5-Minute Setup

### 1️⃣ Install Python Packages
```bash
pip install -r requirements.txt
```

### 2️⃣ Get Gmail App Password
- Go to: https://myaccount.google.com/apppasswords
- Get your 16-character password
- Open `.env` file and paste it

### 3️⃣ Start Backend
**Windows:**
```bash
start_backend.bat
```

**Or PowerShell:**
```bash
powershell -ExecutionPolicy Bypass -File start_backend.ps1
```

**Or Direct:**
```bash
python app.py
```

### 4️⃣ Open Contact Page
Open `contact-page/index.html` in your browser

---

## 📋 What's Working

✅ **Email Form** - Collects name, email, message and sends via Gmail SMTP
✅ **WhatsApp Button** - Opens WhatsApp Web with your contact  
✅ **Copy Buttons** - Copy email and WhatsApp number to clipboard
✅ **Error Handling** - User-friendly error messages
✅ **Form Validation** - Ensures all fields are filled

---

## 🔧 Files Overview

| File | Purpose |
|------|---------|
| `app.py` | Python Flask backend |
| `.env` | Email credentials |
| `contact-page/script.js` | Frontend API calls |
| `contact-page/style.css` | Styling |
| `requirements.txt` | Python dependencies |
| `SETUP_GUIDE.md` | Detailed documentation |

---

## 🐛 Troubleshooting

**Backend won't start?**
```bash
# Check Python is installed
python --version

# Install dependencies
pip install -r requirements.txt
```

**Email won't send?**
- Verify `.env` has your Gmail credentials
- Check your Gmail App Password (16 chars)
- Try signing out and in on Gmail once

**WhatsApp button not working?**
- Check internet connection
- Copy the number manually if needed

---

## 📱 Test on Your Phone

1. Find your computer's IP: `ipconfig` (Windows)
2. Edit `contact-page/script.js` line 5:
   ```javascript
   const API_URL = 'http://YOUR_IP:5000/api';
   ```
3. Open on phone browser: `http://YOUR_IP:8000`

---

## 📞 Contact Functions

### Email Backend
- **Endpoint:** `POST /api/send-email`
- **Handles:** Form submission, validation, SMTP
- **Returns:** Success/error message

### WhatsApp Backend  
- **Endpoint:** `POST /api/whatsapp`
- **Handles:** Message URL generation
- **Returns:** WhatsApp Web link

---

## ✨ Ready to Go!

Your contact page is now fully functional with:
- Real email sending
- WhatsApp integration
- Professional error handling
- Beautiful dark mode UI

**Start the backend and test now! 🎉**
