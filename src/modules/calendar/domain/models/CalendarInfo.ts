export interface Transaction {
    id: string;
    type: 'income' | 'expense';
    amount: number;
    category: string;
    description: string;
    isPaid: boolean;
    paymentMethod?: string;
}

export interface DayData {
    date: Date;
    label: string; // e.g. "Jan 20 Tuesday"
    dayBalance: number;
    transactions: Transaction[];
}

export interface MonthData {
    month: string;
    year: number;
    days: DayData[];
}

export interface MonthOption {
    label: string;
    value: string;
}

export interface CalendarInfo {
    months: MonthOption[];
    calendarList: MonthData[];
    selectedMonth: string;
    currentMonthIndex: number;
}
