// THE LORD IS MY SHEPHERD, I LACK NOTHING

"use strict"

import "./style.css";

import { todoCardsRenderer } from "./cards.js";
import { currentList } from "./todos.js";
// TODO Import only necessary things ⬇⬇⬇⬇⬇⬇    
import "./ui-controller.js";

todoCardsRenderer.renderTodayTodoCards(currentList);