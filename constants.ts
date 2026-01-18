
import { DayPlan, Member, ChecklistItem, Transaction } from './types';

export const MEMBERS: Member[] = [
  { name: '大哥', avatar: 'https://picsum.photos/id/64/150/150', role: '司機 / 總監' },
  { name: '小媛', avatar: 'https://picsum.photos/id/102/150/150', role: '攝影 / 美食探店' }
];

export const TOTAL_BUDGET_JPY = 200000;

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', item: '通堂拉麵', amount: 3200, payer: '大哥', paymentMethod: 'cash', type: 'food', timestamp: new Date().toISOString() },
  { id: '2', item: 'Storyline 酒店 (卡)', amount: 45000, payer: '大哥', paymentMethod: 'card', type: 'hotel', timestamp: new Date().toISOString() }
];

export const ITINERARY: DayPlan[] = [
  {
    date: '2026-04-17',
    weekday: '五',
    title: 'Day 1: 抵達與開車啟程',
    items: [
      { time: '09:55', activity: '香港起飛 HX676', location: 'HKG Airport', type: 'flight', highlight: true, memo: '13:40 到達沖繩' },
      { time: '13:40', activity: '到達沖繩 / 租車', location: '那霸租車處', type: 'transport', duration: '自駕去(插10分鐘)' },
      { time: '15:00', activity: '琉球新麵 通堂 小祿店', location: '小祿', type: 'food', mapcode: '33095245*67', phone: '+81 98 857 5577', memo: '機場10分鐘' },
      { time: '17:00', activity: '瀨長島 Check in', location: 'storyline沖繩', type: 'hotel', mapcode: '33002581*84' },
      { time: '19:00', activity: 'Aun 炭火燒x旬之美食', location: '肴家あ aun', type: 'food', mapcode: '33156311*57', phone: '+81 50 5485 1547' },
      { time: '21:00', activity: '美國村 American Village', location: '北谷', type: 'shopping', mapcode: '33525381*36', duration: '30-40分鐘車程' }
    ]
  },
  {
    date: '2026-04-18',
    weekday: '六',
    title: 'Day 2: 那霸市場與美景',
    items: [
      { time: '09:30', activity: '第一牧志公設市場', location: '那霸', type: 'food', mapcode: '33157264*75', phone: '+81 98 867 6560', memo: '開放時間：8:00-22:00，星期日休息', duration: '23分鐘車程' },
      { time: '11:00', activity: '沖繩世界 Okinawa World', location: '玉泉洞', type: 'sightseeing', mapcode: '232495333*52', phone: '+81 98 949 7421', duration: '半小時車程' },
      { time: '13:00', activity: '一心壽喜燒 Oniku no Isshin', location: '那霸', type: 'food', mapcode: '33156166*80', phone: '+81 98 866 0736', link: 'https://www.tablecheck.com/zh-TW/isshin-okinawa/reserve/message', memo: '午餐：1個月前book' },
      { time: '16:00', activity: '國際通商店街', location: '那霸', type: 'shopping', mapcode: '33 157 414*82', phone: '+81 98 863 2755' },
      { time: '19:00', activity: '琉球溫泉 龍神之湯', location: '瀨長島', type: 'sightseeing', mapcode: '33002576*33', phone: '+81 50 1721 9274', memo: '浸日歸' }
    ]
  },
  {
    date: '2026-04-19',
    weekday: '日',
    title: 'Day 3: 往北部海岸線',
    items: [
      { time: '09:00', activity: 'Check out 酒店', location: '瀨長島', type: 'hotel', duration: '約1小時車程' },
      { time: '10:30', activity: '萬座毛 Cape Manzamo', location: '恩納村', type: 'sightseeing', mapcode: '206312128*16', phone: '+81 98 966 8080', duration: '16分鐘' },
      { time: '12:00', activity: '浜之家海鮮料理', location: '恩納村', type: 'food', mapcode: '206035729*50', phone: '+81 98 965 0870', memo: '11:00-21:30' },
      { time: '15:00', activity: '萬座毛 深度遊', location: '恩納村', type: 'sightseeing', mapcode: '206312128*16' },
      { time: '18:00', activity: '燒肉 琉球之牛 恩納店', location: '恩納村', type: 'food', mapcode: '206096687*25', phone: '+81 98 965 2233', memo: '2個月前卜', duration: '15分鐘' }
    ]
  }
];

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  { id: 'vjw', text: '搞 Visit Japan Web (QR Code)', completed: false, assignee: '大哥', category: 'todo' },
  { id: 'yen', text: '唱 Yen (現金備用)', completed: false, assignee: '大哥', category: 'todo' },
  { id: 'power', text: '尿袋差滿電 🔋', completed: false, assignee: '小媛', category: 'luggage' },
  { id: '1', text: '護照效期檢查', completed: false, assignee: '大哥', category: 'todo' },
  { id: '2', text: '辦理日文譯本駕照', completed: false, assignee: '大哥', category: 'todo' },
  { id: '3', text: '預約浮潛 (青潛)', completed: false, assignee: '小媛', category: 'todo' },
  { id: '5', text: '相機與記憶卡', completed: false, assignee: '小媛', category: 'luggage' },
  { id: '10', text: 'Orion 啤酒限量杯', completed: false, category: 'shopping' }
];
