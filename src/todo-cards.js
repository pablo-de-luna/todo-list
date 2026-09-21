import { isAfter } from "date-fns";
import { getCurrentDate, formatToRelativeDate } from "./dates.js";
import { currentList } from "./todos.js";

const cardsContainer = document.querySelector("#cards-container");

const renderTodoCard = (todo) => {
  const card = document.createElement("div");
  card.className = "todo-card";
  card.classList.add(`priority-${todo.priority}`);
  card.dataset.id = todo.id;

  const statusCheckbox = document.createElement("input");
  statusCheckbox.setAttribute("type", "checkbox");

  const title = document.createElement("div");
  title.textContent = todo.title;

  const project = document.createElement("div");
  project.textContent = todo.project;

  const dueDate = document.createElement("div");
  const relativeDate = formatToRelativeDate(todo.dueDate);
  dueDate.textContent = relativeDate;

  card.append(statusCheckbox, title, project, dueDate);
  cardsContainer.appendChild(card);
}

const handleStatusCheckbox = (list) => {
  const todoCards = document.querySelectorAll(".todo-card");

  todoCards.forEach(todoCard => {
    const checkbox = todoCard.querySelector("input");
    const todo = list.todos.find(todo => todo.id === todoCard.dataset.id);

    checkbox.checked = todo.status;

    checkbox.addEventListener("click", (e) => {
      e.stopPropagation();

      todo.toggleStatus();
    });
  });
};

export const renderTodoCardsByFilter = (list, filter) => {
  let todos = list.todos;

  if (currentList.projectNames.includes(filter)) {
    todos = list.todos.filter(todo => todo.project === filter);
    todos.forEach(todo => renderTodoCard(todo));
    handleStatusCheckbox(list);
    return;
  }

  switch (filter) {
    case "all":
      break;
    case "today":
      todos = list.todos.filter(todo => todo.dueDate && todo.dueDate === getCurrentDate());
      break;
    case "upcoming":
      todos = list.todos.filter(todo => todo.dueDate && isAfter(todo.dueDate, getCurrentDate()));
      break;
    case "anytime":
      todos = list.todos.filter(todo => !todo.dueDate);
      break;
    case "important":
      todos = list.todos.filter(todo => todo.priority === "important");
      break;
  }
  todos.forEach(todo => renderTodoCard(todo));

  handleStatusCheckbox(list);
};

export const clearTodoCards = () => { cardsContainer.textContent = "" };