import { Task } from './tareas';

export class TaskGraph {
  graph: Map<number, number[]>;

  // Constructor para inicializar un grafo vacío
  constructor() {
    this.graph = new Map<number, number[]>();
  }

  // Agregar una tarea al grafo
  addTask(task: Task): void {
    // Si la tarea no está en el grafo, añadirla con una lista vacía de dependencias
    if (!this.graph.has(task.getId())) {
      this.graph.set(task.getId(), []);
    }
  }

  // Agregar una dependencia entre dos tareas
  addDependency(task1: Task, task2: Task): void { // task1 depende de task2
    // Asegurarse de que ambas tareas estén en el grafo antes de añadir la dependencia
    if (this.graph.has(task1.getId()) && this.graph.has(task2.getId())) {
      // Añadir task2 como dependencia de task1
      this.graph.get(task1.getId())?.push(task2.getId());
    }
  }

  // Obtener las dependencias de una tarea específica
  getDependencies(task: Task): number[] {
    // Devolver la lista de dependencias para la tarea dada, o una lista vacía si no tiene dependencias
    return this.graph.get(task.getId()) || [];
  }

  // Mostrar el contenido y dependencias del grafo en la consola
  displayGraph(): void {
    this.graph.forEach((dependencies, taskId) => {
      console.log(`Task ${taskId} depends on: ${dependencies}`);
    });
  }
}



