
import React from 'react';
import { DayPlan, ItineraryItem } from '../types';

interface ItineraryProps {
  data: DayPlan[];
}

const getTypeColor = (type: ItineraryItem['type'], highlight?: boolean) => {
  if (highlight) return 'bg-emerald-500 text-white';
  switch (type) {
    case 'food': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'transport': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'hotel': return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'sightseeing': return 'bg-sky-100 text-sky-700 border-sky-200';
    case 'shopping': return 'bg-pink-100 text-pink-700 border-pink-200';
    case 'flight': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getIcon = (type: ItineraryItem['type']) => {
  switch (type) {
    case 'food': return '🍴';
    case 'transport': return '🚗';
    case 'hotel': return '🏨';
    case 'sightseeing': return '📸';
    case 'shopping': return '🛍️';
    case 'flight': return '✈️';
    default: return '📍';
  }
};

const Itinerary: React.FC<ItineraryProps> = ({ data }) => {
  return (
    <div className="space-y-12">
      {data.map((day, idx) => (
        <div key={idx} className="relative">
          {/* Day Header */}
          <div className="sticky top-0 z-10 bg-sky-50 py-2 mb-4">
            <div className="flex items-center gap-4">
              <div className="bg-sky-600 text-white px-4 py-1.5 rounded-full font-bold shadow-sm flex items-center gap-2">
                <span>D{idx + 1}</span>
                <span className="text-xs opacity-80">|</span>
                <span className="text-sm">{day.weekday}</span>
              </div>
              <div className="text-sky-900 font-bold">{day.date}</div>
            </div>
          </div>

          {/* Timeline Line */}
          <div className="ml-5 border-l-2 border-sky-200 pl-8 space-y-6">
            {day.items.map((item, itemIdx) => (
              <div key={itemIdx} className="relative group">
                {/* Dot */}
                <div className={`absolute -left-[37px] top-4 w-4 h-4 rounded-full bg-white border-2 transition-transform group-hover:scale-125 ${
                  item.highlight ? 'border-emerald-500 bg-emerald-50' : 'border-sky-400'
                }`}></div>
                
                {/* Card */}
                <div className={`bg-white rounded-2xl shadow-sm border transition-all hover:shadow-md ${
                  item.highlight ? 'border-emerald-200 bg-emerald-50/30' : 'border-sky-50'
                } p-4`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${getTypeColor(item.type, item.highlight)}`}>
                        {item.time}
                      </span>
                      {item.duration && (
                        <span className="text-[10px] text-gray-400 font-medium">⏱️ {item.duration}</span>
                      )}
                    </div>
                    <span className="text-xl">{getIcon(item.type)}</span>
                  </div>

                  <h4 className={`font-bold text-lg ${item.highlight ? 'text-emerald-700' : 'text-gray-800'}`}>
                    {item.activity}
                  </h4>

                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <span className="text-xs">📍</span> {item.location}
                    </p>
                    
                    {(item.mapcode || item.phone) && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.mapcode && (
                          <div className="bg-gray-100 text-[10px] px-2 py-1 rounded text-gray-600 font-mono">
                            MC: {item.mapcode}
                          </div>
                        )}
                        {item.phone && (
                          <a href={`tel:${item.phone}`} className="bg-sky-50 text-sky-600 text-[10px] px-2 py-1 rounded font-bold hover:bg-sky-100 transition-colors">
                            📞 {item.phone}
                          </a>
                        )}
                      </div>
                    )}

                    {item.link && (
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-[11px] bg-sky-500 text-white px-3 py-1 rounded-full font-bold hover:bg-sky-600 transition-colors"
                      >
                        🌐 立即預約
                      </a>
                    )}

                    {item.memo && (
                      <div className={`mt-3 text-xs p-2 rounded-lg italic border-l-4 ${
                        item.highlight ? 'bg-emerald-100/50 text-emerald-700 border-emerald-400' : 'bg-sky-50 text-sky-700 border-sky-400'
                      }`}>
                        "{item.memo}"
                      </div>
                    )}
                  </div>
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
