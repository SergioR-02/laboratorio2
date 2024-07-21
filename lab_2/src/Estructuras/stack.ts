// Un stack de tipo genérico
export class Stack<T> {
  // Define un array de tipo genérico T para almacenar los elementos del stack
  stack: T[];  

  constructor() {
    this.stack = [];  
  }

   // Agrega un nuevo elemento al final del stack
  push(elemento: T): void {
    this.stack.push(elemento); 
  }

   // Devuelve true si el stack está vacío, de lo contrario, false
  empty(): boolean {
    return this.stack.length == 0; 
  }

  // Remueve y devuelve el último elemento del stack
  pop(): T {
    if (this.empty()) {  
      throw new Error("Stack is empty");
    }
    return this.stack.pop() as T; 
  }

  // Devuelve el último elemento del stack sin removerlo
  peek(): T {
    if (this.empty()) { 
      throw new Error("Stack is empty");
    }
    return this.stack[this.stack.length - 1];  
  }

  // Devuelve una copia del array que representa el stack
  toArray(): T[] {
    return this.stack; 
  }
}


