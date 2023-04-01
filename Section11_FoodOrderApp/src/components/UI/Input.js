import classes from "./Input.module.css";
const Input = (props) => {
  return (
    <div className={classes.input}>
      <lable htmlFor={props.input.id}>{props.lable}</lable>
      <input {...props.input} />
    </div>
  );
};
export default Input;

//memo1
//{...props.input} allows for a more concise and flexible way to pass multiple attributes to an element,
//and it is commonly used in React components to pass down props to child elements.
//For example, in the MealItemForm component, the input prop of the Input component contains an id, type, min, max, step, and defaultValue.
//The {...props.input} syntax within the Input component then spreads those attributes,
//so the resulting input element in the rendered output has all those attributes applied.
