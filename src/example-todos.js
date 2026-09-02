"use strict"

import { Todo } from "./todos.js";
import { format, addDays } from "date-fns";

// Date for testing
const todayDate = format(new Date(), "yyyy-MM-dd");

// today date plus random number of days (between 2 and 7) for testing
const getRandomInt = () => Math.floor(Math.random() * 6 + 2);
const getRandomUpcomingDate = () => {
  return format(addDays(todayDate, getRandomInt()), "yyyy-MM-dd");
};

const todoExamples = [
  {
    title: "Buy groceries",
    description: "pick up fruit and coffee",
    dueDate: todayDate,
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
    priority: "important",
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
  },
  {
    title: "Laundry",
    description: "only reds",
    dueDate: todayDate,
    category: "home",
  },
  {
    title: "Plan son's birthday party",
    description: "buy a cake, candles, some balloons, and send invitations to friends and family",
    dueDate: todayDate,
    priority: "important",
    category: "home",
  },
  {
    title: "Send project",
    dueDate: getRandomUpcomingDate(),
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