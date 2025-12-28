/* eslint-disable no-unused-vars */
import { RefObject, useRef } from "react";
import { Coffee, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AnimatedBackground from "../components/AnimatedBackground";
import ThemeSwitchButton from "../components/ThemeSwitchButton";

export default function Login() {
  const userIdRef = useRef();
  const passwordRef = useRef();

  const { login, authError } = useAuth();

  const formFields = [
    {
      type: "userId",
      placeholder: "Enter your email or username",
      ref: userIdRef,
    },

    {
      type: "password",
      placeholder: "Enter your password",
      ref: passwordRef,
    },
  ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const user = {
      userId: userIdRef.current.value,
      password: passwordRef.current.value,
    };

    // login hook
    await login(user);
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
              Welcome Back
            </h1>
            <p className="text-text_dark_secondary dark:text-text_light_secondary">
              Sign in to continue to EchoChat
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white dark:bg-backgroundDark2 rounded-3xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 border border-border_light dark:border-border_dark">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {formFields.map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-text_dark_primary dark:text-text_light_primary mb-2">
                    {field.type === "userId" ? "Email or Username" : "Password"}
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

              {authError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary_hover hover:to-primary text-white font-semibold py-3.5 rounded-xl transition-all transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border_light dark:border-border_dark"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-backgroundDark2 text-text_dark_secondary dark:text-text_light_secondary">
                  New to EchoChat?
                </span>
              </div>
            </div>

            {/* Register Link */}
            <Link
              to="/register"
              className="block w-full text-center py-3.5 border-2 border-primary text-primary font-semibold rounded-xl transition-all hover:bg-primary hover:text-white"
            >
              Create Account
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
