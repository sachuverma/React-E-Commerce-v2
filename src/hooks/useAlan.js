import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useCartContext } from "../context/cart_context";
import { useThemeContext } from "../context/theme_context";

import alanBtn from "@alan-ai/alan-sdk-web";

const COMMANDS = {
  OPEN_HOME: "open-home",
  OPEN_CART: "open-cart",
  OPEN_PRODUCTS_PAGE: "open-products",
  TOGGLE_THEME: "toggle-theme",
};

const useAlan = () => {
  let history = useHistory();
  const { theme, toggleTheme } = useThemeContext();
  const { cart } = useCartContext();

  const [alanInstance, setAlanInstance] = useState(null);

  const openCart = useCallback(() => {
    if (!cart.length) {
      alanInstance.playText("cart is empty");
      return;
    }
    history.push("/cart");
  }, [alanInstance, cart]);

  const openHome = useCallback(() => {
    history.push("/");
  }, [alanInstance]);

  const openProductsPage = useCallback(() => {
    history.push("/products");
  }, [alanInstance]);

  const changeTheme = useCallback(() => {
    alanInstance.playText("changing theme");
    toggleTheme();
  }, [alanInstance, theme]);

  useEffect(() => {
    window.addEventListener(COMMANDS.OPEN_CART, openCart);
    window.addEventListener(COMMANDS.OPEN_HOME, openHome);
    window.addEventListener(COMMANDS.OPEN_PRODUCTS_PAGE, openProductsPage);
    window.addEventListener(COMMANDS.TOGGLE_THEME, changeTheme);
    return () => {
      window.removeEventListener(COMMANDS.OPEN_CART, openCart);
      window.removeEventListener(COMMANDS.OPEN_HOME, openHome);
      window.removeEventListener(COMMANDS.OPEN_PRODUCTS_PAGE, openProductsPage);
      window.removeEventListener(COMMANDS.TOGGLE_THEME, changeTheme);
    };
  }, [openCart, changeTheme, openHome]);

  useEffect(() => {
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
