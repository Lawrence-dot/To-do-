import React, { Context, ContextType, createContext, useState } from "react";
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
  const [theme, setTheme] = useState<string>("dark");
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <div className="App">
        <Home />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
