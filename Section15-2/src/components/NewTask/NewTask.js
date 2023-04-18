import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use-http";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const createTask = (taskText, TaskData) => {
    const generatedId = TaskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest(
      {
        url: "https://react-task-6c74a-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { text: taskText },
      },
      createTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;

//memo1
//createTask: This is a callback function that is called after a new task is
//successfully added to the remote API. It takes the taskText and TaskData as parameters.
//TaskData is an object that contains the response data from the API, including the generated
//id for the new task. It creates a new task object with the id and text properties,
//and then calls the onAddTask callback function, which is passed as a prop to this component,
//with the created task object to update the state in the parent component.

//memo2
//enterTaskHandler: This is a callback function that is called when the user submits
//the form to add a new task. It uses the sendTaskRequest function to send an HTTP POST request
//to the remote API with the task text as the request body. It also passes the createTask function
//as a callback to be called when the request is successful, so that the created task can be updated
//in the parent component's state.

//memo3
//taskText: The text of the task entered by the user.
//TaskData: An object that contains the response data from the API,
//          including the generated id for the new task. The TaskData.name property is used to extract the generated id.

//memo4
//props.onAddTask(createdTask) function is called, which is a callback function
//passed as a prop to this component. It is responsible for updating the state in the parent component
//with the newly created task object, so that it can be rendered in the UI.

//createTask.bind(null, taskText)
//The createTask.bind(null, taskText) expression is used to bind
//the createTask function with a specific value for the taskText argument,
//creating a new function that can be called later.

//In JavaScript, the bind method is used to create a new function that,
//when invoked, has a specific value for this and/or specific arguments passed to it.
//The first argument to bind is the value to be used as this inside the function,
//and subsequent arguments are the arguments that will be passed to the function when it is invoked.

//In this case, createTask.bind(null, taskText) is binding the createTask function
//with null as the value for this (since createTask does not use this),
//and taskText as the value for the first argument of createTask. This creates a new function
//that is equivalent to calling createTask(taskText) directly. However, this new function
//can be passed as a callback to other functions, like the sendRequest function in the useHttp hook,
//which can then invoke it with the correct taskText argument when needed.

//*In the code provided, the bound createTask function is passed
//as a callback to the sendRequest function as the applyData argument.
//This means that after a successful HTTP request, the applyData function
//will be called with the parsed response data, and the createTask function will be
//invoked with taskText as its argument, effectively creating a new task
//with the correct taskText value extracted from the HTTP response.
