
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Itinerary from './components/Itinerary';
import Checklist from './components/Checklist';
import Budget from './components/Budget';
import { db } from './services/firebase';
// 移除不支援的具名導出，改用 db 實例方法
import { ITINERARY, INITIAL_CHECKLIST, EXPENSES } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [travelData, setTravelData] = useState<any>(null);

  useEffect(() => {
    // 使用 Firebase v8 語法修復 doc() 導出錯誤
    const docRef = db.doc("travel/okinawa2026");
    
    // 使用 Firebase v8 實例方法修復 onSnapshot 導出錯誤
    const unsubscribe = docRef.onSnapshot(async (snapshot) => {
      // 在 v8 中 exists 是屬性而非方法
      if (snapshot.exists) {
        setTravelData(snapshot.data());
      } else {
        const initialData = {
          itinerary: ITINERARY,
          checklist: INITIAL_CHECKLIST,
          expenses: EXPENSES,
          lastUpdated: new Date().toISOString()
        };
        // 使用 v8 實例方法修復 setDoc 導出錯誤
        await docRef.set(initialData);
        setTravelData(initialData);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateFirebase = async (newData: any) => {
    // 使用 Firebase v8 實例方法獲取引用並更新數據
    const docRef = db.doc("travel/okinawa2026");
    await docRef.set({ ...travelData, ...newData, lastUpdated: new Date().toISOString() });
  };

  const renderContent = () => {
    if (!travelData) return (
      <div className="flex flex-col items-center justify-center p-20 text-sky-500 gap-4">
        <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
        <p>正在連接沖繩數據庫...</p>
      </div>
    );

    switch (activeTab) {
      case 'itinerary': 
        return <Itinerary data={travelData.itinerary} />;
      case 'checklist': 
        return <Checklist 
                  data={travelData.checklist} 
                  onUpdate={(newList) => updateFirebase({ checklist: newList })} 
                />;
      case 'budget': 
        return <Budget data={travelData.expenses} />;
      default: 
        return <Itinerary data={travelData.itinerary} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
