import { currentList } from "./todos.js";
import {
  addTodoDataToFormValues,
  createTodoForm,
  handleDeleteTodoBtn,
  handleEditTodoSubmit,
  handleNewTodoSubmit} from "./form.js";
import { clearTodoCards, renderTodoCardsByFilter } from "./todo-cards.js";

let currentFilter = "today";

const updateTodoCards = () => {
  clearTodoCards();
  renderTodoCardsByFilter(currentList, currentFilter);
};

const renderProjectBtn = (projectName) => {
  const navBtnsList = document.querySelector("#nav-projects-btns");

  const projectListItem = document.createElement("li");
  const projectBtn = document.createElement("button");
  projectBtn.dataset.filter = projectName;
  projectBtn.className = "filter-btn";
  projectBtn.setAttribute("type", "button");
  projectBtn.textContent = projectName;

  projectListItem.appendChild(projectBtn);
  navBtnsList.appendChild(projectListItem);
};

// ---- NAV BUTTONS ------------------------------------------------------------

const renderFilterByProjectBtns = () => {
  const projects = currentList.projectNames;
  
  projects.forEach(project => {
    if (project === "default") return;
    renderProjectBtn(project);
  })
};

const updateCurrentFilter = (filter) => { currentFilter = filter };

const updateMainHeader = (filter) => {
  const mainHeader = document.querySelector("#main-header");
  const nameCapitalized = filter[0].toUpperCase() + filter.slice(1).toLowerCase();

  mainHeader.textContent = nameCapitalized;
};

const handleFilterBtns = () => {
  const nav = document.querySelector("#nav-btns");

  nav.addEventListener("click", (e) => {
    const filterBtn = e.target.closest(".filter-btn");
    
    if (!filterBtn) return;
    
    const filter = filterBtn.dataset.filter;

    updateCurrentFilter(filter);
    updateMainHeader(currentFilter);
    updateTodoCards();
  });
};

const renderNewProjectForm = () => {
  const btnParent = document.querySelector("#new-project-btn").parentElement;
  const listItem = document.createElement("li");
  const input = document.createElement("input");
  const addBtn = document.createElement("button");

  listItem.id = "new-project-form";
  input.type = "text";
  addBtn.type = "button";
  addBtn.textContent = "Add";

  listItem.append(input, addBtn);
  btnParent.after(listItem);
};

const handleAddProjectBtn = () => {
  const addBtn = document.querySelector("#new-project-form button");
  const input = document.querySelector("#new-project-form input");
  
  addBtn.addEventListener("click", () => {
    if (input.value.trim() === "") return;

    currentList.addProject(input.value.toLowerCase());
    renderProjectBtn(input.value);
  });
};

const renderNewProjectBtn = () => {
  const navProjectsBtns = document.querySelector("#nav-projects-btns");
  const listItem = document.createElement("li");
  const button = document.createElement("button");

  button.id = "new-project-btn";
  button.type = "button";
  button.textContent = "+ New project";

  listItem.append(button);
  navProjectsBtns.append(listItem);
};

const handleNewProjectBtn = () => {
  const btn = document.querySelector("#new-project-btn");

  btn.addEventListener("click", () => {
    const newProjectForm = document.querySelector("#new-project-form");

    if (newProjectForm) {
      btn.textContent = "+ New project";
      newProjectForm.remove();
    } else {
      btn.textContent = "Close";
      renderNewProjectForm();
      handleAddProjectBtn();
    }
  });
};

// ---- CARDS ------------------------------------------------------------------

const handleNewTodoBtnCard = () => {
  const newCardBtn = document.querySelector("#new-todo-card");

  newCardBtn.addEventListener("click", () => {
    if (closeTodoFormIfOpen()) return;

    createTodoForm(newCardBtn);
    handleNewTodoSubmit(currentList);
    updateTodoCardsOnSubmit();
  })
};

const handleTodoEdition = () => {
  const cardsContainer = document.querySelector("#cards-container");

  cardsContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".todo-card");

    if (!card) return;
    if (closeTodoFormIfOpen()) return;

    const todoId = card.dataset.id;

    createTodoForm(card);
    addTodoDataToFormValues(currentList, todoId);
    handleEditTodoSubmit(currentList, todoId);
    handleDeleteTodoBtn(currentList, todoId);
    updateTodoCardsOnSubmit();
    updateTodoCardsOnDelete();
  });
};

const closeTodoFormIfOpen = () => {
  const main = document.querySelector("main");
  const form = document.querySelector("#todo-form");

  if (main.contains(form)) {
    form.remove();
    return true;
  } else {
    return false; 
  }
};

const updateTodoCardsOnSubmit = () => {
  const form = document.querySelector("#todo-form");

  form.addEventListener("submit", () => { updateTodoCards() });
};

const updateTodoCardsOnDelete = () => {
  const deleteBtn = document.querySelector("#delete-todo-btn");

  deleteBtn.addEventListener("click", () => { updateTodoCards() });
};

// ---- INITIALIZATION ---------------------------------------------------------

export const initUI = () => {
  renderTodoCardsByFilter(currentList, currentFilter);

  renderNewProjectBtn();
  renderFilterByProjectBtns();

  handleFilterBtns();
  handleNewProjectBtn();

  handleNewTodoBtnCard();
  handleTodoEdition();
};
