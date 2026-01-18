
import React from 'react';
import { DayPlan, ItineraryItem } from '../types';

interface ItineraryProps {
  data: DayPlan[];
}

const getTypeIcon = (type: ItineraryItem['type']) => {
  switch (type) {
    case 'food': return '🍴';
    case 'transport': return '🚗';
    case 'hotel': return '🏨';
    case 'sightseeing': return '📸';
    case 'shopping': return '🛍️';
    default: return '📍';
  }
};

const Itinerary: React.FC<ItineraryProps> = ({ data }) => {
  return (
    <div className="space-y-8">
      {data.map((day, idx) => (
        <div key={idx} className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-sky-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md">
              D{idx + 1}
            </div>
            <div>
              <h3 className="font-bold text-sky-900">{day.title}</h3>
              <p className="text-xs text-sky-600 font-medium tracking-wide">{day.date}</p>
            </div>
          </div>

          <div className="ml-5 border-l-2 border-sky-200 pl-8 space-y-6">
            {day.items.map((item, itemIdx) => (
              <div key={itemIdx} className="relative group">
                <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-white border-2 border-sky-400 group-hover:scale-125 transition-transform"></div>
                
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-sky-50 hover:shadow-md transition-all hover:border-sky-200">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-bold text-sky-600">{item.time}</span>
                    <span className="text-lg">{getTypeIcon(item.type)}</span>
                  </div>
                  <h4 className="font-bold text-gray-800">{item.activity}</h4>
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                    <span className="opacity-60 text-xs">📍</span> {item.location}
                  </p>
                  {item.memo && (
                    <div className="mt-2 text-xs bg-sky-50 text-sky-700 p-2 rounded-lg italic">
                      "{item.memo}"
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Itinerary;
