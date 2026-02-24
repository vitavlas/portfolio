/* SCRIPTS FOR [TODO APP] */

// ===== DOM =====

const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("stats-items-left");
const clearCompletedBtn = document.getElementById("btn-clear-completed");
const dateInformer = document.getElementById("date");
const emptyList = document.querySelector(".empty-state");
const filters = document.querySelectorAll(".filter");


// ===== FUNCTIONS =====

function addNewTask(text) {
  if (text.trim() === "") return;

  const task = {
    id: Date.now(),
    text,
    completed: false,
  };

  // Add new task to the todo list
  todos.push(task);

  // Save list
  saveTodoList();

  // Display list
  displayTodoList();
    
  // Reset input field
  taskInput.value = "";
}


function saveTodoList() {
  todos.length === 0
  ? localStorage.removeItem("todos")
  : localStorage.setItem("todos", JSON.stringify(todos));
}


function updateItemsCount() {
  // Uncompleted tasks
  const uncompleted = todos.filter((todo) => !todo.completed);
  // Singular or plural form
  let suffix = uncompleted?.length !== 1 ? "s" : "";

  // Update state
  itemsLeft.textContent = `${uncompleted?.length} item${suffix} left`;
}


function checkEmptyState() {
  // Check is there at least one task into the list
  const filtered = filterTasks(currentFilter);

  if (filtered?.length === 0) {
    // If no tasks -> display empty list
    emptyList.classList.remove("hidden");
  } else {
    emptyList.classList.add("hidden");
  }
}


function filterTasks(filter) {
  // Apply appropriate filter to the tasks
  switch (filter) {
    case "active":
      return todos.filter((todo) => !todo.completed);
    case "completed":
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
}


function displayTodoList() {
  // Reset list
  todoList.innerHTML = "";

  // Choose tasks accordingly with applied filter
  const filtered = filterTasks(currentFilter);

  filtered.forEach((todo) => {
    // Create new todo list element
    const todoItem = document.createElement("li");
    todoItem.className = "todo-item";

    if (todo.completed) todoItem.classList.add("completed");

    // Create checkbox
    const checkboxContainer = document.createElement("label");
    checkboxContainer.className = "checkbox-container";

    // Input type checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox-todo";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", () => toggleTodo(todo.id, todoItem));

    // Marker
    const checkmark = document.createElement("span");
    checkmark.className = "checkmark";

    // Append items to checkbox container
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(checkmark);

    // Task text
    const taskText = document.createElement("span");
    taskText.className = "todo-item__text";
    taskText.textContent = todo.text;

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-delete";

    const icon = document.createElement("i");
    icon.className = "fas fa-times";

    deleteBtn.appendChild(icon);
    deleteBtn.addEventListener("click", () => deleteTask(todo.id));

    // Append items to the todo list element
    todoItem.appendChild(checkboxContainer);
    todoItem.appendChild(taskText);
    todoItem.appendChild(deleteBtn);

    // Place task to the todo list -> display
    todoList.appendChild(todoItem);
  });

  updateItemsCount();
  checkEmptyState();
}


function deleteTask(id) {
  // Delete only certain task with provided id
  todos = todos.filter((todo) => todo.id !== id);

  // Save rest todos and display
  saveTodoList()
  displayTodoList();
}


function clearCompletedTasks() {
  // Choose uncompleted tasks
  todos = todos.filter((todo) => !todo.completed);

  // Save todo list and display
  saveTodoList();
  displayTodoList();
}


function toggleTodo(id, element) {
  // Change task state to completed
  todos = todos.map((todo) => {
    return todo.id === id ? {...todo, completed: !todo.completed} : todo;
  });

  // Switch task style
  element.classList.toggle("completed");

  // Save todo list and update uncompleted tasks
  saveTodoList();
  updateItemsCount();
}


function loadTodoList() {
  // Get previously saved todo list
  const stored = localStorage.getItem("todos");

  if (stored) {
    // If there are tasks -> display
    todos = JSON.parse(stored);
    // displayTodoList();
  }
}


function setActiveFilter(filter) {
  // Set current filter
  currentFilter = filter;

  // Switch filter to active state
  filters.forEach((item) => {
    if (item.dataset.filter === filter) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Display todo list
  displayTodoList();
}


function setDate() {
  // Date format options
  const options = {
    weekday: "long",
    month: "short",
    day: "numeric",
  };

  const today = new Date();

  dateInformer.textContent = today.toLocaleDateString("en-US", options);
}


// ===== INIT =====

let todos = [];
let currentFilter = "all";


// ===== EVENTS =====

// Load initial state
window.addEventListener("DOMContentLoaded", () => {
  // Todo list was previously saved -> load
  loadTodoList();
  // updateItemsCount();
  displayTodoList();

  setDate();
});

// Add task by button
addTaskBtn.addEventListener("click", () => {
  addNewTask(taskInput.value);
});

// Add task by pressing Enter
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addNewTask(taskInput.value);
});

// Clear completed tasks
clearCompletedBtn.addEventListener("click", clearCompletedTasks);

// Manage filters
filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    setActiveFilter(filter.dataset.filter);
  });
});
