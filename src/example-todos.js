"use strict"

import { defaultList, Todo } from "./todos.js";

const todoExamples = [
  {
    title: "Buy groceries",
      description: "pick up fruit and coffee",
      dueDate: "2026-09-02",
      priority: "medium",
      category: "home",
  },
  {
    title: "Read book",
    description: "finish two chapters",
    dueDate: "2026-09-05",
    priority: "low",
    category: "default",
  },
  {
    title: "Plan trip",
    description: "compare travel options",
    dueDate: "2026-09-10",
    priority: "high",
    category: "default",
  },
  {
    title: "Meeting",
    description: "team sync",
    dueDate: "2026-08-23",
    priority: "high",
    category: "work",
  },
];

export default function addExampleTodos() {
  todoExamples.forEach(todo => defaultList.addTodo(new Todo(todo)))
}