
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
    const tasks = generateTasks(count); // Genera un número de tareas basado en el conteo actual

    // Crear instancias de estructuras de datos
    const linkedList = new LinkedList<Task>();
    const queue = new Queue<Task>();
    const stack = new Stack<Task>();
    const binaryTree = new BinaryTree<Task>();
    const taskGraph = new TaskGraph();

    console.log(`--- Pruebas para ${count} tareas ---`);

    // Sección de Pruebas: Inserción
    console.log('--- Inserción ---');

    // Medir tiempo de añadir en LinkedList
    const addLinkedListTime = measureTime(() => {
      tasks.forEach(task => linkedList.addStart(task));
    });
    console.log(`Añadir en LinkedList: ${addLinkedListTime.toFixed(2)} ms`);

    // Medir tiempo de añadir en Queue
    const addQueueTime = measureTime(() => {
      tasks.forEach(task => queue.enqueue(task));
    });
    console.log(`Añadir en Queue: ${addQueueTime.toFixed(2)} ms`);

    // Medir tiempo de añadir en Stack
    const addStackTime = measureTime(() => {
      tasks.forEach(task => stack.push(task));
    });
    console.log(`Añadir en Stack: ${addStackTime.toFixed(2)} ms`);

    // Medir tiempo de añadir en BinaryTree
    const addBinaryTreeTime = measureTime(() => {
      tasks.forEach(task => binaryTree.insert(task));
    });
    console.log(`Añadir en BinaryTree: ${addBinaryTreeTime.toFixed(2)} ms`);

    // Medir tiempo de insertar en TaskGraph
    const addTaskGraphTime = measureTime(() => {
      tasks.forEach(task => taskGraph.addTask(task));
    });
    console.log(`Añadir en TaskGraph: ${addTaskGraphTime.toFixed(2)} ms`);

    // Sección de Pruebas: Recorrido Inorden
    console.log('--- Recorrido Inorden ---');

    // Medir tiempo de recorrido en orden en BinaryTree
    const inorderTime = measureTime(() => {
      binaryTree.inorder(); // Ejecutar el recorrido en orden
    });
    console.log(`Recorrido inorden: ${inorderTime.toFixed(2)} ms`);

    // Sección de Pruebas: Dependencias
    console.log('--- Dependencias ---');

    // Medir tiempo de añadir dependencias en TaskGraph
    const addDependencyTime = measureTime(() => {
      tasks.forEach((task, index) => {
        if (index > 0) {
          taskGraph.addDependency(tasks[index], tasks[index - 1]); // Agrega una dependencia entre la tarea actual y la tarea anterior
        }
      });
    });
    console.log(`Añadir dependencias en TaskGraph: ${addDependencyTime.toFixed(2)} ms`);

    // Sección de Pruebas: Eliminación
    console.log('--- Eliminación ---');

    // Medir tiempo de eliminar en LinkedList
    const deleteLinkedListTime = measureTime(() => {
      tasks.forEach(task => linkedList.delete(task)); // Elimina cada tarea de la lista
    });
    console.log(`Eliminar en LinkedList: ${deleteLinkedListTime.toFixed(2)} ms`);

    // Medir tiempo de eliminar en Queue
    const deleteQueueTime = measureTime(() => {
      while (!queue.empty()) {
        queue.dequeue(); // Desencola cada tarea hasta que la cola esté vacía
      }
    });
    console.log(`Eliminar en Queue: ${deleteQueueTime.toFixed(2)} ms`);

    // Medir tiempo de eliminar en Stack
    const deleteStackTime = measureTime(() => {
      while (!stack.empty()) {
        stack.pop(); // Desapila cada tarea hasta que la pila esté vacía
      }
    });
    console.log(`Eliminar en Stack: ${deleteStackTime.toFixed(2)} ms`);

    // Medir tiempo de eliminar en BinaryTree
    const deleteBinaryTreeTime = measureTime(() => {
      tasks.forEach(task => binaryTree.remove(task.getId())); // Elimina cada tarea del árbol por su ID
    });
    console.log(`Eliminar en BinaryTree: ${deleteBinaryTreeTime.toFixed(2)} ms`);
  }
}

// Ejecución de las pruebas con diferentes tamaños de conjuntos de datos
const taskCounts = [100, 1000, 10000];
runPerformanceTests2(taskCounts);

export default runPerformanceTests2;