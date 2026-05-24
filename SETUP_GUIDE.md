# 🤖 Robo Learn - Contact Page Setup Guide

This guide will help you set up and run the contact page with a Python backend for handling emails and WhatsApp messages.

## 🚀 Quick Start

### Step 1: Install Dependencies

Open PowerShell or Command Prompt and run:

```bash
pip install -r requirements.txt
```

Or use the batch file (Windows):
```bash
start_backend.bat
```

### Step 2: Configure Gmail (IMPORTANT!)

To send emails, you need to set up Gmail authentication:

1. **Enable 2-Factor Authentication** on your Gmail account:
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate an App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Copy the 16-character password provided

3. **Update .env file**:
   - Open the `.env` file in the root directory
   - Replace `your_16_character_app_password_here` with your actual app password
   - Example:
     ```
     SENDER_EMAIL=soumyendubikashgayen0@gmail.com
     SENDER_PASSWORD=abcd efgh ijkl mnop
     ```

### Step 3: Start the Backend Server

Run the Python backend:

```bash
python app.py
```

You should see:
```
🚀 Robo Learn Contact Backend is starting...
📧 Email: soumyendubikashgayen0@gmail.com
💬 WhatsApp: 917029709096
 * Running on http://localhost:5000
```

### Step 4: Test the Contact Page

1. Open the contact page in your browser:
   ```
   contact-page/index.html
   ```

2. Or start a local server:
   ```bash
   python -m http.server 8000
   ```
   Then visit: `http://localhost:8000/contact-page/`

## 📧 Email Functionality

The email form now allows visitors to:
- Enter their name
- Enter their email address
- Write a message
- Submit directly through the Python backend

**Features:**
- Form validation
- Automatic error handling
- Status messages (success/error)
- SMTP connection to Gmail

## 💬 WhatsApp Functionality

The WhatsApp button:
- Opens WhatsApp Web with pre-filled message
- Works on both desktop and mobile
- Has fallback if backend is unavailable

## 🔌 API Endpoints

### Send Email
```
POST /api/send-email
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here",
  "subject": "Optional subject"
}

Response:
{
  "success": true,
  "message": "Email sent successfully!"
}
```

### WhatsApp URL
```
POST /api/whatsapp
Content-Type: application/json

{
  "message": "Your message here"
}

Response:
{
  "success": true,
  "url": "https://wa.me/917029709096?text=..."
}
```

### Contact Info
```
GET /api/contact-info

Response:
{
  "email": "soumyendubikashgayen0@gmail.com",
  "whatsapp": "917029709096",
  "whatsapp_formatted": "+91 7029709096"
}
```

## ⚙️ Configuration Files

### `.env` File
Contains sensitive information:
- `SENDER_EMAIL`: Your Gmail address
- `SENDER_PASSWORD`: Your Gmail App Password

### `requirements.txt`
Python dependencies needed:
- Flask 2.3.2
- Flask-CORS 4.0.0
- python-dotenv 1.0.0

## 🛠️ Troubleshooting

### Backend won't start
- Check if Python 3.x is installed: `python --version`
- Install dependencies: `pip install -r requirements.txt`
- Make sure port 5000 is not in use

### Email won't send
- Check `.env` file has correct credentials
- Verify Gmail App Password (16 characters)
- Check if "Less secure app access" is disabled (it should be if you're using App Password)
- Try again - Gmail sometimes blocks first-time login from new apps

### WhatsApp button not working
- Check internet connection
- Try fallback: Copy the WhatsApp number and manually message
- Check browser console for errors (F12)

### CORS errors
- Make sure backend is running on `http://localhost:5000`
- Ensure Flask-CORS is installed: `pip install Flask-CORS`

## 📱 Testing on Mobile

To test on your phone:
1. Find your computer's IP address
2. Replace `localhost` with your IP in `script.js`
3. Open contact page on phone browser
4. Both email and WhatsApp buttons should work

## 🔒 Security Notes

- Never commit `.env` file to version control
- Keep your Gmail App Password secret
- Validate all user input on the backend
- Use HTTPS in production

## 📚 Additional Resources

- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [WhatsApp Business API](https://developers.facebook.com/docs/whatsapp)

## 🐛 Report Issues

If you encounter any problems:
1. Check the browser console (F12)
2. Check the terminal where backend is running
3. Verify all credentials in `.env`
4. Ensure all dependencies are installed

---

**Happy coding! 🚀**
