"use strict"

import { currentList } from "./todos.js";
import { todoCardsRenderer, clearTodoCards, handleStatusCheckbox } from "./cards.js"

const updateMainHeader = (name) => {
  const mainHeader = document.querySelector("#main-header");
  const nameCapitalized = name[0].toUpperCase() + name.slice(1).toLowerCase();

  mainHeader.textContent = nameCapitalized;
};

const handleFilterBtns = () => {
  const filterBtns = document.querySelectorAll(".filter-btn")
  const cardRenderers = {
    "all": todoCardsRenderer.renderAllTodoCards,
    "today": todoCardsRenderer.renderTodayTodoCards,
    "upcoming": todoCardsRenderer.renderUpcomingTodoCards,
    "overdue": todoCardsRenderer.renderOverdueTodoCards,
    "anyday": todoCardsRenderer.renderNoDateTodoCards,
    "important": todoCardsRenderer.renderImportantTodoCards,
  };

  filterBtns.forEach(btn => btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    const renderCards = cardRenderers[filter];
    
    clearTodoCards();
    updateMainHeader(filter)
    renderCards(currentList);
    handleStatusCheckbox(currentList);
  }));
};

const renderProjectBtns = () => {
  const projects = currentList.projectNames;
  const projectsBtns = document.querySelector("#nav-projects-btns");
  
  projects.forEach(project => {
    if (project.toLowerCase() === "default") return;

    const projectListItem = document.createElement("li");
    const projectBtn = document.createElement("button");
    projectBtn.dataset.project = project;
    projectBtn.className = "project-btn";
    projectBtn.setAttribute("type", "button");
    projectBtn.textContent = `${project}`;
  
    projectsBtns.appendChild(projectListItem);
    projectListItem.appendChild(projectBtn);
  })
};

const handleProjectBtns = () => {
  const projectBtns = document.querySelectorAll(".project-btn"); 

  projectBtns.forEach(btn => btn.addEventListener("click", () => {
    const project = btn.dataset.project;

    clearTodoCards();
    updateMainHeader(project);
    todoCardsRenderer.renderProjectTodoCards(currentList, project);
    handleStatusCheckbox(currentList);
  }));
};



handleFilterBtns();
renderProjectBtns();
handleProjectBtns();