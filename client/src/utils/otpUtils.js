// OTP Utility Functions

/**
 * Generate a random 4-digit OTP
 * @returns {string} 4-digit OTP
 */
export const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

/**
 * Store OTP in session storage with expiry (5 minutes)
 * @param {string} email - User's email
 * @param {string} otp - Generated OTP
 */
export const storeOTP = (email, otp) => {
  const otpData = {
    otp,
    email,
    expiry: Date.now() + 5 * 60 * 1000, // 5 minutes from now
  };
  sessionStorage.setItem('pendingOTP', JSON.stringify(otpData));
};

/**
 * Verify OTP
 * @param {string} userOTP - OTP entered by user
 * @returns {{ valid: boolean, expired: boolean, message: string }}
 */
export const verifyOTP = (userOTP) => {
  const storedData = sessionStorage.getItem('pendingOTP');
  
  if (!storedData) {
    return { valid: false, expired: false, message: 'No OTP found. Please register again.' };
  }

  const { otp, expiry } = JSON.parse(storedData);

  // Check if expired
  if (Date.now() > expiry) {
    sessionStorage.removeItem('pendingOTP');
    return { valid: false, expired: true, message: 'OTP expired. Please register again.' };
  }

  // Check if matches
  if (otp === userOTP.trim()) {
    return { valid: true, expired: false, message: 'OTP verified successfully!' };
  }

  return { valid: false, expired: false, message: 'Invalid OTP. Please try again.' };
};

/**
 * Clear OTP from storage
 */
export const clearOTP = () => {
  sessionStorage.removeItem('pendingOTP');
};

/**
 * Get pending user data
 * @returns {Object|null} User data pending verification
 */
export const getPendingUserData = () => {
  const data = sessionStorage.getItem('pendingUser');
  return data ? JSON.parse(data) : null;
};

/**
 * Store pending user data
 * @param {Object} userData - User registration data
 */
export const storePendingUser = (userData) => {
  sessionStorage.setItem('pendingUser', JSON.stringify(userData));
};

/**
 * Clear pending user data
 */
export const clearPendingUser = () => {
  sessionStorage.removeItem('pendingUser');
};
