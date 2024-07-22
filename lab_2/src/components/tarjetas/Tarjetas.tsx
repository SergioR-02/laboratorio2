
import "./Tarjetas.css"
import { Task } from '../../Estructuras/tareas';

const Tarjetas = ({task,backgrounds,handleStartTask,type}:{type:string,task:Task,backgrounds:string,handleStartTask:(task:Task)=>string|void}) => {

  const prioridad = (prioridad:number):string => {
    switch (prioridad) {
      case 1:
        return 'Alta';
      case 2:
        return 'Media';
      case 3:
        return 'Baja';
      default:
        return 'Desconocida';
    }
  }
  



  return(
    <div className="Tarjeta" >
      <div className="encabezado" style={{ backgroundColor: backgrounds}}>
      </div>
      
      <div className="cuerpo">
        <h4>Prioridad: {prioridad(task.getPrioridad())}</h4>
        <h5>{task.getDescripcion()}</h5>
        <p>Id: {task.getId()}</p>
        {type!="pending" ? <></> : <button className="boton3" onClick={()=>handleStartTask(task)}>Iniciar</button>}
      </div>
    </div>
  )
}

export default Tarjetas;