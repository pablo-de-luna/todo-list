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

  const updateTodoCardsOnSubmit = (form) => {
    const currentFilter = document.querySelector("#cards-container").dataset.filter;

    form.addEventListener("submit", () => { updateTodoCards(currentList, currentFilter)});
  };

const handleNewTodoBtnCard = () => {
  const newCardBtn = document.querySelector("#new-todo-card");
  const mainElem = document.querySelector("main");

  newCardBtn.addEventListener("click", () => {
    let form;

    if (mainElem.contains(document.querySelector("#todo-form"))) {
      document.querySelector("#todo-form").remove();
      return;
    }

    createTodoForm(newCardBtn);

    form = document.querySelector("#todo-form");

    handleNewTodoSubmit(form, currentList);
    updateTodoCardsOnSubmit(form);
  })
};

const handleTodoEdition = () => {
  const cardsContainer = document.querySelector("#cards-container");
  const mainElem = document.querySelector("main");

  cardsContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".todo-card");
    let todoId;
    let form;
    
    if (!card) return;

    if (mainElem.contains(document.querySelector("#todo-form"))) {
      document.querySelector("#todo-form").remove();
      return;
    }

    createTodoForm(card);

    todoId = card.dataset.id;
    form = document.querySelector("#todo-form");
    
    addTodoDataToFormValues(currentList, todoId);
    handleEditTodoSubmit(form, currentList, todoId);
    handleDeleteTodoBtn(currentList, todoId);
    updateTodoCardsOnSubmit(form);
    //CHANGE updateTodoCards and updateTodoCardsOnSubmit, the delete this ⬇⬇⬇⬇⬇
    document.querySelector("#delete-todo-btn").addEventListener("click", () => {updateTodoCards(currentList, "today")})
  });
};

const initEventHandlers = () => {
  handleFilterBtns();
  handleNewTodoBtnCard();
  handleTodoEdition();
};

export { renderProjectBtns, initEventHandlers };