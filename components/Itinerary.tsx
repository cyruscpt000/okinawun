
import React, { useState } from 'react';
import { DayPlan, ItineraryItem } from '../types';

interface ItineraryProps {
  data: DayPlan[];
  onUpdate: (newData: DayPlan[]) => void;
}

const TYPES: { label: string; icon: string; value: ItineraryItem['type'] }[] = [
  { label: '飛機', icon: '✈️', value: 'flight' },
  { label: '食野', icon: '🍴', value: 'food' },
  { label: '交通', icon: '🚗', value: 'transport' },
  { label: '景點', icon: '📸', value: 'sightseeing' },
  { label: '酒店', icon: '🏨', value: 'hotel' },
  { label: '購物', icon: '🛍️', value: 'shopping' },
];

const Itinerary: React.FC<ItineraryProps> = ({ data, onUpdate }) => {
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  
  // Form State
  const [formItem, setFormItem] = useState<Partial<ItineraryItem>>({
    time: '', activity: '', location: '', memo: '', mapcode: '', type: 'sightseeing'
  });

  const activeDay = data[activeDayIdx];

  const handleSubmit = () => {
    if (!formItem.time || !formItem.activity) return alert("請填寫時間和行程名稱");
    
    const updatedData = [...data];
    const items = [...updatedData[activeDayIdx].items];

    if (editingIdx !== null) {
      // 編輯現有項目
      items[editingIdx] = formItem as ItineraryItem;
    } else {
      // 新增項目
      items.push(formItem as ItineraryItem);
    }

    // 按時間排序
    items.sort((a, b) => a.time.localeCompare(b.time));
    updatedData[activeDayIdx].items = items;
    
    onUpdate(updatedData);
    resetForm();
  };

  const resetForm = () => {
    setFormItem({ time: '', activity: '', location: '', memo: '', mapcode: '', type: 'sightseeing' });
    setShowAddForm(false);
    setEditingIdx(null);
  };

  const startEdit = (idx: number) => {
    setEditingIdx(idx);
    setFormItem(activeDay.items[idx]);
    setShowAddForm(true);
    // 滾動到頂部表單
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeItem = (itemIdx: number) => {
    if (!confirm("確定要刪除這項行程嗎？")) return;
    const updatedData = [...data];
    updatedData[activeDayIdx].items.splice(itemIdx, 1);
    onUpdate(updatedData);
  };

  return (
    <div className="space-y-6">
      {/* 頂部日期選擇器 (橫向導航) */}
      <div className="flex gap-2 overflow-x-auto pb-4 px-2 scrollbar-hide">
        {data.map((day, idx) => {
          const dateParts = day.date.split('-');
          const m = dateParts[1];
          const d = dateParts[2];
          const isActive = activeDayIdx === idx;
          return (
            <button
              key={idx}
              onClick={() => {
                setActiveDayIdx(idx);
                setEditingIdx(null);
              }}
              className={`flex-shrink-0 w-16 h-20 rounded-3xl flex flex-col items-center justify-center transition-all ${
                isActive 
                  ? 'bg-[#98ba5c] text-white shadow-lg scale-105' 
                  : 'bg-white text-[#98ba5c] border-2 border-[#f2f6e9]'
              }`}
            >
              <span className="text-[10px] font-bold opacity-80">{m}/{d}</span>
              <span className="text-xl font-bold leading-tight">{day.weekday}</span>
              <div className={`w-4 h-1 mt-1 rounded-full ${isActive ? 'bg-white' : 'bg-transparent'}`}></div>
            </button>
          );
        })}
      </div>

      {/* 行程表單區塊 (新增/編輯共用) */}
      <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#f2f6e9]">
        <button 
          onClick={() => {
            if (showAddForm) resetForm();
            else setShowAddForm(true);
          }}
          className="flex items-center gap-2 text-[#7a9942] font-bold mb-4"
        >
          <div className="w-6 h-6 rounded-full bg-[#f2f6e9] flex items-center justify-center text-lg">
            {showAddForm ? '−' : '+'}
          </div>
          <span>{editingIdx !== null ? '正在編輯行程' : '新增行程'}</span>
        </button>

        {showAddForm && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex gap-2">
              <input 
                type="time" 
                className="w-1/3 bg-[#fcfbf4] border-none rounded-2xl p-3 text-sm focus:ring-2 ring-[#98ba5c] outline-none"
                value={formItem.time}
                onChange={e => setFormItem({...formItem, time: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="行程名稱 (例如: 琉球之牛)"
                className="flex-grow bg-[#fcfbf4] border-none rounded-2xl p-3 text-sm focus:ring-2 ring-[#98ba5c] outline-none font-bold"
                value={formItem.activity}
                onChange={e => setFormItem({...formItem, activity: e.target.value})}
              />
            </div>
            <input 
              type="text" 
              placeholder="地點 (一撳即刻導航)"
              className="w-full bg-[#fcfbf4] border-none rounded-2xl p-3 text-sm focus:ring-2 ring-[#98ba5c] outline-none"
              value={formItem.location}
              onChange={e => setFormItem({...formItem, location: e.target.value})}
            />
            <textarea 
              placeholder="備註 (例如: 要一個月前Book)"
              rows={2}
              className="w-full bg-[#fcfbf4] border-none rounded-2xl p-3 text-sm focus:ring-2 ring-[#98ba5c] outline-none"
              value={formItem.memo}
              onChange={e => setFormItem({...formItem, memo: e.target.value})}
            />
            
            {/* 類型選擇 */}
            <div className="grid grid-cols-3 gap-2">
              {TYPES.map(t => (
                <button
                  key={t.value}
                  onClick={() => setFormItem({...formItem, type: t.value})}
                  className={`flex items-center justify-center gap-1.5 px-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    formItem.type === t.value 
                      ? 'bg-[#98ba5c] text-white shadow-md' 
                      : 'bg-[#fcfbf4] text-[#98ba5c]'
                  }`}
                >
                  <span>{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-2 mt-2">
              {editingIdx !== null && (
                <button 
                  onClick={resetForm}
                  className="flex-1 bg-gray-100 text-gray-500 font-bold py-4 rounded-3xl transition-all"
                >
                  取消
                </button>
              )}
              <button 
                onClick={handleSubmit}
                className="flex-[2] bg-[#98ba5c] text-white font-bold py-4 rounded-3xl shadow-md hover:bg-[#86a64e] transition-all transform active:scale-95"
              >
                {editingIdx !== null ? '更新行程 ✅' : '增加行程 +'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 當日行程列表 */}
      <div className="space-y-4 px-1 pb-10">
        <h3 className="text-[#7a9942] font-bold text-lg px-2 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-[#98ba5c] rounded-full"></span>
          {activeDay.title}
        </h3>
        
        {activeDay.items.length === 0 ? (
          <div className="text-center py-10 text-gray-300 italic">這天還沒有安排行程</div>
        ) : (
          activeDay.items.map((item, idx) => (
            <div key={idx} className="relative animate-in fade-in slide-in-from-right-4">
              <div className={`bg-white rounded-[2rem] p-5 shadow-sm border border-[#f2f6e9] relative ${item.highlight ? 'ring-2 ring-[#98ba5c] bg-[#fcfbf4]' : ''} ${editingIdx === idx ? 'border-[#98ba5c] bg-[#fcfbf4]/50' : ''}`}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#f2f6e9] text-[#7a9942] text-xs font-bold px-3 py-1 rounded-full">
                      {item.time}
                    </span>
                    <span className="text-xl">{TYPES.find(t => t.value === item.type)?.icon || '📍'}</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => startEdit(idx)}
                      className="w-8 h-8 rounded-full bg-blue-50 text-blue-400 hover:text-blue-600 flex items-center justify-center transition-colors"
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={() => removeItem(idx)}
                      className="w-8 h-8 rounded-full bg-red-50 text-red-200 hover:text-red-400 flex items-center justify-center transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                
                <h4 className="font-bold text-gray-800 text-lg leading-tight">{item.activity}</h4>
                
                <div className="mt-2 space-y-1.5">
                  {item.location && (
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-sky-600 hover:underline flex items-center gap-2 group"
                    >
                      <span className="opacity-60 group-hover:scale-125 transition-transform">📍</span> 
                      <span>{item.location}</span>
                      <span className="text-[10px] opacity-40">→ 開啟地圖</span>
                    </a>
                  )}

                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.mapcode && (
                      <div className="inline-block bg-[#f2f6e9] text-[10px] px-2 py-1 rounded-lg text-[#7a9942] font-mono font-bold">
                        MC: {item.mapcode}
                      </div>
                    )}
                    {item.phone && (
                      <a href={`tel:${item.phone}`} className="inline-block bg-sky-50 text-sky-600 text-[10px] px-2 py-1 rounded-lg font-bold">
                        📞 {item.phone}
                      </a>
                    )}
                    {item.duration && (
                      <div className="inline-block bg-orange-50 text-orange-600 text-[10px] px-2 py-1 rounded-lg font-bold">
                        ⏱️ {item.duration}
                      </div>
                    )}
                  </div>
                </div>

                {item.memo && (
                  <div className="mt-3 p-3 bg-[#fcfbf4] rounded-2xl text-xs text-gray-600 italic border-l-4 border-[#98ba5c]">
                    {item.memo}
                  </div>
                )}
                
                {item.link && (
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#7a9942] font-bold border border-[#f2f6e9] px-3 py-2 rounded-xl hover:bg-[#f2f6e9] transition-colors"
                  >
                    🔗 預約連結 →
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Itinerary;
