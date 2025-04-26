import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

// Dados de exemplo
const data = [
  { month: 'Jan', adoptions: 30 },
  { month: 'Fev', adoptions: 45 },
  { month: 'Mar', adoptions: 60 },
  { month: 'Abr', adoptions: 40 },
  { month: 'Mai', adoptions: 70 },
  { month: 'Jun', adoptions: 50 },
];

// Estilização personalizada para o tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-lg shadow-md p-3 animate-fade-in">
        <p className="text-sm font-medium text-gray-800">{label}</p>
        <p className="text-sm text-indigo-600">{`Adoções: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const AdoptionChart: React.FC = () => {
  return (
    <div
      className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-6">Adoções nos Últimos Meses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" vertical={false} />
          <XAxis
            dataKey="month"
            fontSize={12}
            stroke="#6b7280"
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis
            allowDecimals={false}
            fontSize={12}
            stroke="#6b7280"
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="adoptions"
            stroke="#4f46e5"
            strokeWidth={3}
            dot={{ r: 5, fill: '#4f46e5', stroke: '#ffffff', strokeWidth: 2, className: 'shadow-md' }}
            activeDot={{ r: 7, fill: '#4f46e5', stroke: '#ffffff', strokeWidth: 2, className: 'shadow-lg' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdoptionChart;