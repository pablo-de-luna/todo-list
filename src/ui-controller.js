import { currentList } from "./todos.js";
import {
  addTodoDataToFormValues,
  createTodoForm,
  handleDeleteTodoBtn,
  handleEditTodoSubmit,
  handleNewTodoSubmit} from "./form.js";
import { clearTodoCards, renderTodoCardsByFilter } from "./todo-cards.js"

// ---- INITIALIZATION ---------------------------------------------------------

export function renderNavBtns() {
  renderNewProjectBtn();
  renderProjectBtns();
}

export function initEventHandlers() {
  handleFilterBtns();
  toggleNewProjectBtn();
  handleNewTodoBtnCard();
  handleTodoEdition();
}

// ---- FILTERS ----------------------------------------------------------------

function handleFilterBtns() {
  const nav = document.querySelector("#nav-btns");

  nav.addEventListener("click", (e) => {
    const filterBtn = e.target.closest(".filter-btn");
    
    if (!filterBtn) return;
    
    const filter = filterBtn.dataset.filter;

    updateMainHeader(filter);
    updateCardsContainerDatasetFilter(filter);
    updateTodoCards(filter);
  });
}

function renderProjectBtns() {
  const projects = currentList.projectNames;
  const projectsBtns = document.querySelector("#nav-projects-btns");
  
  projects.forEach(project => {
    if (project === "default") return;

    const projectListItem = document.createElement("li");
    const projectBtn = document.createElement("button");
    projectBtn.dataset.filter = project;
    projectBtn.className = "filter-btn";
    projectBtn.setAttribute("type", "button");
    projectBtn.textContent = project;
  
    projectsBtns.appendChild(projectListItem);
    projectListItem.appendChild(projectBtn);
  })
}

function updateProjectBtns() {
  const projectsBtns = document.querySelector("#nav-projects-btns");

  projectsBtns.textContent = "";

  renderNewProjectBtn();
  toggleNewProjectBtn();
  renderProjectBtns();
}

function updateMainHeader(filter) {
  const mainHeader = document.querySelector("#main-header");
  const nameCapitalized = filter[0].toUpperCase() + filter.slice(1).toLowerCase();

  mainHeader.textContent = nameCapitalized;
}

function updateCardsContainerDatasetFilter(filter) {
  const cardsContainer = document.querySelector("#cards-container");

  cardsContainer.dataset.filter = filter;
}

function updateTodoCards(filter) {
  clearTodoCards();
  renderTodoCardsByFilter(currentList, filter);
}

// ---- PROJECTS MANIPULATION --------------------------------------------------

function renderNewProjectBtn() {
  const navProjectsBtns = document.querySelector("#nav-projects-btns");
  const listItem = document.createElement("li");
  const button = document.createElement("button");

  button.id = "new-project-btn";
  button.type = "button";
  button.textContent = "+ New project";

  listItem.append(button);
  navProjectsBtns.append(listItem);
}

function toggleNewProjectBtn() {
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
}

function renderNewProjectForm() {
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
}

function handleAddProjectBtn() {
  const addBtn = document.querySelector("#new-project-form button");
  const input = document.querySelector("#new-project-form input");
  
  addBtn.addEventListener("click", () => {
    if (input.value.trim() === "") return;

    currentList.addProject(input.value.toLowerCase());
    updateProjectBtns();
  });
}

// ---- TODO CREATION / FORM ---------------------------------------------------

function handleNewTodoBtnCard() {
  const newCardBtn = document.querySelector("#new-todo-card");

  newCardBtn.addEventListener("click", () => {
    if (closeTodoFormIfOpen()) return;

    createTodoForm(newCardBtn);
    handleNewTodoSubmit(currentList);
    updateTodoCardsOnSubmit();
  })
}

function handleTodoEdition() {
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
}

function closeTodoFormIfOpen() {
  const main = document.querySelector("main");
  const form = document.querySelector("#todo-form");

  if (main.contains(form)) {
    form.remove();
    return true;
  } else {
    return false; 
  }
}

function updateTodoCardsByCurrentFilter() {
  const currentFilter = document.querySelector("#cards-container").dataset.filter;

  updateTodoCards(currentFilter);
}

function updateTodoCardsOnSubmit() {
  const form = document.querySelector("#todo-form");

  form.addEventListener("submit", updateTodoCardsByCurrentFilter);
}

function updateTodoCardsOnDelete() {
  const deleteBtn = document.querySelector("#delete-todo-btn");

  deleteBtn.addEventListener("click", updateTodoCardsByCurrentFilter);
}