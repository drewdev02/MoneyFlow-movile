export interface Transaction {
  id: string;
  category: {
    name: string;
    color: string;
  };
  description: string;
  amount: number;
  date: string;
  sum: number;
  balance: number;
  currency: string;
  account: {
    name: string;
  };
}
