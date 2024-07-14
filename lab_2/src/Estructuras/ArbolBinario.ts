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

  // Buscar un nodo en el árbol binario por id
  searchById(id: number): T | null {
    return this.searchNodeById(this.root, id);
  }

  private searchNodeById(node: TreeNode<T> | null, id: number): T | null {
    if (node === null) {
      return null;
    }
    if (id < node.value.getId()) {
      return this.searchNodeById(node.left, id);
    } else if (id > node.value.getId()) {
      return this.searchNodeById(node.right, id);
    } else {
      return node.value;
    }
  }

  // Buscar un nodo en el árbol binario por prioridad
  searchByPriority(priority: number): T | null {
    return this.searchNodeByPriority(this.root, priority);
  }

  private searchNodeByPriority(node: TreeNode<T> | null, priority: number): T | null {
    if (node === null) {
      return null;
    }
    if (priority < node.value.getPrioridad()) {
      return this.searchNodeByPriority(node.left, priority);
    } else if (priority > node.value.getPrioridad()) {
      return this.searchNodeByPriority(node.right, priority);
    } else {
      return node.value;
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

  // Recorrer el árbol en preorden (Pre-order traversal)
  preorder(): T[] {
    const result: T[] = [];
    this.preorderTraversal(this.root, result);
    return result;
  }

  private preorderTraversal(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      result.push(node.value);
      this.preorderTraversal(node.left, result);
      this.preorderTraversal(node.right, result);
    }
  }

  // Recorrer el árbol en postorden (Post-order traversal)
  postorder(): T[] {
    const result: T[] = [];
    this.postorderTraversal(this.root, result);
    return result;
  }

  private postorderTraversal(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.postorderTraversal(node.left, result);
      this.postorderTraversal(node.right, result);
      result.push(node.value);
    }
  }
}