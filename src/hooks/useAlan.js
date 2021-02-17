import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useCartContext } from "../context/cart_context";
import { useThemeContext } from "../context/theme_context";

import alanBtn from "@alan-ai/alan-sdk-web";

const COMMANDS = {
  OPEN_CART: "open-cart",
  TOGGLE_THEME: "toggle-theme",
};

const useAlan = () => {
  let history = useHistory();
  const { theme, toggleTheme } = useThemeContext();
  const { cart } = useCartContext();

  const [alanInstance, setAlanInstance] = useState(null);

  const openCart = useCallback(() => {
    if (cart.length < 1) {
      alanInstance.playText("cart is empty");
      return;
    }
    alanInstance.playText("opening cart");

    // history.push("/cart");
    window.location.href = "/cart";
  }, [alanInstance]);

  const changeTheme = useCallback(() => {
    alanInstance.playText("changing theme");
    toggleTheme();
  });

  useEffect(() => {
    window.addEventListener(COMMANDS.OPEN_CART, openCart);
    window.addEventListener(COMMANDS.TOGGLE_THEME, changeTheme);
    return () => {
      window.removeEventListener(COMMANDS.OPEN_CART, openCart);
      window.removeEventListener(COMMANDS.TOGGLE_THEME, changeTheme);
    };
  }, [openCart, changeTheme]);

  useEffect(() => {
    // history.push("/cart");
    if (alanInstance != null) return;
    setAlanInstance(
      alanBtn({
        key: process.env.REACT_APP_ALAN_KEY,
        onCommand: ({ command }) => {
          window.dispatchEvent(new CustomEvent(command));
        },
      })
    );
  }, []);
  return null;
};

export default useAlan;
