import { addExampleTodos, projectExamples } from "./examples.js";

class TodosList {
  #todos = [];
  #projects = ["default"];

  get todos() {
    return this.#todos;
  }
  addTodo(todo) {
    return this.#todos.push(todo);
  }
  updateTodo(todoID, newValuesObj) {
    const todo = this.#todos.find(todo => todo.id === todoID);

    for (const property in newValuesObj) {
      if (todo[property] === newValuesObj[property]) continue;

      todo[property] = newValuesObj[property];
    }
  }
  deleteTodo(todoId) {
    const todoIndex = this.#todos.indexOf(this.#todos.find(todo => todo.id === todoId));

    this.#todos.splice(todoIndex, 1);
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
  addProject(project) {
    const projectLowCase = project.toLowerCase();

    this.#projects.push(projectLowCase);
  }
  updateProject(previousName, newName) {
    const newNameLowCase = newName.toLowerCase();
    const projectIndex = this.#projects.indexOf(previousName);

    this.#projects.splice(projectIndex, 1, newNameLowCase);

    this.#todos.forEach(todo => {
      if (todo.project === previousName) {
        todo.project = newNameLowCase;
      }
    });
  }
  deleteProject(projectName) {
    const projectIndex = this.#projects.indexOf(projectName);

    this.#projects.splice(projectIndex, 1);

    for(let i = this.#todos.length - 1; i >= 0; i--) {
      if (this.#todos[i].project === projectName) {
        this.#todos.splice(i, 1);
      }
    }
  }
  todosToJSON() {
    const todoList = [];

    this.#todos.forEach(todo => {
      todoList.push({
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate,
        priority: todo.priority,
        project: todo.project,
        status: todo.status,
        id: todo.id,
      });
    });

    return todoList;
  }
}

export class Todo {
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
    return this.#title;
  }
  set title(val) {
    this.#title = (!val || val.trim() === "") ? "Untitled" : val;
  }
  get description() {
    return this.#description;
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

const defaultList = new TodosList();
export const currentList = defaultList;