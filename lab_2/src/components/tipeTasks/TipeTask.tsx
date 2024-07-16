import "./TipeTask.css"
import Tarjetas from '../tarjetas/Tarjetas'
import { Task } from "../../Estructuras/tareas";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const TipeTask = ({title,listTask,background}:{title:string; listTask:Task[],background:string}) => {

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
      <h2 className="title" style={{ borderBottom: `4px solid ${background}` }}>{title}</h2>
      <div className="carrusel">
        {listTask.length>0 && <Slider {...settings}>
          {
            listTask.map((task) => (
              <Tarjetas key={task.getId()} task={task} backgrounds={background}/>
            ))
          }
        </Slider>}
      </div>
      
    </section>
    
  )

}

export {TipeTask}