import Form from './components/formulario/Form'
import AddForm from './components/addForm/AddForm'
import { useState,useEffect ,useCallback} from 'react'
import {taskManager} from './Estructuras/gestor'
import {Task} from './Estructuras/tareas'



function App() {
  const [add, setAdd] = useState(false)
  const [list, setList] = useState<Task[]>([])
  const [crear, setCrear] = useState<string>('');


  const handleChange = () => {
    setAdd(!add)
  }

  const handleCrteateTask = useCallback((id: number, descripcion: string, estado: string, prioridad: number): void => {
    const task = new Task(id, descripcion, estado, prioridad);
    taskManager.addTask(task);
    setCrear(new Date().toISOString()); 
  }, []);

  useEffect(() => {
    setList(taskManager.pendingTasks.toArray())
    console.log(list)
  },[crear])


  
  
  

  return (
    <>
      <AddForm handleChange={handleChange} />
      {add && <Form handleCrteateTask={handleCrteateTask} />}
      <div>
        {list.map((task) => (
          <h1 key={task.getId()}>{task.getDescripcion()}</h1>
        ))}
      </div>
    </>
  )
}

export default App
