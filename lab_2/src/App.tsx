import Form from './components/formulario/Form'
import AddForm from './components/addForm/AddForm'
import { useState } from 'react'


function App() {
  const [add, setAdd] = useState(false)

  const handleChange = () => {
    setAdd(!add)
  }
  return (
    <>
      <AddForm handleChange={handleChange} />
      {add && <Form />}
    </>
  )
}

export default App
