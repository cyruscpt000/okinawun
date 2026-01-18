
import React, { useState, useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [showCalc, setShowCalc] = useState(false);
  const [jpy, setJpy] = useState<string>('');
  const [hkd, setHkd] = useState<string>('');
  
  const tabs = [
    { id: 'itinerary', label: '行程', icon: '📅' },
    { id: 'checklist', label: '準備', icon: '✅' },
    { id: 'budget', label: '預算', icon: '💰' },
    { id: 'ai', label: '助手', icon: '🤖' }
  ];

  // 倒數計時計算
  const targetDate = new Date('2026-04-17');
  const today = new Date();
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // 匯率換算邏輯 (假設 1 HKD = 20 JPY)
  const handleJpyChange = (val: string) => {
    setJpy(val);
    if (val === '') setHkd('');
    else setHkd((parseFloat(val) / 20).toFixed(1));
  };

  const handleHkdChange = (val: string) => {
    setHkd(val);
    if (val === '') setJpy('');
    else setJpy((parseFloat(val) * 20).toFixed(0));
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#fcfbf4] flex flex-col shadow-xl relative">
      {/* Top Header - Redesigned based on screenshot */}
      <header className="p-6 pt-8 bg-[#fcfbf4]">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <h1 className="text-[26px] font-bold text-[#98ba5c] tracking-tight">小媛族沖繩之旅2026</h1>
            <div className="flex gap-2">
              <div className="bg-[#98ba5c] text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <span>📅</span> 倒數 {diffDays > 0 ? diffDays : 0} 天
              </div>
              <div className="bg-[#e9e6d1] text-[#7a745c] text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <span>☁️</span> 沖繩 22°C 晴
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* 匯率計算按鈕 */}
            <button 
              onClick={() => setShowCalc(true)}
              className="w-10 h-10 rounded-full bg-white border border-[#e9e6d1] shadow-sm flex items-center justify-center text-[#7a745c] hover:bg-[#f2f6e9] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
            </button>
            
            <div className="flex -space-x-3">
              <img src="https://picsum.photos/id/102/100/100" className="w-11 h-11 rounded-full border-2 border-white shadow-md" alt="小媛" />
              <img src="https://picsum.photos/id/64/100/100" className="w-11 h-11 rounded-full border-2 border-[#98ba5c] shadow-md" alt="大哥" />
            </div>
          </div>
        </div>
      </header>

      {/* 匯率計算機 Modal */}
      {showCalc && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm">
          <div className="bg-white w-full max-w-xs rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-[#7a9942]">匯率計算機</h3>
              <button onClick={() => setShowCalc(false)} className="text-gray-400">✕</button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Japanese Yen (JPY)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={jpy}
                    onChange={(e) => handleJpyChange(e.target.value)}
                    className="w-full bg-[#fcfbf4] border-none rounded-2xl p-4 text-xl font-bold text-[#7a9942] focus:ring-2 ring-[#98ba5c] outline-none"
                    placeholder="0"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-[#98ba5c]">¥</span>
                </div>
              </div>
              
              <div className="flex justify-center py-1">
                <div className="w-8 h-8 rounded-full bg-[#f2f6e9] flex items-center justify-center text-[#98ba5c]">⇅</div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Hong Kong Dollar (HKD)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={hkd}
                    onChange={(e) => handleHkdChange(e.target.value)}
                    className="w-full bg-[#fcfbf4] border-none rounded-2xl p-4 text-xl font-bold text-gray-700 focus:ring-2 ring-[#98ba5c] outline-none"
                    placeholder="0.0"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">$</span>
                </div>
              </div>
              
              <p className="text-[10px] text-center text-gray-400 pt-2 italic">參考匯率: 1 HKD ≈ 20 JPY</p>
            </div>
            
            <button 
              onClick={() => setShowCalc(false)}
              className="w-full bg-[#98ba5c] text-white font-bold py-4 rounded-3xl mt-6 shadow-md"
            >
              完成
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-grow p-4 overflow-y-auto mb-20">
        {children}
      </main>

      {/* Sticky Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#f2f6e9] flex justify-around py-4 px-4 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-50 rounded-t-[2.5rem]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === tab.id ? 'text-[#7a9942] font-bold scale-110' : 'text-gray-300'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
