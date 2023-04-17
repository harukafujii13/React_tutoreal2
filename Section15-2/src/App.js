import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTasks = (tasksObj) => {
    const loadedTasks = [];

    for (const taskKey in tasksObj) {
      loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
    }

    setTasks(loadedTasks);
  };

  const { isLoading, error, sendRequest: fetchTasks } = useHttp(
    {
      url: "https://react-task-6c74a-default-rtdb.firebaseio.com/tasks.json",
    },
    transformTasks
  );

  useEffect(() => {
    fetchTasks();
  }, []); //rerun this effect, whenever fetchTasks changes

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;

//memo1
//The transformTasks function is a custom function that takes an object tasksObj
//as a parameter. Inside the function, it loops through each key-value pair in
//tasksObj using a for...in loop. For each key-value pair, it creates a new object with properties id and text,
//where id is set to the key and text is set to the value of tasksObj[taskKey].text. This new object is then pushed into the loadedTasks array.

//Finally, the setTasks function is called with the loadedTasks array as an argument,
//which updates the state of the tasks variable in the component, causing a re-render
//with the updated tasks data.

//memo2
//The transformTasks function is passed as a callback function to the useHttp hook.
//It will be called with the data returned from the API response as its argument,
//and it is responsible for transforming the data and updating the tasks state using the setTasks function.

//memo3
//transformTasks is a callback function that is passed as an argument to the useHttp hook. It is responsible for
//transforming the data received from the API response before updating the tasks state using the setTasks function.

//tasksObj: It is an object that represents the data received from the API response.
//It is assumed that it contains tasks data in the form of key-value pairs, where the keys are
//the task IDs and the values are objects containing task details.
