"use strict"

class TodosList {
  #todosArr = [];

  addTodo(todo) {
    return this.#todosArr.push(todo);
  }
  getTodos() {
    return this.#todosArr;
  }
  getFilteredTodosByProperty(key, value) {
    return this.#todosArr.filter(todo => todo[key] === value);
  }
  getTodoById(id) {
    return this.#todosArr.find(todo => todo.getId() === id);
  }
};

class Todo {
  constructor(title, description, dueDate, priority, project) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
  }
  
  #id = crypto.randomUUID();

  getTitle() {
    return this.title
  }
  setTitle(value) {
    if (!value) return;
    this.title = value;
  }
  getId() {
    return this.#id;
  }
}


// ↓↓↓↓↓↓↓ Testing, to be deleted ↓↓↓↓↓↓
const defaultList = new TodosList();

defaultList.addTodo(new Todo("Meeting", "team sync", "tomorrow", "high", "work"));
defaultList.addTodo(new Todo("Grocery", "buy milk and bread", "tomorrow", "normal", "home"));
defaultList.addTodo(new Todo("Code review", "review PR", "today", "high", "work"));
defaultList.addTodo(new Todo("Laundry", "wash clothes", "tomorrow", "low", "home"));
defaultList.addTodo(new Todo("Lunch", "meal prep", "today", "normal", "home"));
defaultList.addTodo(new Todo("Report", "weekly report", "friday", "high", "work"));
defaultList.addTodo(new Todo("Exercise", "gym session", "today", "normal", "default"));
defaultList.addTodo(new Todo("Clean", "tidy up", "saturday", "low", "home"));
defaultList.addTodo(new Todo("Deploy", "release to prod", "today", "high", "work"));
defaultList.addTodo(new Todo("Reading", "finish chapter", "this week", "low", "default"));

console.table(defaultList.getTodos());
console.table(defaultList.getFilteredTodosByProperty("project", "work"));

const todoId = defaultList.getTodos()[0].getId();

defaultList.getTodoById(todoId).setTitle("");

console.table(defaultList.getTodos());