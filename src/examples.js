import { getCurrentDate, getRandomUpcomingDate } from "./dates.js";

export const projectExamples = ["work", "home"];

export const todoExamples = [
  {
    title: "Walk dog",
    dueDate: getCurrentDate(),
    project: "home",
  },
  {
    title: "Buy groceries",
    description: "Cheese, coffee and whiskey",
    dueDate: getCurrentDate(),
    project: "home",
  },
  {
    title: 'Read "Of mice and men"',
    description: " ",
  },
  {
    title: "Plan trip to Stockholm",
    description: "compare travel options",
    dueDate: getRandomUpcomingDate(),
  },
  {
    title: "Meeting",
    description: "team sync to review progress and next steps",
    dueDate: getRandomUpcomingDate(),
    priority: "important",
    project: "work",
  },
  {
    title: "Review pull requests",
    description: "Share feedback on the API update.",
    dueDate: getCurrentDate(),
    project: "work",
  },
  {
    title: "Build a responsive portfolio",
    description: "Design and develop a polished web developer portfolio with responsive layouts, accessible navigation, project case studies, optimized images, and clear contact links, then test it across browsers and screen sizes.",
    project: "work",
  },
  {
    title: "Laundry",
    description: "Red clothes only",
    dueDate: getCurrentDate(),
    project: "home",
    status: true,
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
    status: true,
  },
  {
    title: "Send project",
    dueDate: getCurrentDate(),
    priority: "important",
    project: "work",
    status: true,
  },
  {
    title: " ",
  },
  {
    title: "Organize desk drawer",
    project: "home",
  },
];