/* ============================================
   MODERN LOGIN PAGE - JAVASCRIPT
   Validation, Animations & Interactivity
   ============================================ */

// ============ CONFIGURATION ============
const CONFIG = {
    particleCount: 30,
    animationDuration: 300,
    validPassword: '1234', // Login password is 1234
};

// ============ DOM ELEMENTS ============
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const rememberMeCheckbox = document.getElementById('rememberMe');
const loginBtn = loginForm.querySelector('.login-btn');
const particlesContainer = document.getElementById('particlesContainer');
const successMessage = document.getElementById('successMessage');

// ============ UTILITY FUNCTIONS ============

/**
 * Creates animated background particles
 */
function createParticles() {
    for (let i = 0; i < CONFIG.particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.bottom = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        // Random animation duration
        particle.style.animationDuration = (Math.random() * 5 + 10) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

/**
 * Email validation using regex
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email
 */
function isValidEmail(email) {
    // Accept any non-empty text as username/name
    return email.trim().length > 0;
}

/**
 * Password validation - accepts only "1234"
 * @param {string} password - Password to validate
 * @returns {boolean} - True if password is correct
 */
function isValidPassword(password) {
    return password === CONFIG.validPassword;
}

/**
 * Show error message
 * @param {HTMLElement} element - Error message element
 * @param {string} message - Error message text
 */
function showError(element, message) {
    element.textContent = message;
    element.classList.add('show');
    
    // Add error styling to input wrapper
    const inputWrapper = element.previousElementSibling;
    if (inputWrapper) {
        inputWrapper.classList.add('error');
        const inputField = inputWrapper.querySelector('input');
        if (inputField) {
            inputField.classList.add('error');
        }
    }
}

/**
 * Clear error message
 * @param {HTMLElement} element - Error message element
 */
function clearError(element) {
    element.textContent = '';
    element.classList.remove('show');
    
    // Remove error styling from input wrapper
    const inputWrapper = element.previousElementSibling;
    if (inputWrapper) {
        inputWrapper.classList.remove('error');
        const inputField = inputWrapper.querySelector('input');
        if (inputField) {
            inputField.classList.remove('error');
        }
    }
}

/**
 * Show success message
 */
function showSuccessMessage() {
    successMessage.classList.add('show');
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}

/**
 * Set loading state on button
 * @param {boolean} isLoading - Loading state
 */
function setButtonLoading(isLoading) {
    if (isLoading) {
        loginBtn.classList.add('loading');
        loginBtn.disabled = true;
    } else {
        loginBtn.classList.remove('loading');
        loginBtn.disabled = false;
    }
}

/**
 * Save credentials to localStorage if Remember Me is checked
 */
function saveCredentials() {
    if (rememberMeCheckbox.checked) {
        localStorage.setItem('savedEmail', emailInput.value);
        localStorage.setItem('rememberMe', 'true');
    } else {
        localStorage.removeItem('savedEmail');
        localStorage.removeItem('rememberMe');
    }
}

/**
 * Load saved credentials from localStorage
 */
function loadSavedCredentials() {
    const savedEmail = localStorage.getItem('savedEmail');
    const rememberMe = localStorage.getItem('rememberMe');
    
    if (savedEmail && rememberMe === 'true') {
        emailInput.value = savedEmail;
        rememberMeCheckbox.checked = true;
    }
}

/**
 * Validate entire form
 * @returns {boolean} - True if form is valid
 */
function validateForm() {
    let isValid = true;
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    
    // Validate name/username
    if (!emailInput.value.trim()) {
        showError(emailError, 'Name is required');
        isValid = false;
    } else {
        clearError(emailError);
    }
    
    // Validate password (must be "1234")
    if (!passwordInput.value) {
        showError(passwordError, 'Password is required');
        isValid = false;
    } else if (!isValidPassword(passwordInput.value)) {
        showError(passwordError, 'Password is incorrect');
        isValid = false;
    } else {
        clearError(passwordError);
    }
    
    return isValid;
}

/**
 * Simulate login API call
 * @returns {Promise} - Resolves after 2 seconds
 */
function simulateLogin() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                message: 'Login successful!'
            });
        }, 2000);
    });
}

// ============ EVENT LISTENERS ============

/**
 * Form Submission Handler
 */
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        console.log('Form validation failed');
        return;
    }
    
    try {
        // Set loading state
        setButtonLoading(true);
        
        // Simulate API call
        const response = await simulateLogin();
        
        if (response.success) {
            // Save credentials if Remember Me is checked
            saveCredentials();
            
            // Show success message
            showSuccessMessage();
            
            // Log successful login
            console.log('Login successful for:', emailInput.value);
            
            // Redirect after 2 seconds
            setTimeout(() => {
                // Redirect to School Project page
                window.location.href = 'School  Project.html';
            }, 2000);
        }
    } catch (error) {
        console.error('Login error:', error);
        document.getElementById('emailError').textContent = 'An error occurred. Please try again.';
    } finally {
        setButtonLoading(false);
    }
});

/**
 * Toggle Password Visibility
 */
togglePasswordBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Toggle password input type
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Toggle icon
    const icon = togglePasswordBtn.querySelector('i');
    if (type === 'password') {
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    } else {
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }
});

/**
 * Real-time Email Validation
 */
emailInput.addEventListener('blur', () => {
    const emailError = document.getElementById('emailError');
    
    if (emailInput.value.trim()) {
        clearError(emailError);
    } else {
        clearError(emailError);
    }
});

/**
 * Real-time Password Validation
 */
passwordInput.addEventListener('blur', () => {
    const passwordError = document.getElementById('passwordError');
    
    if (passwordInput.value) {
        if (!isValidPassword(passwordInput.value)) {
            showError(passwordError, 'Password is incorrect. Use: 1234');
        } else {
            clearError(passwordError);
        }
    } else {
        clearError(passwordError);
    }
});

/**
 * Clear errors on input focus
 */
emailInput.addEventListener('focus', () => {
    clearError(document.getElementById('emailError'));
});

passwordInput.addEventListener('focus', () => {
    clearError(document.getElementById('passwordError'));
});

/**
 * Social Login Buttons (Demo)
 */
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = btn.classList[1].replace('-btn', '').toUpperCase();
        console.log(`Login with ${platform} clicked`);
        alert(`${platform} login would be implemented here`);
    });
});

/**
 * Forgot Password Link (Demo)
 */
document.querySelector('.forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Forgot password clicked');
    alert('Password reset page would open here');
});

/**
 * Sign Up Link (Demo)
 */
document.querySelector('.signup-link a').addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Sign up clicked');
    alert('Sign up page would open here');
});

// ============ INITIALIZATION ============

/**
 * Initialize the page
 */
function init() {
    // Create animated particles
    createParticles();
    
    // Load saved credentials
    loadSavedCredentials();
    
    // Log initialization
    console.log('Modern Login Page Initialized');
    console.log('Configuration:', CONFIG);
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ============ ACCESSIBILITY & POLISH ============

/**
 * Add keyboard shortcuts
 */
document.addEventListener('keydown', (e) => {
    // Enter key to submit form (if inside input)
    if (e.key === 'Enter' && (document.activeElement === emailInput || document.activeElement === passwordInput)) {
        loginForm.dispatchEvent(new Event('submit'));
    }
    
    // Ctrl/Cmd + Enter to submit
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        loginForm.dispatchEvent(new Event('submit'));
    }
});

// ============ CONSOLE MESSAGES ============
console.log('%c🚀 Modern Login Page Loaded', 'color: #00d4ff; font-size: 16px; font-weight: bold;');
console.log('%cPowered by RoboLearn', 'color: #0099ff; font-size: 12px;');
console.log('%c✨ Login Credentials:', 'color: #2ed573; font-size: 12px;');
console.log('%cUsername: Any name you want', 'color: #a0aec0; font-size: 12px;');
console.log('%cPassword: 1234', 'color: #a0aec0; font-size: 12px;');
