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


// ↓↓↓↓↓↓↓ Testing, to be deleted ↓↓↓↓↓↓
const defaultList = new TodosList();

const formInput = {
  title: "Meeting",
  description: "team sync",
  dueDate: "2026-08-23",
  priority: "high",
  category: "work",
}

defaultList.addTodo(new Todo(formInput));
// defaultList.addTodo(new Todo("Grocery", "buy milk and bread", "2026-08-26", "normal", "home"));
// defaultList.addTodo(new Todo("Code review", " ", "2026-08-28", "high", "work"));
// defaultList.addTodo(new Todo("Laundry", "wash clothes", "2026-08-25", "low", "home"));
// defaultList.addTodo(new Todo("Lunch", "meal prep", "", "normal", "home"));
// defaultList.addTodo(new Todo("Exercise", "gym session", "", "normal", "default"));

const todoId = defaultList.getTodos()[0].title = "Dance";

console.table(defaultList.getTodos());

