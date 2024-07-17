import "./CampoSeleccionar.css";


const CampoSeleccionar = ({label,value,handleSelect}:{label:string, value:string,handleSelect:(e:any)=>void}) =>{

  return(
    <div className="campoSeleccionar">
      <label >{label}</label>
      <select required value={value} onChange={(e)=>handleSelect(e)}>
        <option value="" disabled defaultValue="" hidden>Seleccionar prioridad</option>
        <option>Alta</option>
        <option>Media</option>
        <option>Baja</option>
      </select>
    </div>
  )
}

export default CampoSeleccionar;