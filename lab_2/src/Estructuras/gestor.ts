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
    // Inicializa las estructuras de datos vacías
    this.pendingTasks = new LinkedList<Task>();
    this.inProgressTasks = new Queue<Task>();
    this.completedTasks = new Stack<Task>();
    this.taskBST = new BinaryTree<Task>();
    this.taskGraph = new TaskGraph();
    this.check = [];
  }

  addTask(task: Task, dependencies?: Task[]): void {
    // Añade la tarea a la lista de tareas pendientes
    this.pendingTasks.addStart(task);
    // Inserta la tarea en el árbol binario de búsqueda
    this.taskBST.insert(task);
    // Añade la tarea al grafo
    this.taskGraph.addTask(task);

    // Añade las dependencias si existen
    if (dependencies) {
      dependencies.forEach((dep) => {
        this.addDependency(task, dep);
      });
    }
  }

  startTask(task: Task): string {
    // Obtiene las dependencias de la tarea
    const dependencies = this.taskGraph.getDependencies(task);
    
    // Verifica si todas las dependencias están completadas
    const dependenciesCompleted = dependencies.every(depId => this.check.find(task => task.getId() === depId));

    if (dependenciesCompleted) {
      // Si todas las dependencias están completadas, mueve la tarea a la cola de tareas en progreso
      this.pendingTasks.delete(task);
      task.estadoNuevo = "Progreso"; // Cambio de estado
      //console.log(`Starting task ${task.getId()}: `);
      this.inProgressTasks.enqueue(task);
      return "";
    } else {
      // Si no, devuelve un mensaje indicando que no se puede iniciar la tarea
      //console.log(`Cannot start task ${task.getId()}: Dependencies are not completed.`);
      return `No se puede iniciar la tarea, sus dependencias no se han completado`;
    }
  }

  completeTask(): string | void {
    if (this.inProgressTasks.empty()) {
      // Si no hay tareas en progreso, devuelve un mensaje
      //console.log("No hay tareas en progreso");
      return "No hay tareas en progreso";
    } else {
      // Si hay tareas en progreso, mueve la tarea a la pila de tareas completadas
      const task = this.inProgressTasks.dequeue();
      task.estadoNuevo = "Completada"; // Cambio de estado
      this.check.push(task);
      this.completedTasks.push(task);
    }
  }

  deleteCompletedTask(): string | void {
    if (this.completedTasks.empty()) {
      // Si no hay tareas completadas, devuelve un mensaje
      //console.log("No hay tareas Completadas");
      return "No hay tareas Completadas";
    } else {
      // Si hay tareas completadas, elimina la tarea del árbol binario de búsqueda y de la pila de tareas completadas
      this.taskBST.remove(this.completedTasks.peek().getId());
      this.completedTasks.pop();
    }
  }

  addDependency(task1: Task, task2: Task): void {
    // Añade una dependencia entre dos tareas en el grafo
    this.taskGraph.addDependency(task1, task2);
  }

  displayGraph(): void {
    // Muestra el contenido del grafo 
    this.taskGraph.displayGraph();
  }

  searchTask(type: string, id: number): Task[] {
    // Busca tareas en el árbol binario de búsqueda por ID o por prioridad
    if (type === 'id') {
      return this.taskBST.searchById(id);
    } else {
      return this.taskBST.searchByPriority(id);
    }
  }
}
export const taskManager = new TaskManager();
