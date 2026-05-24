# MongoDB Setup Guide for Robo Learn Platform

## Option 1: MongoDB Atlas (Cloud - Recommended for Beginners)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Start Free"
3. Sign up with email/Google/GitHub

### Step 2: Create a Cluster
1. Click "Create" to build a new cluster
2. Choose the Free tier (M0)
3. Select region closest to you
4. Click "Create Cluster" (takes 5-10 minutes)

### Step 3: Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Set username: `admin`
4. Set password: `YourSecurePassword123`
5. Click "Add User"

### Step 4: Whitelist Your IP
1. Go to "Network Access"
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (for development)
4. Confirm

### Step 5: Get Connection String
1. Go to "Clusters" and click "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your password

### Step 6: Update .env File
Edit `/backend/.env`:
```
MONGODB_URI=mongodb+srv://admin:YourSecurePassword123@cluster0.xxxxx.mongodb.net/robolearn?retryWrites=true&w=majority
```

### Step 7: Restart Backend
```bash
npm start
```

---

## Option 2: MongoDB Community Server (Local Installation)

### Windows Installation

#### Download & Install MongoDB
1. Go to https://www.mongodb.com/try/download/community
2. Select Windows MSI
3. Download and run installer
4. Follow installation wizard
5. MongoDB installs to `C:\Program Files\MongoDB\Server\7.0\`

#### Create Data Directory
```bash
mkdir C:\data\db
```

#### Start MongoDB (Option A - Manual)
```bash
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath "C:\data\db"
```

#### Start MongoDB (Option B - As Service)
```bash
# Admin PowerShell
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --install --dbpath "C:\data\db"
net start MongoDB
```

#### Verify Connection
```bash
# In new terminal
"C:\Program Files\MongoDB\Server\7.0\bin\mongo.exe"
```
If you see `>` prompt, MongoDB is running!

### Mac/Linux Installation

```bash
# Mac
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Linux (Ubuntu)
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

---

## Option 3: Docker (Advanced)

### Install Docker
- https://www.docker.com/products/docker-desktop

### Run MongoDB in Docker
```bash
docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin123 mongo:7.0
```

### Connection String
```
MONGODB_URI=mongodb://admin:admin123@localhost:27017/robolearn?authSource=admin
```

---

## Verify MongoDB Connection

### Method 1: Terminal
```bash
# Connect to MongoDB
mongosh

# Should show: > 

# Check databases
show databases

# Exit
exit
```

### Method 2: MongoDB Compass (GUI)
1. Download from https://www.mongodb.com/products/compass
2. Install
3. Create connection to `mongodb://localhost:27017`
4. Verify connection

### Method 3: Backend Logs
When backend starts, you should see:
```
MongoDB Connected Successfully
```

---

## Troubleshooting MongoDB Connection

### Error: "connect ECONNREFUSED"
**Solution:** MongoDB is not running
```bash
# Windows
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath "C:\data\db"

# Or if installed as service
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongodb
```

### Error: "MongoServerError: connect ECONNREFUSED ::1"
**Solution:** Check .env MONGODB_URI is correct
```
# Should be one of these:
MONGODB_URI=mongodb://localhost:27017/robolearn
MONGODB_URI=mongodb+srv://admin:password@cluster0.xxxxx.mongodb.net/robolearn
```

### Error: "Authentication failed"
**Solution:** Username/password incorrect
- Check MongoDB credentials
- Reset password in MongoDB Atlas
- Update .env file

### Connection String Format
```
mongodb://[username:password@]host[:port]/[database]
mongodb+srv://[username:password@]host/database
```

---

## Default Connection String

By default, the app uses:
```
MONGODB_URI=mongodb://localhost:27017/robolearn
```

This connects to a **local MongoDB** on default port **27017**.

---

## Database Setup

Once MongoDB is running, your app will automatically create:

### Database Name
- `robolearn`

### Collections (Auto-Created)
- `admins` - Admin users
- `projects` - Project data

### First Admin User
When you first register via `/admin/register.html`, an admin account is created automatically.

Demo credentials (create your own):
- Username: `admin`
- Password: `admin123`

---

## Check Database Content

### Using MongoDB Compass
1. Connect to your MongoDB
2. Select `robolearn` database
3. View `admins` and `projects` collections

### Using Terminal
```bash
mongosh

# Select database
use robolearn

# View collections
show collections

# See admin users
db.admins.find()

# See projects
db.projects.find().pretty()

# Count documents
db.projects.countDocuments()
```

---

## Backup Your Database

### MongoDB Atlas Backup
- Automatic daily backups (3-90 days retention)
- Download backups from Atlas dashboard

### Local MongoDB Backup
```bash
# Backup
mongodump --out C:\backup\

# Restore
mongorestore C:\backup\

# Backup specific database
mongodump --db robolearn --out C:\backup\
```

---

## Next Steps

1. Choose your MongoDB option (Atlas recommended for beginners)
2. Configure connection in `.env` file
3. Restart backend: `npm start`
4. Verify: Check backend logs for "MongoDB Connected Successfully"
5. Test: Open http://localhost:5000/api/health
6. Login: Go to http://localhost:3000/admin/login.html

---

**Need Help?** Check backend terminal for detailed error messages!
