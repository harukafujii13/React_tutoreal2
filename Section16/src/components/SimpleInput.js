import { useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enterdNameTouched, setEnterdNameTouched] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && enterdNameTouched;

  // const enteredEmailIsValid =
  //   enteredEmail.trim() !== "" && enteredEmail.includes("@");
  const enteredEmailIsValid = enteredEmail.includes("@");
  const enteredEmailIsInValid = !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setEnterdNameTouched(true);
  };

  const emailInputBlurHandler = (event) => {
    setEnteredEmailTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setEnterdNameTouched(true);

    if (!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);
    console.log(enteredEmail);

    // nameInputRef.current.value = ""; => Not ideal, Don't manipulate the dom
    setEnteredName("");
    setEnterdNameTouched(false);
    setEnteredEmail("");
    setEnteredEmailTouched(false);
  };

  const namInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  const emailInputClass = enteredEmailIsInValid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={namInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>

      <div className={emailInputClass}>
        <label htmlFor="name">Your E-Mail</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {enteredEmailIsInValid && (
          <p className="error-text">Email Adress must not be empty.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
