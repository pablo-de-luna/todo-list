import { currentList } from "./todos.js";

const checkIfStorageIsEmpty = () => localStorage.length === 0;

console.log(checkIfStorageIsEmpty());

console.log(currentList.todos);

localStorage.setItem("todosList", JSON.stringify(currentList.todos));
