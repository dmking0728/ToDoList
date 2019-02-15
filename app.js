// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// this fucniton combines all eventlisteners under one fucniton "loadEventListeners"
function loadEventListeners() {
  // Add task event
  form.addEventListener('submit', addTask);
  //remove task
  taskList.addEventListener('click', removeTask);
  //clear all tasks event
  clearBtn.addEventListener('click', clearTasks);
  //filtertasks
  filter.addEventListener('keyup', filterTasks);
}

// Add Task
function addTask(e) {
  //if taskInput is blank and user clicks submit alert the user 
  if (taskInput.value === '') {
    alert('Add a Task');

    return;
  } 

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  //store in localstorage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  e.preventDefault();

}


//store task function
function storeTaskInLocalStorage(task) {
  let tasks;
  //check to see if any task are stored in LS. if it is empty (null) make tasks a blank array to start off with.
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    //if LS is not empty then store tasks int o 'tasks' variable and change it into JSON (similar to an arrray)
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  //push 'task' parameter AKA whatever is typed into the input (taskInput.value) onto the 'tasks' variable (add 'task parameter' to 'tasks' variable 
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));

}


//remove task
function removeTask(e) {
  //if item you clicked (e.target.) contains class name 'fa fa-remove then run whats inside (remove li)
  if (e.target.classList.contains('fa-remove')){
    //AND IF ABOVE IS TRUE run a confirmation popup then run function to delete item
    if(confirm('Are you sure?')){
      //targets the parentelement of <i> fontawesome which is <a> then targets parent element of <a> which is <li> and removes the <li>
      e.target.parentElement.parentElement.remove();
    }
  }
}

//clear tasks function
function clearTasks() {
  taskList.innerHTML = ''; 
}

//filter task list
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  //use queryselector as it returns a node list. a node list a list of elements from the DOM. It look like an array and starts at 0.
  document.querySelectorAll('.collection-item').forEach (function(task){
      const item = task.firstChild.textContent;
      //indexOf built in returns -1 "if it is not found aka no match. So if it does NOT (!=) EQUAL -1 it means "if it is a match". 
      if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
  });
}