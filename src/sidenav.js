import { currentList } from "./todos.js";
import { getCurrentFilter, updateCurrentFilter, updateMainHeader } from "./ui-controller.js";
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

const renderProjectCreationBtn = () => {
  const navProjectsBtns = document.querySelector("#nav-projects-btns");
  const listItem = document.createElement("li");
  const button = document.createElement("button");

  button.id = "new-project-btn";
  button.type = "button";
  button.textContent = "+ New Project";

  listItem.append(button);
  navProjectsBtns.append(listItem);
};

const renderProjectCreationForm = () => {
  const btnParent = document.querySelector("#new-project-btn").parentElement;

  const listItem = document.createElement("li");
    listItem.id = "project-creation-form";

  const input = document.createElement("input");
    input.id = "project-form-input";
    input.type = "text";

  const addBtn = document.createElement("button");
    addBtn.id = "project-form-add-btn";
    addBtn.type = "button";
    addBtn.textContent = "Add";

  const cancelBtn = document.createElement("button");
    cancelBtn.id = "project-form-cancel-btn";
    cancelBtn.type = "button";
    cancelBtn.textContent = "Cancel";

  listItem.append(input, addBtn, cancelBtn);
  btnParent.after(listItem);
};

// TODO: Make alert user friendly
const handleFormAddBtn = (list) => {
  const projectCreationForm = document.querySelector("#project-creation-form");
  const addBtn = document.querySelector("#project-form-add-btn");
  const input = document.querySelector("#project-form-input");
  
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
  });
};

const handleFormCancelBtn = () => {
  const projectCreationForm = document.querySelector("#project-creation-form");
  const cancelBtn = document.querySelector("#project-form-cancel-btn");

  cancelBtn.addEventListener("click", () => {
    projectCreationForm.remove();
  });
};

const closeFormOnOutsideClick = () => {
  const projectCreationForm = document.querySelector("#project-creation-form");

  const windowHandler = (e) => {
    if (!projectCreationForm.contains(e.target) && !e.target.matches("#new-project-btn")) {
      projectCreationForm.remove();
      window.removeEventListener("click", windowHandler);
      console.log("REMOVED");
    }
  };
  window.addEventListener("click", windowHandler), {once: true};
};

const handleProjectCreationBtn = (list) => {
  const newProjectBtn = document.querySelector("#new-project-btn");

  newProjectBtn.addEventListener("click", () => {
    const projectCreationForm = document.querySelector("#project-creation-form");

    if (projectCreationForm) {
      projectCreationForm.remove();
    } else {
      renderProjectCreationForm();
      handleFormAddBtn(list);
      handleFormCancelBtn();
      closeFormOnOutsideClick();
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

const updateProjectWhenEditionDone = (previousName, projectBtn, list) => {
  const inputValue = document.querySelector("#project-edition-form > input").value;
  const newName = inputValue.trim().toLowerCase();
  const filter = (getCurrentFilter() === previousName) ? newName : getCurrentFilter();

  if (newName === "") return;

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

const handleProjectDeleteBtns = () => {
  // IF button clicked
    // ASK confirmation
      // IF YES 
        // DELETE All todos from that project
        // DELETE project from project list
        // UPDATE Todo Cards
      // IF NO Remove confirmation and do nothing
};

// ---- INITIALIZATION ---------------------------------------------------------

export const handleSidenav = () => {
  renderProjectCreationBtn();
  renderBtnsForEachProject(currentList);

  handleNavFilterBtns(currentList);
  handleProjectCreationBtn(currentList);

  handleProjectEditBtns();
};