import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AddTaskData {
  count: number;
  addLinkedListTime: number;
  addQueueTime: number;
  addStackTime: number;
  addBinaryTreeTime: number;
  addTaskGraphTime: number;
}

interface AddTaskChartProps {
  data: AddTaskData[];
}

const AddTaskChart: React.FC<AddTaskChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="count" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="addLinkedListTime" stroke="#8884d8" name="LinkedList" />
        <Line type="monotone" dataKey="addQueueTime" stroke="#82ca9d" name="Queue" />
        <Line type="monotone" dataKey="addStackTime" stroke="#ffc658" name="Stack" />
        <Line type="monotone" dataKey="addBinaryTreeTime" stroke="#ff7300" name="BinaryTree" />
        <Line type="monotone" dataKey="addTaskGraphTime" stroke="#00ff00" name="TaskGraph" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AddTaskChart;
