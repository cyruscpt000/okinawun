
import React, { useState } from 'react';
import { ChecklistItem, ChecklistCategory } from '../types';

interface ChecklistProps {
  data: ChecklistItem[];
  onUpdate: (newList: ChecklistItem[]) => void;
}

const CATEGORIES: { id: ChecklistCategory; label: string; icon: string }[] = [
  { id: 'todo', label: '待辦', icon: '📝' },
  { id: 'luggage', label: '行李', icon: '🧳' },
  { id: 'places', label: '想去', icon: '📍' },
  { id: 'shopping', label: '採購', icon: '🛍️' }
];

const Checklist: React.FC<ChecklistProps> = ({ data, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<ChecklistCategory>('todo');
  const [newItemText, setNewItemText] = useState('');

  const toggleItem = (id: string) => {
    const newList = data.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    onUpdate(newList);
  };

  const addItem = () => {
    if (!newItemText.trim()) return;
    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      text: newItemText,
      completed: false,
      category: activeTab,
      assignee: '大哥' // 預設大哥
    };
    onUpdate([...data, newItem]);
    setNewItemText('');
  };

  const removeItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdate(data.filter(item => item.id !== id));
  };

  const filteredItems = data.filter(item => item.category === activeTab);

  return (
    <div className="space-y-6">
      {/* 分類導航 */}
      <div className="grid grid-cols-4 gap-2 px-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`flex flex-col items-center py-3 rounded-2xl transition-all border-2 ${
              activeTab === cat.id 
                ? 'bg-[#98ba5c] text-white border-[#98ba5c] shadow-md scale-105' 
                : 'bg-white text-[#98ba5c] border-[#f2f6e9]'
            }`}
          >
            <span className="text-xl mb-1">{cat.icon}</span>
            <span className="text-xs font-bold">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* 新增項目輸入框 */}
      <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-[#f2f6e9] flex gap-2">
        <input 
          type="text" 
          placeholder={`在「${CATEGORIES.find(c => c.id === activeTab)?.label}」新增...`}
          className="flex-grow bg-[#fcfbf4] border-none rounded-xl px-4 py-2 text-sm focus:ring-2 ring-[#98ba5c] outline-none"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addItem()}
        />
        <button 
          onClick={addItem}
          className="bg-[#98ba5c] text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl shadow-sm"
        >
          +
        </button>
      </div>
      
      {/* 項目列表 */}
      <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#f2f6e9] min-h-[300px]">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-20 text-gray-300">
            <span className="text-4xl mb-2 opacity-50">🍃</span>
            <p className="text-sm italic">這裡空空如也，加點東西吧！</p>
          </div>
        ) : (
          <div className="space-y-1">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                onClick={() => toggleItem(item.id)}
                className="flex items-center gap-4 py-4 border-b border-[#fcfbf4] last:border-0 cursor-pointer group"
              >
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                  item.completed ? 'bg-[#98ba5c] border-[#98ba5c]' : 'border-gray-200'
                }`}>
                  {item.completed && <span className="text-white text-xs">✓</span>}
                </div>
                <div className="flex-grow">
                  <p className={`text-sm transition-all ${item.completed ? 'text-gray-300 line-through' : 'text-gray-700 font-medium'}`}>
                    {item.text}
                  </p>
                  {item.assignee && (
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold transition-all ${
                      item.completed ? 'bg-gray-100 text-gray-400' : 'bg-[#f2f6e9] text-[#7a9942]'
                    }`}>
                      {item.assignee}
                    </span>
                  )}
                </div>
                <button 
                  onClick={(e) => removeItem(item.id, e)}
                  className="text-gray-200 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all px-2"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* 統計信息 */}
      <div className="bg-[#f2f6e9] p-4 rounded-2xl text-center">
        <p className="text-xs text-[#7a9942] font-bold tracking-wide">
          {CATEGORIES.find(c => c.id === activeTab)?.label}：
          還剩 {filteredItems.filter(i => !i.completed).length} 個項目 🎌
        </p>
      </div>
    </div>
  );
};

export default Checklist;
