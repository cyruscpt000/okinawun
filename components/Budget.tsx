
import React, { useState } from 'react';
import { Transaction } from '../types';

interface BudgetProps {
  data: Transaction[];
  onUpdate: (newData: Transaction[]) => void;
}

const TYPE_OPTIONS: { id: Transaction['type']; icon: string; label: string }[] = [
  { id: 'food', icon: '🍴', label: '食野' },
  { id: 'shopping', icon: '🛍️', label: '購物' },
  { id: 'transport', icon: '🚗', label: '交通' },
  { id: 'sightseeing', icon: '📸', label: '景點' },
  { id: 'hotel', icon: '🏨', label: '酒店' },
];

const Budget: React.FC<BudgetProps> = ({ data = [], onUpdate }) => {
  const [newItem, setNewItem] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [payer, setPayer] = useState('大哥');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const [activeType, setActiveType] = useState<Transaction['type']>('food');

  const totalSpent = data.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const totalBudget = 200000;
  const balance = totalBudget - totalSpent;
  const hkdRate = 20; // 1 HKD = 20 JPY

  const addTransaction = () => {
    if (!newItem || !newAmount) return;
    const transaction: Transaction = {
      id: Date.now().toString(),
      item: newItem,
      amount: parseFloat(newAmount),
      payer,
      paymentMethod,
      type: activeType,
      timestamp: new Date().toISOString()
    };
    onUpdate([transaction, ...data]);
    setNewItem('');
    setNewAmount('');
  };

  const removeTransaction = (id: string) => {
    if (window.confirm('確定要刪除呢筆支出嗎？')) {
      onUpdate(data.filter(t => t.id !== id));
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* 總額概覽 (仿截圖佈局) */}
      <div className="flex gap-4">
        <div className="flex-1 bg-[#98ba5c] rounded-[2.5rem] p-6 text-white shadow-lg flex flex-col justify-center min-h-[130px] transition-transform active:scale-95 cursor-default">
          <p className="text-[10px] font-bold opacity-80 mb-1 uppercase tracking-wider">總額 (JPY)</p>
          <h2 className="text-4xl font-bold tracking-tighter">¥{totalSpent.toLocaleString()}</h2>
        </div>
        <div className="flex-1 bg-white border-4 border-[#f2f6e9] rounded-[2.5rem] p-6 text-gray-700 shadow-sm flex flex-col justify-center min-h-[130px]">
          <p className="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">約港幣 (HKD)</p>
          <h2 className="text-2xl font-bold text-gray-700">${(totalSpent / hkdRate).toFixed(1)}</h2>
        </div>
      </div>

      {/* 餘額顯示 - 更加醒目 */}
      <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-[#f2f6e9] flex justify-between items-center px-8">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">淨低餘額 Balance</span>
          <span className={`text-xl font-black ${balance < 20000 ? 'text-red-500' : 'text-[#7a9942]'}`}>
            ¥{balance.toLocaleString()}
          </span>
        </div>
        <div className="w-12 h-12 rounded-full bg-[#f2f6e9] flex items-center justify-center text-xl">
          {balance < 50000 ? '⚠️' : '🌴'}
        </div>
      </div>

      {/* 快速記帳區 */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-[#f2f6e9] space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[#7a9942] font-bold text-sm flex items-center gap-2">
            <span className="text-lg">📒</span> 快速記帳
          </h3>
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {TYPE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setActiveType(opt.id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${activeType === opt.id ? 'bg-[#98ba5c] shadow-sm scale-110 border-none' : 'bg-gray-50 border border-gray-100'}`}
              >
                {opt.icon}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex gap-3">
          <input 
            type="text" 
            placeholder="買咗咩？"
            className="flex-[2] bg-[#fcfbf4] border-none rounded-2xl p-4 text-sm focus:ring-2 ring-[#98ba5c] outline-none shadow-inner"
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
          />
          <div className="relative flex-1">
            <input 
              type="number" 
              placeholder="幾錢？"
              className="w-full bg-[#fcfbf4] border-none rounded-2xl p-4 text-sm focus:ring-2 ring-[#98ba5c] outline-none font-bold shadow-inner"
              value={newAmount}
              onChange={e => setNewAmount(e.target.value)}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-300">JPY</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* 付錢成員 */}
          <div className="bg-[#fcfbf4] p-1.5 rounded-2xl border border-[#f2f6e9] flex gap-1">
            <button 
              onClick={() => setPayer('大哥')}
              className={`flex-1 py-2 rounded-xl text-[10px] font-bold transition-all ${payer === '大哥' ? 'bg-[#4a90e2] text-white shadow-md' : 'text-gray-400'}`}
            >
              大哥
            </button>
            <button 
              onClick={() => setPayer('小媛')}
              className={`flex-1 py-2 rounded-xl text-[10px] font-bold transition-all ${payer === '小媛' ? 'bg-[#f06292] text-white shadow-md' : 'text-gray-400'}`}
            >
              小媛
            </button>
          </div>

          {/* 支付方式 */}
          <div className="bg-[#fcfbf4] p-1.5 rounded-2xl border border-[#f2f6e9] flex gap-1">
            <button 
              onClick={() => setPaymentMethod('cash')}
              className={`flex-1 py-2 rounded-xl text-[10px] font-bold transition-all ${paymentMethod === 'cash' ? 'bg-[#98ba5c] text-white shadow-md' : 'text-gray-400'}`}
            >
              CASH 現金
            </button>
            <button 
              onClick={() => setPaymentMethod('card')}
              className={`flex-1 py-2 rounded-xl text-[10px] font-bold transition-all ${paymentMethod === 'card' ? 'bg-[#7a9942] text-white shadow-md' : 'text-gray-400'}`}
            >
              CARD 碌卡
            </button>
          </div>
        </div>

        <button 
          onClick={addTransaction}
          disabled={!newItem || !newAmount}
          className="w-full bg-[#98ba5c] disabled:opacity-30 text-white font-bold py-4 rounded-3xl shadow-[0_10px_20px_rgba(152,186,92,0.3)] active:scale-95 transition-all text-lg"
        >
          記低佢 ✍️
        </button>
      </div>

      {/* 交易清單 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">支出歷史記錄 Recent</span>
          <span className="text-[10px] text-[#98ba5c] font-bold">{data.length} 項支出</span>
        </div>
        
        {data.map((t) => (
          <div key={t.id} className="bg-white rounded-[2rem] p-5 shadow-sm border-2 border-[#f2f6e9] flex items-center gap-4 group hover:border-[#98ba5c]/20 transition-all">
            <div className="w-12 h-12 rounded-full bg-[#fcfbf4] flex items-center justify-center text-xl border border-[#f2f6e9]">
              {TYPE_OPTIONS.find(o => o.id === t.type)?.icon || '💰'}
            </div>
            <div className="flex-grow">
              <h4 className="font-bold text-gray-800 text-base flex items-center gap-1.5">
                {t.item}
                {t.paymentMethod === 'card' && (
                  <span className="text-[9px] bg-sky-50 text-sky-500 px-1.5 py-0.5 rounded-md border border-sky-100 uppercase tracking-tighter font-black">CARD</span>
                )}
              </h4>
              <p className={`text-[10px] font-bold ${t.payer === '大哥' ? 'text-[#4a90e2]' : 'text-[#f06292]'}`}>
                {t.payer} 比咗
              </p>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-gray-700">{t.amount.toLocaleString()}</span>
            </div>
            <button 
              onClick={() => removeTransaction(t.id)}
              className="w-8 h-8 rounded-full bg-red-50 text-red-200 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center hover:bg-red-100 hover:text-red-500"
            >
              ✕
            </button>
          </div>
        ))}

        {data.length === 0 && (
          <div className="text-center py-20 text-gray-300">
            <div className="text-4xl mb-2">🐚</div>
            <p className="italic text-sm">仲未開始使錢，慢慢嚟！</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Budget;
