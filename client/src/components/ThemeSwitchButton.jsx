import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeSwitchButton() {
  const { currentTheme, changeCurrentTheme } = useContext(ThemeContext);

  const handleButtonClick = () => {
    changeCurrentTheme(currentTheme === "light" ? "dark" : "light");
  };

  return (
    <button className="cursor-pointer transition-colors hover:text-primary" onClick={handleButtonClick}>
      {currentTheme === "light" ? <Moon size={24} /> : <Sun size={24} />}
    </button>
  );
}
