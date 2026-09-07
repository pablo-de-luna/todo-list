"use strict"

import { defaultList } from "./todos.js";
import { todoCardsRenderer } from "./todo-cards.js"

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

    renderCards(currentList);
  }));
};
mainBtnsHandler();