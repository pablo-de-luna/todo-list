"use strict"

const todoList = [];

class Todo {
  priority = 1;
  
  constructor(title, description, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
  }

  setPriority(value) {
    this.priority = value;
  }
}

const addTodoToList = (todo, list) => {
  list.push(todo);
}

addTodoToList(new Todo("Work", "work on project", "Today"), todoList);

console.log(todoList)