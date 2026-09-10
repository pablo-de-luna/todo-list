// THE LORD IS MY SHEPHERD, I LACK NOTHING

"use strict"

import "./style.css";

import { handleStatusCheckbox, todoCardsRenderer } from "./todo-cards.js";
import { currentList } from "./todos.js";
import { renderProjectBtns, initBtnsHandlers } from "./ui-controller.js";

renderProjectBtns();
initBtnsHandlers();

todoCardsRenderer.renderTodayTodoCards(currentList);
handleStatusCheckbox(currentList);