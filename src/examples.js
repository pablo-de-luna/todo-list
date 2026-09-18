import { Todo } from "./todos.js";
import { currentDate, getRandomUpcomingDate } from "./dates.js";

const projectExamples = ["work", "home"];

const todoExamples = [
  {
    title: "Buy groceries",
    description: "pick up fruit and coffee",
    dueDate: currentDate,
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
    dueDate: currentDate,
  },
  {
    title: "Laundry",
    description: "only reds",
    dueDate: currentDate,
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
    dueDate: currentDate,
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

const addExampleTodos = (list) => {
  todoExamples.forEach(todo => list.addTodo(new Todo(todo)))
}

export { addExampleTodos, projectExamples};