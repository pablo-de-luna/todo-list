// THE LORD IS MY SHEPHERD, I LACK NOTHING

"use strict"

import "./style.css";
import { defaultList } from "./todos.js";
import addExampleTodos from "./example-todos.js";

addExampleTodos();
console.table(defaultList.getTodos());