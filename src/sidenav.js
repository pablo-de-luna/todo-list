import { currentList } from "./todos.js";
import { updateCurrentFilter, updateMainHeader } from "./ui-controller.js";
import { updateTodoCards } from "./todo-cards.js";

const renderNavProjectBtns = (projectName) => {
  const navBtnsList = document.querySelector("#nav-projects-btns");

  const projectListItem = document.createElement("li");
  const projectBtn = document.createElement("button");
    projectBtn.dataset.filter = projectName;
    projectBtn.className = "filter-btn";
    projectBtn.setAttribute("type", "button");
    projectBtn.textContent = projectName;

  const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "edit-project-btn";
    editBtn.textContent = "edit";

  const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-project-btn";
    deleteBtn.textContent = "delete";

  projectListItem.append(projectBtn, editBtn, deleteBtn);
  navBtnsList.appendChild(projectListItem);
};

const renderNavProjectBtnsForEachProject = (list) => {
  const projects = list.projectNames;
  
  projects.forEach(project => {
    if (project === "default") return;
    renderNavProjectBtns(project);
  })
};

const handleNavFilterBtns = (list) => {
  const nav = document.querySelector("#nav-btns");

  nav.addEventListener("click", (e) => {
    const filterBtn = e.target.closest(".filter-btn");
    
    if (!filterBtn) return;
    
    const filter = filterBtn.dataset.filter;

    updateCurrentFilter(filter);
    updateMainHeader(filter);
    updateTodoCards(list, filter);
  });
};

// ---- PROJECT CREATION -------------------------------------------------------

const renderProjectCreationBtn = () => {
  const navProjectsBtns = document.querySelector("#nav-projects-btns");
  const listItem = document.createElement("li");
  const button = document.createElement("button");

  button.id = "new-project-btn";
  button.type = "button";
  button.textContent = "+ New project";

  listItem.append(button);
  navProjectsBtns.append(listItem);
};

const renderProjectCreationForm = () => {
  const btnParent = document.querySelector("#new-project-btn").parentElement;
  const listItem = document.createElement("li");
  const input = document.createElement("input");
  const addBtn = document.createElement("button");

  listItem.id = "project-creation-form";
  input.type = "text";
  addBtn.type = "button";
  addBtn.textContent = "Add";

  listItem.append(input, addBtn);
  btnParent.after(listItem);
};

const handleProjectCreationFormAddBtn = (list) => {
  const newProjectBtn = document.querySelector("#new-project-btn");
  const projectCreationForm = document.querySelector("#project-creation-form");
  const addBtn = document.querySelector("#project-creation-form button");
  const input = document.querySelector("#project-creation-form input");
  
  addBtn.addEventListener("click", () => {
    if (input.value.trim() === "") return;

    list.addProject(input.value.toLowerCase());
    renderNavProjectBtns(input.value);
    projectCreationForm.remove();
    newProjectBtn.textContent = "+ New project";
  });
};

const handleProjectCreationBtn = (list) => {
  const btn = document.querySelector("#new-project-btn");

  btn.addEventListener("click", () => {
    const projectCreationForm = document.querySelector("#project-creation-form");

    if (projectCreationForm) {
      btn.textContent = "+ New project";
      projectCreationForm.remove();
    } else {
      btn.textContent = "Close";
      renderProjectCreationForm();
      handleProjectCreationFormAddBtn(list);
    }
  });
};

// ---- EDIT/DELETE PROJECT ----------------------------------------------------

const createProjectEditionForm = (nextElement, projectName) => {
  const editionForm = document.createElement("div");
    editionForm.id = "project-edition-form";

  const input = document.createElement("input");
    input.type = "text";
    input.value = projectName;
  const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Done";

  editionForm.append(input, btn);
  nextElement.before(editionForm);
};

// FIX the edit btn / remove event listener problem
const closeEditionFormOnOutsideClick = () => {
  const handler = (e) => {
    const existingEditionForm = document.querySelector("#project-edition-form"); 
    console.log("window clicked");

    if (e.target.matches(".edit-project-btn") || existingEditionForm.contains(e.target)) return;

    existingEditionForm.remove();
    window.removeEventListener("click", handler);
  }

  window.addEventListener("click", handler);
};

const handleProjectEditBtnsClick = () => {
  const navProjectsBtns = document.querySelector("#nav-projects-btns");

  navProjectsBtns.addEventListener("click", (e) => {
    const editBtn = e.target.closest(".edit-project-btn");
    if (!editBtn) return;

    const existingEditionForm = document.querySelector("#project-edition-form");
    if (existingEditionForm) {
      existingEditionForm.remove();
      return;
    };

    const projectBtn = editBtn.parentElement.querySelector(".filter-btn");
    const projectName = projectBtn.dataset.filter;

    createProjectEditionForm(projectBtn, projectName);
    closeEditionFormOnOutsideClick();
  })
};
handleProjectEditBtnsClick();

// ---- INITIALIZATION ---------------------------------------------------------

export const handleSidenav = () => {
  renderProjectCreationBtn();
  renderNavProjectBtnsForEachProject(currentList);

  handleNavFilterBtns(currentList);
  handleProjectCreationBtn(currentList);
};