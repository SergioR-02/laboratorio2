"use strict";
class Stack {
    constructor() {
        this.stack = [];
    }
    push(elemento) {
        this.stack.push(elemento);
    }
    empty() {
        return this.stack.length == 0;
    }
    pop() {
        if (this.empty()) {
            throw new Error("Stack is empty");
        }
        return this.stack.pop();
    }
    peek() {
        if (this.empty()) {
            throw new Error("Stack is empty");
        }
        return this.stack[this.stack.length - 1];
    }
}
const mipila = new Stack();
mipila.push(1);
mipila.push("hola");
mipila.push(true);
console.log(mipila.pop());
console.log(mipila.pop());
console.log(mipila.pop());
