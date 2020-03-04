import {Task} from "./task";
import {TASKS} from "./mock-task";

// Elements
const taskListElement: HTMLUListElement = document.querySelector('#taskList');

// Data Functions
function listTasks(): Task[] {
  return TASKS;
}

// HTML Functions
function listTasksElements(element: HTMLUListElement, tasks: Task[]) {
  let html = '';

  tasks.forEach(task => html += `
    <li>
      <div>
        <input type="checkbox" ${task.done ? 'checked' : ''}>
        <span>${task.description}</span>
      </div>
      <i class="material-icons btn-delete">delete_outline</i>
    </li>
  `)

  element.innerHTML = html;
}

// Events

// Load
listTasksElements(taskListElement, listTasks());
