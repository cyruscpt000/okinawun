
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Expense } from '../types';

interface BudgetProps {
  data: Expense[];
}

const COLORS = ['#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd', '#e0f2fe'];

const Budget: React.FC<BudgetProps> = ({ data }) => {
  const total = data.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-sky-900 mb-4">預算分配</h2>
      
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-sky-50 h-[380px]">
        <h3 className="text-center text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">Expense Analysis (JPY)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={8}
              dataKey="amount"
              nameKey="category"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => `¥${value.toLocaleString()}`}
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.1)', fontSize: '12px' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-3xl p-6 text-white shadow-xl">
        <p className="text-xs opacity-70 uppercase tracking-widest font-bold">Total Estimate</p>
        <h2 className="text-4xl font-bold mt-1 tracking-tight">¥{total.toLocaleString()}</h2>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <p className="text-[10px] opacity-70 uppercase font-bold">每人平均</p>
            <p className="font-bold text-lg">¥{(total / 2).toLocaleString()}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <p className="text-[10px] opacity-70 uppercase font-bold">HKD 參考</p>
            <p className="font-bold text-lg">≈ ${(total / 19).toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;
