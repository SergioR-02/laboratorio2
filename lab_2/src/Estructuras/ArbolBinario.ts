class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinaryTree<T extends { getId(): number; getPrioridad(): number }> {
  root: TreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  // Insertar un nodo en el árbol binario
  insert(value: T): void {
    const newNode = new TreeNode(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

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

  private inorderTraversal(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.inorderTraversal(node.left, result);
      result.push(node.value);
      this.inorderTraversal(node.right, result);
    }
  }
}
