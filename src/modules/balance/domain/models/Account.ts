export interface Account {
    id: string;
    name: string;
    balance: number;
    currency: string;
    color: string;
    icon: string; // Ionicons name
    type: 'cash' | 'bank' | 'card' | 'other';
    percentage?: number; // Calculated field for UI
}

export interface TotalBalance {
    amount: number;
    currency: string;
}
