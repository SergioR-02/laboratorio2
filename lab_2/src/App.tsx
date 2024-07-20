import Form from './components/formulario/Form'
import AddForm from './components/addForm/AddForm'
import {taskManager} from './Estructuras/gestor'
import {TipeTask} from './components/tipeTasks/TipeTask'
import {useEffect, useState, useCallback} from 'react'
import {Task} from './Estructuras/tareas'





function App() {
  const [add, setAdd] = useState(false)
  const [barSearch, setBarSearch] = useState(false)
  const [list, setList] = useState<Task[]>([])
  const [progress, setProgress] = useState<Task[]>([])
  const [completed, setCompleted] = useState<Task[]>([])
  const [crear, setCrear] = useState<string>('');
  const [pendingProgress, setPendingProgress] = useState<Task[]>([])

  const handleChange = () => {
    setAdd(!add)
  }

  const handleSearch = () => {
    setBarSearch(!barSearch)
  }

  const handleCreateTask = useCallback((id: number, descripcion: string, estado: string, prioridad: number,dependencias?:Task[]): void => {
    const task = new Task(id, descripcion, estado, prioridad);
    
    if (dependencias) {
      taskManager.addTask(task, dependencias);
    }else{
      taskManager.addTask(task);
    }
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
    setPendingProgress([...taskManager.pendingTasks.toArray(), ...taskManager.inProgressTasks.toArray()]);    // console.log(list)
    // console.log(progress)
    // console.log(completed)
  },[crear])

  
  return (
    <>

      <AddForm handleChange={handleChange} handleSearch={handleSearch} />
      {add && <Form handleCreateTask={handleCreateTask} list={pendingProgress} />}
      {barSearch && <TipeTask title='Busqueda' listTask={completed} background="#84DAE4" handlefunction={():void=>{}}  type="search"/>}
      <TipeTask title='Tareas Pendientes' listTask={list} background="#148300" handlefunction={handleStartTask} type="pending"/>
      <TipeTask title='Tareas en Progreso' listTask={progress} background="#000E83" handlefunction={handleCompleteTask}  type="progress" />
      <TipeTask title='Tareas Completadas' listTask={completed} background="#830075" handlefunction={handleDeleteCompletedTask}  type="completed"/>


    </>
  )
}

export default App
