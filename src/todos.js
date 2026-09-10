"use strict"

import { addExampleTodos, projectExamples } from "./examples.js";

class TodosList {
  #todos = [];
  #projects = ["default"]

  get todos() {
    return this.#todos;
  }
  addTodo(todo) {
    return this.#todos.push(todo);
  }
  getFilteredTodosByProperty(key, val) {
    return this.#todos.filter(todo => todo[key] === val);
  }
  getTodoById(id) {
    return this.#todos.find(todo => todo.id === id);
  }
  get projectNames() {
    return this.#projects;
  }
  addProject(...project) {
    this.#projects.push(...project);
  }
};

class Todo {
  #title;
  #description;
  #priority;
  #status = false;
  #id = crypto.randomUUID();

  constructor({title, description, dueDate, priority, project}) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project || "default";
  }

  get title() {
    return this.#title
  }
  set title(val) {
    this.#title = (!val || val.trim() === "") ? "Untitled" : val;
  }
  get description() {
    return this.#description
  }
  set description(val) {
    this.#description = (!val || val.trim() === "") ? "No description" : val;
  }
  get id() {
    return this.#id;
  }
  get status() {
    return this.#status;
  }
  toggleStatus() {
    this.#status = !this.#status;
  }
  get priority() {
    return this.#priority;
  }
  set priority(val) {
    this.#priority = (val) ? "important" : "normal";
  }
  togglePriority() {
    this.#priority = (this.#priority === "normal") ? "important" : "normal";
  }
}

// Set default list with examples
const defaultList = new TodosList();
addExampleTodos(defaultList);
defaultList.addProject(...projectExamples);

/* If I made other list, I should make a function so user can
switch between lists. for now, currentList is defaultList */
const currentList = defaultList;

export { currentList, Todo }