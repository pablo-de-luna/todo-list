import { currentList } from "./todos.js";
import { createTodoCreationForm, createTodoEditionForm} from "./form.js";
import { renderTodoCardsByFilter } from "./todo-cards.js";
import { handleSidenav } from "./sidenav.js";

let currentFilter = "today";

export const getCurrentFilter = () => currentFilter;

export const updateCurrentFilter = (filter) => { 
  currentFilter = filter;
};

export const updateMainHeader = (filter) => {
  const mainHeader = document.querySelector("#main-header");
  const nameCapitalized = filter[0].toUpperCase() + filter.slice(1).toLowerCase();

  mainHeader.textContent = nameCapitalized;
};

const removeHiddenSelectorFromAllCards = () => { 
  const todoCards = document.querySelectorAll(".todo-card");

  todoCards.forEach(card => {
    if (card.classList.contains("hidden")) {
      card.classList.remove("hidden");
    }
  })
};

const toggleHiddenSelector = (todoCard) => {
  const form = document.querySelector("#todo-form");

  if (todoCard.classList.contains("hidden")) {
    todoCard.classList.remove("hidden");
  } else {
    todoCard.classList.add("hidden");
  }

  form.addEventListener("submit", () => {
      todoCard.classList.remove("hidden");
  });
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

const closeFormOnOutsideClick = () => {
  const form = document.querySelector("#todo-form");
  
  const handler = (e) => {

  };

  window.addEventListener("click", handler);
};

const handleTodoCreationCard = (list) => {
  const newCardBtn = document.querySelector("#new-todo-card");

  newCardBtn.addEventListener("click", (e) => {
    removeHiddenSelectorFromAllCards();
    if (closeTodoFormIfOpen()) return;
    createTodoCreationForm(newCardBtn, list);
    closeFormOnOutsideClick();
  })
};

const handleTodoEdition = (list) => {
  const cardsContainer = document.querySelector("#cards-container");

  cardsContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".todo-card");

    if (!card) return;
    removeHiddenSelectorFromAllCards();
    if (closeTodoFormIfOpen()) return;

    const todoID = card.dataset.id;

    createTodoEditionForm(card, list, todoID);
    closeFormOnOutsideClick(card);
    toggleHiddenSelector(card);
  });
};

export const initUI = () => {
  // Set "today" todo cards when page is loaded
  renderTodoCardsByFilter(currentList, currentFilter);
  
  handleSidenav();

  handleTodoCreationCard(currentList);
  handleTodoEdition(currentList);
};
