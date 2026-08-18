"use strict"

const projects = [];

class Project {
  constructor(name) {
    this.name = name;
  }

  todos = [];
}

class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  id = crypto.randomUUID();
}

function createProject(name) {
  projects.push(new Project(name));
};

function createTodo(todo, projectName) {
  const project = projects.find(project => project.name === projectName);

  project.todos.push(todo);
}

createProject(("defaultProject"));
createProject(("Work"));
createTodo(new Todo("Work", "work on project", "Today", "high"), "Work");
createTodo(new Todo("Dance", "Dance all night", "Today", "low"), "defaultProject");

//Log projects list
console.log(projects)

//Log project todos
console.log(projects.find(project => project.name === "Work").todos);