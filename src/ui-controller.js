"use strict"

import { currentList } from "./todos.js";
import { createTodoForm, handleFormSubmit } from "./form.js";
import { clearTodoCards, renderTodoCardsByFilter, handleStatusCheckbox } from "./todo-cards.js"

const handleNewTodoCard = () => {
  const main = document.querySelector("main");
  const newTodoCard = document.querySelector("#new-todo-card");

  newTodoCard.addEventListener("click", () => {
    if (main.contains(document.querySelector("#todo-form"))) {
      main.removeChild(document.querySelector("#todo-form"));
    } else {
      createTodoForm(newTodoCard);
      const form = document.querySelector("#todo-form");
      handleFormSubmit(form, currentList);
    }
  });
};

const updateMainHeader = (filter) => {
  const mainHeader = document.querySelector("#main-header");
  const nameCapitalized = filter[0].toUpperCase() + filter.slice(1).toLowerCase();

  mainHeader.textContent = nameCapitalized;
};

const updateCardsContainerDatasetFilter = (filter) => {
  const cardsContainer = document.querySelector("#cards-container");

  cardsContainer.dataset.filter = filter;
};

const renderProjectBtns = () => {
  const projects = currentList.projectNames;
  const projectsBtns = document.querySelector("#nav-projects-btns");
  
  projects.forEach(project => {
    if (project === "default") return;

    const projectListItem = document.createElement("li");
    const projectBtn = document.createElement("button");
    projectBtn.dataset.filter = project;
    projectBtn.className = "filter-btn";
    projectBtn.setAttribute("type", "button");
    projectBtn.textContent = `${project}`;
  
    projectsBtns.appendChild(projectListItem);
    projectListItem.appendChild(projectBtn);
  })
};

const handleNavFilterBtns = () => {
  const filterBtns = document.querySelectorAll(".filter-btn")

  filterBtns.forEach(btn => btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    
    updateMainHeader(filter);
    updateCardsContainerDatasetFilter(filter);

    clearTodoCards();
    renderTodoCardsByFilter(currentList, filter);
    handleStatusCheckbox(currentList);
  }));
};

const initEventHandlers = () => {
  handleNavFilterBtns();
  handleNewTodoCard();
};

export { renderProjectBtns, initEventHandlers };