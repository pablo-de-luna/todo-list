
export const isLocalStoragePopulated = () => Object.keys(localStorage).length !== 0;

export const updateLocalStorage = (list) => {
  const todos = JSON.stringify(list.todosToJSON());
  const projects = JSON.stringify(list.projectNames);

  localStorage.setItem("todos", todos);
  localStorage.setItem("projects", projects);
  console.log("LOCAL STORAGE UPDATED");
};

export const getTodosFromLocalStorage = () => JSON.parse(localStorage.getItem("todos"));

export const getProjectsFromLocalStorage = () => JSON.parse(localStorage.getItem("projects"));