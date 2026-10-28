import { currentList } from "./todos.js";
import { getCurrentFilter, updateCurrentFilter, updateMainHeader } from "./ui-controller.js";
import { updateTodoCards } from "./todo-cards.js";

const body = document.querySelector("body");
const navProjectsBtns = document.querySelector("#nav-projects-btns");
const navBtns = document.querySelector("#nav-btns");

const renderNavProjectBtns = (projectName) => {
  const projectListItem = document.createElement("li");
  const projectBtn = document.createElement("button");
    projectBtn.dataset.filter = projectName;
    projectBtn.className = "filter-btn";
    projectBtn.setAttribute("type", "button");
    projectBtn.textContent = projectName;

  const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "project-edit-btn";

  projectListItem.append(projectBtn, editBtn);
  navProjectsBtns.appendChild(projectListItem);
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
  navBtns.addEventListener("click", (e) => {
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
    input.maxLength = "15";

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

const renderProjectEditionForm = (nextElement, projectName) => {
  const editionForm = document.createElement("div");
    editionForm.id = "project-edition-form";

  const input = document.createElement("input");
    input.type = "text";
    input.value = projectName;
    input.maxLength = "15";

  const doneBtn = document.createElement("button");
    doneBtn.className = "editform-action-btn"
    doneBtn.dataset.action = "done";
    doneBtn.type = "button";
    doneBtn.textContent = "Done";

  const deleteBtn = document.createElement("button");
    deleteBtn.className = "editform-action-btn"
    deleteBtn.dataset.action = "delete";
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";

  editionForm.append(input, doneBtn, deleteBtn);
  nextElement.before(editionForm);
};

const renderDeleteConfirmationModal = () => {
  const confirmationModal = document.createElement("dialog");
    confirmationModal.id = "delete-project-confirmation";
  const message = document.createElement("div");
    message.textContent = "This will remove the project and all it's todos, are you sure?";
  const confirmBtn = document.createElement("button");
    confirmBtn.type = "button";
    confirmBtn.textContent = "Delete"
    confirmBtn.dataset.action = "delete";
  const cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.textContent = "Cancel"
    cancelBtn.dataset.action = "cancel";

  confirmationModal.append(message, confirmBtn, cancelBtn);
  body.append(confirmationModal);
}; 

// TODO: Make alert user friendly
const updateProjectWhenEditionDone = (previousName, projectBtn, list) => {
  const inputValue = document.querySelector("#project-edition-form > input").value;
  const newName = inputValue.trim().toLowerCase();
  const filter = (getCurrentFilter() === previousName) ? newName : getCurrentFilter();

  if (newName === "") return;
  if (list.projectNames.includes(inputValue) && inputValue !== previousName) {
    alert("PROJECT NAME ALREADY EXISTS");
    return;
  }

  updateProjectBtn(projectBtn, newName);
  list.updateProject(previousName, newName);
  updateTodoCards(list, filter);

  if (getCurrentFilter() === previousName) {
    updateMainHeader(newName);
    updateCurrentFilter(newName);
  }
};

const handleProjectDeletion = (projectName, projectBtn, list) => {
  projectBtn.parentElement.remove();
  list.deleteProject(projectName);

  if (getCurrentFilter() === projectName) {
    updateTodoCards(list, "today");
    updateMainHeader("Today");
    updateCurrentFilter("today");
  } else {
    updateTodoCards(list, getCurrentFilter());
  }
};

const handleDeleteConfirmationModal = (modal, projectName, projectBtn) => {
  modal.addEventListener("click", (e) => {
    switch (e.target.dataset.action) {
      case "delete":
        handleProjectDeletion(projectName, projectBtn, currentList);
        modal.remove();
        break;
      case "cancel":
        modal.remove();
        break;
    }
  });
};

const showDeleteConfirmationModal = (projectName, projectBtn) => {
  renderDeleteConfirmationModal();

  const modal = document.querySelector("#delete-project-confirmation");
  modal.showModal();
  handleDeleteConfirmationModal(modal, projectName, projectBtn);
}

const handleEditionForm = (projectBtn, projectName) => {
  const handler = (e) => {
    const projectListItem = document.querySelector("#project-edition-form").parentElement;
    const editionForm = document.querySelector("#project-edition-form"); 

    if (!projectListItem.contains(e.target)) {
      editionForm.remove();
      window.removeEventListener("click", handler);
      return;
    }

    switch (e.target.dataset.action) {
      case "done":
        updateProjectWhenEditionDone(projectName, projectBtn, currentList);
        editionForm.remove();
        window.removeEventListener("click", handler);
        break;
      case "delete":
        showDeleteConfirmationModal(projectName, projectBtn);
        editionForm.remove();
        window.removeEventListener("click", handler);
        break;
    }
  }

  window.addEventListener("click", handler);
};

const handleEditBtns = () => {
  navProjectsBtns.addEventListener("click", (e) => {
    const editBtn = e.target.closest(".project-edit-btn");
    if (!editBtn) return;

    const existingEditionForm = document.querySelector("#project-edition-form");
    if (existingEditionForm) return;

    const projectBtn = e.target.parentElement.querySelector(".filter-btn");
    const projectName = projectBtn.dataset.filter;

    renderProjectEditionForm(projectBtn, projectName);
    handleEditionForm(projectBtn, projectName);
  });
};

// ---- INITIALIZATION ---------------------------------------------------------

export const handleSidenav = () => {
  renderProjectCreationBtn();
  renderBtnsForEachProject(currentList);
  handleNavFilterBtns(currentList);
  handleProjectCreationBtn(currentList);
  handleEditBtns();
};