//Un stack de tipo generico
export class Stack<T> {
  stack: T[];

  constructor() {
    this.stack = [];
  }

  push(elemento:T): void{
    this.stack.push(elemento);
  }

  empty(): boolean{
    return this.stack.length == 0;
  }

  pop(): T{
    if(this.empty()){
      throw new Error("Stack is empty");
    }
    return this.stack.pop() as T;
  }

  peek(): T{
    if(this.empty()){
      throw new Error("Stack is empty");
    }
    return this.stack[this.stack.length - 1];
  }

  contains(element: T): boolean {
    return this.stack.includes(element);
  }

  toArray(): T[] {
    return this.stack;
  }
}


