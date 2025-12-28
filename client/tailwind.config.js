/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary theme - BRIGHT Lime Green
        primary: "#A3E635",        // Bright lime green
        primary_hover: "#84CC16",  // Lime 500
        accent: "#4ADE80",         // Bright green accent
        
        // Light mode - Keep vanilla/cream
        backgroundLight1: "#FFFEF7",
        backgroundLight2: "#FBF8F1",
        backgroundLight3: "#F5F0E5",
        
        // Dark mode - PURE BLACK with lime
        backgroundDark1: "#1A1A1A",   // Near black
        backgroundDark2: "#0A0A0A",   // Almost pure black
        backgroundDark3: "#000000",   // Pure black
        
        // Text colors
        text_light_primary: "#FFFFFF",
        text_light_secondary: "#E5E7EB",
        text_dark_primary: "#1F2937",
        text_dark_secondary: "#6B7280",
        
        // Borders
        border_light: "#E5DCC5",
        border_dark: "#333333",       // Dark grey border
        
        // Muted
        muted: "#9CA3AF",
      },

      screens: {
        sm: { max: "640px" },
        md: { max: "768px" },
        lg: { max: "1024px" },
        xl: { max: "1280px" },
      },

      fontFamily: {
        poppins: ["var(--font-poppins)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
