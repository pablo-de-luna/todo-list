"use strict"

import { currentList } from "./todos.js";
import { todoCardsRenderer, clearTodoCards, handleStatusCheckbox } from "./cards.js"

//TODO Add main title "Today", "All"....

const filterBtnsHandler = () => {
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
    const renderCards = cardRenderers[btn.dataset.filter];

    clearTodoCards();
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

const projectBtnsHandler = () => {
  const projectBtns = document.querySelectorAll(".project-btn"); 

  projectBtns.forEach(btn => btn.addEventListener("click", () => {
    const project = btn.dataset.project;

    clearTodoCards();
    todoCardsRenderer.renderProjectTodoCards(currentList, project);
    handleStatusCheckbox(currentList);
  }));
};



filterBtnsHandler();
renderProjectBtns();
projectBtnsHandler();