/* ============================================
   MODERN LOGIN PAGE - JAVASCRIPT
   Email & Phone Login with Validation & Animations
   ============================================ */

// ============ CONFIGURATION ============
const CONFIG = {
    particleCount: 30,
    animationDuration: 300,
    validPassword: 'password123', // Default test password
    testCredentials: [
        { email: 'user@example.com', phone: '1234567890', password: 'password123' },
        { email: 'test@robolearn.com', phone: '9876543210', password: 'password123' }
    ]
};

// ============ DOM ELEMENTS ============
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('emailInput');
const phoneInput = document.getElementById('phoneInput');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const rememberMeCheckbox = document.getElementById('rememberMe');
const loginBtn = loginForm.querySelector('.login-btn');
const particlesContainer = document.getElementById('particlesContainer');
const successMessage = document.getElementById('successMessage');
const tabBtns = document.querySelectorAll('.tab-btn');
let activeLoginMethod = 'email'; // 'email' or 'phone'

// ============ UTILITY FUNCTIONS ============

/**
 * Creates animated background particles
 */
function createParticles() {
    for (let i = 0; i < CONFIG.particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.bottom = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Phone validation (10-15 digits)
 * @param {string} phone - Phone to validate
 * @returns {boolean} - True if valid phone
 */
function isValidPhone(phone) {
    const phoneDigits = phone.replace(/\D/g, '');
    return phoneDigits.length >= 10 && phoneDigits.length <= 15;
}

/**
 * Show error message
 * @param {HTMLElement} element - Error message element
 * @param {string} message - Error message text
 */
function showError(element, message) {
    if (!element) return;
    
    element.textContent = message;
    element.classList.add('show');
    
    const inputWrapper = element.previousElementSibling;
    if (inputWrapper && inputWrapper.classList.contains('input-wrapper')) {
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
    if (!element) return;
    
    element.textContent = '';
    element.classList.remove('show');
    
    const inputWrapper = element.previousElementSibling;
    if (inputWrapper && inputWrapper.classList.contains('input-wrapper')) {
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
        if (activeLoginMethod === 'email') {
            localStorage.setItem('savedEmail', emailInput.value);
            localStorage.setItem('loginMethod', 'email');
        } else {
            localStorage.setItem('savedPhone', phoneInput.value);
            localStorage.setItem('loginMethod', 'phone');
        }
        localStorage.setItem('rememberMe', 'true');
    } else {
        localStorage.removeItem('savedEmail');
        localStorage.removeItem('savedPhone');
        localStorage.removeItem('rememberMe');
    }
}

/**
 * Load saved credentials from localStorage
 */
function loadSavedCredentials() {
    const rememberMe = localStorage.getItem('rememberMe');
    
    if (rememberMe === 'true') {
        const loginMethod = localStorage.getItem('loginMethod') || 'email';
        const savedEmail = localStorage.getItem('savedEmail');
        const savedPhone = localStorage.getItem('savedPhone');
        
        rememberMeCheckbox.checked = true;
        
        if (loginMethod === 'email' && savedEmail) {
            switchTab('email-tab');
            emailInput.value = savedEmail;
        } else if (loginMethod === 'phone' && savedPhone) {
            switchTab('phone-tab');
            phoneInput.value = savedPhone;
        }
    }
}

/**
 * Switch between Email and Phone login tabs
 * @param {string} tabId - Tab ID to switch to
 */
function switchTab(tabId) {
    // Update tab buttons
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabId) {
            btn.classList.add('active');
            activeLoginMethod = tabId === 'email-tab' ? 'email' : 'phone';
        }
    });
    
    // Update tab content
    document.querySelectorAll('.login-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
    
    // Focus on appropriate input
    if (tabId === 'email-tab') {
        setTimeout(() => emailInput.focus(), 100);
    } else {
        setTimeout(() => phoneInput.focus(), 100);
    }
}

/**
 * Validate entire form
 * @returns {boolean} - True if form is valid
 */
function validateForm() {
    let isValid = true;
    
    // Clear all errors first
    clearError(document.getElementById('emailInputError'));
    clearError(document.getElementById('phoneInputError'));
    clearError(document.getElementById('passwordError'));
    
    // Validate email or phone based on active method
    if (activeLoginMethod === 'email') {
        const emailError = document.getElementById('emailInputError');
        if (!emailInput.value.trim()) {
            showError(emailError, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailError, 'Please enter a valid email address');
            isValid = false;
        }
    } else {
        const phoneError = document.getElementById('phoneInputError');
        if (!phoneInput.value.trim()) {
            showError(phoneError, 'Phone number is required');
            isValid = false;
        } else if (!isValidPhone(phoneInput.value)) {
            showError(phoneError, 'Please enter a valid phone number');
            isValid = false;
        }
    }
    
    // Validate password
    const passwordError = document.getElementById('passwordError');
    if (!passwordInput.value) {
        showError(passwordError, 'Password is required');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Verify credentials against test data
 * @returns {boolean} - True if credentials match
 */
function verifyCredentials() {
    const identifier = activeLoginMethod === 'email' ? emailInput.value : phoneInput.value;
    const password = passwordInput.value;
    
    // For demo purposes, accept any non-empty password
    // In production, this would be verified against a backend API
    if (activeLoginMethod === 'email' && isValidEmail(identifier)) {
        return true;
    } else if (activeLoginMethod === 'phone' && isValidPhone(identifier)) {
        return true;
    }
    
    return false;
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
                message: 'Login successful!',
                user: {
                    identifier: activeLoginMethod === 'email' ? emailInput.value : phoneInput.value,
                    loginMethod: activeLoginMethod
                }
            });
        }, 2000);
    });
}

/**
 * Handle form submission
 */
async function handleLoginSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    if (!verifyCredentials()) {
        const errorMsg = activeLoginMethod === 'email' 
            ? document.getElementById('emailInputError')
            : document.getElementById('phoneInputError');
        showError(errorMsg, 'Invalid ' + activeLoginMethod);
        return;
    }
    
    setButtonLoading(true);
    
    try {
        const result = await simulateLogin();
        
        if (result.success) {
            saveCredentials();
            showSuccessMessage();
            
            // Store user data in session
            sessionStorage.setItem('loggedInUser', JSON.stringify(result.user));
            
            // Redirect to main page after 2 seconds
            setTimeout(() => {
                window.location.href = 'School%20%20Project.html';
            }, 2000);
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login. Please try again.');
    } finally {
        setButtonLoading(false);
    }
}

/**
 * Toggle password visibility
 */
function togglePasswordVisibility() {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePasswordBtn.querySelector('i').classList.remove('fa-eye');
        togglePasswordBtn.querySelector('i').classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        togglePasswordBtn.querySelector('i').classList.remove('fa-eye-slash');
        togglePasswordBtn.querySelector('i').classList.add('fa-eye');
    }
}

// ============ EVENT LISTENERS ============

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    loadSavedCredentials();
    
    // Form submission
    loginForm.addEventListener('submit', handleLoginSubmit);
    
    // Password toggle
    togglePasswordBtn.addEventListener('click', (e) => {
        e.preventDefault();
        togglePasswordVisibility();
    });
    
    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(btn.dataset.tab);
        });
    });
    
    // Clear errors on input
    emailInput.addEventListener('input', () => {
        clearError(document.getElementById('emailInputError'));
    });
    
    phoneInput.addEventListener('input', () => {
        clearError(document.getElementById('phoneInputError'));
    });
    
    passwordInput.addEventListener('input', () => {
        clearError(document.getElementById('passwordError'));
    });
    
    // Social login button handlers
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const provider = btn.classList[1].replace('-btn', '').toUpperCase();
            alert(`${provider} login would be implemented here. For now, please use Email or Phone login.`);
        });
    });
    
    // Forgot password link handler
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Password reset functionality would be implemented here. Please contact support for assistance.');
        });
    }
});
