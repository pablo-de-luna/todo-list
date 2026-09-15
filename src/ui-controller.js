"use strict"

import { currentList } from "./todos.js";
import { addTodoDataToFormValues, createTodoForm, handleDeleteTodoBtn, handleEditTodoSubmit, handleNewTodoSubmit} from "./form.js";
import { clearTodoCards, renderTodoCardsByFilter } from "./todo-cards.js"

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

const updateMainHeader = (filter) => {
  const mainHeader = document.querySelector("#main-header");
  const nameCapitalized = filter[0].toUpperCase() + filter.slice(1).toLowerCase();

  mainHeader.textContent = nameCapitalized;
};

const updateCardsContainerDatasetFilter = (filter) => {
  const cardsContainer = document.querySelector("#cards-container");

  cardsContainer.dataset.filter = filter;
};

const updateTodoCards = (list, filter) => {
  clearTodoCards();
  renderTodoCardsByFilter(list, filter);
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

  const updateTodoCardsByCurrentFilter = () => {
    const currentFilter = document.querySelector("#cards-container").dataset.filter;

    updateTodoCards(currentList, currentFilter);
  };

const toggleTodoForm = () => {
  const main = document.querySelector("main");
  const form = document.querySelector("#todo-form");

  if (main.contains(form)) {
    form.remove();
    return true;
  } else {
    return false; 
  }
};

const updateTodoCardsOnSubmit = () => {
  const form = document.querySelector("#todo-form");

  form.addEventListener("submit", () => { updateTodoCardsByCurrentFilter()});
}

const handleNewTodoBtnCard = () => {
  const newCardBtn = document.querySelector("#new-todo-card");

  newCardBtn.addEventListener("click", () => {
    if (toggleTodoForm()) return;

    createTodoForm(newCardBtn);
    handleNewTodoSubmit(currentList);
    updateTodoCardsOnSubmit();
  })
};

const updateTodoCardsOnDelete = () => {
  const deleteBtn = document.querySelector("#delete-todo-btn");

  deleteBtn.addEventListener("click", () => {updateTodoCardsByCurrentFilter()})
}

const handleTodoEdition = () => {
  const cardsContainer = document.querySelector("#cards-container");

  cardsContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".todo-card");

    if (!card) return;
    if (toggleTodoForm()) return;

    const todoId = card.dataset.id;

    createTodoForm(card);
    addTodoDataToFormValues(currentList, todoId);
    handleEditTodoSubmit(currentList, todoId);
    handleDeleteTodoBtn(currentList, todoId);
    updateTodoCardsOnSubmit();
    updateTodoCardsOnDelete();
  });
};

const initEventHandlers = () => {
  handleFilterBtns();
  handleNewTodoBtnCard();
  handleTodoEdition();
};

export { renderProjectBtns, initEventHandlers };