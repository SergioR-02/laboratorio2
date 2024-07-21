
import "./Mensaje.css";

function Mensaje({mensaje, setShow}: {mensaje: string, setShow: any}) {
  return (
    <div onClick={()=>setShow(false)} className="containerMessage">
      <div className="messageContent">
        <h2>{mensaje}</h2>
      </div>
    </div>
  )
}

export default Mensaje;