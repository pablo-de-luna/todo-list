"use strict"

import { defaultList } from "./todos.js"

const createTodoCard = () => {
  console.table(defaultList.getTodos())
}

createTodoCard();
