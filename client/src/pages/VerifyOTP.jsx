import React, { useState, useRef } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { verifyOTP, clearOTP, getPendingUserData, clearPendingUser } from '../utils/otpUtils';
import { useAuth } from '../context/AuthContext';
import AnimatedBackground from '../components/AnimatedBackground';
import ThemeSwitchButton from '../components/ThemeSwitchButton';

export default function VerifyOTP() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const navigate = useNavigate();
  const { register } = useAuth();

  const pendingUser = getPendingUserData();

  // Redirect if no pending user
  React.useEffect(() => {
    if (!pendingUser) {
      navigate('/register');
    }
  }, [pendingUser, navigate]);

  const handleInputChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('');
    while (newOtp.length < 4) newOtp.push('');
    setOtp(newOtp);
    
    // Focus last input
    inputRefs[3].current.focus();
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 4) {
      setError('Please enter the complete 4-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = verifyOTP(otpString);

      if (result.valid) {
        // OTP verified, now register the user
        clearOTP();
        await register(pendingUser);
        clearPendingUser();
        // AuthContext will handle navigation after successful registration
      } else {
        setError(result.message);
        if (result.expired) {
          setTimeout(() => navigate('/register'), 2000);
        }
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    // User needs to re-register to get a new OTP
    clearOTP();
    clearPendingUser();
    navigate('/register');
  };

  if (!pendingUser) return null;

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
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center size-16 bg-gradient-to-br from-primary to-accent rounded-2xl mb-4 shadow-lg">
              <Mail size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold text-text_dark_primary dark:text-text_light_primary mb-2">
              Verify Your Email
            </h1>
            <p className="text-text_dark_secondary dark:text-text_light_secondary">
              Enter the 4-digit OTP sent to<br />
              <span className="font-semibold text-primary">{pendingUser.email}</span>
            </p>
          </div>

          {/* OTP Input */}
          <div className="bg-white dark:bg-backgroundDark2 rounded-3xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 border border-border_light dark:border-border_dark">
            <div className="flex justify-center gap-3 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-14 h-14 text-center text-2xl font-bold bg-backgroundLight3 dark:bg-backgroundDark1 border-2 border-border_light dark:border-border_dark rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-text_dark_primary dark:text-text_light_primary"
                />
              ))}
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm text-center mb-4">
                {error}
              </div>
            )}

            <button
              onClick={handleVerify}
              disabled={loading || otp.join('').length !== 4}
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary_hover hover:to-primary text-white font-semibold py-3.5 rounded-xl transition-all transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <div className="mt-6 text-center text-sm text-text_dark_secondary dark:text-text_light_secondary">
              Didn't receive the code?{' '}
              <button
                onClick={handleResend}
                className="text-primary font-semibold hover:underline"
              >
                Resend OTP
              </button>
            </div>

            <button
              onClick={() => {
                clearOTP();
                clearPendingUser();
                navigate('/register');
              }}
              className="mt-4 w-full flex items-center justify-center gap-2 text-text_dark_secondary dark:text-text_light_secondary hover:text-primary dark:hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to Registration</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
