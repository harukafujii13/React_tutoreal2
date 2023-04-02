import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;

//using the React.createContext() method.
//The context provides a way to pass data through the component tree
//without having to pass props down manually at every level.
