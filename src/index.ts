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
    // TODO update task
    console.log('TODO update task description', task.id);
  };

  taskElement.querySelector('i').onclick = () => {
    // TODO delete task
    console.log('TODO delete task', task.id);
  };

  taskElement.querySelector('input').onchange = () => {
    // TODO update task done
    console.log('TODO update task done', task.id);
  };

  return taskElement;
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
  }
};

// Load
listTasksElements(taskListElement, listTasks());
