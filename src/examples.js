import { Todo } from "./todos.js";
import { getCurrentDate, getRandomUpcomingDate } from "./dates.js";

export const projectExamples = ["work", "home"];

const todoExamples = [
  {
    title: "Buy groceries",
    description: "pick up fruit and coffee",
    dueDate: getCurrentDate(),
    project: "home",
  },
  {
    title: "Read book",
    description: " ",
  },
  {
    title: "Plan trip",
    description: "compare travel options",
    dueDate: getRandomUpcomingDate(),
  },
  {
    title: "Meeting",
    description: "team sync",
    dueDate: getRandomUpcomingDate(),
    priority: "important",
    project: "work",
  },
  {
    title: "Walk dog",
    dueDate: getCurrentDate(),
  },
  {
    title: "Laundry",
    description: "only reds",
    dueDate: getCurrentDate(),
    project: "home",
  },
  {
    title: "Plan son's birthday party",
    description: "buy a cake, candles, some balloons, and send invitations to friends and family",
    dueDate: getRandomUpcomingDate(),
    priority: "important",
    project: "home",
  },
  {
    title: "Buy lego",
    description: "Lego technic Liebherr R 9800",
    dueDate: "2026-08-12",
  },
  {
    title: "Send project",
    dueDate: getCurrentDate(),
    priority: "important",
    project: "work",
  },
  {
    title: " ",
  },
  {
    title: "Organize desk drawer",
    project: "home",
  },
];

export const addExampleTodos = (list) => {
  todoExamples.forEach(todo => list.addTodo(new Todo(todo)))
}