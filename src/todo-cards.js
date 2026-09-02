"use strict"

import { format, isAfter } from "date-fns"
import { defaultList } from "./todos.js"

const cardsContainer = document.querySelector("#cards-container");

const currentDate = format(new Date(), "yyyy-MM-dd");

// ↓↓↓ TODO functions ↓↓↓
  // EXPAND Card
  // EDIT Card
  // DELETE Card

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
  dueDate.textContent = todo.dueDate;

  [statusCheckbox, title, category, dueDate].forEach(element => {
    card.appendChild(element);
  });
  
  cardsContainer.appendChild(card);
}

const addAllTodoCards = (list) => { 
  list.todos.forEach(todo => createTodoCard(todo));
};

const addTodayTodoCards = (list) => {
  list.todos.forEach(todo => {
    if (todo.dueDate === currentDate) {
      createTodoCard(todo);
    }
  })
};

const addUpcomingTodoCards = (list) => {
  list.todos.forEach(todo => {
    if (isAfter(todo.dueDate, currentDate)) {
      createTodoCard(todo);
    }
  });
};
