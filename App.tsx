
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Itinerary from './components/Itinerary';
import Checklist from './components/Checklist';
import Budget from './components/Budget';
import AIChat from './components/AIChat';
import { db } from './services/firebase';
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { ITINERARY, INITIAL_CHECKLIST, EXPENSES } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [travelData, setTravelData] = useState<any>(null);

  useEffect(() => {
    const docRef = doc(db, "travel", "okinawa2026");
    
    const unsubscribe = onSnapshot(docRef, async (snapshot) => {
      if (snapshot.exists()) {
        setTravelData(snapshot.data());
      } else {
        const initialData = {
          itinerary: ITINERARY,
          checklist: INITIAL_CHECKLIST,
          expenses: EXPENSES,
          lastUpdated: new Date().toISOString()
        };
        await setDoc(docRef, initialData);
        setTravelData(initialData);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateFirebase = async (newData: any) => {
    const docRef = doc(db, "travel", "okinawa2026");
    await setDoc(docRef, { ...travelData, ...newData, lastUpdated: new Date().toISOString() });
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
      case 'ai':
        return <AIChat />;
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
