import { isAfter } from "date-fns";
import { getCurrentDate, formatToRelativeDate } from "./dates.js";

const cardsContainer = document.querySelector("#cards-container");

const renderTodoCard = (todo) => {
  const card = document.createElement("div");
  card.className = "todo-card";
  card.classList.add(`priority-${todo.priority}`);
  card.dataset.id = todo.id;

  const checkboxContainer = document.createElement("div");

    const statusCheckbox = document.createElement("input");
    statusCheckbox.className = "todo-card-checkbox";
    statusCheckbox.setAttribute("type", "checkbox");

  const todoInfoContainer = document.createElement("div");
  todoInfoContainer.className = "todo-card-info";

  const title = document.createElement("div");
  title.className = "todo-card-title";
  title.textContent = todo.title;

  const description = document.createElement("div");
  description.className = "todo-card-description"; 
  description.textContent = todo.description;
  if (todo.description === "No description") {
    description.classList.add("hidden");
  }

  const project = document.createElement("div");
  const nameCapitalized = todo.project[0].toUpperCase() + todo.project.slice(1).toLowerCase();
  project.textContent = nameCapitalized;
  if (todo.project === "default") {
    project.classList.add("hidden");
  }

  const dueDate = document.createElement("div");
  const relativeDate = formatToRelativeDate(todo.dueDate);
  dueDate.textContent = relativeDate;

  checkboxContainer.append(statusCheckbox);
  todoInfoContainer.append(title, description, project, dueDate);
  card.append(checkboxContainer, todoInfoContainer);
  cardsContainer.appendChild(card);
}

const handleStatusCheckbox = (list) => {
  const todoCards = document.querySelectorAll(".todo-card");

  todoCards.forEach(todoCard => {
    const checkbox = todoCard.querySelector(".todo-card-checkbox");
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

  if (list.projectNames.includes(filter)) {
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

const clearTodoCards = () => { cardsContainer.textContent = "" };

export const updateTodoCards = (list, filter) => {
  clearTodoCards();
  renderTodoCardsByFilter(list, filter);
};