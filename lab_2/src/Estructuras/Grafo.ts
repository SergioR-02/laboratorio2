import { Task } from './tareas';

export class TaskGraph {
  graph: Map<number, number[]>;

  constructor() {
    this.graph = new Map<number, number[]>();
  }

  addTask(task: Task): void {
    if (!this.graph.has(task.getId())) {
      this.graph.set(task.getId(), []);
    }
  }

  addDependency(task1: Task, task2: Task): void {
    if (this.graph.has(task1.getId()) && this.graph.has(task2.getId())) {
      this.graph.get(task1.getId())?.push(task2.getId());
    }
  }

  getDependencies(task: Task): number[] {
    return this.graph.get(task.getId()) || [];
  }

  displayGraph(): void {
    this.graph.forEach((dependencies, taskId) => {
      console.log(`Task ${taskId} depends on: ${dependencies}`);
    });
  }
}