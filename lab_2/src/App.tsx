import { Stack } from './Estructuras/stack'
import { LinkedList } from './Estructuras/linkedList';
import { BinaryTree } from './Estructuras/ArbolBinario';

function App() {
  const arbol = new BinaryTree();
  const mipila = new Stack();
  mipila.push(1); 
  console.log(mipila.pop());
  return (
    <>

    </>
  )
}

export default App
