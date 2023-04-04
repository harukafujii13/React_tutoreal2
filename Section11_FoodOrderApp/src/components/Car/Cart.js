import { useContext } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItems";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;

//memo1
//The Cart component accesses the CartContext using the useContext hook and gets the items
//stored in the cart and the total amount.

//memo2
//The cartItems constant maps the cartCtx.items array to create a new array of CartItem components.
//The key attribute is set to item.id and other props such as name, amount, price, onRemove
//and onAdd are passed to the CartItem component.

//memo3
//bind() is a method available in JavaScript which creates a new function with the same code as the original function,
//but with the first argument of this set to the value passed as the first argument to the bind() method.
//In the code you provided, bind(null, item.id) is used to create a new function with null as the value of this and item.id
//as the first argument passed to the cartItemRemoveHandler function.
//This new function is then passed as the value for the onRemove prop to the CartItem component.
//When the onRemove function is called in the CartItem component,
//it will call cartItemRemoveHandler function with item.id as the first argument.
//This allows cartItemRemoveHandler to know which item needs to be removed from the cart.
