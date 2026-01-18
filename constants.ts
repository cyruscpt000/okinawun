
import { DayPlan, Member, ChecklistItem } from './types';

export const MEMBERS: Member[] = [
  { name: '大哥', avatar: 'https://picsum.photos/id/64/150/150', role: '司機 / 總監' },
  { name: '小媛', avatar: 'https://picsum.photos/id/102/150/150', role: '攝影 / 美食探店' }
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
      { time: '19:00', activity: 'Aun 炭火燒x旬之美食', location: '肴家あうん', type: 'food', mapcode: '33156311*57', phone: '+81 50 5485 1547' },
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
  },
  {
    date: '2026-04-20',
    weekday: '一',
    title: 'Day 4: 水上活動與美食',
    items: [
      { time: '08:00', activity: '酒店早餐', location: '恩納村', type: 'food' },
      { time: '09:00', activity: '青潛 Best Dive Okinawa', location: '恩納村', type: 'sightseeing', mapcode: '206 066 073*33', phone: '+81 70 3124 7160', memo: '集合:0800/1000/1230/1430' },
      { time: '13:00', activity: 'Cafe Gozza (食意粉)', location: '恩納村', type: 'food', mapcode: '206003892*83', phone: '+81 98 923 3137', memo: '星期2休息' },
      { time: '14:30', activity: 'Shimabutaya Maeganeku', location: '豬扒飯', type: 'food', mapcode: '206096473*23', phone: '+81 98 923 1518' },
      { time: '17:00', activity: '夕陽獨木舟 Kadena', location: '嘉手納', type: 'sightseeing', mapcode: '33674867*06', duration: '20分鐘車程' },
      { time: '19:30', activity: '燒肉天狗 Tengu', location: '恩納村', type: 'food', mapcode: '33590108*51', phone: '+81 98 930 1128', memo: '星期3休息', duration: '19分鐘' }
    ]
  },
  {
    date: '2026-04-21',
    weekday: '二',
    title: 'Day 5: 海洋博與美食',
    items: [
      { time: '11:00', activity: '島豚家拉麵 Island Pig', location: '本部町', type: 'food', mapcode: '553077308*78', phone: '+81 980 43 6799', memo: '星期1,2,5開' },
      { time: '13:00', activity: '沖繩美麗海水族館', location: '本部町', type: 'sightseeing', mapcode: '553075767*78', phone: '+81 980 48 3748' },
      { time: '15:30', activity: '古宇利島 蝦蝦飯', location: '古宇利島', type: 'food', mapcode: '485692138*43', phone: '+81 980 56 1242' },
      { time: '16:30', activity: 'Shirasa Shokudo 海膽飯', location: '古宇利島', type: 'food', mapcode: '485692097*88', phone: '+81 980 51 5252' },
      { time: '18:30', activity: '百年古家 大家 阿古豬', location: '名護', type: 'food', mapcode: '206745082*21', phone: '+81 980 53 0280', memo: '要book，一個月前Book', duration: '半小時車程' }
    ]
  },
  {
    date: '2026-04-22',
    weekday: '三',
    title: 'Day 6: 回程與美食',
    items: [
      { time: '09:00', activity: 'Check out 酒店', location: '北部', type: 'hotel' },
      { time: '11:30', activity: '燒肉本部牧場 本部總店', location: '本部町', type: 'food', mapcode: '33 156 148*81', link: 'https://motobu-farm.com/zh-hant/#tc-widget', memo: '食到12:30' },
      { time: '13:00', activity: '還車', location: '那霸租車處', type: 'transport' },
      { time: '14:00', activity: '到達機場', location: '那霸空港', type: 'transport' },
      { time: '16:10', activity: '香港起飛 HX659', location: '那霸空港', type: 'flight', highlight: true, memo: '18:10 到達香港' }
    ]
  }
];

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  // 待辦
  { id: '1', text: '護照效期檢查', completed: false, assignee: '大哥', category: 'todo' },
  { id: '2', text: '辦理日文譯本駕照', completed: false, assignee: '大哥', category: 'todo' },
  { id: '3', text: '預約浮潛 (青潛)', completed: false, assignee: '小媛', category: 'todo' },
  { id: '4', text: '購買旅遊保險', completed: false, assignee: '大哥', category: 'todo' },
  // 行李
  { id: '5', text: '相機與記憶卡', completed: false, assignee: '小媛', category: 'luggage' },
  { id: '6', text: '泳衣與浮潛裝備', completed: false, assignee: '小媛', category: 'luggage' },
  { id: '7', text: '手機防水袋', completed: false, assignee: '大哥', category: 'luggage' },
  // 想去
  { id: '8', text: '名護城公園 (看景)', completed: false, category: 'places' },
  { id: '9', text: '備瀨一線天', completed: false, category: 'places' },
  // 採購
  { id: '10', text: 'Orion 啤酒限量杯', completed: false, category: 'shopping' },
  { id: '11', text: '沖繩黑糖', completed: false, category: 'shopping' },
  { id: '12', text: '蝦餅 (南風堂)', completed: false, category: 'shopping' }
];

export const EXPENSES = [
  { category: '租車交通', amount: 55000 },
  { category: '餐飲美食', amount: 100000 },
  { category: '酒店住宿', amount: 140000 },
  { category: '購物行程', amount: 60000 },
  { category: '景點門票', amount: 25000 }
];
