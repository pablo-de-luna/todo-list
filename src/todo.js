"use strict"

const todosList = [];

class Todo {
  constructor(title, description, dueDate, priority, project) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
  }
}

const addNewTodo = (newTodoInstance) => { todosList.push(newTodoInstance) };

const getTodoListFromProject = (projectName) => {
  const projectTodoList = todosList.filter(todo => todo.project === projectName);

  return projectTodoList;
};

// Test todos
// addNewTodo(new Todo("Work", "work all day", "Today", "normal", "Work"));
// addNewTodo(new Todo("Meeting", "team sync", "Tomorrow", "high", "Work"));
// addNewTodo(new Todo("Grocery", "buy milk and bread", "Tomorrow", "normal", "Home"));
// addNewTodo(new Todo("Code review", "review PR", "Today", "high", "Work"));
// addNewTodo(new Todo("Laundry", "wash clothes", "Tomorrow", "low", "Home"));
// addNewTodo(new Todo("Lunch", "meal prep", "Today", "normal", "Home"));
// addNewTodo(new Todo("Report", "weekly report", "Friday", "high", "Work"));
// addNewTodo(new Todo("Exercise", "gym session", "Today", "normal", "Default"));
// addNewTodo(new Todo("Clean", "tidy up", "Saturday", "low", "Home"));
// addNewTodo(new Todo("Deploy", "release to prod", "Today", "high", "Work"));
// addNewTodo(new Todo("Reading", "finish chapter", "This week", "low", "Default"));

// console.table(todosList);

// console.table(getTodoListFromProject("Default"));
// console.table(getTodoListFromProject("Work"));
// console.table(getTodoListFromProject("Home"));