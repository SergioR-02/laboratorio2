import { IoIosCloseCircle } from 'react-icons/io';
import "./Tarjetas.css"
import { Task } from '../../Estructuras/tareas';

const Tarjetas = ({task,backgrounds}:{task:Task,backgrounds:string}) => {

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
  
  const transparentColor = `${backgrounds}80`;
  console.log(transparentColor)


  return(
    <div className="Tarjeta" >
      <IoIosCloseCircle className="eliminar" />
      <div className="encabezado" style={{ backgroundColor: backgrounds}}>
      </div>
      
      <div className="cuerpo">
        <h4>Prioridad: {prioridad(task.getPrioridad())}</h4>
        <h5>{task.getDescripcion()}</h5>
        <p>Id: {task.getId()}</p>
        <button>Iniciar</button>
      </div>
    </div>
  )
}

export default Tarjetas;