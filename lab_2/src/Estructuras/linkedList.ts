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
  // Agregar un elemento al final de la lista
  addEnd(value: T): void {
    const newNode = new Node<T>(value)
    if (!this.tail) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail.next = newNode
      this.tail = newNode
    }
    this.size++
  }

  // Obtener el tamaño de la lista
  getSize(): number {
    return this.size
  }

  // Insertar un elemento en una posición específica
  insert(value: T, index: number): void {
    if (index < 0 || index > this.getSize()) {
      throw new Error('Index out of bounds.') // Validar el índice
    }
    if (index === 0) {
      this.addStart(value) // Si el índice es 0, usar prepend
      return
    }
    if (index === this.getSize()) {
      this.addEnd(value) // Si el índice es igual al tamaño, usar append
      return
    }
    const newNode = new Node<T>(value) // Crear un nuevo Node con el valor dado
    let current = this.head
    for (let i = 0; i < index - 1; i++) {
      if (current) {
        current = current.next // Avanzar al Node anterior a la posición deseada
      }
    }
    if (current) {
      newNode.next = current.next // El nuevo Node apunta al Node en la posición actual
      current.next = newNode // El Node anterior apunta al nuevo Node
      this.size++ // Incrementar el tamaño de la lista
    }
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

  // Buscar un nodo con el valor dado
  find(value: T): Node<T> | null {
    let current = this.head
    while (current) {
      if (current.value === value) {
        return current // Devolver el nodo encontrado
      }
      current = current.next // Avanzar al siguiente nodo
    }
    return null // Si no se encuentra, devolver null
  }

  // Eliminar el primer elemento de la lista
  deleteFirst(): void {
    if (!this.head) {
        return // Si la lista está vacía, no hacer nada
    }
    this.head = this.head.next // Actualizar la referencia del primer nodo
    if (!this.head) {
        this.tail = null // Si la lista queda vacía, actualizar la referencia del último nodo
    }
    this.size-- // Decrementar el tamaño de la lista
}

  print(): void {
    let current = this.head
    while (current) {
      console.log(current.value)
      current = current.next
    }
  }

}


