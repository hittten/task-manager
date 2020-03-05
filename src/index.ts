import {Task} from "./task";
import {TaskFilter} from "./task-filter";
import * as taskService from "./task.service";

// Elements
const taskListElement: HTMLUListElement = document.querySelector('#taskList');
const taskInputElement: HTMLInputElement = document.querySelector('#taskInput');

const modalElement: HTMLDivElement = document.querySelector('.modal');
const modalYesButton: HTMLButtonElement = modalElement.querySelector('button:first-child');
const modalNoButton: HTMLButtonElement = modalElement.querySelector('button:last-child');

const tasksLeftElement: HTMLParagraphElement = document.querySelector('#tasksLeft');

const allButton: HTMLButtonElement = document.querySelector('#allButton');
const pendingButton: HTMLButtonElement = document.querySelector('#pendingButton');
const completedButton: HTMLButtonElement = document.querySelector('#completedButton');
const filterButtons = [allButton, pendingButton, completedButton];

// HTML Functions
function listTasksElements(element: HTMLUListElement, tasks: Task[]) {
  element.textContent = '';
  tasks.forEach(task => element.appendChild(createTaskElement(task)));
}

function createTaskElement(task: Task): HTMLLIElement {
  const taskElement = document.createElement('li');

  taskElement.innerHTML = `
    <div>
      <input type="checkbox" ${task.done ? 'checked' : ''}>
      <span>${task.description}</span>
    </div>
    <i class="material-icons btn-delete">delete_outline</i>
  `;

  taskElement.querySelector('span').onclick = () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = task.description;

    const updateButton = document.createElement('i');
    updateButton.className = 'material-icons';
    updateButton.textContent = 'done';

    updateButton.onclick = () => {
      const updatedTask = {...task};
      updatedTask.description = input.value;
      taskService.updateTask(updatedTask);

      const updatedTaskElement = createTaskElement(updatedTask);
      taskElement.parentElement.insertBefore(updatedTaskElement, taskElement);
      taskElement.remove();
    };

    taskElement.appendChild(input);
    taskElement.appendChild(updateButton);

    taskElement.classList.add('updating');
  };

  taskElement.querySelector('i').onclick = () => {
    modalElement.querySelector('p').textContent = task.description;
    modalElement.classList.add('open');

    modalYesButton.onclick = () => {
      taskService.deleteTask(task);
      updateTaskLeftElement();
      modalNoButton.click();
      taskElement.remove();
    };
  };

  taskElement.querySelector('input').onchange = (e) => {
    const element = e.target as HTMLInputElement;
    const updatedTask = {...task};
    updatedTask.done = element.checked;
    taskService.updateTask(updatedTask);
    updateTaskLeftElement();
  };

  return taskElement;
}

function updateTaskLeftElement() {
  tasksLeftElement.textContent = `Quedan ${taskService.tasksLeft()} tareas`;
}

function updateFilterButtonsElements(e: MouseEvent) {
  const element = e.target as HTMLButtonElement;

  filterButtons.forEach(button => button.disabled = false);
  element.disabled = true;

  if (element.id === 'allButton') {
    listTasksElements(taskListElement, taskService.listTasks(TaskFilter.All));
  }
  if (element.id === 'pendingButton') {
    listTasksElements(taskListElement, taskService.listTasks(TaskFilter.Pending));
  }
  if (element.id === 'completedButton') {
    listTasksElements(taskListElement, taskService.listTasks(TaskFilter.Completed));
  }
}

// Events
taskInputElement.onkeyup = (e) => {
  const input = e.target as HTMLInputElement;
  if (e.key === 'Enter' && input.value) {
    input.focus();
    const task = taskService.createTask(input.value);
    const taskElement = createTaskElement(task);
    input.value = '';

    taskListElement.appendChild(taskElement);
    updateTaskLeftElement();
  }
};

modalNoButton.onclick = () => {
  modalElement.classList.remove('open');
};

allButton.onclick = updateFilterButtonsElements;
pendingButton.onclick = updateFilterButtonsElements;
completedButton.onclick = updateFilterButtonsElements;

// Load
listTasksElements(taskListElement, taskService.listTasks(TaskFilter.All));
updateTaskLeftElement();
taskInputElement.focus();
