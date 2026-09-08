"use strict"

import { defaultList, getTodoCategories } from "./todos.js";
import { todoCardsRenderer, clearTodoCards } from "./todo-cards.js"

const currentList = defaultList;
const mainBtns = document.querySelectorAll("#main-btns > li > button")

const mainBtnsHandler = () => {
  const cardRenderers = {
    "all-btn": todoCardsRenderer.renderAllTodoCards,
    "today-btn": todoCardsRenderer.renderTodayTodoCards,
    "upcoming-btn": todoCardsRenderer.renderUpcomingTodoCards,
    "overdue-btn": todoCardsRenderer.renderOverdueTodoCards,
    "anyday-btn": todoCardsRenderer.renderNoDateTodoCards,
    "important-btn": todoCardsRenderer.renderImportantTodoCards,
  };

  mainBtns.forEach(btn => btn.addEventListener("click", () => {
    const renderCards = cardRenderers[btn.id];
    if (!renderCards) return;

    clearTodoCards();
    renderCards(currentList);
  }));
};

const createCategoriesBtns = () => {
  const categories = getTodoCategories(currentList);
  const categoriesBtns = document.querySelector("#categories-btns");
  
  categories.forEach(category => {
    const categoryListItem = document.createElement("li");
    const categoryBtn = document.createElement("button");
    categoryBtn.id = `${category}-category-btn`;
    categoryBtn.setAttribute("type", "button");
    categoryBtn.textContent = `${category}`;
  
    categoriesBtns.appendChild(categoryListItem);
    categoryListItem.appendChild(categoryBtn);
  })
};


mainBtnsHandler();
createCategoriesBtns()