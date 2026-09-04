"use strict"

import { Todo } from "./todos.js";
import { currentDate, getRandomUpcomingDate } from "./dates.js";

const todoExamples = [
  {
    title: "Buy groceries",
    description: "pick up fruit and coffee",
    dueDate: currentDate,
    category: "home",
  },
  {
    title: "Read book",
    description: " ",
  },
  {
    title: "Plan trip",
    description: "compare travel options",
    dueDate: getRandomUpcomingDate(),
    category: "default",
  },
  {
    title: "Meeting",
    description: "team sync",
    dueDate: getRandomUpcomingDate(),
    priority: "important",
    category: "work",
  },
  {
    title: "Walk dog",
    dueDate: currentDate,
  },
  {
    title: "Laundry",
    description: "only reds",
    dueDate: currentDate,
    category: "home",
  },
  {
    title: "Plan son's birthday party",
    description: "buy a cake, candles, some balloons, and send invitations to friends and family",
    dueDate: getRandomUpcomingDate(),
    priority: "important",
    category: "home",
  },
  {
    title: "Send project",
    dueDate: currentDate,
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