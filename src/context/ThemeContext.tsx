import { createContext, useContext, useEffect, useMemo, useState } from "react";

/**
 * themes represents the available themes, at the moment there is an option for a dark and light mode
 */

const themes = {
  light: {
    name: "light",
    background: "#ffffff",
    contrast: "#333333",
    text: "#333333",
    textContrast: "#ffffff",
    primaryHoverColor: "#ededed",
    primaryContrastHoverColor: "#2e2e2e",
  },
  dark: {
    name: "dark",
    background: "#333333",
    contrast: "#ffffff",
    text: "#ffffff",
    textContrast: "#333333",
    primaryHoverColor: "#2e2e2e",
    primaryContrastHoverColor: "#ededed",
  },
};
/**
 * Theme Context is used for managing the current theme, and it provides a function to toggle between dark and light mode
 */
const ThemeContext = createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});

/**
 * The ThemeProvider component provides the theme context for its children
 */
export const ThemeProvider: React.FC<ThemeContextProps> = ({ children }) => {
  const [theme, setTheme] = useState(themes.dark);

  useEffect(() => {
    updateThemeProperties();
  }, [theme]);

  /**
   * This updates the css variables based on the selected theme.
   */
  const updateThemeProperties = () => {
    const root = document.documentElement;
    root.style.setProperty("--primary-bg-color", theme.background);
    root.style.setProperty("--text-color", theme.text);
    root.style.setProperty("--primary-bg-contrast-color", theme.contrast);
    root.style.setProperty("--text-contrast-color", theme.textContrast);
    root.style.setProperty("--primary-hover-color", theme.primaryHoverColor);
    root.style.setProperty(
      "--primary-contrast-hover-color",
      theme.primaryContrastHoverColor
    );
  };
  /**
   * This toggles between dark and light mode
   */
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === themes.dark ? themes.light : themes.dark
    );
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
/**
 * Interface represents the props of this context
 */
interface ThemeContextProps {
  children: React.ReactNode;
}
/**
 * Hook to acces the theme context value
 * @returns current theme and toggle function
 */
export const useStyle = () => useContext(ThemeContext);
