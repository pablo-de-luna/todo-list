"use strict"

import { isAfter, isBefore } from "date-fns";
import { currentDate, formatToRelativeDate } from "./dates.js";

const cardsContainer = document.querySelector("#cards-container");

const createTodoCard = (todo) => {
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
};

const clearTodoCards = () => { cardsContainer.textContent = "" };

const renderAllTodoCards = (list) => { 
  list.todos.forEach(todo => createTodoCard(todo));
};

const renderTodayTodoCards = (list) => {
  list.todos
    .filter(todo => todo.dueDate && todo.dueDate === currentDate)
    .forEach(todo => createTodoCard(todo));
};

const renderUpcomingTodoCards = (list) => {
  list.todos
    .filter(todo => todo.dueDate && isAfter(todo.dueDate, currentDate))
    .forEach(todo => createTodoCard(todo));
};

const renderOverdueTodoCards = (list) => {
  list.todos
    .filter(todo => todo.dueDate && isBefore(todo.dueDate, currentDate))
    .forEach(todo => createTodoCard(todo));
};

const renderNoDateTodoCards = (list) => {
  list.todos.filter(todo => !todo.dueDate).forEach(todo => createTodoCard(todo));
};

const renderImportantTodoCards = (list) => {
  list.todos
    .filter(todo => todo.priority === "important")
    .forEach(todo => createTodoCard(todo));
};

const renderProjectTodoCards = (list, project) => {
  list.todos
    .filter(todo => todo.project === project)
    .forEach(todo => createTodoCard(todo));
};

const todoCardsRenderer = {
  renderAllTodoCards,
  renderTodayTodoCards,
  renderUpcomingTodoCards,
  renderOverdueTodoCards,
  renderNoDateTodoCards,
  renderImportantTodoCards,
  renderProjectTodoCards,
};

const handleStatusCheckbox = (list) => {
  const todoCards = document.querySelectorAll(".todo-card");

  todoCards.forEach(todoCard => {
    const checkbox = todoCard.querySelector("input");
    const todo = list.todos.find(todo => todo.id === todoCard.dataset.id);

    checkbox.checked = todo.status;

    checkbox.addEventListener("click", () => {
      todo.toggleStatus();
    });
  });
};

export { todoCardsRenderer, clearTodoCards, handleStatusCheckbox };