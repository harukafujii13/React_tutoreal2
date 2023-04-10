import { Fragment, useState, useEffect, Component } from "react";

import Users from "./Users";
import classes from "./UserFinder.module.css";
import UserContext from "../store/users-context";
import ErrorBoundry from "./ErrorBoundry";

class UserFinder extends Component {
  static contextType = UserContext;

  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: "",
    };
  }

  componentDidMount() {
    //Send http request...
    this.setState({ filteredUsers: this.context.users });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <ErrorBoundry>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundry>
      </Fragment>
    );
  }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Fragment>
//       <input type="search" onChange={searchChangeHandler} />
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;

//memo1
//The "componentDidMount()" method is called automatically by React after the component has been
//rendered to the DOM. In this method, an HTTP request could be sent to fetch data, but in this case,
//it simply sets the initial state of "filteredUsers" with the "DUMMY_USERS" array

//memo2
//The "componentDidUpdate()" method is called automatically by React whenever the component updates due to changes in props or state.
//In this method, it checks if the "searchTerm" in the current state is different from the "searchTerm" in the previous state. If they are different,
//it updates the "filteredUsers" state by filtering the "DUMMY_USERS" array based on the new "searchTerm".

//In the provided code, the "filteredUsers" state is updated using the "DUMMY_USERS.filter()" method,
//which is a built-in method in JavaScript that creates a new array with all elements that pass a certain condition.
//The condition is defined as a callback function that is provided as an argument to the "filter()" method.
//The callback function iterates through each element in the "DUMMY_USERS" array and checks if the "name" property of the user object includes the value of "this.state.searchTerm". The "includes()" method is another built-in method in JavaScript that checks if a string includes a given substring. If the "name" includes the "searchTerm", the callback function returns "true" and the user object is included in the new filtered array, otherwise it returns "false" and the user object is excluded from the filtered array.

//Finally, the "filteredUsers" state is updated with the new filtered array,
//effectively filtering the "DUMMY_USERS" array based on the value of "this.state.searchTerm".
//This is a common pattern used to implement filtering functionality in React components, where the UI is dynamically updated based on the changes in the state value.
