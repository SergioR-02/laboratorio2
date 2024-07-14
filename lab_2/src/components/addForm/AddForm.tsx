import "./AddForm.css";


interface AddFormProps {
  handleChange: () => void;
}
function AddForm({handleChange}: AddFormProps) {
  
  return(
    <section className="titulo" >
      <h2>Mis Tareas</h2>
      <img onClick={handleChange} src="/img/add.png" alt="Logo de la organizacion"/>
    </section>
  )
}

export default AddForm;