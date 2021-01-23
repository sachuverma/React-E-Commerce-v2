import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/theme_reducer";

const initialState = {
  theme: "",
};

const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  useEffect(() => {
    dispatch({ type: "SET_PREV_THEME" });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        ...state,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
// make sure use
export const useThemeContext = () => {
  return useContext(ThemeContext);
};
