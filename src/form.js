"use strict"

import { currentDate } from "./dates.js";
import { Todo, currentList } from "./todos.js";

const createProjectSelectOptions = (selectParent) => {
  const projects = currentList.projectNames;

  projects.forEach(project => {
    const option = document.createElement("option");


    option.value = project.toLowerCase();

    if (project === "default") { 
      option.textContent = "No Project"
    } else {
      option.textContent = project;
    }

    selectParent.appendChild(option);
  });
};

const createTodoForm = (elementBefore) => {
  const form = document.createElement("form");
  form.id = "todo-form";
  form.action = "#";
  form.method = "post";

  const titleContainer = document.createElement("div");
    const titleLabel = document.createElement("label");
      titleLabel.setAttribute("for", "title-input");
      titleLabel.textContent = "Title";

    const titleInput = document.createElement("input"); 
      titleInput.type = "text";
      titleInput.id = "title-input"; 
      titleInput.name = "title";
      titleInput.setAttribute("required", "");

    titleContainer.append(titleLabel, titleInput);

  const descriptionContainer = document.createElement("div");
    const descriptionLabel = document.createElement("label");
      descriptionLabel.setAttribute("for", "description-input");
      descriptionLabel.textContent = "Description";

    const descriptionInput = document.createElement("input");
      descriptionInput.type = "text";
      descriptionInput.id = "description-input"; 
      descriptionInput.name = "description";

    descriptionContainer.append(descriptionLabel, descriptionInput);

  const dueDateContainer = document.createElement("div");
    const dueDateLabel = document.createElement("label");
      dueDateLabel.setAttribute("for", "date-input");
      dueDateLabel.textContent = "due Date";

    const dueDateInput = document.createElement("input");
      dueDateInput.type = "date";
      dueDateInput.id = "date-input";
      dueDateInput.name = "dueDate";
      dueDateInput.min = currentDate;

    dueDateContainer.append(dueDateLabel, dueDateInput);

  const priorityContainer = document.createElement("div");
    const priorityLabel = document.createElement("label");
      priorityLabel.setAttribute("for", "priority-input");
      priorityLabel.textContent = "Mark as important";

    const priorityCheckbox = document.createElement("input");
      priorityCheckbox.type = "checkbox";
      priorityCheckbox.id = "priority-input";
      priorityCheckbox.name = "priority";

    priorityContainer.append(priorityLabel, priorityCheckbox);

  const projectContainer = document.createElement("div");
    const projectLabel = document.createElement("label");
      projectLabel.setAttribute("for", "project-select");
      projectLabel.textContent = "Project";

    const projectSelect = document.createElement("select");
      projectSelect.id = "project-select";
      projectSelect.name = "project";
      createProjectSelectOptions(projectSelect); 

    projectContainer.append(projectLabel, projectSelect);

  const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Create todo";

    form.append(
      titleContainer,
      descriptionContainer,
      dueDateContainer,
      priorityContainer,
      projectContainer,
      submitBtn
    );

  elementBefore.after(form);
};

const handleFormSubmit = (form, list) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Use the FormData API to get all input names and values at once
    // fromEntries method of Object get and object with that data as keys/values 
    const formData = Object.fromEntries(new FormData(form));
    const newTodo = new Todo(formData);

    list.addTodo(newTodo);

    form.remove();
  });
};



export { createTodoForm, handleFormSubmit };