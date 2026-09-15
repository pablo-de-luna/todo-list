// THE LORD IS MY SHEPHERD, I LACK NOTHING

"use strict"

import "./style.css";

import { renderTodoCardsByFilter } from "./todo-cards.js";
import { currentList } from "./todos.js";
import { renderProjectBtns, initEventHandlers } from "./ui-controller.js";

renderTodoCardsByFilter(currentList, "today");

renderProjectBtns();
initEventHandlers();