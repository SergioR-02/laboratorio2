class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T) {
    this.value = value
    this.next = null
  }
}

export class LinkedList<T> {
  head: Node<T> | null
  tail: Node<T> | null
  size: number

  constructor() {
    this.head = null
    this.tail = null
    this.size = 0
  }
  // Verificar si la lista está vacía
  isEmpty(): boolean {
    return this.size === 0
  }

  // Agregar un elemento al inicio de la lista
  addStart(value: T): void {
    const newNode = new Node<T>(value)
    if (this.isEmpty()) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.next = this.head
      this.head = newNode
    }
    this.size++
  }

  // Obtener el tamaño de la lista
  getSize(): number {
    return this.size
  }

  // Eliminar el primer nodo que coincide con el valor dado
  delete(value: T): void {
    if (!this.head) {
      return // Si la lista está vacía, no hacer nada
    }
    if (this.head.value === value) {
      this.head = this.head.next // Actualizar la referencia del primer nodo
      if (!this.head) {
        this.tail = null // Si la lista queda vacía, actualizar la referencia del último nodo
      }
      this.size-- // Decrementar el tamaño de la lista
      return
    }
    let current = this.head
    while (current.next && current.next.value !== value) {
      current = current.next // Avanzar al siguiente nodo
    }
    if (current.next) {
      if (current.next === this.tail) {
        this.tail = current // Actualizar la referencia del último nodo si es necesario
      }
      current.next = current.next.next // Eliminar el nodo encontrado
      this.size-- // Decrementar el tamaño de la lista
    }
  }

  //Recorre la lista y devolvuelve un array con los elementos
  toArray(): T[] {
    const elements: T[] = []
    let current = this.head
    while (current) {
      elements.push(current.value) // Añadir el valor de cada nodo al array
      current = current.next // Avanzar al siguiente nodo
    }
    return elements // Devolver el array resultante
  }
}


