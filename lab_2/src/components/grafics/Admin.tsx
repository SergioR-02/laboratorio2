import React, { useEffect, useState } from 'react';
import AddTaskChart from './AddTaskChart';
import DeleteTaskChart from './DeleteTaskChart';
import AddDependencyChart from './AddDependencyChart';
import InorderChart from './InorderChart'; // Asegúrate de usar la ruta correcta
import runPerformanceTests from '../../test/rendimiento';

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const testResults = runPerformanceTests([100,500,1000,2000,4000,8000, 10000]);
    setData(testResults);
  }, []);

  const addTaskData = data.map(item => ({
    count: item.count,
    addLinkedListTime: item.addLinkedListTime,
    addQueueTime: item.addQueueTime,
    addStackTime: item.addStackTime,
    addBinaryTreeTime: item.addBinaryTreeTime,
    addTaskGraphTime: item.addTaskGraphTime,
  }));

  const deleteTaskData = data.map(item => ({
    count: item.count,
    deleteLinkedListTime: item.deleteLinkedListTime,
    deleteQueueTime: item.deleteQueueTime,
    deleteStackTime: item.deleteStackTime,
    deleteBinaryTreeTime: item.deleteBinaryTreeTime,
  }));

  const addDependencyData = data.map(item => ({
    count: item.count,
    addDependencyTime: item.addDependencyTime,
  }));

  const inorderData = data.map(item => ({
    count: item.count,
    inorderTime: item.inorderTime,
  }));

  return (
    <div>
      <h1>Resultados de las Pruebas de Rendimiento</h1>
      <h2>Añadir</h2>
      <AddTaskChart data={addTaskData} />
      <h2>Eliminar</h2>
      <DeleteTaskChart data={deleteTaskData} />
      <h2>Agreagr dependencias</h2>
      <AddDependencyChart data={addDependencyData} />
      <h2>Ordenar, recorrido inorden</h2>
      <InorderChart data={inorderData} /> 
    </div>
  );
};

export default App;
