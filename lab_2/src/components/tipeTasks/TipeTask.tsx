import "./TipeTask.css"
import Tarjetas from '../tarjetas/Tarjetas'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const TipeTask = ({title}:{title:string}) => {

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };

  return(
    
    
    <section className="containerTask">
      <h2 className="title" >{title}</h2>
      <div className="carrusel">
        <Slider {...settings}>
          <Tarjetas />
          <Tarjetas /> 
          <Tarjetas />
          <Tarjetas />
          <Tarjetas />
          <Tarjetas />
        </Slider>
      </div>
      
    </section>
    
  )

}

export {TipeTask}