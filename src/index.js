// THE LORD IS MY SHEPHERD, I LACK NOTHING

"use strict"

import "./style.css";

import { handleStatusCheckbox, todoCardsRenderer } from "./todo-cards.js";
import { currentList } from "./todos.js";
import { renderProjectBtns, initEventHandlers } from "./ui-controller.js";

renderProjectBtns();
initEventHandlers();

todoCardsRenderer.renderTodayTodoCards(currentList);
handleStatusCheckbox(currentList);

