
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
    { id: 'ai', label: 'AI 助手', icon: '🤖' }
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-sky-50 flex flex-col shadow-xl">
      {/* Top Header */}
      <header className="bg-sky-500 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">沖繩之行 2025</h1>
            <p className="text-sky-100 text-sm">OKINAWA ADVENTURE</p>
          </div>
          <div className="flex -space-x-3">
            <img src="https://picsum.photos/id/64/100/100" className="w-10 h-10 rounded-full border-2 border-white" title="大哥" />
            <img src="https://picsum.photos/id/102/100/100" className="w-10 h-10 rounded-full border-2 border-white" title="小媛" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow p-4 overflow-y-auto mb-20">
        {children}
      </main>

      {/* Sticky Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-sky-100 flex justify-around py-3 px-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === tab.id ? 'text-sky-600 font-bold scale-110' : 'text-gray-400'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
