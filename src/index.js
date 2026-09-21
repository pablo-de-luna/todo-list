// THE LORD IS MY SHEPHERD, I LACK NOTHING

import "./style.css";

import { renderTodoCardsByFilter } from "./todo-cards.js";
import { currentList } from "./todos.js";
import { initUI } from "./ui-controller.js";

renderTodoCardsByFilter(currentList, "today");

initUI();