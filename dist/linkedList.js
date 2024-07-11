"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    isEmpty() {
        return this.size === 0;
    }
    addStart(value) {
        const newNode = new Node(value);
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.size++;
    }
    addEnd(value) {
        const newNode = new Node(value);
        if (!this.tail) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }
    getSize() {
        return this.size;
    }
    insert(value, index) {
        if (index < 0 || index > this.getSize()) {
            throw new Error('Index out of bounds.');
        }
        if (index === 0) {
            this.addStart(value);
            return;
        }
        if (index === this.getSize()) {
            this.addEnd(value);
            return;
        }
        const newNode = new Node(value);
        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            if (current) {
                current = current.next;
            }
        }
        if (current) {
            newNode.next = current.next;
            current.next = newNode;
            this.size++;
        }
    }
    delete(value) {
        if (!this.head) {
            return;
        }
        if (this.head.value === value) {
            this.head = this.head.next;
            if (!this.head) {
                this.tail = null;
            }
            this.size--;
            return;
        }
        let current = this.head;
        while (current.next && current.next.value !== value) {
            current = current.next;
        }
        if (current.next) {
            if (current.next === this.tail) {
                this.tail = current;
            }
            current.next = current.next.next;
            this.size--;
        }
    }
    find(value) {
        let current = this.head;
        while (current) {
            if (current.value === value) {
                return current;
            }
            current = current.next;
        }
        return null;
    }
    print() {
        let current = this.head;
        while (current) {
            console.log(current.value);
            current = current.next;
        }
    }
    toArray() {
        const elements = [];
        let current = this.head;
        while (current) {
            elements.push(current.value);
            current = current.next;
        }
        return elements;
    }
}
exports.LinkedList = LinkedList;
const lista = new LinkedList();
lista.addStart(1);
lista.addEnd(3);
lista.addEnd(4);
lista.insert(2, 1);
lista.print();
