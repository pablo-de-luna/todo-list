"use strict"

import { Todo } from "./todos.js";

const todoExamples = [
  {
    title: "Buy groceries",
    description: "pick up fruit and coffee",
    dueDate: "2026-09-02",
    category: "home",
  },
  {
    title: "Read book",
    description: " ",
  },
  {
    title: "Plan trip",
    description: "compare travel options",
    dueDate: "2026-09-10",
    priority: "important",
    category: "default",
  },
  {
    title: "Meeting",
    description: "team sync",
    dueDate: "2026-08-23",
    priority: "important",
    category: "work",
  },
  {
    title: "Walk dog",
  },
  {
    title: "Laundry",
    description: "only reds",
    category: "home",
  },
  {
    title: "Plan son's birthday party",
    description: "buy a cake, candles, some balloons, and send invitations to friends and family",
    dueDate: "2026-08-30",
    priority: "important",
    category: "home",
  },
  {
    title: "Send project",
    dueDate: "2026-08-29",
    priority: "important",
    category: "work",
  },
  {
    title: " ",
  },
  {
    title: "Organize desk drawer",
    category: "home",
  },
];

const addExampleTodos = (list) => {
  todoExamples.forEach(todo => list.addTodo(new Todo(todo)))
}

export default addExampleTodos;