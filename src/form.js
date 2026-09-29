import { Todo, currentList } from "./todos.js";
import { updateTodoCards } from "./todo-cards.js";
import { getCurrentFilter } from "./ui-controller.js";

const createSelectProjectOptions = (selectParent) => {
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

    const descriptionInput = document.createElement("textarea");
      descriptionInput.id = "description-input"; 
      descriptionInput.name = "description";
      descriptionInput.cols = "30";
      descriptionInput.rows = "3";

    descriptionContainer.append(descriptionLabel, descriptionInput);

  const dueDateContainer = document.createElement("div");
    const dueDateLabel = document.createElement("label");
      dueDateLabel.setAttribute("for", "date-input");
      dueDateLabel.textContent = "due Date";

    const dueDateInput = document.createElement("input");
      dueDateInput.type = "date";
      dueDateInput.id = "date-input";
      dueDateInput.name = "dueDate";

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
      createSelectProjectOptions(projectSelect); 

    projectContainer.append(projectLabel, projectSelect);

  const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Submit";

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

// Use the FormData API to get all input names and values at once
// fromEntries method of Object get and object with that data as keys/values 
const getFormData = (form) => Object.fromEntries(new FormData(form));

// ---- TODO EDITION FORM ------------------------------------------------------

const createTodoEditionFormBtns = () => {
  const form = document.querySelector("#todo-form");
  const submitBtn = document.querySelector(`#todo-form > button[type="submit"]`);
    submitBtn.textContent = "Update todo";

  const deleteTodoBtn = document.createElement("button");
    deleteTodoBtn.type = "button";
    deleteTodoBtn.id = "delete-todo-btn";
    deleteTodoBtn.textContent = "Delete todo";
    
  form.append(deleteTodoBtn);
};

const addTodoDataToFormValues = (list, todoID) => {
  const todo = list.todos.find(todo => todo.id === todoID);

  const titleInput = document.querySelector("#title-input");
  const descriptionInput = document.querySelector("#description-input");
  const dateInput = document.querySelector("#date-input");
  const priorityInput = document.querySelector("#priority-input");
  const projectSelect = document.querySelector("#project-select");

  titleInput.value = todo.title;
  descriptionInput.value = todo.description;
  dateInput.value = todo.dueDate;
  if (todo.priority === "important") priorityInput.checked = true;
  projectSelect.value = todo.project;
};

const updateTodoOnFormSubmission = (form, list, todoID) => {
    const formData = getFormData(form);
    const todo = list.todos.find(todo => todo.id === todoID);

    todo.title = formData.title;
    todo.description = formData.description;
    todo.dueDate = formData.dueDate;
    todo.priority = formData.priority;
    todo.project = formData.project;
};

const handleTodoEditionFormDeleteBtn = (list, todoID) => {
  const deleteBtn = document.querySelector("#delete-todo-btn");

  deleteBtn.addEventListener("click", () => {
    list.deleteTodo(todoID);
    updateTodoCards(list, getCurrentFilter());
  });
};

const handleTodoEditionFormSubmission = (list, todoID) => {
  const form = document.querySelector("#todo-form");
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    updateTodoOnFormSubmission(form, list, todoID);
    updateTodoCards(list, getCurrentFilter());
    form.remove();
  });
}; 

export const createTodoEditionForm = (elementBefore, list, todoID) => {
  createTodoForm(elementBefore);
  createTodoEditionFormBtns();
  addTodoDataToFormValues(list, todoID);
  handleTodoEditionFormSubmission(list, todoID);
  handleTodoEditionFormDeleteBtn(list, todoID);
};

// ---- TODO CREATION FORM -----------------------------------------------------

const createTodoWithFormData = (form, list) => {
    const formData = getFormData(form);
    list.addTodo(new Todo(formData))
};

const handleTodoCreationFormSubmission = (list) => {
  const form = document.querySelector("#todo-form");
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    createTodoWithFormData(form, list)
    updateTodoCards(list, getCurrentFilter());
    form.remove();
  });
};

export const createTodoCreationForm = (elementBefore, list) => {
  createTodoForm(elementBefore);

  const submitBtn = document.querySelector(`#todo-form > button[type="submit"]`);
  submitBtn.textContent = "Create Todo";

  handleTodoCreationFormSubmission(list);
};