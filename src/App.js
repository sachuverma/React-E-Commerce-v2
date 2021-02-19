import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useThemeContext } from "./context/theme_context";
import useAlan from "./hooks/useAlan";

import { Navbar, Sidebar, Footer } from "./components";
import {
  Home,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  About,
  Products,
  PrivateRoute,
  AuthWrapper,
  Scan,
  History,
  ItemList,
} from "./pages";

function App() {
  const { theme } = useThemeContext();

  useAlan();

  useEffect(() => {
    if (theme === "dark-theme") {
      // set dark mode theme
      document.documentElement.className = "dark-theme";
    } else {
      // remove dark mode
      document.documentElement.className = "light-theme";
    }
  }, [theme]);

  return (
    <AuthWrapper>
      <Navbar />
      <Sidebar />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/about">
          <About />
        </Route>

        <Route exact path="/cart">
          <Cart />
        </Route>

        <Route exact path="/products">
          <Products />
        </Route>

        <PrivateRoute exact path="/history">
          <History />
        </PrivateRoute>

        <PrivateRoute exact path="/scan">
          <Scan />
          <ItemList />
        </PrivateRoute>

        <Route exact path="/products/:id" children={<SingleProduct />} />

        <PrivateRoute exact path="/checkout">
          <Checkout />
        </PrivateRoute>

        <Route path="*">
          <Error />
        </Route>
      </Switch>
      <Footer />
    </AuthWrapper>
  );
}

export default App;
