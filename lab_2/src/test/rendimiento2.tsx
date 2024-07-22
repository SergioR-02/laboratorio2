
import { Task } from '../Estructuras/tareas';
import { LinkedList } from '../Estructuras/linkedList';
import { Queue } from '../Estructuras/queue';
import { Stack } from '../Estructuras/stack';
import { BinaryTree } from '../Estructuras/ArbolBinario';
import { TaskGraph } from '../Estructuras/Grafo';


// Función para generar tareas de prueba
function generateTasks(count: number): Task[] {
  const tasks: Task[] = [];
  for (let i = 0; i < count; i++) {
    tasks.push(new Task(i, `Descripción ${i}`, 'pendiente', Math.floor(Math.random() * 3) + 1));
  }
  return tasks;
}

// Función para medir el tiempo de ejecución de una operación
function measureTime(operation: () => void): number {
  const startTime = performance.now();
  operation();
  const endTime = performance.now();
  return endTime - startTime;
}

// Función para realizar las pruebas de rendimiento
function runPerformanceTests2(taskCounts: number[]) {
  for (const count of taskCounts) {
    const tasks = generateTasks(count);

    const linkedList = new LinkedList<Task>();
    const queue = new Queue<Task>();
    const stack = new Stack<Task>();
    const binaryTree = new BinaryTree<Task>();
    const taskGraph = new TaskGraph();

    console.log(`--- Pruebas para ${count} tareas ---`);

    // Medir tiempo de añadir en LinkedList
    const addLinkedListTime = measureTime(() => {
      tasks.forEach(task => linkedList.addStart(task));
    });
    console.log(`Añadir en LinkedList: ${addLinkedListTime.toFixed(2)} ms`);

    // Medir tiempo de eliminar en LinkedList
    const deleteLinkedListTime = measureTime(() => {
      tasks.forEach(task => linkedList.delete(task));
    });
    console.log(`Eliminar en LinkedList: ${deleteLinkedListTime.toFixed(2)} ms`);

    // Medir tiempo de añadir en Queue
    const addQueueTime = measureTime(() => {
      tasks.forEach(task => queue.enqueue(task));
    });
    console.log(`Añadir en Queue: ${addQueueTime.toFixed(2)} ms`);

    // Medir tiempo de eliminar en Queue
    const deleteQueueTime = measureTime(() => {
      while (!queue.empty()) {
        queue.dequeue();
      }
    });
    console.log(`Eliminar en Queue: ${deleteQueueTime.toFixed(2)} ms`);

    // Medir tiempo de añadir en Stack
    const addStackTime = measureTime(() => {
      tasks.forEach(task => stack.push(task));
    });
    console.log(`Añadir en Stack: ${addStackTime.toFixed(2)} ms`);

    // Medir tiempo de eliminar en Stack
    const deleteStackTime = measureTime(() => {
      while (!stack.empty()) {
        stack.pop();
      }
    });
    console.log(`Eliminar en Stack: ${deleteStackTime.toFixed(2)} ms`);

    // Medir tiempo de añadir en BinaryTree
    const addBinaryTreeTime = measureTime(() => {
      tasks.forEach(task => binaryTree.insert(task));
    });
    console.log(`Añadir en BinaryTree: ${addBinaryTreeTime.toFixed(2)} ms`);

    // Medir tiempo de búsqueda en BinaryTree por id
    const searchByIdTime = measureTime(() => {
      tasks.forEach(task => binaryTree.searchById(task.getId()));
    });
    console.log(`Buscar por ID en BinaryTree: ${searchByIdTime.toFixed(2)} ms`);

    // Medir tiempo de búsqueda en BinaryTree por prioridad
    const searchByPriorityTime = measureTime(() => {
      tasks.forEach(task => binaryTree.searchByPriority(task.getPrioridad()));
    });
    console.log(`Buscar por Prioridad en BinaryTree: ${searchByPriorityTime.toFixed(2)} ms`);
    
    // Medir tiempo de eliminar en BinaryTree
    const deleteBinaryTreeTime = measureTime(() => {
      tasks.forEach(task => binaryTree.remove(task.getId()));
    });
    console.log(`Eliminar en BinaryTree: ${deleteBinaryTreeTime.toFixed(2)} ms`);
    
    // Medir tiempo de insertar en TaskGraph
    const addTaskGraphTime = measureTime(() => {
      tasks.forEach(task => taskGraph.addTask(task));
    });
    console.log(`Añadir en TaskGraph: ${addTaskGraphTime.toFixed(2)} ms`);

    // Medir tiempo de añadir dependencias en TaskGraph
    const addDependencyTime = measureTime(() => {
      tasks.forEach((task, index) => {
        if (index > 0) {
          taskGraph.addDependency(tasks[index], tasks[index - 1]);
        }
      });
    });
    console.log(`Añadir dependencias en TaskGraph: ${addDependencyTime.toFixed(2)} ms`);
  }
}

// Ejecución de las pruebas con diferentes tamaños de conjuntos de datos
const taskCounts = [100, 1000, 10000];
runPerformanceTests2(taskCounts);

export default runPerformanceTests2;
