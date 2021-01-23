const theme_reducer = (state, action) => {
  const { theme } = state;
  if (action.type === "TOGGLE_THEME") {
    if (theme === "light-theme") {
      localStorage.setItem("theme", "dark-theme");
      return { ...state, theme: "dark-theme" };
    } else {
      localStorage.setItem("theme", "light-theme");
      return { ...state, theme: "light-theme" };
    }
  }

  if (action.type === "SET_PREV_THEME") {
    let prevTheme = localStorage.getItem("theme") || "light-theme";
    return { ...state, theme: prevTheme };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default theme_reducer;
