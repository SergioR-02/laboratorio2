export class Queue<T> {
  // Define un array de tipo genérico T para almacenar los elementos de la cola
  queue: T[];  
  
  // Inicializa la cola como un array vacío
  constructor() {
    this.queue = [];  
  }

  // Agrega un nuevo elemento al final de la cola
  enqueue(elemento: T): void {
    this.queue.push(elemento);  
  }

   // Devuelve true si la cola está vacía, de lo contrario, false
  empty(): boolean {
    return this.queue.length == 0; 
  }

  // Remueve y devuelve el primer elemento de la cola
  dequeue(): T {
    if (this.empty()) {  // Si la cola está vacía, lanza un error
      throw new Error("Queue is empty");
    }
    return this.queue.shift() as T;  
  }

  // Devuelve el primer elemento de la cola sin removerlo
  front(): T {
    if (this.empty()) {  
      throw new Error("Queue is empty");
    }
    return this.queue[0];  
  }

   // Devuelve una copia del array que representa la cola
  toArray(): T[] {
    return this.queue; 
  }
}


