"use strict"

// Hierarchy: List > Projects > Todos

const mainList = [];

class Todo {
  constructor(title, description, dueDate, priority, project) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
  }
}

const addTodoToList = (todo, list = mainList) => { list.push(todo) };

const getProjectTodos = (projectName, list = mainList) => {
  const projectTodoList = mainList.filter(todo => todo.project === projectName);

  return projectTodoList;
};

// Test todos
addTodoToList(new Todo("Work", "work all day", "Today", "normal", "Work"));
addTodoToList(new Todo("Meeting", "team sync", "Tomorrow", "high", "Work"));
addTodoToList(new Todo("Grocery", "buy milk and bread", "Tomorrow", "normal", "Home"));
addTodoToList(new Todo("Code review", "review PR", "Today", "high", "Work"));
addTodoToList(new Todo("Laundry", "wash clothes", "Tomorrow", "low", "Home"));
addTodoToList(new Todo("Lunch", "meal prep", "Today", "normal", "Home"));
addTodoToList(new Todo("Report", "weekly report", "Friday", "high", "Work"));
addTodoToList(new Todo("Exercise", "gym session", "Today", "normal", "Default"));
addTodoToList(new Todo("Clean", "tidy up", "Saturday", "low", "Home"));
addTodoToList(new Todo("Deploy", "release to prod", "Today", "high", "Work"));
addTodoToList(new Todo("Reading", "finish chapter", "This week", "low", "Default"));

console.table(mainList);

console.table(getProjectTodos("Default"));
console.table(getProjectTodos("Work"));
console.table(getProjectTodos("Home"));