import "./TipeTask.css"
import Tarjetas from '../tarjetas/Tarjetas'
import { Task } from "../../Estructuras/tareas";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


interface TipeTaskProps {
  title:string; 
  listTask:Task[];
  background:string;
  handlefunction:(task?:Task)=>string|void;
  type:string;
}

const TipeTask = ({title,listTask,background,handlefunction,type}:TipeTaskProps) => {

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
      {type!="pending" && listTask.length>0 ? 
        <button className="boton2" style={{ background: background}} 
          onClick={()=>(handlefunction())}>
          {type==="progress" ? "Completar" : "Eliminar"}
        </button> : <></>}
      <h2 className="title" style={{ borderBottom: `4px solid ${background}` }}>{title}</h2>
      <div className="carrusel">
        {listTask.length>0 && <Slider {...settings}>
          {
            listTask.map((task) => (
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