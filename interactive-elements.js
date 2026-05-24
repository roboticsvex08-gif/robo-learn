/* ============================================
   INTERACTIVE ELEMENTS UTILITY
   Makes cards clickable and displays modals with content
   ============================================ */

// ============ CARD MODAL CONTENT CONFIGURATION ============
const cardModalContent = {
    robotics: {
        title: 'Robotics & Automation',
        description: 'Learn to design and build real robots from scratch. Master robotics engineering with hands-on projects.',
        details: [
            'Robot design fundamentals',
            'Mechanical assembly techniques',
            'Sensor integration',
            'Motion control systems',
            'Real-world applications'
        ]
    },
    arduino: {
        title: 'Arduino Coding',
        description: 'Master microcontrollers with real-world projects. Learn to program Arduino boards for practical applications.',
        details: [
            'Arduino IDE setup',
            'C++ programming basics',
            'Sensor programming',
            'Motor control',
            'IoT project development'
        ]
    },
    ai: {
        title: 'AI & Machine Learning',
        description: 'Bring artificial intelligence to life. Create intelligent systems using machine learning algorithms.',
        details: [
            'Machine learning basics',
            'Neural networks',
            'Data processing',
            'AI model training',
            'Real-world AI applications'
        ]
    },
    electronics: {
        title: 'Electronics & Circuits',
        description: 'Learn circuits, sensors, and embedded systems. Build a strong foundation in electronics.',
        details: [
            'Circuit theory',
            'Component soldering',
            'Sensor types and usage',
            'Power management',
            'PCB design basics'
        ]
    },
    iot: {
        title: 'IoT & Future Tech',
        description: 'Explore IoT, automation, and next-gen innovations. Connect devices and build smart systems.',
        details: [
            'IoT protocols and standards',
            'Cloud connectivity',
            'Smart device programming',
            'Data analytics',
            'Future technology trends'
        ]
    },
    classes: {
        title: 'Online Classes',
        description: 'Join our live sessions and interact with instructors in real-time. Get personalized guidance.',
        details: [
            'Interactive live sessions',
            'Q&A with experts',
            'Group projects',
            'Flexible scheduling',
            'Recording access'
        ]
    },
    programming: {
        title: 'Programming & Software Development',
        description: 'Learn to code and build software applications using various programming languages and frameworks.',
        details: [
            'Programming fundamentals',
            'Data structures and algorithms',
            'Object-oriented programming',
            'Web development',
            'Mobile app development'
        ]
    },
    web: {
        title: 'Web Development',
        description: 'Build modern, responsive websites and web applications using HTML, CSS, JavaScript, and modern frameworks.',
        details: [
            'HTML5 and CSS3',
            'JavaScript and ES6+',
            'Responsive design',
            'Frontend frameworks (React, Vue, Angular)',
            'Backend development'
        ]
    },
    data: {
        title: 'Data Science & Analytics',
        description: 'Analyze complex data sets, create visualizations, and make data-driven decisions using statistical methods.',
        details: [
            'Statistical analysis',
            'Data visualization',
            'Machine learning for data',
            'Big data technologies',
            'Business intelligence'
        ]
    },
    mobile: {
        title: 'Mobile App Development',
        description: 'Create native and cross-platform mobile applications for iOS and Android devices.',
        details: [
            'iOS development with Swift',
            'Android development with Kotlin',
            'Cross-platform frameworks (React Native, Flutter)',
            'App store deployment',
            'Mobile UI/UX design'
        ]
    },
    cloud: {
        title: 'Cloud Computing',
        description: 'Learn to deploy, manage, and scale applications in cloud environments like AWS, Azure, and Google Cloud.',
        details: [
            'Cloud fundamentals (AWS, Azure, GCP)',
            'Virtual machines and containers',
            'Serverless architecture',
            'Cloud storage and databases',
            'DevOps and CI/CD'
        ]
    },
    security: {
        title: 'Cybersecurity',
        description: 'Learn to protect systems, networks, and data from digital attacks and security breaches.',
        details: [
            'Network security fundamentals',
            'Ethical hacking and penetration testing',
            'Security monitoring and incident response',
            'Cryptography and encryption',
            'Compliance and risk management'
        ]
    },
    game: {
        title: 'Game Development',
        description: 'Create engaging 2D and 3D games using game engines and programming languages.',
        details: [
            'Game design principles',
            '2D game development',
            '3D game development',
            'Game physics and graphics',
            'Game publishing and distribution'
        ]
    },
    blockchain: {
        title: 'Blockchain & Web3',
        description: 'Learn about blockchain technology, cryptocurrencies, and decentralized applications.',
        details: [
            'Blockchain fundamentals',
            'Cryptocurrency basics',
            'Smart contracts',
            'Decentralized applications (DApps)',
            'Web3 and decentralized finance'
        ]
    }
};

// ============ MODAL CREATION & DISPLAY ============

/**
 * Create modal HTML structure
 */
function createModal() {
    if (document.getElementById('cardModal')) {
        return; // Modal already exists
    }

    const modal = document.createElement('div');
    modal.id = 'cardModal';
    modal.className = 'card-modal';
    modal.innerHTML = `
        <div class="card-modal-content">
            <button class="modal-close" id="modalClose">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-header">
                <h2 id="modalTitle"></h2>
            </div>
            <div class="modal-body">
                <p id="modalDescription"></p>
                <div class="modal-details">
                    <h3>Key Topics:</h3>
                    <ul id="modalDetailsList"></ul>
                </div>
            </div>
            <div class="modal-footer">
                <button class="modal-btn modal-btn-primary" id="modalEnroll">
                    <i class="fas fa-check-circle"></i> Start Learning
                </button>
                <button class="modal-btn modal-btn-secondary" id="modalLearnMore">
                    <i class="fas fa-arrow-right"></i> Learn More
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Event listeners
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalEnroll').addEventListener('click', handleEnroll);
    document.getElementById('modalLearnMore').addEventListener('click', handleLearnMore);

    // Close modal on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

/**
 * Display modal with card information
 * @param {string} cardType - Type of card (robotics, arduino, etc.)
 */
function displayModal(cardType) {
    const content = cardModalContent[cardType];
    if (!content) {
        console.error('Card type not found:', cardType);
        // Fallback to robotics if type not found
        return displayModal('robotics');
    }

    const modal = document.getElementById('cardModal');
    if (!modal) {
        createModal();
    }

    // Populate modal content
    document.getElementById('modalTitle').textContent = content.title;
    document.getElementById('modalDescription').textContent = content.description;

    const detailsList = document.getElementById('modalDetailsList');
    detailsList.innerHTML = content.details
        .map(detail => `<li><i class="fas fa-check"></i> ${detail}</li>`)
        .join('');

    // Store current card type for action buttons
    modal.dataset.currentCard = cardType;

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close modal
 */
function closeModal() {
    const modal = document.getElementById('cardModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

/**
 * Handle enroll button click
 */
function handleEnroll() {
    const modal = document.getElementById('cardModal');
    const cardType = modal.dataset.currentCard;
    const title = cardModalContent[cardType].title;

    alert(`Great! You've enrolled in "${title}". Welcome to the course!`);
    closeModal();

    // Store enrollment in localStorage
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    if (!enrolledCourses.includes(cardType)) {
        enrolledCourses.push(cardType);
        localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
    }
}

/**
 * Handle learn more button click
 */
function handleLearnMore() {
    closeModal();
    // Scroll to relevant section or navigate
    const section = document.querySelector('.features') || document.querySelector('.section');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============ CARD CLICK HANDLERS ============

/**
 * Initialize card click handlers
 */
function initializeCardClickHandlers() {
    // Create modal first
    createModal();

    // Add CSS styles for modal
    addModalStyles();

    // Get all elements with data-card-type attribute (our clickable cards)
    const cards = document.querySelectorAll('[data-card-type]');

    cards.forEach((card, index) => {
        // Make it clear this is clickable
        card.style.cursor = 'pointer';
        card.style.transition = 'all 0.3s ease';

        // Add click handler
        card.addEventListener('click', function() {
            const cardType = this.dataset.cardType;
            displayModal(cardType);
        });

        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Add modal CSS styles dynamically
 */
function addModalStyles() {
    if (document.getElementById('cardModalStyles')) {
        return; // Styles already added
    }

    const style = document.createElement('style');
    style.id = 'cardModalStyles';
    style.innerHTML = `
        /* ============ CARD MODAL STYLES ============ */
        .card-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 10000;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(5px);
            animation: fadeIn 0.3s ease-out;
        }

        .card-modal.active {
            display: flex;
        }

        .card-modal-content {
            background: linear-gradient(135deg, #0a0e27 0%, #16213e 100%);
            border: 1px solid rgba(0, 212, 255, 0.3);
            border-radius: 20px;
            padding: 40px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            animation: slideUp 0.3s ease-out;
            position: relative;
        }

        .modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            color: #ffffff;
            font-size: 24px;
            cursor: pointer;
            transition: all 0.2s ease;
            padding: 5px;
        }

        .modal-close:hover {
            color: #00d4ff;
            transform: scale(1.2);
        }

        .modal-header {
            margin-bottom: 20px;
        }

        .modal-header h2 {
            font-size: 28px;
            color: #ffffff;
            margin: 0;
            background: linear-gradient(135deg, #00d4ff, #0099ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .modal-body {
            margin-bottom: 30px;
        }

        .modal-body p {
            color: #a0aec0;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
        }

        .modal-details h3 {
            color: #ffffff;
            font-size: 16px;
            margin-bottom: 12px;
            font-weight: 600;
        }

        .modal-details ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .modal-details li {
            color: #a0aec0;
            font-size: 14px;
            padding: 8px 0;
            padding-left: 24px;
            position: relative;
        }

        .modal-details li::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 4px;
            background: #00d4ff;
            border-radius: 50%;
        }

        .modal-details li i {
            color: #2ed573;
            margin-right: 8px;
        }

        .modal-footer {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
        }

        .modal-btn {
            flex: 1;
            min-width: 150px;
            padding: 12px 20px;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .modal-btn-primary {
            background: linear-gradient(135deg, #00d4ff, #0099ff);
            color: #000;
            box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
        }

        .modal-btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 212, 255, 0.5);
        }

        .modal-btn-secondary {
            background: rgba(0, 212, 255, 0.1);
            color: #00d4ff;
            border: 1px solid rgba(0, 212, 255, 0.3);
        }

        .modal-btn-secondary:hover {
            background: rgba(0, 212, 255, 0.2);
            border-color: #00d4ff;
            transform: translateY(-2px);
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @media (max-width: 768px) {
            .card-modal-content {
                padding: 30px;
                border-radius: 16px;
            }

            .modal-header h2 {
                font-size: 22px;
            }

            .modal-body p {
                font-size: 14px;
            }

            .modal-btn {
                min-width: 120px;
                padding: 10px 16px;
                font-size: 12px;
            }
        }
    `;

    document.head.appendChild(style);
}

// ============ INITIALIZATION ============

/**
 * Initialize interactive elements when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for cards to be rendered
    setTimeout(() => {
        initializeCardClickHandlers();
    }, 100);
});

// ============ UTILITY FUNCTIONS ============

/**
 * Check if user is authenticated
 * @returns {boolean} - True if user is logged in
 */
function isUserAuthenticated() {
    return sessionStorage.getItem('loggedInUser') !== null ||
           localStorage.getItem('rememberMe') === 'true';
}

/**
 * Get logged-in user info
 * @returns {object|null} - User object or null
 */
function getLoggedInUser() {
    const user = sessionStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
}

/**
 * Logout user
 */
function logoutUser() {
    sessionStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}

/**
 * Get enrolled courses
 * @returns {array} - Array of enrolled course types
 */
function getEnrolledCourses() {
    return JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
}