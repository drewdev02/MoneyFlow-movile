import { Account } from "./Account";

export interface Transaction {
    id: string;
    description: string;
    amount: number;
    date: string; // ISO Date string for simplicity
    currency: string;
    type: 'income' | 'expense';
    categoryIcon?: string; // Optional icon for the transaction category
    categoryName?: string;
    categoryColor?: string; 
}

export interface AccountDetail extends Account {
    transactions: Transaction[];
}
