import "./Depend.css";
import { Task } from "../../Estructuras/tareas";

interface DependProps {
  list: Task[];
  value: Task[];
  handleChange: (e: any) => void;
}

function Depend({ list , value, handleChange}: DependProps) {

  return (
    <div className="containerChecks">
      <label className="containerChecksLabel">Dependencias</label>
      <ul className="taskList">
        {list.length >0 ? 
        list.map((task) => (
          <li key={task.getId()} className="taskItem">
            <label className="checkboxLabel">
              <input
                type="checkbox"
                checked={value.includes(task)}
                onChange={() => handleChange(task)}
              />
              {task.getDescripcion()}
            </label>
          </li>
        )): <li className="taskItem">No hay tareas</li>}
      </ul>
    </div>
  );
}

export default Depend;
