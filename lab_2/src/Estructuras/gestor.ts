import { Task } from './tareas';
import { TaskGraph } from './Grafo';
import { LinkedList } from './linkedList';
import { Queue } from './queue';
import { Stack } from './stack';
import { BinaryTree } from './ArbolBinario';

export class TaskManager {
  pendingTasks: LinkedList<Task>;
  inProgressTasks: Queue<Task>;
  completedTasks: Stack<Task>;
  taskBST: BinaryTree<Task>;
  taskGraph: TaskGraph;
  check: Task[];

  constructor() {
    this.pendingTasks = new LinkedList<Task>();
    this.inProgressTasks = new Queue<Task>();
    this.completedTasks = new Stack<Task>();
    this.taskBST = new BinaryTree<Task>();
    this.taskGraph = new TaskGraph();
    this.check = [];
  }

  addTask(task: Task): void {
    this.pendingTasks.addStart(task);
    this.taskBST.insert(task);
    this.taskGraph.addTask(task);
  }

  startTask(task: Task): string|void {
    const dependencies = this.taskGraph.getDependencies(task);

    // Check if all dependencies are completed
    const dependenciesCompleted = dependencies.every(depId => this.check.find(task => task.getId() === depId));

    if (dependenciesCompleted) {
      this.pendingTasks.delete(task);
      //TODO this.taskBST.delete(task);
      task.estadoNuevo = "Progress"; // Cambio de estado
      console.log(`Starting task ${task.getId()}: `);
      this.inProgressTasks.enqueue(task);
    } else {
      return (`Cannot start task ${task.getId()}): Dependencies are not completed.`);
    }
  }

  completeTask(): string|void {
    if (this.inProgressTasks.empty()) {
      return "No tasks in progress";
    }
    else{
      const task = this.inProgressTasks.dequeue();
      task.estadoNuevo = "Completed"; // Cambio de estado
      console.log(`Completing task ${task.getId()}`);
      this.check.push(task);
      this.completedTasks.push(task);
    }
  }

  deleteCompletedTask(): string|void {
    if (this.completedTasks.empty()) {
      return "No tasks completed";
    } else {
      this.completedTasks.pop();
    }
  }

  addDependency(task1: Task, task2: Task): void {
    this.taskGraph.addDependency(task1, task2);
  }

  deletePendingTask(task: Task): void {
    this.pendingTasks.delete(task);
  }

  displayGraph(): void {
    this.taskGraph.displayGraph();
  }
}

// Ejemplo de uso
export const taskManager = new TaskManager();
// const task1 = new Task(1, "Design", "hola", 5);
// const task2 = new Task(2, "Implementation","Hola", 3);
// const task3 = new Task(3, "Testing", "Hola", 1);

// taskManager.addTask(task1);
// taskManager.addTask(task2);
// taskManager.addTask(task3);

// taskManager.addDependency(task1, task2); // task2 depende de task1
// taskManager.addDependency(task2, task3); // task3 depende de task2


// taskManager.startTask(task3); // Luego intentamos iniciar task1
// // taskManager.completeTask();    // Completamos task1
// taskManager.completeTask();    // Completamos task2
taskManager.taskGraph.displayGraph();
