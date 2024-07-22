import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Definición de la interfaz para los datos
interface InorderData {
  count: number;
  inorderTime: number;
}

// Propiedades del componente que reciben los datos
interface InorderChartProps {
  data: InorderData[];
}

// Componente funcional para la gráfica del tiempo de recorrido en orden
const InorderChart: React.FC<InorderChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="count" label={{ value: 'Cantidad de Tareas', position: 'insideBottomRight', offset: 0 }} />
        <YAxis label={{ value: 'Tiempo (ms)', angle: -90, position: 'insideLeft' }} />
        <Tooltip formatter={(value: number) => `${value.toFixed(2)} ms`} />
        <Legend />
        <Line type="monotone" dataKey="inorderTime" stroke="#82ca9d" name="Tiempo de Recorrido en Orden" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default InorderChart;
