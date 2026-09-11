// THE LORD IS MY SHEPHERD, I LACK NOTHING

"use strict"

import "./style.css";

import { renderTodoCardsByFilter, handleStatusCheckbox } from "./todo-cards.js";
import { currentList } from "./todos.js";
import { renderProjectBtns, initEventHandlers } from "./ui-controller.js";

renderProjectBtns();
initEventHandlers();

renderTodoCardsByFilter(currentList, "today");
handleStatusCheckbox(currentList);

