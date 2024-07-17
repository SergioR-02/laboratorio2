import Form from './components/formulario/Form'
import AddForm from './components/addForm/AddForm'
import { useState,useEffect ,useCallback} from 'react'
import {taskManager} from './Estructuras/gestor'
import {Task} from './Estructuras/tareas'
import {TipeTask} from './components/tipeTasks/TipeTask'

function App() {
  const [add, setAdd] = useState(false)
  const [list, setList] = useState<Task[]>([])
  const [progress, setProgress] = useState<Task[]>([])
  const [completed, setCompleted] = useState<Task[]>([])
  const [crear, setCrear] = useState<string>('');

  const handleChange = () => {
    setAdd(!add)
  }

  const handleCrteateTask = useCallback((id: number, descripcion: string, estado: string, prioridad: number): void => {
    const task = new Task(id, descripcion, estado, prioridad);
    taskManager.addTask(task);
    setCrear(new Date().toISOString()); 
  }, []);

  const handleStartTask = useCallback((task?: Task): string|void => {
    if (task) {
      taskManager.startTask(task);
      setCrear(new Date().toISOString());
    } else {}
  },[]);

  const handleCompleteTask = useCallback((): void => {
    taskManager.completeTask();
    setCrear(new Date().toISOString());
  },[]);

  const handleDeleteCompletedTask = useCallback((): void => {
    taskManager.deleteCompletedTask();
    setCrear(new Date().toISOString());
  },[]);

  useEffect(() => {
    setList(taskManager.pendingTasks.toArray())
    setProgress(taskManager.inProgressTasks.toArray())
    setCompleted(taskManager.completedTasks.toArray())
    // console.log(list)
    // console.log(progress)
    // console.log(completed)
  },[crear])

  return (
    <>
      <AddForm handleChange={handleChange} />
      {add && <Form handleCrteateTask={handleCrteateTask} />}
      <TipeTask title='Tareas Pendientes' listTask={list} background="#148300" handlefunction={handleStartTask} type="pending"/>
      <TipeTask title='Tareas en Progreso' listTask={progress} background="#000E83" handlefunction={handleCompleteTask}  type="progress" />
      <TipeTask title='Tareas Completadas' listTask={completed} background="#830075" handlefunction={handleDeleteCompletedTask}  type="completed"/>
    </>
  )
}

export default App
