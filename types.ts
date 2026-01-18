
export interface ItineraryItem {
  time: string;
  activity: string;
  location: string;
  memo?: string;
  phone?: string;
  mapcode?: string;
  link?: string;
  duration?: string;
  highlight?: boolean;
  type: 'food' | 'transport' | 'hotel' | 'sightseeing' | 'shopping' | 'flight';
}

export interface DayPlan {
  date: string;
  weekday: string;
  title: string;
  items: ItineraryItem[];
}

export interface Member {
  name: string;
  avatar: string;
  role: string;
}

export interface Expense {
  category: string;
  amount: number;
  [key: string]: any;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  assignee?: string;
}
