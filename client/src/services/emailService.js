import emailjs from '@emailjs/browser';

/**
 * Initialize EmailJS with your public key
 * Get your public key from: https://dashboard.emailjs.com/admin/account
 */
export const initEmailJS = () => {
  // User needs to replace this with their EmailJS public key
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (publicKey) {
    emailjs.init(publicKey);
  }
};

/**
 * Send OTP email to user
 * @param {string} userEmail - User's email address
 * @param {string} userName - User's name
 * @param {string} otp - 4-digit OTP
 * @returns {Promise} EmailJS response
 */
export const sendOTPEmail = async (userEmail, userName, otp) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

  if (!serviceId || !templateId) {
    throw new Error('EmailJS not configured. Please set up environment variables.');
  }

  const templateParams = {
    to_email: userEmail,
    to_name: userName,
    otp_code: otp,
    app_name: 'EchoChat',
  };

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams);
    console.log('OTP email sent successfully:', response);
    return response;
  } catch (error) {
    
    console.error('Failed to send OTP email:', error);
    throw error;
  }
};
