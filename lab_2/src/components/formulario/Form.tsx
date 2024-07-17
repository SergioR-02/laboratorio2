import './Form.css';
import CampoTexto from '../campoTexto/CampoTexto';
import CampoSeleccionar from '../campoSeleccionar/CampoSeleccionar';
import Boton from '../Boton/Boton';
import { useState,useRef } from 'react'


const Formulario = ({handleCrteateTask}:
  {handleCrteateTask:(id:number,descripcion:string,estado:string,prioridad:number)=>void}) => {
  const [descripcion, setDescripcion] = useState('')
  const [prioridad, setPrioridad] = useState('')
  const id = useRef(0)

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
    const hola:number = id.current++;
    setDescripcion('');
    setPrioridad('');
    handleCrteateTask(hola,descripcion,'pending',prioridadToNumber(prioridad))
  }

  return(
    <section className="formulario" >
      <form onSubmit={(e)=>handleSubmit(e)} >
        <h2 >Crear Tarea</h2>
        <CampoTexto label="Descripcion Tarea" placeholder="Escriba la descripcion de su la tarea" 
        value={descripcion} handleChange={handleChange}/>
        <CampoSeleccionar label='Prioridad Tarea'
        value={prioridad} handleSelect={handleSelect}/>
        <Boton  >Crear</Boton>
      </form>
    </section>
  )

}

export default Formulario;