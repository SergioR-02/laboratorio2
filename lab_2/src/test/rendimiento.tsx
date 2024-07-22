
import { Task } from '../Estructuras/tareas';
import { LinkedList } from '../Estructuras/linkedList';
import { Queue } from '../Estructuras/queue';
import { Stack } from '../Estructuras/stack';
import { BinaryTree } from '../Estructuras/ArbolBinario';
import { TaskGraph } from '../Estructuras/Grafo';

// Función para generar tareas de prueba
function generateTasks(count: number): Task[] {
  const tasks: Task[] = []; // Array para almacenar las tareas generadas
  for (let i = 0; i < count; i++) {
    // Crea una tarea con un identificador único, descripción, estado y prioridad aleatoria
    tasks.push(new Task(i, `Descripción ${i}`, 'pendiente', Math.floor(Math.random() * 3) + 1));
  }
  return tasks; // Retorna el array de tareas generadas
}

// Función para medir el tiempo de ejecución de una operación
function measureTime(operation: () => void): number {
  const startTime = performance.now(); // Registra el tiempo de inicio
  operation(); // Ejecuta la operación a medir
  const endTime = performance.now(); // Registra el tiempo de finalización
  return endTime - startTime; // Retorna el tiempo transcurrido en milisegundos
}

// Función para realizar las pruebas de rendimiento
function runPerformanceTests(taskCounts: number[]): any[] {
  const results = []; // Array para almacenar los resultados de las pruebas
  
  for (const count of taskCounts) {
    const tasks = generateTasks(count); // Genera un número de tareas basado en el conteo actual

    const linkedList = new LinkedList<Task>(); // Crea una instancia de lista enlazada
    const queue = new Queue<Task>(); // Crea una instancia de cola
    const stack = new Stack<Task>(); // Crea una instancia de pila
    const binaryTree = new BinaryTree<Task>(); // Crea una instancia de árbol binario
    const taskGraph = new TaskGraph(); // Crea una instancia de grafo de tareas

    // Medir el tiempo para agregar tareas a la lista enlazada
    const addLinkedListTime = measureTime(() => {
      tasks.forEach(task => linkedList.addStart(task)); // Agrega cada tarea al inicio de la lista
    });

    // Medir el tiempo para eliminar tareas de la lista enlazada
    const deleteLinkedListTime = measureTime(() => {
      tasks.forEach(task => linkedList.delete(task)); // Elimina cada tarea de la lista
    });

    // Medir el tiempo para agregar tareas a la cola
    const addQueueTime = measureTime(() => {
      tasks.forEach(task => queue.enqueue(task)); // Encola cada tarea
    });

    // Medir el tiempo para eliminar todas las tareas de la cola
    const deleteQueueTime = measureTime(() => {
      while (!queue.empty()) {
        queue.dequeue(); // Desencola cada tarea hasta que la cola esté vacía
      }
    });

    // Medir el tiempo para agregar tareas a la pila
    const addStackTime = measureTime(() => {
      tasks.forEach(task => stack.push(task)); // Apila cada tarea
    });

    // Medir el tiempo para eliminar todas las tareas de la pila
    const deleteStackTime = measureTime(() => {
      while (!stack.empty()) {
        stack.pop(); // Desapila cada tarea hasta que la pila esté vacía
      }
    });

    // Medir el tiempo para agregar tareas al árbol binario
    const addBinaryTreeTime = measureTime(() => {
      tasks.forEach(task => binaryTree.insert(task)); // Inserta cada tarea en el árbol
    });

    // Medir el tiempo de recorrido en orden del árbol binario
    const inorderTime = measureTime(() => {
      binaryTree.inorder(); // Ejecuta el recorrido en orden del árbol
    });

    // Medir el tiempo para eliminar tareas del árbol binario
    const deleteBinaryTreeTime = measureTime(() => {
      tasks.forEach(task => binaryTree.remove(task.getId())); // Elimina cada tarea del árbol por su ID
    });

    // Medir el tiempo para agregar tareas al grafo de tareas
    const addTaskGraphTime = measureTime(() => {
      tasks.forEach(task => taskGraph.addTask(task)); // Agrega cada tarea al grafo
    });

    // Medir el tiempo para agregar dependencias entre tareas en el grafo
    const addDependencyTime = measureTime(() => {
      tasks.forEach((task, index) => {
        if (index > 0) {
          taskGraph.addDependency(tasks[index], tasks[index - 1]); // Agrega una dependencia entre la tarea actual y la tarea anterior
        }
      });
    });

    // Guardar los resultados de la prueba para el conteo actual de tareas
    results.push({
      count,
      addLinkedListTime,
      deleteLinkedListTime,
      addQueueTime,
      deleteQueueTime,
      addStackTime,
      deleteStackTime,
      addBinaryTreeTime,
      inorderTime, // Agregar el tiempo de recorrido en orden
      deleteBinaryTreeTime,
      addTaskGraphTime,
      addDependencyTime
    });
  }

  return results; // Retorna los resultados de todas las pruebas
}

export default runPerformanceTests;