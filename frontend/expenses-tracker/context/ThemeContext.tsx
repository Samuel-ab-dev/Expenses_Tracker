import { createContext, useContext } from "react";

export type Theme = "light" | "dark";

interface ThemeContextData {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextData | undefined>(
  undefined,
);

export function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used whithin a ThemeProvider");
  }
  return context;
}
