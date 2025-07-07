"use client";

import { useEffect, useState } from "react";
import { MdWbSunny, MdWbCloudy } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

// This component provides a toggle between light and dark themes
// It uses local storage to persist the user's theme preference across sessions
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Check local storage for theme preference on initial render
  useEffect(() => {
    const isDarkStored = localStorage.getItem("theme") === "dark";
    setIsDark(isDarkStored);
    document.documentElement.classList.toggle("dark", isDarkStored);
  }, []);

  // Function to toggle theme and update local storage
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <div
      className="flex items-center justify-center gap-2 cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200"
      onClick={toggleTheme}
    >
      <h2 className="text-gray-500 dark:text-gray-300 text-3xl">Weather</h2>

      {/* AnimatePresence to handle the transition between icons */}
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="cloud"
            initial={{ x: -20, opacity: 0, rotate: -90 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            exit={{ x: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.4 }}
          >
            <MdWbCloudy
              className="text-3xl mt-1 text-muted-foreground"
              title="Switch to light theme"
            />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ x: 20, opacity: 0, rotate: 90 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            exit={{ x: -20, opacity: 0, rotate: -90 }}
            transition={{ duration: 0.4 }}
          >
            <MdWbSunny
              className="text-3xl mt-1 text-yellow-400"
              title="Switch to dark theme"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
