import {Task} from "./task";
import {TaskFilter} from "./task-filter";

export function getData(): Task[] {
  const tasks = JSON.parse(localStorage.getItem('tasks'));

  return tasks ? tasks: [];
}

export function saveData(tasks: Task[]) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function listTasks(filter: TaskFilter): Task[] {
  const tasks = getData();
  if (filter === TaskFilter.All) {
    return tasks;
  }
  if (filter === TaskFilter.Pending) {
    return tasks.filter(task => task.done === false);
  }
  if (filter === TaskFilter.Completed) {
    return tasks.filter(task => task.done === true);
  }
}

export function createTask(description: string): Task {
  const tasks = getData();
  const newTask: Task = {
    id: tasks.length + 1,
    description: description,
    done: false,
  };

  tasks.push(newTask);
  saveData(tasks);

  return newTask;
}

export function updateTask(task: Task): Task {
  const tasks = getData();
  const index = tasks.findIndex(currentTask => currentTask.id === task.id);

  tasks[index] = task;
  saveData(tasks);

  return task;
}

export function deleteTask(task: Task): Task {
  const tasks = getData();
  const index = tasks.findIndex(currentTask => currentTask.id === task.id);
  const deletedTask = tasks[index];

  tasks.splice(index, 1);
  saveData(tasks);

  return deletedTask;
}

export function tasksLeft(): number {
  const tasks = getData();
  return tasks.filter(task => task.done === false).length;
}
