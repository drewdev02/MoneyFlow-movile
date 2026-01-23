export interface Income {
  id: string;
  category: string;
  amount: number;
  currency: string;
  date: Date;
  time: string;
  name: string;
  isPaid: boolean;
  notes?: string;
  repeat?: string;
  remind?: string;
  goalOrDebt?: string;
}
