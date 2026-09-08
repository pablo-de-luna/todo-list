"use strict"

import { defaultList, getTodoCategories } from "./todos.js";
import { todoCardsRenderer, clearTodoCards } from "./todo-cards.js"

const currentList = defaultList;

const filterBtnsHandler = () => {
  const filterBtns = document.querySelectorAll(".filter-btn")
  const cardRenderers = {
    "all": todoCardsRenderer.renderAllTodoCards,
    "today": todoCardsRenderer.renderTodayTodoCards,
    "upcoming": todoCardsRenderer.renderUpcomingTodoCards,
    "overdue": todoCardsRenderer.renderOverdueTodoCards,
    "anyday": todoCardsRenderer.renderNoDateTodoCards,
    "important": todoCardsRenderer.renderImportantTodoCards,
  };

  filterBtns.forEach(btn => btn.addEventListener("click", () => {
    const renderCards = cardRenderers[btn.dataset.filter];
    if (!renderCards) return;

    clearTodoCards();
    renderCards(currentList);
  }));
};

const renderCategoryBtns = () => {
  const categories = getTodoCategories(currentList);
  const categoriesBtns = document.querySelector("#nav-categories-btns");
  
  categories.forEach(category => {
    const categoryListItem = document.createElement("li");
    const categoryBtn = document.createElement("button");
    categoryBtn.dataset.category = category;
    categoryBtn.className = "category-btn";
    categoryBtn.setAttribute("type", "button");
    categoryBtn.textContent = `${category}`;
  
    categoriesBtns.appendChild(categoryListItem);
    categoryListItem.appendChild(categoryBtn);
  })
};

const categoryBtnsHandler = () => {
  const categoryBtns = document.querySelectorAll(".category-btn"); 

  categoryBtns.forEach(btn => btn.addEventListener("click", () => {
    const category = btn.dataset.category;

    clearTodoCards();
    todoCardsRenderer.renderCategoryTodoCards(currentList, category);
  }));
};


filterBtnsHandler();
renderCategoryBtns()
categoryBtnsHandler();