import React, { useEffect, createContext, useState } from "react";
import Home from "../components/Home/Home";
import "../Assets/bootstrap.min.css";
import "./App.css";
import "../Assets/animate.min.css";
export const ThemeContext = createContext<ThemecontextType | null>(null);

type ThemecontextType = [
  theme: string | null,
  setTheme: (newvalue: string) => void
];

function App() {
  const [theme, setTheme] = useState<string>(localStorage.theme);
    useEffect(() => {
    if (localStorage.theme === "dark" || !("theme" in localStorage)) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }, [theme]);
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <div className="App">
        <Home />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
