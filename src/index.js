// THE LORD IS MY SHEPHERD, I LACK NOTHING

import "./style.css";
import { initUI } from "./ui-controller.js";
import {
  getProjectsFromLocalStorage,
  getTodosFromLocalStorage,
  isLocalStoragePopulated,
  updateLocalStorage } from "./storage.js";
import { Todo, currentList } from "./todos.js";
import { todoExamples, projectExamples } from "./examples.js";

const loadExamples = (list) => {
  todoExamples.forEach(todo => list.addTodo(new Todo(todo)))
  projectExamples.forEach(project => list.addProject(project));
  updateLocalStorage(list);
} 

const loadLocalStorage = (list) => {
  const todos = getTodosFromLocalStorage();
  const projects = getProjectsFromLocalStorage();

  todos.forEach(todo => list.addTodo(new Todo(todo)))
  projects.forEach(project => list.addProject(project));
} 

const loadData = (list) => {
  if (!isLocalStoragePopulated()) {
    loadExamples(list);
  } else {
    loadLocalStorage(list);
  }
}

loadData(currentList);
initUI();

// TEST
document.addEventListener("click", () => updateLocalStorage(currentList))