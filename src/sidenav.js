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

// TODO: Make alert user friendly
const handleProjectCreationFormAddBtn = (list) => {
  const newProjectBtn = document.querySelector("#new-project-btn");
  const projectCreationForm = document.querySelector("#project-creation-form");
  const addBtn = document.querySelector("#project-creation-form button");
  const input = document.querySelector("#project-creation-form input");
  
  addBtn.addEventListener("click", () => {
    const inputValue = input.value.trim().toLowerCase();

    if (inputValue === "") return;
    if (list.projectNames.includes(inputValue)) {
      alert("PROJECT NAME ALREADY EXISTS");
      return;
    }

    list.addProject(inputValue);
    renderNavProjectBtns(inputValue);
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

// TODO: Update project button and data filter too
const updateProjectName = (previousName, list) => {
  const inputValue = document.querySelector("#project-edition-form > input").value;
  const newName = inputValue.trim().toLowerCase();

  list.updateProject(previousName, newName);
};

const handleEditionForm = (previousName, list) => {
  const handler = (e) => {
    const projectListItem = document.querySelector("#project-edition-form").parentElement;
    const editionForm = document.querySelector("#project-edition-form"); 
    const doneBtnSelector = "#project-edition-form > button";

    if (!projectListItem.contains(e.target)) {
      editionForm.remove();
      window.removeEventListener("click", handler);
    }

    if (e.target.matches(doneBtnSelector)) {
      updateProjectName(previousName, list);
      editionForm.remove();
      window.removeEventListener("click", handler);
    }   
  }

  window.addEventListener("click", handler);
};

const handleProjectEditBtns = (list) => {
  const editBtns = document.querySelectorAll(".edit-project-btn");

  editBtns.forEach(editBtn => editBtn.addEventListener("click", (e) => {
    e.stopImmediatePropagation();

    const existingEditionForm = document.querySelector("#project-edition-form");
    if (existingEditionForm) return;

    const projectBtn = editBtn.parentElement.querySelector(".filter-btn");
    const projectName = projectBtn.dataset.filter;

    createProjectEditionForm(projectBtn, projectName);
    handleEditionForm(projectName, list);
  }));
};

// ---- INITIALIZATION ---------------------------------------------------------

export const handleSidenav = () => {
  renderProjectCreationBtn();
  renderNavProjectBtnsForEachProject(currentList);

  handleNavFilterBtns(currentList);
  handleProjectCreationBtn(currentList);

  handleProjectEditBtns(currentList);
};