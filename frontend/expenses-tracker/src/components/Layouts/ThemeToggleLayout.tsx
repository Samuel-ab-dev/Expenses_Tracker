import { LuMoon, LuSun } from "react-icons/lu";
import { useTheme } from "../../../context/ThemeContext.tsx";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
      title={isDark ? "Activate light mode" : "Activate dark mode"}
      aria-pressed={isDark}
      className="
      inline-flex items-center justify-center
      rounded-xl border border-gray-300
      bg-slate-50 p-2.5 text-gray-700
      transition-colors duration-200
      hover:bg-slate-200
      focus-visible:outline-2 focus-visible:outline-offset-2
      focus-visible:outline-violet-500
      dark:border-gray-600
      dark:bg-gray-800
      dark:text-slate-50
      dark:hover:bg-gray-700
"
    >
      {isDark ? (
        <LuSun size={20} aria-hidden="true" />
      ) : (
        <LuMoon size={20} aria-hidden="true" />
      )}
    </button>
  );
}
