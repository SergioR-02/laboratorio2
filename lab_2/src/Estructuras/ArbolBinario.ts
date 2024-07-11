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

export class BinaryTree<T> {
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
    if (newNode.value < node.value) {
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

  // Buscar un nodo en el árbol binario
  search(value: T): boolean {
    return this.searchNode(this.root, value);
  }

  private searchNode(node: TreeNode<T> | null, value: T): boolean {
    if (node === null) {
      return false;
    }
    if (value < node.value) {
      return this.searchNode(node.left, value);
    } else if (value > node.value) {
      return this.searchNode(node.right, value);
    } else {
      return true;
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

// Ejemplo de uso
const arbol = new BinaryTree<number>();
arbol.insert(10);
arbol.insert(5);
arbol.insert(15);
arbol.insert(3);
arbol.insert(7);
arbol.insert(12);
arbol.insert(17);

console.log("In-order:", arbol.inorder()); // [3, 5, 7, 10, 12, 15, 17]
console.log("Pre-order:", arbol.preorder()); // [10, 5, 3, 7, 15, 12, 17]
console.log("Post-order:", arbol.postorder()); // [3, 7, 5, 12, 17, 15, 10]
console.log("Search 7:", arbol.search(7)); // true
console.log("Search 8:", arbol.search(8)); // false