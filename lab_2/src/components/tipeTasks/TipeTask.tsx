import "./TipeTask.css"
import Tarjetas from '../tarjetas/Tarjetas'
import { Task } from "../../Estructuras/tareas";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { taskManager } from '../../Estructuras/gestor'


interface TipeTaskProps {
  title: string;
  listTask: Task[];
  background: string;
  handlefunction: (task?: Task) => string | void;
  type: string;
}

const TipeTask = ({ title, listTask, background, handlefunction, type }: TipeTaskProps) => {

  const [serch, setSerch] = useState<string>('');
  const [valueSerch, setValueSerch] = useState<string>('');
  const [newList, setNewList] = useState<Task[]>(listTask);
  const [ordenar, setOrdenar] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleOrdenar = (): void => {
    setOrdenar(!ordenar);
  }

  useEffect(() => {
    if (ordenar) {
      // Crear una copia del array y luego ordenar la copia
      const sortedList = [...listTask].sort((a, b) => a.getPrioridad() - b.getPrioridad());
      setNewList(sortedList);
    } else {
      setNewList(listTask);
    }

    if(type==="search"){
      setNewList(taskManager.taskBST.inorder())
    }
  },[ordenar,listTask])

  const handleChange = (e: any): void => {
    const selectedValue = e.target.value;
    setSerch(selectedValue);
    // Clear valueSerch if select changes to ensure input validation
    setValueSerch('');
  }

  const handleSerch = (e: any): void => {
    let input = e.target.value;

    // Validate input based on selected type
    if (serch === "id") {
      // Allow only numbers
      input = input.replace(/[^0-9]/g, '');
    } else if (serch === "prioridad") {
      // Allow only letters and numbers
      input = input.replace(/[^a-zA-Z0-9]/g, '');
    }

    setValueSerch(input);
  }

  const handleSubmit = (e:any): void => {
    e.preventDefault();
    if (!serch || !valueSerch) {
      return;
    }

    const sanitizedValue = valueSerch.trim().toLowerCase();
    let x:number;

    if (serch === "id") {
      x= parseInt(sanitizedValue, 10);
    } else {
      switch (sanitizedValue) {
        case 'alta':
          x = 1;
          break;
        case 'media':
          x = 2;
          break;
        case 'baja':
          x = 3;
          break;
        default:
          setError('Prioridad no válida (Alta, Media, Baja)');
          return;
      }
    }
    const result = taskManager.searchTask(serch, x);
    if (result.length === 0) {
      setError('No se encontraron tareas.');
      setNewList([]);
      return;
    }
    setNewList(result);
    setError(null);
    
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };

  const transparentColor = `${background}30`;

  return (
    <section className="containerTask" style={{ backgroundColor: transparentColor }}>

      {type != "pending" && type != "search" && listTask.length > 0 ?
        <button className="boton2" style={{ background: background }}
          onClick={() => (handlefunction())}>
          {type === "progress" ? "Completar" : "Eliminar"}
        </button> : <></>}
      {
        type === "pending" && listTask.length > 1 &&
        <button className="boton2" style={{ background: background }}
          onClick={() => (handleOrdenar())}>
          {ordenar ? "Orden por prioridad" : "Normal"}
        </button>
      }
      
      <h2 className="title" style={{ borderBottom: `4px solid ${background}` }}>{title}</h2>
      {type === "search" &&
        <div className="busqueda">
          <form className="busquedaForm" onSubmit={(e)=>handleSubmit(e)}>
            <button className="busquedaBotton">Enviar</button>
            <input
              required
              className="busquedaImput"
              placeholder={`Busqueda ${serch === "" ? "" : `por ${serch}`}`}
              value={valueSerch}
              onChange={(e) => handleSerch(e)}
            />
            <select className="busquedaSelect" value={serch} onChange={(e) => handleChange(e)} required>
              <option value="" disabled defaultValue="" hidden>Tipo de busqueda</option>
              <option value="prioridad">Prioridad</option>
              <option value="id">ID</option>
            </select>
          </form>

          {error && <p className="error">{error}</p>}
            
        </div>
      }
      <div className="carrusel">
        { newList.length > 0 && <Slider {...settings}>
          {
            newList.map((task) => (
              <Tarjetas key={task.getId()} task={task}
                backgrounds={background} handleStartTask={handlefunction}
                type={type} />
            ))
          }
        </Slider>}
      </div>

    </section>

  )
}

export { TipeTask }
