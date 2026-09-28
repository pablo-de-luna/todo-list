import { currentList } from "./todos.js";
import { updateCurrentFilter, updateMainHeader } from "./ui-controller.js";
import { updateTodoCards } from "./todo-cards.js";

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

const renderNavProjectBtns = (list) => {
  const projects = list.projectNames;
  
  projects.forEach(project => {
    if (project === "default") return;
    renderProjectBtn(project);
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

const handleAddProjectBtn = (list) => {
  const addBtn = document.querySelector("#new-project-form button");
  const input = document.querySelector("#new-project-form input");
  
  addBtn.addEventListener("click", () => {
    if (input.value.trim() === "") return;

    list.addProject(input.value.toLowerCase());
    renderProjectBtn(input.value);
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
    const newProjectForm = document.querySelector("#new-project-form");

    if (newProjectForm) {
      btn.textContent = "+ New project";
      newProjectForm.remove();
    } else {
      btn.textContent = "Close";
      renderNewProjectForm();
      handleAddProjectBtn(list);
    }
  });
};

export const handleSidenav = () => {
  renderProjectCreationBtn();
  renderNavProjectBtns(currentList);

  handleNavFilterBtns(currentList);
  handleProjectCreationBtn(currentList);
};