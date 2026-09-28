import { currentList } from "./todos.js";
import {
  addTodoDataToFormValues,
  createTodoForm,
  createTodoCreationForm,
  deleteTodoOnDeleteBtnClick,
  updateTodoOnFormSubmission} from "./form.js";
import { updateTodoCards, renderTodoCardsByFilter } from "./todo-cards.js";
import { handleSidenav } from "./sidenav.js";

let currentFilter = "today";

export const getCurrentFilter = () => currentFilter;

export const updateCurrentFilter = (filter) => { 
  currentFilter = filter;
  console.log("Current filter = " + currentFilter);
};

export const updateMainHeader = (filter) => {
  const mainHeader = document.querySelector("#main-header");
  const nameCapitalized = filter[0].toUpperCase() + filter.slice(1).toLowerCase();

  mainHeader.textContent = nameCapitalized;
};

// -----------------------------------------------------------------------------

const closeTodoFormIfOpen = () => {
  const main = document.querySelector("main");
  const form = document.querySelector("#todo-form");

  if (main.contains(form)) {
    form.remove();
    return true;
  } else {
    return false; 
  }
};

const handleTodoCreationCard = (list) => {
  const newCardBtn = document.querySelector("#new-todo-card");

  newCardBtn.addEventListener("click", () => {
    if (closeTodoFormIfOpen()) return;

    createTodoCreationForm(newCardBtn, list);
  })
};

// -----------------------------------------------------------------------------

const updateTodoCardsOnDeleteBtnClick = () => {
  const deleteBtn = document.querySelector("#delete-todo-btn");

  deleteBtn.addEventListener("click", () => updateTodoCards(currentList, currentFilter));
};

const handleTodoEdition = () => {
  const cardsContainer = document.querySelector("#cards-container");

  cardsContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".todo-card");

    if (!card) return;
    if (closeTodoFormIfOpen()) return;

    const todoId = card.dataset.id;

    createTodoForm(card);
    addTodoDataToFormValues(currentList, todoId);
    updateTodoOnFormSubmission(currentList, todoId);
    updateTodoCardsOnFormSubmission();
    deleteTodoOnDeleteBtnClick(currentList, todoId);
    updateTodoCardsOnDeleteBtnClick();
  });
};

// -----------------------------------------------------------------------------

export const initUI = () => {
  renderTodoCardsByFilter(currentList, currentFilter);
  
  handleSidenav();

  handleTodoCreationCard(currentList, currentFilter);
  handleTodoEdition();
};
