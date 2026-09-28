import { currentList } from "./todos.js";
import { createTodoCreationForm, createTodoEditionForm} from "./form.js";
import { renderTodoCardsByFilter } from "./todo-cards.js";
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

const handleTodoEdition = (list) => {
  const cardsContainer = document.querySelector("#cards-container");

  cardsContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".todo-card");

    if (!card) return;
    if (closeTodoFormIfOpen()) return;

    const todoID = card.dataset.id;

    createTodoEditionForm(card, list, todoID);
  });
};

export const initUI = () => {
  // Set "today" todo cards when page is loaded
  renderTodoCardsByFilter(currentList, currentFilter);
  
  handleSidenav();

  handleTodoCreationCard(currentList);
  handleTodoEdition(currentList);
};
