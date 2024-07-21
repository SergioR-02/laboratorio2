import './Form.css';
import CampoTexto from '../campoTexto/CampoTexto';
import CampoSeleccionar from '../campoSeleccionar/CampoSeleccionar';
import Boton from '../Boton/Boton';
import { useState,useRef } from 'react'
import Depend from '../Dependencias/Depend';
import { Task } from '../../Estructuras/tareas';

interface FormularioProps  {
  handleCreateTask: (id: number, descripcion: string, estado: string, prioridad: number,dependencias?:Task[]) => void;
  list: Task[];
};

const Formulario = ({ handleCreateTask, list }: FormularioProps) => {
  const [descripcion, setDescripcion] = useState('')
  const [prioridad, setPrioridad] = useState('')
  const [dependencias, setDependencias] = useState<Task[]>([])
  const id = useRef(0)


  const handleCheckboxChange = (task: Task) => {
    setDependencias((prevSelectedTasks) => {
      if (prevSelectedTasks.includes(task)) {
        return prevSelectedTasks.filter((t) => t !== task);
      } else {
        return [...prevSelectedTasks, task];
      }
    });
  };

  const handleChange = (e: any):void => {
    setDescripcion(e.target.value)
  }

  const handleSelect = (e: any):void => {
    setPrioridad(e.target.value)
  }

  const prioridadToNumber = (prioridad:string):number => {
    switch(prioridad){
      case 'Alta':
        return 1
      case 'Media':
        return 2
      case 'Baja':
        return 3
      default:
        return 0
    }
  }


  const handleSubmit = (e: any):void => {
    e.preventDefault();
    const newId:number = id.current++;
    handleCreateTask(newId,descripcion,'pending',prioridadToNumber(prioridad),dependencias)
    setDescripcion('');
    setPrioridad('');
    setDependencias([]);
  }

  return(
    <section className="formulario" >
      <form onSubmit={(e)=>handleSubmit(e)} >
        <h2 >Crear Tarea</h2>
        <CampoTexto label="Descripcion Tarea" placeholder="Escriba la descripcion de su la tarea" 
        value={descripcion} handleChange={handleChange}/>
        <CampoSeleccionar label='Prioridad Tarea'
        value={prioridad} handleSelect={handleSelect}/>
        <Depend list={list}
        value={dependencias} handleChange={handleCheckboxChange}/>
        <Boton  >Crear</Boton>
        
      </form>
    </section>
  )

}

export default Formulario;