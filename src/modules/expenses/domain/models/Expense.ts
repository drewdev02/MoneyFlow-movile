export interface Expense {
  id: string;
  category: string;
  amount: number;
  currency: string;
  date: Date;
  time: string;
  name: string;
  isPaid: boolean;
}
