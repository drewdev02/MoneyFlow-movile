
export interface MonthData {
    month: string;
    year: number;
    weeks: string[];
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
