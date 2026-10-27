import { currentList } from "./todos.js";

const todosList = JSON.stringify(currentList.todosToJSON());
const projects = JSON.stringify(currentList.projectNames);

const isLocalStoragePopulated = () => Object.keys(localStorage).length !== 0;

