// import { currentList } from "./todos.js";
// import { addExampleTodos } from "./examples.js";

// const todosList = JSON.stringify(currentList.todosToJSON());
// const projects = JSON.stringify(currentList.projectNames);

// localStorage.setItem("TEST", "TEST")

export const isLocalStoragePopulated = () => Object.keys(localStorage).length !== 0;
