import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("appTheme");
    setIsDarkMode(savedTheme !== "light");
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      isDarkMode
        ? localStorage.setItem("appTheme", "light")
        : localStorage.setItem("appTheme", "dark");
      return !prevMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
