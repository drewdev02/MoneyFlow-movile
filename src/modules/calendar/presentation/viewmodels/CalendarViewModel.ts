import {LoggerFactory} from '@/core/logger';
import {makeAutoObservable} from 'mobx';
import {GenerateCalendarData} from '../../domain/usecases/GenerateCalendarData';
import {MonthData, MonthOption} from '../../domain/models/CalendarInfo';

export class CalendarViewModel {
    selectedMonth: string;
    balance = 0.00;
    income = 0.00;
    expenses = 0.00;
    months: MonthOption[] = [];
    calendarList: MonthData[] = [];
    currentMonthIndex: number;

    isFabOpen = false;
    private logger = LoggerFactory.createLogger(CalendarViewModel.name);

    constructor(
        private readonly generateCalendarData: GenerateCalendarData
    ) {
        makeAutoObservable(this);
        const {months, calendarList, selectedMonth, currentMonthIndex} = this.generateCalendarData.execute();
        this.months = months;
        this.calendarList = calendarList;
        this.selectedMonth = selectedMonth;
        this.currentMonthIndex = currentMonthIndex
    }

    setSelectedMonth(month: string) {
        this.selectedMonth = month;
    }

    toggleFab() {
        this.logger.info('toggleFab called, current state:', this.isFabOpen);
        this.isFabOpen = !this.isFabOpen;
        this.logger.info('new state:', this.isFabOpen);
    }
}
