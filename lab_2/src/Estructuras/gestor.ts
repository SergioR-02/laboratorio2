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
      task.estadoNuevo = "Progreso"; // Cambio de estado
      console.log(`Starting task ${task.getId()}: `);
      
      this.inProgressTasks.enqueue(task);
    } else {
      console.log(`Cannot start task ${task.getId()}: Dependencies are not completed.`);
      return (`Cannot start task ${task.getId()}): Dependencies are not completed.`);
    }
  }

  completeTask(): string|void {
    if (this.inProgressTasks.empty()) {
      console.log("No tasks in Progreso");
      return "No tasks in Progreso";
    }
    else{
      const task = this.inProgressTasks.dequeue();
      task.estadoNuevo = "Completada"; // Cambio de estado
      console.log(`Completing task ${task.getId()}`);
      this.check.push(task);
      this.completedTasks.push(task);
    }
  }

  deleteCompletedTask(): string|void {
    if (this.completedTasks.empty()) {
      console.log("No tasks Completada");
      return "No tasks Completada";
    } else {
      this.completedTasks.pop();
    }
  }

  addDependency(task1: Task, task2: Task): void {
    this.taskGraph.addDependency(task1, task2);
  }

  deletePendingTask(task: Task): void {
    this.pendingTasks.delete(task);
    this.taskGraph.removeTask(task);
  }

  displayGraph(): void {
    this.taskGraph.displayGraph();
  }

  searchTask(type:string,id: number): Task[] {
    if(type === 'id'){
      return this.taskBST.searchById(id);
    }else{
      return this.taskBST.searchByPriority(id);
    }
  }
}

// Ejemplo de uso
export const taskManager = new TaskManager();
const task1 = new Task(1, "Design", "hola", 3);
const task2 = new Task(2, "Implementation","Hola", 3);
const task3 = new Task(3, "Testing", "Hola", 1);
// const task4 = new Task(4, "Testing", "hpta", 3);
// const task5 = new Task(1, "1", "hola", 2);
// const task6 = new Task(2, "2","Hola", 1);
// const task7 = new Task(0, "3", "Hola", 2);
// const task8 = new Task(1, "4", "hpta", 3);
// const task9 = new Task(4, "5", "hpta", 3);



taskManager.addTask(task1);
taskManager.addTask(task2);
taskManager.addTask(task3);
// taskManager.addTask(task4);
// taskManager.addTask(task5);
// taskManager.addTask(task6);
// taskManager.addTask(task7);
// taskManager.addTask(task8);
// taskManager.addTask(task9);

// console.log(taskManager.taskBST.searchByPriority(3));
// console.log(taskManager.taskBST.searchById(1));


// taskManager.addDependency(task1, task2); // task1 depende de task2
// taskManager.addDependency(task2, task3); // task2 depende de task3


// taskManager.startTask(task1); // Luego intentamos iniciar task1
// taskManager.completeTask();    // Completamos task1
// taskManager.completeTask();    // Completamos task2
// taskManager.taskGraph.displayGraph();
