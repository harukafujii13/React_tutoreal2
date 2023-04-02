import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedItems = state.items.concat(action.item); //state,itemsにaction.itemを結合
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartaction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartaction({ type: "ADD", item: item }); //type→property name for identify the action
  };
  const removeItemFormcartHandler = (id) => {
    dispatchCartaction({ type: "Remove", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFormcartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

//memo 1
//The two functions addItem and removeItem are used to modify the items array in the cart context.
//addItem takes an item object as an argument and appends it to the items array in the cart context,
//while removeItem takes an item ID and removes it from the items array.

//memo2
//The defaultCartState object holds the initial state of the cart,
//which has an empty array of items and a totalAmount of 0.

//memo3
//The CartProvider returns the cartContext object wrapped by the CartContext.Provider,
//which makes the cart data and functions available to its child components via context.

//memo4
//The concat() method is used to merge two or more arrays.
//This method does not change the existing arrays, but instead returns a new array.
