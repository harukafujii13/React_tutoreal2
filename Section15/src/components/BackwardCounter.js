import { useState, useEffect } from "react";

import Card from "./Card";
import useCounter from "../hooks/use-counter";

const BackwardCounter = () => {
  const counter = useCounter(false);

  return <Card>{counter}</Card>;
};

export default BackwardCounter;

//memo1
//Inside the BackwardCounter component, the useCounter hook is called with the parameter false
//to initialize the counter variable with the current value of the counter state returned
//from the useCounter hook, but with a backwards direction specified.
