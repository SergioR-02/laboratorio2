import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AddDependencyData {
  count: number;
  addDependencyTime: number;
}

interface AddDependencyChartProps {
  data: AddDependencyData[];
}

const AddDependencyChart: React.FC<AddDependencyChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="count" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="addDependencyTime" stroke="#8884d8" name="Agregar Dependencias" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AddDependencyChart;
