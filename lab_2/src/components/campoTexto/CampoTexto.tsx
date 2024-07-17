
import "./CampoTexto.css";

function CampoTexto({label,placeholder,value,handleChange}: {label: string; placeholder: string, value: string, handleChange: (e:any) => void}) {
  return (
    <div className="campoTexto">
      <label>{label}</label>
      <input required value={value} onChange={(e)=>handleChange(e)} placeholder={placeholder} type="text" />
    </div>
  );
}

export default CampoTexto;