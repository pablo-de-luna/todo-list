import { currentList } from "./todos.js";
import { updateCurrentFilter, updateMainHeader } from "./ui-controller.js";
import { updateTodoCards } from "./todo-cards.js";

const renderNavProjectBtn = (projectName) => {
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

const renderNavProjectBtns = (list) => {
  const projects = list.projectNames;
  
  projects.forEach(project => {
    if (project === "default") return;
    renderNavProjectBtn(project);
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

// TODO: Make form disappear when Add button is clicked
const handleProjectCreationFormAddBtn = (list) => {
  const newProjectBtn = document.querySelector("#new-project-btn");
  const projectCreationForm = document.querySelector("#project-creation-form");
  const addBtn = document.querySelector("#project-creation-form button");
  const input = document.querySelector("#project-creation-form input");
  
  addBtn.addEventListener("click", () => {
    if (input.value.trim() === "") return;

    list.addProject(input.value.toLowerCase());
    renderNavProjectBtn(input.value);
    projectCreationForm.remove();
    newProjectBtn.textContent = "+ New project";
  });
};

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

export const handleSidenav = () => {
  renderProjectCreationBtn();
  renderNavProjectBtns(currentList);

  handleNavFilterBtns(currentList);
  handleProjectCreationBtn(currentList);
};