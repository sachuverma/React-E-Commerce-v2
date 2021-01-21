import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((product) => product.price);
    maxPrice = Math.max(...maxPrice);

    let minPrice = action.payload.map((product) => product.price);
    minPrice = Math.min(...minPrice);

    return {
      ...state,
      allProducts: [...action.payload],
      filteredProducts: [...action.payload],
      filters: { ...state.filters, maxPrice, minPrice, price: maxPrice },
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      gridView: true,
    };
  }

  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      gridView: false,
    };
  }

  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload,
    };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filteredProducts } = state;

    let tempProducts = [...filteredProducts];

    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    } else if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    } else {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }

    return { ...state, filteredProducts: tempProducts };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return {
      ...state,
      filters: {
        ...state.filters,
        [name]: value,
      },
    };
  }

  if (action.type === FILTER_PRODUCTS) {
    const { allProducts } = state;
    const { text, category, company, color, shipping, price } = state.filters;

    let tempProducts = [...allProducts];

    if (text) {
      tempProducts = tempProducts.filter((prod) => {
        return prod.name.toLowerCase().includes(text.toLowerCase());
      });
    }

    if (category !== "all") {
      tempProducts = tempProducts.filter((prod) => {
        return prod.category.toLowerCase() === category;
      });
    }

    if (company !== "all") {
      tempProducts = tempProducts.filter((prod) => {
        return prod.company.toLowerCase() === company;
      });
    }

    if (color !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((c) => c === color);
      });
    }

    tempProducts = tempProducts.filter((product) => product.price <= price);

    if (shipping) {
      tempProducts = tempProducts.filter(
        (product) => product.shipping === true
      );
    }

    return {
      ...state,
      filteredProducts: tempProducts,
    };
  }

  if (action.type === "LOAD_PRODUCTS_FROM_SCANNER") {
    console.log(action.payload);
    return {
      ...state,
      filters: {
        ...state.filters,
        text: action.payload.value.item,
      },
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.maxPrice,
        shipping: false,
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
  // return state;
};

export default filter_reducer;
