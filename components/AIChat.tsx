
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
            <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-sm ${
              msg.role === 'user' 
                ? 'bg-sky-500 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 border border-sky-100 rounded-tl-none'
            }`}>
              {msg.content}
              
              {msg.grounding && msg.grounding.length > 0 && (
                <div className="mt-3 pt-3 border-t border-sky-100 space-y-2">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">相關地點建議：</p>
                  {msg.grounding.map((chunk: any, ci: number) => (
                    <div key={ci} className="bg-sky-50 p-2 rounded-lg">
                       {chunk.maps && (
                         <a href={chunk.maps.uri} target="_blank" className="text-sky-600 font-medium block">
                           📍 {chunk.maps.title}
                         </a>
                       )}
                       {chunk.web && (
                         <a href={chunk.web.uri} target="_blank" className="text-sky-600 font-medium block">
                           🔗 {chunk.web.title}
                         </a>
                       )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-sky-100 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-sky-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce [animation-delay:-.5s]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="mt-auto bg-white p-3 rounded-2xl border border-sky-100 flex items-center gap-2 shadow-inner">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="問問 AI 關於沖繩..."
          className="flex-grow bg-transparent outline-none text-sm px-2"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="bg-sky-500 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-sky-600 transition-colors disabled:opacity-50"
        >
          ✈️
        </button>
      </div>
    </div>
  );
};

export default AIChat;
