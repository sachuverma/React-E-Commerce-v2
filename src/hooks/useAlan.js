import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useCartContext } from "../context/cart_context";
import { useFilterContext } from "../context/filter_context";

import { useThemeContext } from "../context/theme_context";

import alanBtn from "@alan-ai/alan-sdk-web";

const COMMANDS = {
  OPEN_HOME: "open-home",
  OPEN_CART: "open-cart",
  OPEN_PRODUCTS_PAGE: "open-products",
  OPEN_SCANNER: "open-scanner",
  OPEN_HISTORY: "open-history",
  SEARCH_ITEM: "search-item",
  CHANGE_VIEW: "change-view",
  TOGGLE_THEME: "toggle-theme",
};

const useAlan = () => {
  let history = useHistory();
  const { theme, toggleTheme } = useThemeContext();
  const { cart } = useCartContext();
  const {
    filters,
    setGridView,
    setListView,
    updateFilters,
  } = useFilterContext();

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

  const openScanner = useCallback(() => {
    history.push("/scan");
  }, [alanInstance]);

  const openHistory = useCallback(() => {
    history.push("/history");
  }, [alanInstance]);

  const searchItem = useCallback(({ detail: { value } }) => {
    let e = { target: { name: "text", value } };
    updateFilters(e);
  });

  const changeView = useCallback(({ detail: { value } }) => {
    if (value === "grid") setGridView();
    else setListView();
  });

  const changeTheme = useCallback(() => {
    alanInstance.playText("changing theme");
    toggleTheme();
  }, [alanInstance, theme]);

  useEffect(() => {
    window.addEventListener(COMMANDS.OPEN_CART, openCart);
    window.addEventListener(COMMANDS.OPEN_HOME, openHome);
    window.addEventListener(COMMANDS.SEARCH_ITEM, searchItem);
    window.addEventListener(COMMANDS.OPEN_PRODUCTS_PAGE, openProductsPage);
    window.addEventListener(COMMANDS.OPEN_SCANNER, openScanner);
    window.addEventListener(COMMANDS.OPEN_HISTORY, openHistory);
    window.addEventListener(COMMANDS.CHANGE_VIEW, changeView);
    window.addEventListener(COMMANDS.TOGGLE_THEME, changeTheme);
    return () => {
      window.removeEventListener(COMMANDS.OPEN_CART, openCart);
      window.removeEventListener(COMMANDS.OPEN_HOME, openHome);
      window.removeEventListener(COMMANDS.SEARCH_ITEM, searchItem);
      window.removeEventListener(COMMANDS.OPEN_PRODUCTS_PAGE, openProductsPage);
      window.removeEventListener(COMMANDS.OPEN_SCANNER, openScanner);
      window.removeEventListener(COMMANDS.OPEN_HISTORY, openHistory);
      window.removeEventListener(COMMANDS.CHANGE_VIEW, changeView);
      window.removeEventListener(COMMANDS.TOGGLE_THEME, changeTheme);
    };
  }, [openCart, changeTheme, openHome, searchItem]);

  useEffect(() => {
    if (alanInstance != null) return;
    setAlanInstance(
      alanBtn({
        key: process.env.REACT_APP_ALAN_KEY,
        onCommand: ({ command, payload }) => {
          window.dispatchEvent(new CustomEvent(command, { detail: payload }));
        },
      })
    );
  }, []);
  return null;
};

export default useAlan;
