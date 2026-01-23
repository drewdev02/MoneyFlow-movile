export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  icon: string;
  color: string;
  category: string;
  notes?: string;
  date: string;
  imageUrl?: string;
}
