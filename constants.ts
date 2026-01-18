
import { DayPlan, Member, ChecklistItem } from './types';

export const MEMBERS: Member[] = [
  { name: '大哥', avatar: 'https://picsum.photos/id/64/150/150', role: '司機 / 總監' },
  { name: '小媛', avatar: 'https://picsum.photos/id/102/150/150', role: '攝影 / 美食探店' }
];

export const ITINERARY: DayPlan[] = [
  {
    date: '2026-04-17',
    title: '到達那霸 & 國際通',
    items: [
      { time: '12:30', activity: '到達那霸空港', location: 'Naha Airport', type: 'transport' },
      { time: '14:30', activity: '租車接駁', location: 'OTS Rental Car', type: 'transport' },
      { time: '17:00', activity: '酒店入住', location: '那霸市內酒店', type: 'hotel' },
      { time: '19:00', activity: '國際通第一晚晚餐', location: '國際通', type: 'food' }
    ]
  },
  {
    date: '2026-04-18',
    title: '美麗海 & 北部風光',
    items: [
      { time: '10:00', activity: '美麗海水族館', location: 'Motobu', type: 'sightseeing' },
      { time: '14:00', activity: '備瀨福木林道', location: 'Bise', type: 'sightseeing' },
      { time: '18:00', activity: '北部燒肉', location: '名護市', type: 'food' }
    ]
  },
  {
    date: '2026-04-19',
    title: '古宇利島深度遊',
    items: [
      { time: '11:00', activity: '古宇利大橋', location: 'Kouri Bridge', type: 'sightseeing' },
      { time: '13:00', activity: '蝦蝦飯午餐', location: 'Kouri Island', type: 'food' },
      { time: '15:00', activity: '心形岩', location: 'Heart Rock', type: 'sightseeing' }
    ]
  },
  {
    date: '2026-04-20',
    title: '中部萬座毛與美國村',
    items: [
      { time: '10:30', activity: '萬座毛步道', location: 'Onna Village', type: 'sightseeing' },
      { time: '14:00', activity: '美國村逛街', location: 'American Village', type: 'shopping' },
      { time: '19:00', activity: '摩天輪日落晚餐', location: 'Sunset Beach', type: 'food' }
    ]
  },
  {
    date: '2026-04-21',
    title: '南部景點與玉泉洞',
    items: [
      { time: '10:00', activity: '沖繩世界文化王國', location: '玉泉洞', type: 'sightseeing' },
      { time: '15:00', activity: '瀨長島 Umikaji Terrace', location: 'Senagajima', type: 'sightseeing' },
      { time: '18:30', activity: '最後晚餐', location: '那霸市', type: 'food' }
    ]
  },
  {
    date: '2026-04-22',
    title: '最後衝刺與回程',
    items: [
      { time: '10:00', activity: 'Outlet 購物', location: 'Ashibinaa Outlet', type: 'shopping' },
      { time: '13:00', activity: '還車手續', location: 'Rental Car Office', type: 'transport' },
      { time: '15:00', activity: '抵達空港', location: 'Naha Airport', type: 'transport' }
    ]
  }
];

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  { id: '1', text: '護照', completed: false, assignee: '大哥' },
  { id: '2', text: '日文譯本駕照', completed: false, assignee: '大哥' },
  { id: '3', text: '相機記憶卡', completed: false, assignee: '小媛' },
  { id: '4', text: '預約浮潛', completed: false, assignee: '小媛' },
  { id: '5', text: '保險購買', completed: false, assignee: '大哥' }
];

export const EXPENSES = [
  { category: '租車交通', amount: 50000 },
  { category: '餐飲美食', amount: 80000 },
  { category: '酒店住宿', amount: 120000 },
  { category: '購物行程', amount: 50000 },
  { category: '景點門票', amount: 20000 }
];
