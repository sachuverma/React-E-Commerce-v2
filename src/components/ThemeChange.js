import React from "react";

import { useThemeContext } from "../context/theme_context";

function ThemeChange() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div
      style={{
        textAlign: "center",
        alignItems: "center",
        alignContent: "center",
        margin: "50px 0",
      }}
    >
      <h4>Toogle Theme</h4>
      <span>
        <button onClick={toggleTheme} className="btn">
          {theme === "light-theme" ? "dark" : "light"}
        </button>
      </span>
    </div>
  );
}

export default ThemeChange;
