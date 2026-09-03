"use strict"

import { defaultList } from "./todos.js";
import {
  renderAllTodoCards,
  renderTodayTodoCards,
  renderUpcomingTodoCards,
  renderNoDateTodoCards,
  renderImportantTodoCards,
} from "./todo-cards.js"

const currentList = defaultList;
const mainBtns = document.querySelectorAll("#main-btns > li > button")

const mainBtnsHandler = () => {
  const cardRenderers = {
    "all-btn": renderAllTodoCards,
    "today-btn": renderTodayTodoCards,
    "upcoming-btn": renderUpcomingTodoCards,
    "anyday-btn": renderNoDateTodoCards,
    "important-btn": renderImportantTodoCards,
  };

  mainBtns.forEach(btn => btn.addEventListener("click", () => {
    const renderCards = cardRenderers[btn.id];
    if (!renderCards) return;

    renderCards(currentList);
  }));
};
mainBtnsHandler();