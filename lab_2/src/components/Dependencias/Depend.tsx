import React, { useState } from "react";
import "./Depend.css";
import { Task } from "../../Estructuras/tareas";

interface DependProps {
  list: Task[];
}

function Depend({ list }: DependProps) {
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);

  const handleCheckboxChange = (task: Task) => {
    setSelectedTasks((prevSelectedTasks) => {
      if (prevSelectedTasks.includes(task)) {
        return prevSelectedTasks.filter((t) => t !== task);
      } else {
        return [...prevSelectedTasks, task];
      }
    });
  };

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
                checked={selectedTasks.includes(task)}
                onChange={() => handleCheckboxChange(task)}
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
