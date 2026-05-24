from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv
import socket
import json
from datetime import datetime
from werkzeug.utils import secure_filename
import uuid
import sys
import subprocess
import threading

# Load environment variables
load_dotenv()

# Get absolute path to the project folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)
CORS(app)

# Upload configuration
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
PROJECTS_JSON = os.path.join(UPLOAD_FOLDER, 'projects.json')
ALLOWED_EXTENSIONS = {'zip', 'rar', '7z', 'html', 'pdf', 'doc', 'docx', 'txt', 'js', 'py', 'java', 'cpp', 'sql', 'json'}
MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB

# Create uploads folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Email configuration
SENDER_EMAIL = os.getenv('SENDER_EMAIL', 'soumyendubikashgayen0@gmail.com')
SENDER_PASSWORD = os.getenv('SENDER_PASSWORD', 'your_app_password_here')
RECIPIENT_EMAIL = 'soumyendubikashgayen0@gmail.com'
WHATSAPP_NUMBER = '917029709096'

# ==================== STATIC FILES ROUTES ====================
@app.route('/style.css')
def serve_css():
    """Serve CSS file"""
    return send_from_directory(BASE_DIR, 'style.css', mimetype='text/css')

@app.route('/script.js')
def serve_js():
    """Serve main JS file"""
    return send_from_directory(BASE_DIR, 'script.js', mimetype='application/javascript')

@app.route('/login.js')
def serve_login_js():
    """Serve login JS file"""
    return send_from_directory(BASE_DIR, 'login.js', mimetype='application/javascript')

@app.route('/register.js')
def serve_register_js():
    """Serve register JS file"""
    return send_from_directory(BASE_DIR, 'register.js', mimetype='application/javascript')

@app.route('/interactive-elements.js')
def serve_interactive_js():
    """Serve interactive elements JS file"""
    return send_from_directory(BASE_DIR, 'interactive-elements.js', mimetype='application/javascript')

@app.route('/images/<path:filename>')
def serve_images(filename):
    """Serve images"""
    images_path = os.path.join(BASE_DIR, 'images')
    return send_from_directory(images_path, filename)

@app.route('/contact-page/<path:filename>')
def serve_contact_assets(filename):
    """Serve contact page assets"""
    contact_path = os.path.join(BASE_DIR, 'contact-page')
    return send_from_directory(contact_path, filename)

# ==================== PAGES ROUTES ====================
@app.route('/', methods=['GET'])
def home():
    """Serve home page"""
    if os.path.exists(os.path.join(BASE_DIR, 'index.html')):
        return send_from_directory(BASE_DIR, 'index.html')
    elif os.path.exists(os.path.join(BASE_DIR, 'School  Project.html')):
        return send_from_directory(BASE_DIR, 'School  Project.html')
    return "Welcome to Robo Learn! File not found."

@app.route('/login', methods=['GET'])
def login_page():
    """Serve login page"""
    if os.path.exists(os.path.join(BASE_DIR, 'login.html')):
        return send_from_directory(BASE_DIR, 'login.html')
    return "Login page not found"

@app.route('/register', methods=['GET'])
def register_page():
    """Serve register page"""
    if os.path.exists(os.path.join(BASE_DIR, 'register.html')):
        return send_from_directory(BASE_DIR, 'register.html')
    return "Register page not found"

@app.route('/contact', methods=['GET'])
def contact():
    """Serve contact page"""
    contact_path = os.path.join(BASE_DIR, 'contact-page', 'index.html')
    if os.path.exists(contact_path):
        return send_from_directory(os.path.join(BASE_DIR, 'contact-page'), 'index.html')
    return "Contact page not found"

@app.route('/robotics', methods=['GET'])
def robotics():
    """Serve robotics page"""
    if os.path.exists(os.path.join(BASE_DIR, 'robotics.html')):
        return send_from_directory(BASE_DIR, 'robotics.html')
    return "Robotics page not found"

@app.route('/drone', methods=['GET'])
def drone():
    """Serve drone page"""
    if os.path.exists(os.path.join(BASE_DIR, 'drone.html')):
        return send_from_directory(BASE_DIR, 'drone.html')
    return "Drone page not found"

@app.route('/robo', methods=['GET'])
def robo():
    """Serve robo page"""
    if os.path.exists(os.path.join(BASE_DIR, 'robo.html')):
        return send_from_directory(BASE_DIR, 'robo.html')
    return "Robo page not found"

@app.route('/robolearn-projects', methods=['GET'])
def robolearn_projects():
    """Serve RoboLearn projects upload page"""
    if os.path.exists(os.path.join(BASE_DIR, 'robolearn-projects.html')):
        return send_from_directory(BASE_DIR, 'robolearn-projects.html')
    return "RoboLearn projects page not found"

@app.route('/projects', methods=['GET'])
def projects():
    """Serve projects page"""
    if os.path.exists(os.path.join(BASE_DIR, 'projects.html')):
        return send_from_directory(BASE_DIR, 'projects.html')
    return "Projects page not found"

@app.route('/p', methods=['GET'])
def p():
    """Serve p projects page"""
    if os.path.exists(os.path.join(BASE_DIR, 'p.html')):
        return send_from_directory(BASE_DIR, 'p.html')
    return "P page not found"

@app.route('/<path:filename>', methods=['GET'])
def serve_static_file(filename):
    """Serve any other file from the project directory"""
    file_path = os.path.join(BASE_DIR, filename)
    if os.path.exists(file_path) and os.path.isfile(file_path):
        return send_from_directory(BASE_DIR, filename)
    return "File not found", 404

# ==================== API ROUTES ====================
@app.route('/access', methods=['GET'])
def access_page():
    """Generate access links page with direct links"""
    try:
        # Get the local IP
        hostname = socket.gethostname()
        local_ip = socket.gethostbyname(hostname)
        
        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Robo Learn - Access Links</title>
            <style>
                * {{
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }}
                body {{
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }}
                .container {{
                    background: white;
                    border-radius: 20px;
                    padding: 40px;
                    max-width: 600px;
                    width: 100%;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                }}
                h1 {{
                    color: #667eea;
                    margin-bottom: 10px;
                    text-align: center;
                    font-size: 2.5em;
                }}
                .subtitle {{
                    text-align: center;
                    color: #666;
                    margin-bottom: 30px;
                    font-size: 1.1em;
                }}
                .links-section {{
                    margin-bottom: 30px;
                }}
                .section-title {{
                    background: #667eea;
                    color: white;
                    padding: 15px;
                    border-radius: 10px;
                    margin-bottom: 15px;
                    font-weight: bold;
                    font-size: 1.2em;
                }}
                .link-item {{
                    margin-bottom: 12px;
                    padding: 15px;
                    background: #f8f9fa;
                    border-left: 4px solid #667eea;
                    border-radius: 5px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }}
                .link-label {{
                    font-weight: 600;
                    color: #333;
                }}
                .link-url {{
                    color: #667eea;
                    text-decoration: none;
                    word-break: break-all;
                    flex: 1;
                    margin-left: 10px;
                }}
                .copy-btn {{
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 8px 12px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 0.9em;
                    margin-left: 10px;
                    white-space: nowrap;
                }}
                .copy-btn:hover {{
                    background: #764ba2;
                }}
                .info-box {{
                    background: #e7f3ff;
                    border-left: 4px solid #2196F3;
                    padding: 15px;
                    border-radius: 5px;
                    margin-top: 20px;
                    color: #0c3d66;
                }}
                .info-box strong {{
                    display: block;
                    margin-bottom: 5px;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🚀 Robo Learn</h1>
                <p class="subtitle">Click any link to open your website</p>
                
                <div class="links-section">
                    <div class="section-title">📱 Mobile & Other Devices (Same WiFi)</div>
                    <div class="link-item">
                        <span class="link-label">🏠 Home:</span>
                        <a href="http://{local_ip}:5000" class="link-url" target="_blank">http://{local_ip}:5000</a>
                        <button class="copy-btn" onclick="copyToClipboard('http://{local_ip}:5000')">Copy</button>
                    </div>
                    <div class="link-item">
                        <span class="link-label">📞 Contact:</span>
                        <a href="http://{local_ip}:5000/contact" class="link-url" target="_blank">http://{local_ip}:5000/contact</a>
                        <button class="copy-btn" onclick="copyToClipboard('http://{local_ip}:5000/contact')">Copy</button>
                    </div>
                    <div class="link-item">
                        <span class="link-label">🤖 Robotics:</span>
                        <a href="http://{local_ip}:5000/robotics" class="link-url" target="_blank">http://{local_ip}:5000/robotics</a>
                        <button class="copy-btn" onclick="copyToClipboard('http://{local_ip}:5000/robotics')">Copy</button>
                    </div>
                    <div class="link-item">
                        <span class="link-label">🚁 Drone:</span>
                        <a href="http://{local_ip}:5000/drone" class="link-url" target="_blank">http://{local_ip}:5000/drone</a>
                        <button class="copy-btn" onclick="copyToClipboard('http://{local_ip}:5000/drone')">Copy</button>
                    </div>
                    <div class="link-item">
                        <span class="link-label">📤 Upload Project:</span>
                        <a href="http://{local_ip}:5000/upload-project" class="link-url" target="_blank">http://{local_ip}:5000/upload-project</a>
                        <button class="copy-btn" onclick="copyToClipboard('http://{local_ip}:5000/upload-project')">Copy</button>
                    </div>
                    <div class="link-item">
                        <span class="link-label">🎨 Projects Gallery:</span>
                        <a href="http://{local_ip}:5000/projects-gallery" class="link-url" target="_blank">http://{local_ip}:5000/projects-gallery</a>
                        <button class="copy-btn" onclick="copyToClipboard('http://{local_ip}:5000/projects-gallery')">Copy</button>
                    </div>
                </div>

                <div class="links-section">
                    <div class="section-title">🖥️ On Your Computer</div>
                    <div class="link-item">
                        <span class="link-label">🏠 Home:</span>
                        <a href="http://localhost:5000" class="link-url" target="_blank">http://localhost:5000</a>
                    </div>
                    <div class="link-item">
                        <span class="link-label">📤 Upload Project:</span>
                        <a href="http://localhost:5000/upload-project" class="link-url" target="_blank">http://localhost:5000/upload-project</a>
                    </div>
                    <div class="link-item">
                        <span class="link-label">🎨 Projects Gallery:</span>
                        <a href="http://localhost:5000/projects-gallery" class="link-url" target="_blank">http://localhost:5000/projects-gallery</a>
                    </div>
                </div>

                <div class="info-box">
                    <strong>📌 Important:</strong>
                    Your device IP: <strong>{local_ip}:5000</strong><br>
                    Make sure both devices are on the same WiFi network.
                </div>
            </div>

            <script>
                function copyToClipboard(text) {{
                    navigator.clipboard.writeText(text).then(() => {{
                        alert('Copied to clipboard!');
                    }});
                }}
            </script>
        </body>
        </html>
        """
        return html
    except Exception as e:
        return f"Error: {str(e)}", 500

# ==================== API ROUTES ====================
@app.route('/api/send-email', methods=['POST'])
def send_email():
    """Send email via backend"""
    try:
        data = request.json
        visitor_name = data.get('name', 'Visitor')
        visitor_email = data.get('email', 'no-reply@example.com')
        message = data.get('message', '')
        subject = data.get('subject', 'New Contact from Robo Learn')

        # Create email message
        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = RECIPIENT_EMAIL
        msg['Subject'] = subject

        body = f"""
        New message from Robo Learn Contact Page:
        
        Name: {visitor_name}
        Email: {visitor_email}
        
        Message:
        {message}
        
        ---
        This is an automated message from your website contact form.
        """

        msg.attach(MIMEText(body, 'plain'))

        # Send email via Gmail SMTP
        try:
            server = smtplib.SMTP('smtp.gmail.com', 587)
            server.starttls()
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.send_message(msg)
            server.quit()

            return jsonify({
                'success': True,
                'message': 'Email sent successfully!'
            }), 200

        except smtplib.SMTPAuthenticationError:
            return jsonify({
                'success': False,
                'message': 'Email authentication failed. Please check your credentials.'
            }), 401
        except Exception as e:
            return jsonify({
                'success': False,
                'message': f'Failed to send email: {str(e)}'
            }), 500

    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error: {str(e)}'
        }), 400

@app.route('/api/whatsapp', methods=['POST'])
def whatsapp_contact():
    """Generate WhatsApp message link"""
    try:
        data = request.json
        message = data.get('message', 'Hello Robo Learn, I would like to get in touch.')
        
        # WhatsApp Web URL format
        whatsapp_url = f"https://wa.me/{WHATSAPP_NUMBER}?text={message.replace(' ', '%20')}"
        
        return jsonify({
            'success': True,
            'url': whatsapp_url,
            'message': 'WhatsApp URL generated successfully'
        }), 200

    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error: {str(e)}'
        }), 400

@app.route('/api/contact-info', methods=['GET'])
def get_contact_info():
    """Get contact information"""
    return jsonify({
        'email': RECIPIENT_EMAIL,
        'whatsapp': WHATSAPP_NUMBER,
        'whatsapp_formatted': '+91 7029709096'
    }), 200

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'Backend is running'}), 200

# ==================== PROJECT UPLOAD ROUTES ====================

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def load_projects():
    """Load projects from JSON file"""
    if os.path.exists(PROJECTS_JSON):
        try:
            with open(PROJECTS_JSON, 'r') as f:
                return json.load(f)
        except:
            return []
    return []

def save_projects(projects):
    """Save projects to JSON file"""
    with open(PROJECTS_JSON, 'w') as f:
        json.dump(projects, f, indent=2)

@app.route('/upload-project', methods=['GET'])
def upload_project_page():
    """Serve upload project page"""
    if os.path.exists(os.path.join(BASE_DIR, 'upload-project.html')):
        return send_from_directory(BASE_DIR, 'upload-project.html')
    return "Upload project page not found", 404

@app.route('/projects-gallery', methods=['GET'])
def projects_gallery_page():
    """Serve projects gallery page"""
    if os.path.exists(os.path.join(BASE_DIR, 'projects-gallery.html')):
        return send_from_directory(BASE_DIR, 'projects-gallery.html')
    return "Projects gallery page not found", 404

@app.route('/api/upload-project', methods=['POST'])
def upload_project():
    """Handle project file upload"""
    try:
        # Check if file is present
        if 'file' not in request.files:
            return jsonify({'success': False, 'message': 'No file provided'}), 400

        file = request.files['file']
        project_name = request.form.get('projectName', 'Untitled Project').strip()
        uploader_name = request.form.get('uploaderName', 'Anonymous').strip()
        description = request.form.get('description', '').strip()

        # Validate inputs
        if not project_name:
            return jsonify({'success': False, 'message': 'Project name is required'}), 400
        if not uploader_name:
            return jsonify({'success': False, 'message': 'Uploader name is required'}), 400
        if file.filename == '':
            return jsonify({'success': False, 'message': 'No file selected'}), 400

        # Check file size
        file.seek(0, os.SEEK_END)
        file_size = file.tell()
        file.seek(0)
        
        if file_size > MAX_FILE_SIZE:
            return jsonify({'success': False, 'message': 'File size exceeds 50MB limit'}), 400
        if file_size == 0:
            return jsonify({'success': False, 'message': 'File is empty'}), 400

        # Check file extension
        if not allowed_file(file.filename):
            return jsonify({'success': False, 'message': 'File type not allowed'}), 400

        # Generate unique filename
        file_ext = file.filename.rsplit('.', 1)[1].lower()
        unique_filename = f"{uuid.uuid4()}_{secure_filename(project_name)}.{file_ext}"
        
        # Save file
        file_path = os.path.join(UPLOAD_FOLDER, unique_filename)
        file.save(file_path)

        # Create project entry
        project = {
            'id': str(uuid.uuid4()),
            'projectName': project_name,
            'uploaderName': uploader_name,
            'description': description,
            'fileName': unique_filename,
            'fileSize': file_size,
            'uploadDate': datetime.now().isoformat(),
            'downloadUrl': f'/uploads/{unique_filename}'
        }

        # Add to projects list
        projects = load_projects()
        projects.append(project)
        save_projects(projects)

        return jsonify({
            'success': True,
            'message': f'Project "{project_name}" uploaded successfully!',
            'project': project
        }), 200

    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Upload failed: {str(e)}'
        }), 500

@app.route('/api/projects', methods=['GET'])
def get_projects():
    """Get all uploaded projects"""
    try:
        projects = load_projects()
        # Sort by upload date (newest first)
        projects.sort(key=lambda x: x['uploadDate'], reverse=True)
        
        return jsonify({
            'success': True,
            'projects': projects,
            'count': len(projects)
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error retrieving projects: {str(e)}'
        }), 500

@app.route('/uploads/<filename>', methods=['GET'])
def download_project(filename):
    """Download uploaded project file"""
    try:
        # Security check - validate filename
        if not secure_filename(filename) == filename:
            return "Invalid filename", 400
        
        # Check if file exists
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        if not os.path.exists(file_path):
            return "File not found", 404
        
        return send_from_directory(UPLOAD_FOLDER, filename, as_attachment=True)
    except Exception as e:
        return f"Error: {str(e)}", 500

@app.route('/api/projects/<project_id>', methods=['DELETE'])
def delete_project(project_id):
    """Delete a project (admin only for now)"""
    try:
        projects = load_projects()
        project_to_delete = None
        
        for i, project in enumerate(projects):
            if project['id'] == project_id:
                project_to_delete = project
                projects.pop(i)
                break
        
        if not project_to_delete:
            return jsonify({'success': False, 'message': 'Project not found'}), 404
        
        # Delete file
        file_path = os.path.join(UPLOAD_FOLDER, project_to_delete['fileName'])
        if os.path.exists(file_path):
            os.remove(file_path)
        
        save_projects(projects)
        
        return jsonify({
            'success': True,
            'message': 'Project deleted successfully'
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error deleting project: {str(e)}'
        }), 500

# ==================== SERVER CONTROL ENDPOINTS ====================
# Global variable to track HTTP server process
http_server_process = None

@app.route('/api/start-server', methods=['POST'])
def start_server_endpoint():
    """Start the Python HTTP server on port 8000"""
    global http_server_process
    
    try:
        # Check if process already running
        if http_server_process is not None and http_server_process.poll() is None:
            return jsonify({
                'success': False,
                'error': 'Server is already running'
            }), 400
        
        # Start the HTTP server in a separate process
        def run_server():
            global http_server_process
            http_server_process = subprocess.Popen(
                [sys.executable, '-m', 'http.server', '8000'],
                cwd=BASE_DIR,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                creationflags=subprocess.CREATE_NEW_CONSOLE if sys.platform == 'win32' else 0
            )
        
        # Run in a separate thread to avoid blocking
        server_thread = threading.Thread(target=run_server, daemon=True)
        server_thread.start()
        
        return jsonify({
            'success': True,
            'message': 'Server starting on port 8000...',
            'url': 'http://localhost:8000'
        }), 200
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Failed to start server: {str(e)}'
        }), 500

@app.route('/api/stop-server', methods=['POST'])
def stop_server_endpoint():
    """Stop the Python HTTP server"""
    global http_server_process
    
    try:
        if http_server_process is None or http_server_process.poll() is not None:
            return jsonify({
                'success': False,
                'error': 'Server is not running'
            }), 400
        
        # Terminate the process
        http_server_process.terminate()
        try:
            http_server_process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            http_server_process.kill()
        
        return jsonify({
            'success': True,
            'message': 'Server stopped successfully'
        }), 200
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Failed to stop server: {str(e)}'
        }), 500

@app.route('/api/server-status', methods=['GET'])
def server_status():
    """Check if the HTTP server is running"""
    global http_server_process
    
    try:
        if http_server_process is not None and http_server_process.poll() is None:
            return jsonify({
                'success': True,
                'running': True,
                'port': 8000,
                'url': 'http://localhost:8000'
            }), 200
        else:
            return jsonify({
                'success': True,
                'running': False
            }), 200
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/server-control', methods=['GET'])
def server_control_page():
    """Serve the server control panel"""
    if os.path.exists(os.path.join(BASE_DIR, 'server-control.html')):
        return send_from_directory(BASE_DIR, 'server-control.html')
    return "Server control panel not found", 404

if __name__ == '__main__':
    print("\n" + "="*60)
    print("🚀 ROBO LEARN - WEBSITE ONLINE")
    print("="*60)
    print("\n📱 ACCESS YOUR WEBSITE FROM ANY DEVICE:\n")
    
    # Local access
    print("🖥️  ON YOUR COMPUTER:")
    print("   Home: http://localhost:5000")
    print("   Contact: http://localhost:5000/contact")
    print("   Robotics: http://localhost:5000/robotics")
    print("   Drone: http://localhost:5000/drone\n")
    
    # Network access
    print("📱 FROM MOBILE/OTHER DEVICES (Same WiFi):")
    print("   Home: http://192.168.0.5:5000")
    print("   Contact: http://192.168.0.5:5000/contact")
    print("   Robotics: http://192.168.0.5:5000/robotics")
    print("   Drone: http://192.168.0.5:5000/drone\n")
    
    print(f"📧 Email: {RECIPIENT_EMAIL}")
    print(f"💬 WhatsApp: {WHATSAPP_NUMBER}")
    print("="*60 + "\n")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
