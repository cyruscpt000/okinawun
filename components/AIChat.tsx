
import React, { useState, useRef, useEffect } from 'react';
import { getTravelAdvise } from '../services/geminiService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  grounding?: any[];
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '哈囉 大哥、小媛！我是你們的沖繩專屬導遊 AI。有什麼可以幫到你們？例如想去哪裡吃阿古豬，或是哪裡的浮潛最讚？' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const result = await getTravelAdvise(userMsg);
    
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: result.text,
      grounding: result.grounding
    }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[70vh]">
      <div className="flex-grow overflow-y-auto space-y-4 pb-4 px-2">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] p-4 rounded-2xl shadow-sm text-sm ${
              msg.role === 'user' 
                ? 'bg-sky-500 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 border border-sky-100 rounded-tl-none'
            }`}>
              <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
              
              {msg.grounding && msg.grounding.length > 0 && (
                <div className="mt-4 pt-4 border-t border-sky-50 space-y-2">
                  <p className="text-[10px] text-sky-400 font-bold uppercase tracking-wider mb-2">🔍 相關地點與參考連結：</p>
                  <div className="grid grid-cols-1 gap-2">
                    {msg.grounding.map((chunk: any, ci: number) => (
                      <div key={ci} className="bg-sky-50/50 hover:bg-sky-100/50 transition-colors p-3 rounded-xl border border-sky-100/50 group">
                         {chunk.maps && (
                           <a href={chunk.maps.uri} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between">
                             <div className="flex items-center gap-2 overflow-hidden">
                               <span className="text-lg">📍</span>
                               <span className="text-sky-700 font-bold truncate">{chunk.maps.title}</span>
                             </div>
                             <span className="text-sky-300 group-hover:text-sky-500 text-xs">開啟地圖 →</span>
                           </a>
                         )}
                         {chunk.web && (
                           <a href={chunk.web.uri} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between">
                             <div className="flex items-center gap-2 overflow-hidden">
                               <span className="text-lg">🔗</span>
                               <span className="text-sky-700 font-bold truncate">{chunk.web.title}</span>
                             </div>
                             <span className="text-sky-300 group-hover:text-sky-500 text-xs">查看來源 →</span>
                           </a>
                         )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-sky-100 shadow-sm">
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 bg-sky-300 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce [animation-delay:-.5s]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="mt-4 bg-white p-3 rounded-2xl border border-sky-100 flex items-center gap-2 shadow-inner focus-within:ring-2 ring-sky-200 transition-all">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="想去哪裡玩？問問 AI..."
          className="flex-grow bg-transparent outline-none text-sm px-2 py-1"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="bg-sky-500 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-sky-600 transition-colors disabled:opacity-30 disabled:grayscale shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </div>
    </div>
  );
};

export default AIChat;
