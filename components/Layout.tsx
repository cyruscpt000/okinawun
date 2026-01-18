
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'itinerary', label: '行程', icon: '📅' },
    { id: 'checklist', label: '清單', icon: '✅' },
    { id: 'budget', label: '預算', icon: '💰' },
    { id: 'ai', label: '助手', icon: '🤖' }
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#fcfbf4] flex flex-col shadow-xl">
      {/* Top Header */}
      <header className="bg-[#98ba5c] text-white p-6 rounded-b-[2.5rem] shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">沖繩之行 2026</h1>
            <p className="text-[#eef2e6] text-xs font-medium tracking-widest uppercase">Okinawa Adventure</p>
          </div>
          <div className="flex -space-x-3">
            <img src="https://picsum.photos/id/64/100/100" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" title="大哥" />
            <img src="https://picsum.photos/id/102/100/100" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" title="小媛" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow p-4 overflow-y-auto mb-20">
        {children}
      </main>

      {/* Sticky Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#f2f6e9] flex justify-around py-3 px-4 shadow-[0_-4px_15px_rgba(0,0,0,0.05)] z-50 rounded-t-[2rem]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === tab.id ? 'text-[#7a9942] font-bold scale-110' : 'text-gray-300 hover:text-[#98ba5c]'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-[10px] mt-1 uppercase tracking-tighter">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
