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
  statusCheckbox.setAttribute("type", "checkbox")

  const title = document.createElement("div");
  title.textContent = todo.title;

  const category = document.createElement("div");
  category.textContent = todo.category;

  const dueDate = document.createElement("div");
  const relativeDate = formatToRelativeDate(todo.dueDate);
  dueDate.textContent = relativeDate;

  [statusCheckbox, title, category, dueDate].forEach(element => {
    card.appendChild(element);
  });
  
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

const renderCategoryTodoCards = (list, category) => {
  list.todos
  .filter(todo => todo.category === category)
  .forEach(todo => createTodoCard(todo));
};

const todoCardsRenderer = {
  renderAllTodoCards,
  renderTodayTodoCards,
  renderUpcomingTodoCards,
  renderOverdueTodoCards,
  renderNoDateTodoCards,
  renderImportantTodoCards,
  renderCategoryTodoCards,
};

export { createTodoCard, todoCardsRenderer, clearTodoCards };