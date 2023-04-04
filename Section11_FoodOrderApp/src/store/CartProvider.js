import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item); //state,itemsにaction.itemを結合
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.item.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

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

//ADD action
//When the action type is "ADD", it first calculates the updatedTotalAmount by adding the total amount of the items in the cart
//before and the new item that is going to be added.
//Then, it checks if the item to be added already exists in the cart by finding the index of the item
//with the same id using the findIndex() method on the state.items array.
//If the item already exists, it creates an updated version of the item by increasing its amount
//with the amount of the new item, and then it creates a copy of the state.items array and replaces the existing item
//with the updated version by using the index to access the position of the existing item.
//If the item is not already in the cart, it creates a new array by concatenating the existing state.
//items array with the new item using the concat() method.
//Finally, it returns the updated state with the updated items array and the updated total amount.
//If the action type is not "ADD", it returns the default cart state.
