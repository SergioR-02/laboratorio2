import './Form.css';
import CampoTexto from '../campoTexto/CampoTexto';
import CampoSeleccionar from '../campoSeleccionar/CampoSeleccionar';
import Boton from '../Boton/Boton';



const Formulario = () => {




  return(
    <section className="formulario" >
      <form  >
        <h2 >Crear Tarea</h2>
        <CampoTexto/>
        <CampoSeleccionar/>
        <Boton >Crear</Boton>
      </form>
    </section>
  )

}

export default Formulario;