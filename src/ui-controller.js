"use strict"

import { currentList } from "./todos.js";
import { addTodoDataToFormValues, createTodoForm, handleEditTodoSubmit, handleNewTodoSubmit} from "./form.js";
import { clearTodoCards, renderTodoCardsByFilter, handleStatusCheckbox } from "./todo-cards.js"

const updateMainHeader = (filter) => {
  const mainHeader = document.querySelector("#main-header");
  const nameCapitalized = filter[0].toUpperCase() + filter.slice(1).toLowerCase();

  mainHeader.textContent = nameCapitalized;
};

const updateTodoCards = (list, filter) => {
  clearTodoCards();
  renderTodoCardsByFilter(list, filter);
  handleStatusCheckbox(list);
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

const handleFilterBtns = () => {
  const filterBtns = document.querySelectorAll(".filter-btn")

  filterBtns.forEach(btn => btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    
    updateMainHeader(filter);
    updateCardsContainerDatasetFilter(filter);
    updateTodoCards(currentList, filter);
  }));
};

  const updateTodoCardsOnSubmit = (form) => {
    const currentFilter = document.querySelector("#cards-container").dataset.filter;

    form.addEventListener("submit", () => { updateTodoCards(currentList, currentFilter)});
  };

const handleNewTodoBtnCard = () => {
  const newCardBtn = document.querySelector("#new-todo-card");

  newCardBtn.addEventListener("click", () => {
    let form = document.querySelector("#todo-form");

    if (form) {
      form.remove();
      return;
    }

    createTodoForm(newCardBtn);
    form = document.querySelector("#todo-form");
    handleNewTodoSubmit(form, currentList);
    updateTodoCardsOnSubmit(form);
  })
};

const handleTodoEdition = () => {

};

const initEventHandlers = () => {
  handleFilterBtns();
  handleNewTodoBtnCard();
  handleTodoEdition();
};

export { renderProjectBtns, initEventHandlers };