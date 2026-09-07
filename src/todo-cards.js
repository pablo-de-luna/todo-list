"use strict"

import { isAfter } from "date-fns";
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
}

const clearTodoCards = () => { cardsContainer.textContent = "" };

const renderAllTodoCards = (list) => { 
  clearTodoCards();
  list.todos.forEach(todo => createTodoCard(todo));
};

const renderTodayTodoCards = (list) => {
  clearTodoCards();
  list.todos.forEach(todo => {
    if (todo.dueDate === currentDate) {
      createTodoCard(todo);
    }
  })
};

const renderUpcomingTodoCards = (list) => {
  clearTodoCards();
  list.todos.forEach(todo => {
    if (isAfter(todo.dueDate, currentDate)) {
      createTodoCard(todo);
    }
  });
};

// TODO Render overdue cards

const renderNoDateTodoCards = (list) => {
  clearTodoCards();
  list.todos.forEach(todo => {
    if (!todo.dueDate) {
      createTodoCard(todo);
    }
  });
}

const renderImportantTodoCards = (list) => {
  clearTodoCards();
  list.todos.forEach(todo => {
    if (todo.priority === "important") {
      createTodoCard(todo);
    }
  });
}

const todoCardsRenderer = {
  renderAllTodoCards,
  renderTodayTodoCards,
  renderUpcomingTodoCards,
  renderNoDateTodoCards,
  renderImportantTodoCards,
}

export { createTodoCard, todoCardsRenderer }