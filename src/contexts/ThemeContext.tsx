import { createContext, useState } from "react";

interface ThemeContextProps {
  children: React.ReactNode;
}

// 전해주고 싶은 데이터
export const ThemeContext = createContext({
  theme: "light",
  toggleMode: () => {},
});

export const ThemeContextProvider = ({ children }: ThemeContextProps) => {
  const [theme, setTheme] = useState(
    () => window.localStorage.getItem("theme") || "light"
  );

  const toggleMode = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    window.localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
