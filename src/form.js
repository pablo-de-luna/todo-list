"use strict"

import { currentDate, getRandomUpcomingDate } from "./dates.js";
import { defaultList, getTodoProjects } from "./todos.js";

const currentList = defaultList;

const createProjectSelectOptions = (selectParent) => {
  const projectsNames = getTodoProjects(currentList);

  projectsNames.forEach(project => {
    // TODO get rid of "toLowerCase()"
    if (project.toLowerCase() === "default") return;
    const option = document.createElement("option");
    option.value = project.toLowerCase();
    option.textContent = project;

    selectParent.appendChild(option);

    // TODO Default list as selected
    // Also maybe rename "default" in UI
  });
};

const createTodoForm = () => {
  const form = document.createElement("form");

  const titleContainer = document.createElement("div");
    const titleLabel = document.createElement("label");
      titleLabel.setAttribute("for", "title-input");
      titleLabel.textContent = "Title";

    const titleInput = document.createElement("input"); 
      titleInput.type = "text";
      titleInput.id = "title-input"; 
      titleInput.name = "title";
      titleInput.setAttribute("required", "");

    titleContainer.appendChild(titleLabel);
    titleContainer.appendChild(titleInput);

  const descriptionContainer = document.createElement("div");
    const descriptionLabel = document.createElement("label");
      descriptionLabel.setAttribute("for", "description-input");
      descriptionLabel.textContent = "Description";

    const descriptionInput = document.createElement("input");
      descriptionInput.type = "text";
      descriptionInput.id = "description-input"; 
      descriptionInput.name = "description";

    descriptionContainer.appendChild(descriptionLabel);
    descriptionContainer.appendChild(descriptionInput);

  const dueDateContainer = document.createElement("div");
    const dueDateLabel = document.createElement("label");
      dueDateLabel.setAttribute("for", "date-input");
      dueDateLabel.textContent = "due Date";

    const dueDateInput = document.createElement("input");
      dueDateInput.type = "date";
      dueDateInput.id = "date-input";
      dueDateInput.name = "dueDate";
      dueDateInput.min = currentDate;

    dueDateContainer.appendChild(dueDateLabel);
    dueDateContainer.appendChild(dueDateInput);

  const priorityContainer = document.createElement("div");
    const priorityLabel = document.createElement("label");
      priorityLabel.setAttribute("for", "priority-input");
      priorityLabel.textContent = "Mark as important";

    const priorityCheckbox = document.createElement("input");
      priorityCheckbox.type = "checkbox";
      priorityCheckbox.id = "priority-input";
      priorityCheckbox.name = "priority";

    priorityContainer.appendChild(priorityLabel);
    priorityContainer.appendChild(priorityCheckbox);

  const projectContainer = document.createElement("div");
    const projectLabel = document.createElement("label");
      projectLabel.setAttribute("for", "project-select");
      projectLabel.textContent = "Project";

    const projectSelect = document.createElement("select");
      projectSelect.id = "project-select";
      projectSelect.name = "project";
      createProjectSelectOptions(projectSelect); 

    projectContainer.appendChild(projectLabel);
    projectContainer.appendChild(projectSelect);

  form.appendChild(titleContainer);
  form.appendChild(descriptionContainer);
  form.appendChild(dueDateContainer);
  form.appendChild(priorityContainer);
  form.appendChild(projectContainer);

  document.querySelector("#cards-container").appendChild(form);
};

createTodoForm();