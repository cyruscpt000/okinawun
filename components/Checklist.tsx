
import React from 'react';
import { ChecklistItem } from '../types';

interface ChecklistProps {
  data: ChecklistItem[];
  onUpdate: (newList: ChecklistItem[]) => void;
}

const Checklist: React.FC<ChecklistProps> = ({ data, onUpdate }) => {
  const toggleItem = (id: string) => {
    const newList = data.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    onUpdate(newList);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-sky-900">行李與準備</h2>
        <span className="text-[10px] text-sky-400 font-bold bg-sky-50 px-2 py-1 rounded-full uppercase tracking-tighter">Live Sync 📡</span>
      </div>
      
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-sky-50">
        {data.map((item) => (
          <div 
            key={item.id} 
            onClick={() => toggleItem(item.id)}
            className="flex items-center gap-4 py-3 border-b border-sky-50 last:border-0 cursor-pointer group"
          >
            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
              item.completed ? 'bg-sky-500 border-sky-500 scale-95' : 'border-sky-200 group-hover:border-sky-400'
            }`}>
              {item.completed && <span className="text-white text-xs">✓</span>}
            </div>
            <div className="flex-grow">
              <p className={`text-sm transition-all ${item.completed ? 'text-gray-300 line-through' : 'text-gray-700 font-medium'}`}>
                {item.text}
              </p>
              {item.assignee && (
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold transition-all ${
                  item.completed ? 'bg-gray-100 text-gray-400' : 'bg-sky-100 text-sky-600'
                }`}>
                  {item.assignee}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-sky-100 p-4 rounded-2xl text-center">
        <p className="text-xs text-sky-600 font-bold tracking-wide">
          還剩 {data.filter(i => !i.completed).length} 個項目待完成 沖繩加油！🇯🇵
        </p>
      </div>
    </div>
  );
};

export default Checklist;
