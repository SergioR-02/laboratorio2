"use strict";
class Queue {
    constructor() {
        this.queue = [];
    }
    enqueue(elemento) {
        this.queue.push(elemento);
    }
    empty() {
        return this.queue.length == 0;
    }
    dequeue() {
        if (this.empty()) {
            throw new Error("Queue is empty");
        }
        return this.queue.shift();
    }
    front() {
        if (this.empty()) {
            throw new Error("Queue is empty");
        }
        return this.queue[0];
    }
}
