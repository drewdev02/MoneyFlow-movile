import { makeAutoObservable } from 'mobx';

export interface MonthData {
    month: string;
    year: number;
    weeks: string[];
}

export class CalendarViewModel {
    selectedMonth = 'DEC 25';
    balance = 0.00;
    income = 0.00;
    expenses = 0.00;

    months = [
        { label: 'SEP 25', value: 'SEP 25' },
        { label: 'OCT 25', value: 'OCT 25' },
        { label: 'NOV 25', value: 'NOV 25' },
        { label: 'DEC 25', value: 'DEC 25' },
        { label: 'JAN 26', value: 'JAN 26' },
        { label: 'FEB 26', value: 'FEB 26' },
        { label: 'MAR 26', value: 'MAR 26' },
    ];

    calendarList: MonthData[] = [
        {
            month: 'January',
            year: 2026,
            weeks: ['Jan 01 - 04', 'Jan 04 - 11', 'Jan 11 - 18', 'Jan 18 - 25', 'Jan 25 - 31'],
        },
        {
            month: 'February',
            year: 2026,
            weeks: ['Feb 01 - 08', 'Feb 08 - 15', 'Feb 15 - 22', 'Feb 22 - 28'],
        },
    ];

    constructor() {
        makeAutoObservable(this);
    }

    setSelectedMonth(month: string) {
        this.selectedMonth = month;
    }
}
