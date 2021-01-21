import firebase from "../firebase";
import { formatPrice } from "../utils/helpers";

import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const tempItem = state.cart.find((i) => i.id === id + color);

    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) newAmount = cartItem.max;
          return {
            ...cartItem,
            amount: newAmount,
          };
        } else {
          return cartItem;
        }
      });

      return {
        ...state,
        cart: tempCart,
      };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload);
    return {
      ...state,
      cart: tempCart,
    };
  }

  if (action.type === CLEAR_CART) {
    const userId = action.payload;

    if (userId) {
      const tempCart = [...state.cart];
      const totalPrice = formatPrice(state.totalAmount);
      const shipping = formatPrice(state.shippingFee);
      const boughtAt = new Date().toString();

      // send this cart to firebase
      const historyRef = firebase.database().ref("history");
      const history = {
        user: userId,
        cart: tempCart,
        boughtAt,
        totalPrice,
        shipping,
      };

      historyRef.push(history);
    }

    return {
      ...state,
      cart: [],
    };
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === "inc") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) newAmount = item.max;
          return {
            ...item,
            amount: newAmount,
          };
        } else {
          let newAmount = item.amount - 1;
          if (newAmount < 1) newAmount = 1;
          return {
            ...item,
            amount: newAmount,
          };
        }
      } else {
        return item;
      }
    });

    return {
      ...state,
      cart: tempCart,
    };
  }

  if (action.type === COUNT_CART_TOTALS) {
    const { totalAmount, totalItems } = state.cart.reduce(
      (total, item) => {
        const { price, amount } = item;
        total.totalItems += amount;
        total.totalAmount += price * amount;
        return total;
      },
      {
        totalItems: 0,
        totalAmount: 0,
      }
    );

    return {
      ...state,
      totalAmount,
      totalItems,
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
