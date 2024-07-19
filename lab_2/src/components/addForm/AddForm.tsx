import "./AddForm.css";


interface AddFormProps {
  handleChange: () => void;
  handleSearch: () => void;
}
function AddForm({handleChange,handleSearch}: AddFormProps) {
  
  return(
    <section  className="titulo" >
      <img className="search" onClick={handleSearch}  src="/img/busqueda.png" alt="" />
      <h2>Mis Tareas</h2>
      <img className="add" onClick={handleChange} src="/img/add.png" alt="Logo de la organizacion"/>
    </section>
  )
}

export default AddForm;