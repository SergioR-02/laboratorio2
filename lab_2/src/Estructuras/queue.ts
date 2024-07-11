export class Queue <T>{
  queue: T[];
  constructor(){
    this.queue = [];
  }

  enqueue(elemento:T): void{
    this.queue.push(elemento);
  }

  empty(): boolean{
    return this.queue.length == 0;
  }

  dequeue(): T{
    if(this.empty()){
      throw new Error("Queue is empty");
    }
    return this.queue.shift() as T;
  }

  front():T{
    if(this.empty()){
      throw new Error("Queue is empty");
    }
    return this.queue[0];
  }
}