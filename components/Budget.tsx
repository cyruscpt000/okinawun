
import React, { useState } from 'react';
import { Transaction } from '../types';

interface BudgetProps {
  data: Transaction[];
  onUpdate: (newData: Transaction[]) => void;
}

const TYPE_ICONS = {
  food: '🍴',
  transport: '🚗',
  hotel: '🏨',
  sightseeing: '📸',
  shopping: '🛍️'
};

const Budget: React.FC<BudgetProps> = ({ data = [], onUpdate }) => {
  const [newItem, setNewItem] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [payer, setPayer] = useState('大哥');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const [type, setType] = useState<Transaction['type']>('food');

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
      type,
      timestamp: new Date().toISOString()
    };
    onUpdate([transaction, ...data]);
    setNewItem('');
    setNewAmount('');
  };

  const removeTransaction = (id: string) => {
    onUpdate(data.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6 pb-10">
      {/* 總額概覽 (仿截圖佈局) */}
      <div className="flex gap-4">
        <div className="flex-1 bg-[#98ba5c] rounded-[2.5rem] p-6 text-white shadow-lg flex flex-col justify-center min-h-[140px]">
          <p className="text-[10px] font-bold opacity-80 mb-1 uppercase tracking-wider">總額 (JPY)</p>
          <h2 className="text-4xl font-bold tracking-tighter">{totalSpent.toLocaleString()}</h2>
        </div>
        <div className="flex-1 bg-white border-4 border-[#f2f6e9] rounded-[2.5rem] p-6 text-gray-700 shadow-sm flex flex-col justify-center min-h-[140px]">
          <p className="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">約港幣 (HKD)</p>
          <h2 className="text-2xl font-bold text-gray-700">${(totalSpent / hkdRate).toFixed(1)}</h2>
        </div>
      </div>

      {/* 餘額提示 */}
      <div className="bg-[#fcfbf4] border-2 border-dashed border-[#98ba5c]/30 rounded-3xl p-4 text-center">
        <p className="text-sm font-bold text-[#7a9942]">
          🎌 預算剩餘：<span className="text-lg">¥{balance.toLocaleString()}</span>
        </p>
      </div>

      {/* 快速記帳區 */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-[#f2f6e9] space-y-5">
        <h3 className="text-[#7a9942] font-bold text-sm flex items-center gap-2">
          <span className="text-lg">👛</span> 快速記帳
        </h3>
        
        <div className="flex gap-3">
          <input 
            type="text" 
            placeholder="買咗咩？"
            className="flex-[2] bg-[#fcfbf4] border-none rounded-2xl p-4 text-sm focus:ring-2 ring-[#98ba5c] outline-none"
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
          />
          <input 
            type="number" 
            placeholder="日幣？"
            className="flex-1 bg-[#fcfbf4] border-none rounded-2xl p-4 text-sm focus:ring-2 ring-[#98ba5c] outline-none font-bold"
            value={newAmount}
            onChange={e => setNewAmount(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {/* 支付方式 */}
          <div className="flex bg-[#fcfbf4] p-1 rounded-2xl border border-[#f2f6e9]">
            <button 
              onClick={() => setPaymentMethod('cash')}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all ${paymentMethod === 'cash' ? 'bg-[#98ba5c] text-white shadow-sm' : 'text-gray-400'}`}
            >
              CASH 現金
            </button>
            <button 
              onClick={() => setPaymentMethod('card')}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all ${paymentMethod === 'card' ? 'bg-[#98ba5c] text-white shadow-sm' : 'text-gray-400'}`}
            >
              CARD 信用卡
            </button>
          </div>

          {/* 付錢成員 */}
          <div className="flex bg-[#fcfbf4] p-1 rounded-2xl border border-[#f2f6e9]">
            <button 
              onClick={() => setPayer('大哥')}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all ${payer === '大哥' ? 'bg-orange-400 text-white shadow-sm' : 'text-gray-400'}`}
            >
              大哥
            </button>
            <button 
              onClick={() => setPayer('小媛')}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all ${payer === '小媛' ? 'bg-pink-400 text-white shadow-sm' : 'text-gray-400'}`}
            >
              小媛
            </button>
          </div>
        </div>

        <button 
          onClick={addTransaction}
          className="w-full bg-[#98ba5c] text-white font-bold py-4 rounded-3xl shadow-md active:scale-95 transition-all text-lg"
        >
          記低佢
        </button>
      </div>

      {/* 交易清單 */}
      <div className="space-y-4">
        {data.map((t) => (
          <div key={t.id} className="bg-white rounded-[2.5rem] p-5 shadow-sm border-2 border-[#f2f6e9] flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full bg-[#fcfbf4] flex items-center justify-center text-xl border border-[#f2f6e9]">
              {TYPE_ICONS[t.type] || '💰'}
            </div>
            <div className="flex-grow">
              <h4 className="font-bold text-gray-800 text-base">
                {t.item} {t.paymentMethod === 'card' ? '(卡)' : ''}
              </h4>
              <p className={`text-[10px] font-bold ${t.payer === '大哥' ? 'text-orange-400' : 'text-pink-400'}`}>
                {t.payer} 昇咗
              </p>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-gray-700">{t.amount.toLocaleString()}</span>
            </div>
            <button 
              onClick={() => removeTransaction(t.id)}
              className="w-8 h-8 rounded-full bg-red-50 text-red-200 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"
            >
              🗑️
            </button>
          </div>
        ))}

        {data.length === 0 && (
          <div className="text-center py-10 text-gray-300 italic">仲未有任何支出記錄 🍃</div>
        )}
      </div>
    </div>
  );
};

export default Budget;
