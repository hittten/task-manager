import {Task} from "./task";
import {TASKS} from "./mock-task";

// Elements
const taskListElement: HTMLUListElement = document.querySelector('#taskList');
const taskInputElement: HTMLInputElement = document.querySelector('#taskInput');

const modalElement: HTMLDivElement = document.querySelector('.modal');
const modalYesButton: HTMLButtonElement = modalElement.querySelector('button:first-child');
const modalNoButton: HTMLButtonElement = modalElement.querySelector('button:last-child');

const tasksLeftElement: HTMLParagraphElement = document.querySelector('#tasksLeft');

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

function updateTask(task: Task): Task {
  const tasks = TASKS;
  const index = tasks.findIndex(currentTask => currentTask.id === task.id);

  tasks[index] = task;

  return task;
}

function deleteTask(task: Task): Task {
  const tasks = TASKS;
  const index = tasks.findIndex(currentTask => currentTask.id === task.id);
  const deletedTask = tasks[index];

  tasks.splice(index, 1);

  return deletedTask;
}

function tasksLeft(): number {
  const tasks = TASKS;
  return tasks.filter(task => task.done === false).length;
}

// HTML Functions
function listTasksElements(element: HTMLUListElement, tasks: Task[]) {
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
      updateTask(updatedTask);

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
      deleteTask(task);
      updateTaskLeftElement();
      modalNoButton.click();
      taskElement.remove();
    };
  };

  taskElement.querySelector('input').onchange = (e) => {
    const element = e.target as HTMLInputElement;
    const updatedTask = {...task};
    updatedTask.done = element.checked;
    updateTask(updatedTask);
    updateTaskLeftElement();
  };

  return taskElement;
}

function updateTaskLeftElement() {
  tasksLeftElement.textContent = `Quedan ${tasksLeft()} tareas`;
}

// Events
taskInputElement.onkeyup = (e) => {
  const input = e.target as HTMLInputElement;
  if (e.key === 'Enter' && input.value) {
    input.focus();
    const task = createTask(input.value);
    const taskElement = createTaskElement(task);
    input.value = '';

    taskListElement.appendChild(taskElement);
    updateTaskLeftElement();
  }
};

modalNoButton.onclick = () => {
  modalElement.classList.remove('open');
};

// Load
listTasksElements(taskListElement, listTasks());
updateTaskLeftElement();
