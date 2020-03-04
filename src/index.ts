import {Task} from "./task";
import {TASKS} from "./mock-task";

// Elements
const taskListElement: HTMLUListElement = document.querySelector('#taskList');
const taskInputElement: HTMLInputElement = document.querySelector('#taskInput');

// Data Functions
function listTasks(): Task[] {
  return TASKS;
}

function createTask(description: string): Task {
  const tasks = TASKS;
  const newTask: Task = {
    id: tasks.length + 1,
    description: description,
    done: false,
  };

  tasks.push(newTask);

  return newTask;
}

// HTML Functions
function listTasksElements(element: HTMLUListElement, tasks: Task[]) {
  let html = '';

  tasks.forEach(task => html += createTaskElement(task));

  element.innerHTML = html;
}

function createTaskElement(task: Task): string {
  return `
    <li>
      <div>
        <input type="checkbox" ${task.done ? 'checked' : ''}>
        <span>${task.description}</span>
      </div>
      <i class="material-icons btn-delete">delete_outline</i>
    </li>
  `
}

// Events
taskInputElement.onkeyup = (e) => {
  const input = e.target as HTMLInputElement;
  if (e.key === 'Enter' && input.value) {
    input.focus();
    const task = createTask(input.value);
    const taskElement = createTaskElement(task);
    input.value = '';

    taskListElement.innerHTML += taskElement;
  }
};

// Load
listTasksElements(taskListElement, listTasks());
