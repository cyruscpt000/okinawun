
export interface ItineraryItem {
  time: string;
  activity: string;
  location: string;
  memo?: string;
  type: 'food' | 'transport' | 'hotel' | 'sightseeing' | 'shopping';
}

export interface DayPlan {
  date: string;
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
  // Add index signature to satisfy Recharts type requirements for dynamic data keys
  [key: string]: any;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  assignee?: string;
}
