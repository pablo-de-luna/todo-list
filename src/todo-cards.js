"use strict"

import { defaultList } from "./todos.js"

const cardsContainer = document.querySelector("#cards-container");

// CREATE Card
  // Title
  // Category
  // Date
  // Status checkbox
  // Priority tag

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

const createTodoCardsFromList = (list) => { 
  defaultList.todos.forEach(todo => createTodoCard(todo));
};
createTodoCardsFromList();


