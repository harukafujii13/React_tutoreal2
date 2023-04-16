import { useState, useEffect } from "react";

const useCounter = (forwards = true) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (forwards) {
        setCounter((prevCounter) => prevCounter + 1);
      } else {
        setCounter((prevCounter) => prevCounter - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [forwards]); //this effct will rerun whenever this dependency changes

  return counter;
};

export default useCounter;

//memo1
//useCounter hook returns the counter value, which can be used
//in any component that uses this hook to keep track of the counter value.

//memo2
//The useEffect hook takes a function as its first argument,
//which is the effect function that will be executed when the component mounts and
//whenever the forwards dependency changes.

//memo3
//The useEffect hook also returns a cleanup function, which is used to clear the interval
//when the component unmounts or when the forwards dependency changes. This is done
//by calling clearInterval(interval).
