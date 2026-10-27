// THE LORD IS MY SHEPHERD, I LACK NOTHING

import "./style.css";

import { initUI } from "./ui-controller.js";
import { isLocalStoragePopulated } from "./storage.js";
import { Todo, currentList } from "./todos.js";
import { todoExamples, projectExamples } from "./examples.js";

const populateWithExamplesIfEmpty = (list) => {
  if (isLocalStoragePopulated()) return;

  todoExamples.forEach(todo => list.addTodo(new Todo(todo)))
  projectExamples.forEach(project => list.addProject(project));
} 

populateWithExamplesIfEmpty(currentList);
initUI();