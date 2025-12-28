/* eslint-disable no-unused-vars */
import { RefObject, useRef, useState, useEffect } from "react";
import { Coffee, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";
import ThemeSwitchButton from "../components/ThemeSwitchButton";
import { generateOTP, storeOTP, storePendingUser } from "../utils/otpUtils";
import { sendOTPEmail, initEmailJS } from "../services/emailService";

export default function Register() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Initialize EmailJS on component mount
  useEffect(() => {
    initEmailJS();
  }, []);

  const formFields = [
    {
      type: "text",
      placeholder: "Choose a username",
      ref: usernameRef,
      label: "Username",
    },
    {
      type: "email",
      placeholder: "Enter your email",
      ref: emailRef,
      label: "Email",
    },
    {
      type: "password",
      placeholder: "Create a password",
      ref: passwordRef,
      label: "Password",
    },
  ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const user = {
      email: emailRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      // Generate OTP
      const otp = generateOTP();
      console.log('Generated OTP:', otp); // For development - remove in production

      // Send OTP email
      await sendOTPEmail(user.email, user.username, otp);

      // Store OTP and user data in session
      storeOTP(user.email, otp);
      storePendingUser(user);

      // Navigate to OTP verification page
      navigate('/verify-otp');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to send OTP. Please check your email configuration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatedBackground />
      {/* Theme Switch Button - Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <div className="bg-white dark:bg-backgroundDark2 p-3 rounded-full shadow-lg border border-border_light dark:border-border_dark hover:scale-110 transition-transform">
          <ThemeSwitchButton />
        </div>
      </div>
      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center size-16 bg-gradient-to-br from-primary to-accent rounded-2xl mb-4 shadow-lg">
              <MessageCircle size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold text-text_dark_primary dark:text-text_light_primary mb-2">
              Join EchoChat
            </h1>
            <p className="text-text_dark_secondary dark:text-text_light_secondary">
              Create your account and start chatting
            </p>
          </div>

          {/* Register Form */}
          <div className="bg-white dark:bg-backgroundDark2 rounded-3xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 border border-border_light dark:border-border_dark">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {formFields.map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-text_dark_primary dark:text-text_light_primary mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    ref={field.ref}
                    required
                    className="w-full px-4 py-3 bg-backgroundLight3 dark:bg-backgroundDark1 border border-border_light dark:border-border_dark rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-text_dark_primary dark:text-text_light_primary placeholder-text_dark_secondary dark:placeholder-text_light_secondary"
                  />
                </div>
              ))}

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {/* Info message about OTP */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 px-4 py-3 rounded-xl text-sm">
                📧 We'll send a verification code to your email
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary_hover hover:to-primary text-white font-semibold py-3.5 rounded-xl transition-all transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Sending OTP...' : 'Create Account'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border_light dark:border-border_dark"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-backgroundDark2 text-text_dark_secondary dark:text-text_light_secondary">
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Login Link */}
            <Link
              to="/login"
              className="block w-full text-center py-3.5 border-2 border-primary text-primary font-semibold rounded-xl transition-all hover:bg-primary hover:text-white"
            >
              Sign In Instead
            </Link>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-text_dark_secondary dark:text-text_light_secondary flex items-center justify-center gap-2">
            <Coffee size={16} className="text-primary" />
            <span>Powered by EchoChat</span>
          </div>
        </div>
      </div>
    </>
  );
}
