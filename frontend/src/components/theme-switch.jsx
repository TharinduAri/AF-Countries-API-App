import React from "react";
import { Switch } from "@heroui/react";
import { Icon } from "@iconify/react";

export const ThemeSwitch = () => {
  const [isDark, setIsDark] = React.useState(true); // Set default to true for dark mode
  
  React.useEffect(() => {
    // Apply dark mode by default on initial load
    document.documentElement.classList.add("dark");
    
    // If you still want to check system preference, but with dark as default fallback:
    // const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    // const savedTheme = localStorage.getItem("theme");
    // const isDarkMode = savedTheme === "light" ? false : true; // Default to dark if not explicitly set to light
    // setIsDark(isDarkMode);
    // document.documentElement.classList.toggle("dark", isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    // Toggle dark class on html element
    if (newTheme) {
      document.documentElement.classList.add("dark");
      // Optional: store preference
      // localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      // Optional: store preference
      // localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Icon icon="lucide:sun" className={isDark ? "text-default-500" : "text-primary-500"} />
      <Switch
        size="sm"
        color="primary"
        isSelected={isDark}
        onValueChange={toggleTheme}
      />
      <Icon icon="lucide:moon" className={isDark ? "text-primary-500" : "text-default-500"} />
    </div>
  );
};