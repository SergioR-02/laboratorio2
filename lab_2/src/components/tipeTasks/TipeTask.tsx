import "./TipeTask.css"
import Tarjetas from '../tarjetas/Tarjetas'
import { Task } from "../../Estructuras/tareas";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {taskManager} from '../../Estructuras/gestor'
import { LinkedList } from "../../Estructuras/linkedList";


interface TipeTaskProps {
  title:string; 
  listTask:Task[];
  background:string;
  handlefunction:(task?:Task)=>string|void;
  type:string;
}

const TipeTask = ({title,listTask,background,handlefunction,type}:TipeTaskProps) => {

  
  const [serch, setSerch] = useState<string>('');
  const [valueSerch, setValueSerch] = useState<string>('');
  const [newList, setNewList] = useState<Task[]>(listTask);
  const [ordenar, setOrdenar] = useState<boolean>(false);

  const handleOrdenar = ():void => {
    setOrdenar(!ordenar);
  }

  useEffect(() => {
    if(ordenar){
      setNewList(taskManager.taskBST.inorder());
    }else{
      setNewList(listTask);
    }
  },[ordenar,listTask])

  const handleChange = (e: any):void => {
    setSerch(e.target.value);
  }

  const handleSerch = (e: any):void => {
    setValueSerch(e.target.value);
  }


  const handleSubmit = (): void => {
    console.log('Enviado:', valueSerch);
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };

  const transparentColor = `${background}30`;

  return(
    <section className="containerTask" style={{ backgroundColor: transparentColor}}>

      {type!="pending"&& type!="search" && listTask.length>0 ? 
        <button className="boton2" style={{ background: background}} 
          onClick={()=>(handlefunction())}>
          {type==="progress" ? "Completar" : "Eliminar"}
        </button> :  <></>}
      {
        type==="pending" && listTask.length>1 && 
        <button className="boton2" style={{ background: background}} 
          onClick={()=>(handleOrdenar())}>
            {ordenar ? "Ordenar por prioridad"  : "Normal"}
        </button>
      }
      <h2 className="title" style={{ borderBottom: `4px solid ${background}` }}>{title}</h2>
      { type==="search" &&
        <div>
          <button onClick={handleSubmit}>Enviar</button>
          <input
            className="container__inputNamePomodoro"
            placeholder={`Busqueda ${serch==="" ? "": `por ${serch}`}` }
            value={valueSerch}
            onChange={(e) => handleSerch(e)}
          />
          <select value={serch} onChange={(e)=>handleChange(e)} required>
            <option value="" disabled defaultValue="" hidden>Tipo de busqueda</option>
            <option>Prioridad</option>
            <option>ID</option>
          </select>
        </div>
      }
      <div className="carrusel">
        {type!= "search" && listTask.length>0 && <Slider {...settings}>
          {
            newList.map((task) => (
              <Tarjetas key={task.getId()} task={task} 
              backgrounds={background} handleStartTask={handlefunction} 
              type={type}/>
            ))
          }
        </Slider>}
      </div>
      
    </section>
    
  )

}

export {TipeTask}