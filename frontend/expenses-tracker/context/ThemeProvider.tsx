import { useEffect, useState, type ReactNode } from "react";
import { type Theme, ThemeContext } from "./ThemeContext";

interface ThemeProviderProps {
  children: ReactNode;
}

function getInitialTheme(): Theme {
  const savedTheme = localStorage.getItem("theme");

  return savedTheme === "dark" ? "dark" : "light";
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
