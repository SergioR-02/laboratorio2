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

  addDependency(task1: Task, task2: Task): void { // task1 depends on task2
    if (this.graph.has(task1.getId()) && this.graph.has(task2.getId())) {
      this.graph.get(task1.getId())?.push(task2.getId());
    }
  }

  getDependencies(task: Task): number[] {
    return this.graph.get(task.getId()) || [];
  }

  removeTask(task: Task): void {
    const taskId = task.getId();
    
    // Remove the task from the graph
    if (this.graph.has(taskId)) {
      this.graph.delete(taskId);
    }

    // Remove the task from the dependencies of other tasks
    this.graph.forEach((dependencies, key) => {
      this.graph.set(key, dependencies.filter(depId => depId !== taskId));
    });
  }

  displayGraph(): void {
    this.graph.forEach((dependencies, taskId) => {
      console.log(`Task ${taskId} depends on: ${dependencies}`);
    });
  }
}