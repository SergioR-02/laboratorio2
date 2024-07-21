class TreeNode<T> {
  //Nodo de un árbol binario con un valor de tipo genérico T
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
  // Constructor para inicializar un nodo con un valor, y punteros a hijos izquierdo y derecho
  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinaryTree<T extends { getId(): number; getPrioridad(): number }> {
  root: TreeNode<T> | null;
  
  // Constructor para inicializar un árbol binario con una raíz nula
  constructor() {
    this.root = null;
  }

  // Insertar un nodo en el árbol binario
  insert(value: T): void {
    const newNode = new TreeNode(value);
    if (this.root === null) {
      // Si la raíz es nula, el nuevo nodo se convierte en la raíz
      this.root = newNode;
    } else {
      // Si no, se llama a insertNode para encontrar la posición adecuada
      this.insertNode(this.root, newNode);
    }
  }

  // Insertar un nodo en la posición correcta, ordenando por prioridad
  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>): void {
    if (newNode.value.getId() < node.value.getId()) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  // Eliminar un nodo en el árbol binario por id
  remove(id: number): void {
    this.root = this.removeNode(this.root, id);
  }

  // Eliminar un nodo con un id específico, manteniendo el orden del árbol
  private removeNode(node: TreeNode<T> | null, id: number): TreeNode<T> | null {
    if (node === null) {
      return null;
    }

    if (id < node.value.getId()) {
      node.left = this.removeNode(node.left, id);
      return node;
    } else if (id > node.value.getId()) {
      node.right = this.removeNode(node.right, id);
      return node;
    } else {
      // Nodo con un solo hijo o sin hijos
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      // Nodo con dos hijos: Obtener el sucesor en el inorder traversal (el menor en el subárbol derecho)
      const tempNode = this.findMinNode(node.right);
      node.value = tempNode!.value;
      node.right = this.removeNode(node.right, tempNode!.value.getId());
      return node;
    }
  }

  // Encontrar el nodo con el valor mínimo (utilizado para eliminar nodos)
  private findMinNode(node: TreeNode<T>): TreeNode<T> {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  // Buscar todos los nodos en el árbol binario por id
  searchById(id: number): T[] {
    const result: T[] = [];
    this.searchNodesById(this.root, id, result);
    return result;
  }

  // Recorrre los nodos comparando el id específico
  private searchNodesById(node: TreeNode<T> | null, id: number, result: T[]): void {
    if (node !== null) {
      if (node.value.getId() === id) {
        result.push(node.value);
      }
      this.searchNodesById(node.left, id, result);
      this.searchNodesById(node.right, id, result);
    }
  }

  // Buscar todos los nodos en el árbol binario por prioridad
  searchByPriority(priority: number): T[] {
    const result: T[] = [];
    this.searchNodesByPriority(this.root, priority, result);
    return result;
  }

  // Recorrre los nodos comparando la prioridad específica
  private searchNodesByPriority(node: TreeNode<T> | null, priority: number, result: T[]): void {
    if (node !== null) {
      if (node.value.getPrioridad() === priority) {
        result.push(node.value);
      }
      this.searchNodesByPriority(node.left, priority, result);
      this.searchNodesByPriority(node.right, priority, result);
    }
  }

  // Recorrer el árbol en orden (In-order traversal)
  inorder(): T[] {
    const result: T[] = [];
    this.inorderTraversal(this.root, result);
    return result;
  }

  //Recorre el árbol en orden y almacena los valores en un array
  private inorderTraversal(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.inorderTraversal(node.left, result);
      result.push(node.value);
      this.inorderTraversal(node.right, result);
    }
  }
}