"use strict"

class TodosList {
  #todos = [];

  addTodo(todo) {
    return this.#todos.push(todo);
  }
  getTodos() {
    return this.#todos;
  }
  getFilteredTodosByProperty(key, val) {
    return this.#todos.filter(todo => todo[key] === val);
  }
  getTodoById(id) {
    return this.#todos.find(todo => todo.id === id);
  }
};

class Todo {
  #title;
  #description;
  #id = crypto.randomUUID();
  #status = false;

  constructor({title, description, dueDate, priority, category}) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority || "normal";
    this.category = category || "default";
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
    (this.#status) ? this.#status = false : this.#status = true;
  }
}

const defaultList = new TodosList();

export { defaultList, Todo }