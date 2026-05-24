/* ============================================
   REGISTRATION PAGE - JAVASCRIPT
   Validation, Form Handling & User Registration
   ============================================ */

// ============ CONFIGURATION ============
const CONFIG = {
    particleCount: 30,
    minPasswordLength: 8,
    animationDuration: 300,
};

// ============ DOM ELEMENTS ============
const registerForm = document.getElementById('registerForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('registerEmail');
const phoneInput = document.getElementById('phoneNumber');
const passwordInput = document.getElementById('registerPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');
const agreeTermsCheckbox = document.getElementById('agreeTerms');
const togglePasswordBtn = document.getElementById('toggleRegisterPassword');
const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
const registerBtn = registerForm.querySelector('.login-btn');
const particlesContainer = document.getElementById('particlesContainer');
const successMessage = document.getElementById('successMessage');
const requirementText = document.getElementById('requirementText');

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
 * Validate full name (minimum 3 characters)
 * @param {string} name - Full name to validate
 * @returns {boolean} - True if valid
 */
function isValidFullName(name) {
    return name.trim().length >= 3;
}

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number (10-15 digits)
 * @param {string} phone - Phone to validate
 * @returns {boolean} - True if valid phone format
 */
function isValidPhone(phone) {
    // Remove all non-digit characters
    const phoneDigits = phone.replace(/\D/g, '');
    return phoneDigits.length >= 10 && phoneDigits.length <= 15;
}

/**
 * Validate password strength
 * - Minimum 8 characters
 * - At least one letter
 * - At least one number
 * @param {string} password - Password to validate
 * @returns {object} - { isValid: boolean, errors: array }
 */
function validatePassword(password) {
    const errors = [];
    
    if (password.length < CONFIG.minPasswordLength) {
        errors.push(`Password must be at least ${CONFIG.minPasswordLength} characters`);
    }
    
    if (!/[a-zA-Z]/.test(password)) {
        errors.push('Password must contain at least one letter');
    }
    
    if (!/\d/.test(password)) {
        errors.push('Password must contain at least one number');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

/**
 * Show error message
 * @param {HTMLElement} element - Error message element
 * @param {string} message - Error message text
 */
function showError(element, message) {
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
        registerBtn.classList.add('loading');
        registerBtn.disabled = true;
    } else {
        registerBtn.classList.remove('loading');
        registerBtn.disabled = false;
    }
}

/**
 * Validate entire form
 * @returns {boolean} - True if form is valid
 */
function validateForm() {
    let isValid = true;
    
    // Full Name validation
    const fullNameError = document.getElementById('fullNameError');
    if (!fullNameInput.value.trim()) {
        showError(fullNameError, 'Full name is required');
        isValid = false;
    } else if (!isValidFullName(fullNameInput.value)) {
        showError(fullNameError, 'Full name must be at least 3 characters');
        isValid = false;
    } else {
        clearError(fullNameError);
    }
    
    // Email validation
    const emailError = document.getElementById('registerEmailError');
    if (!emailInput.value.trim()) {
        showError(emailError, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        showError(emailError, 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError(emailError);
    }
    
    // Phone validation
    const phoneError = document.getElementById('phoneNumberError');
    if (!phoneInput.value.trim()) {
        showError(phoneError, 'Phone number is required');
        isValid = false;
    } else if (!isValidPhone(phoneInput.value)) {
        showError(phoneError, 'Please enter a valid phone number (10-15 digits)');
        isValid = false;
    } else {
        clearError(phoneError);
    }
    
    // Password validation
    const passwordError = document.getElementById('registerPasswordError');
    if (!passwordInput.value) {
        showError(passwordError, 'Password is required');
        isValid = false;
    } else {
        const passwordValidation = validatePassword(passwordInput.value);
        if (!passwordValidation.isValid) {
            showError(passwordError, passwordValidation.errors[0]);
            isValid = false;
        } else {
            clearError(passwordError);
        }
    }
    
    // Confirm password validation
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    if (!confirmPasswordInput.value) {
        showError(confirmPasswordError, 'Please confirm your password');
        isValid = false;
    } else if (passwordInput.value !== confirmPasswordInput.value) {
        showError(confirmPasswordError, 'Passwords do not match');
        isValid = false;
    } else {
        clearError(confirmPasswordError);
    }
    
    // Terms validation
    const termsError = document.getElementById('termsError');
    if (!agreeTermsCheckbox.checked) {
        showError(termsError, 'You must agree to the terms and conditions');
        isValid = false;
    } else {
        clearError(termsError);
    }
    
    return isValid;
}

/**
 * Simulate registration API call
 * @returns {Promise} - Resolves after 2 seconds
 */
function simulateRegister() {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Store user data in localStorage
            const userData = {
                fullName: fullNameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                registeredAt: new Date().toISOString()
                // Note: In production, password should NEVER be stored in localStorage
            };
            
            localStorage.setItem('registeredUser', JSON.stringify(userData));
            
            resolve({
                success: true,
                message: 'Account created successfully!'
            });
        }, 2000);
    });
}

/**
 * Handle form submission
 */
async function handleRegisterSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    setButtonLoading(true);
    
    try {
        const result = await simulateRegister();
        
        if (result.success) {
            showSuccessMessage();
            
            // Redirect to login page after 3 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('An error occurred during registration. Please try again.');
    } finally {
        setButtonLoading(false);
    }
}

/**
 * Toggle password visibility
 */
function togglePasswordVisibility(input, button) {
    if (input.type === 'password') {
        input.type = 'text';
        button.querySelector('i').classList.remove('fa-eye');
        button.querySelector('i').classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        button.querySelector('i').classList.remove('fa-eye-slash');
        button.querySelector('i').classList.add('fa-eye');
    }
}

/**
 * Real-time password validation feedback
 */
function updatePasswordFeedback() {
    const password = passwordInput.value;
    const validation = validatePassword(password);
    
    if (password.length === 0) {
        requirementText.textContent = 'Password must contain: 8+ characters, letters and numbers';
        requirementText.parentElement.classList.remove('valid', 'invalid');
    } else if (validation.isValid) {
        requirementText.textContent = '✓ Password is strong';
        requirementText.parentElement.classList.remove('invalid');
        requirementText.parentElement.classList.add('valid');
    } else {
        requirementText.textContent = validation.errors[0];
        requirementText.parentElement.classList.remove('valid');
        requirementText.parentElement.classList.add('invalid');
    }
}

// ============ EVENT LISTENERS ============

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    // Form submission
    registerForm.addEventListener('submit', handleRegisterSubmit);
    
    // Password toggle
    togglePasswordBtn.addEventListener('click', (e) => {
        e.preventDefault();
        togglePasswordVisibility(passwordInput, togglePasswordBtn);
    });
    
    toggleConfirmPasswordBtn.addEventListener('click', (e) => {
        e.preventDefault();
        togglePasswordVisibility(confirmPasswordInput, toggleConfirmPasswordBtn);
    });
    
    // Real-time password feedback
    passwordInput.addEventListener('input', updatePasswordFeedback);
    
    // Clear errors on input
    fullNameInput.addEventListener('input', () => {
        clearError(document.getElementById('fullNameError'));
    });
    
    emailInput.addEventListener('input', () => {
        clearError(document.getElementById('registerEmailError'));
    });
    
    phoneInput.addEventListener('input', () => {
        clearError(document.getElementById('phoneNumberError'));
    });
    
    passwordInput.addEventListener('input', () => {
        clearError(document.getElementById('registerPasswordError'));
    });
    
    confirmPasswordInput.addEventListener('input', () => {
        clearError(document.getElementById('confirmPasswordError'));
    });
    
    agreeTermsCheckbox.addEventListener('change', () => {
        clearError(document.getElementById('termsError'));
    });
});
