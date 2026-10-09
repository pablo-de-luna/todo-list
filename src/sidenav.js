import { currentList } from "./todos.js";
import { getCurrentFilter, updateCurrentFilter, updateMainHeader } from "./ui-controller.js";
import { updateTodoCards } from "./todo-cards.js";

const projectCreationBtnText = "+ New Project";

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

const updateProjectBtn = (projectBtn, newName) => {
  projectBtn.dataset.filter = newName;
  projectBtn.textContent = newName;
};

const renderBtnsForEachProject = (list) => {
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

const renderProjectCreationBtn = (btnText) => {
  const navProjectsBtns = document.querySelector("#nav-projects-btns");
  const listItem = document.createElement("li");
  const button = document.createElement("button");

  button.id = "new-project-btn";
  button.type = "button";
  button.textContent = btnText;

  listItem.append(button);
  navProjectsBtns.append(listItem);
};

const toggleProjectCreationText = (btnText) => {
  const newProjectBtn = document.querySelector("#new-project-btn");
  const close = "Close";

  newProjectBtn.textContent = (newProjectBtn.textContent === btnText) ? close : btnText;
}

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
const handleFormAddBtn = (list, btnText) => {
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
    toggleProjectCreationText(btnText);
  });
};

// FIX: Add and close button not removing window event listener
const closeFormOnOutsideClick = (btnText) => {
  const projectCreationForm = document.querySelector("#project-creation-form");

  const windowHandler = (e) => {
    if (!projectCreationForm.contains(e.target) && !e.target.matches("#new-project-btn")) {
      projectCreationForm.remove();
      window.removeEventListener("click", windowHandler);
      toggleProjectCreationText(btnText);
      console.log("REMOVED");
    }
  };
  window.addEventListener("click", windowHandler), {once: true};
};

const handleProjectCreationBtn = (list, btnText) => {
  const newProjectBtn = document.querySelector("#new-project-btn");

  newProjectBtn.addEventListener("click", () => {
    const projectCreationForm = document.querySelector("#project-creation-form");

    if (projectCreationForm) {
      projectCreationForm.remove();
    } else {
      renderProjectCreationForm();
      handleFormAddBtn(list, btnText);
      closeFormOnOutsideClick(btnText);
    }

    toggleProjectCreationText(btnText);
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

const updateProjectWhenEditionDone = (previousName, projectBtn, list) => {
  const inputValue = document.querySelector("#project-edition-form > input").value;
  const newName = inputValue.trim().toLowerCase();
  const filter = (getCurrentFilter() === previousName) ? newName : getCurrentFilter();

  updateProjectBtn(projectBtn, newName);
  list.updateProject(previousName, newName);

  if (getCurrentFilter() === previousName) {
    updateTodoCards(list, filter);
    updateMainHeader(newName);
    updateCurrentFilter(newName);
  }
};

const handleEditionForm = (previousName, projectBtn) => {
  const handler = (e) => {
    const projectListItem = document.querySelector("#project-edition-form").parentElement;
    const editionForm = document.querySelector("#project-edition-form"); 
    const doneBtnSelector = "#project-edition-form > button";

    if (!projectListItem.contains(e.target)) {
      editionForm.remove();
      window.removeEventListener("click", handler);
    }

    if (e.target.matches(doneBtnSelector)) {
      updateProjectWhenEditionDone(previousName, projectBtn, currentList);
      editionForm.remove();
      window.removeEventListener("click", handler);
    }   
  }

  window.addEventListener("click", handler);
};

// TODO: toggle a "visible/hidden" class for project, edit and delete buttons when the form open
const handleProjectEditBtns = () => {
  const navProjectsBtns = document.querySelector("#nav-projects-btns");

  navProjectsBtns.addEventListener("click", (e) => {
    const editBtn = e.target.closest(".edit-project-btn");

    if (!editBtn) return;

    const existingEditionForm = document.querySelector("#project-edition-form");
    if (existingEditionForm) return;

    const projectBtn = editBtn.parentElement.querySelector(".filter-btn");
    const projectName = projectBtn.dataset.filter;

    createProjectEditionForm(projectBtn, projectName);
    handleEditionForm(projectName, projectBtn);
  });
};

// ---- INITIALIZATION ---------------------------------------------------------

export const handleSidenav = () => {
  renderProjectCreationBtn(projectCreationBtnText);
  renderBtnsForEachProject(currentList);

  handleNavFilterBtns(currentList);
  handleProjectCreationBtn(currentList, projectCreationBtnText);

  handleProjectEditBtns();
};