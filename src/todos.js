"use strict"

class TodosList {
  #todos = [];

  addTodo(todo) {
    return this.#todos.push(todo);
  }
  getTodos() {
    return this.#todos;
  }
  getFilteredTodosByProperty(key, value) {
    return this.#todos.filter(todo => todo[key] === value);
  }
  getTodoById(id) {
    return this.#todos.find(todo => todo.id === id);
  }
};

const defaultList = new TodosList();

class Todo {
  #title;
  #id = crypto.randomUUID();
  #status = false;

  constructor({title, description, dueDate, priority, category}) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.category = category;
  }

  get title() { return this.#title }
  set title(value) {
    if (value.trim() === "") {
      this.#title = "Untitled";
    } else {
      this.#title = value;
    }
  }

  get id() { return this.#id; }

  get status() {
    return this.#status;
  }
  toggleStatus() {
    (this.#status) ? this.#status = false : this.#status = true;
  }
}

export { defaultList, Todo }