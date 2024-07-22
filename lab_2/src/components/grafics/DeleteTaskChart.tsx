import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DeleteTaskData {
  count: number;
  deleteLinkedListTime: number;
  deleteQueueTime: number;
  deleteStackTime: number;
  deleteBinaryTreeTime: number;
}

interface DeleteTaskChartProps {
  data: DeleteTaskData[];
}

const DeleteTaskChart: React.FC<DeleteTaskChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="count" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="deleteLinkedListTime" stroke="#8884d8" name="LinkedList" />
        <Line type="monotone" dataKey="deleteQueueTime" stroke="#82ca9d" name="Queue" />
        <Line type="monotone" dataKey="deleteStackTime" stroke="#ffc658" name="Stack" />
        <Line type="monotone" dataKey="deleteBinaryTreeTime" stroke="#ff7300" name="BinaryTree" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DeleteTaskChart;
