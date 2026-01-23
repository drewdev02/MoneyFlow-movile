import {CalendarInfo, MonthData, MonthOption} from '../models/CalendarInfo';

export class GenerateCalendarData {
    execute(): CalendarInfo {
        const months: MonthOption[] = [];
        const calendarList: MonthData[] = [];
        const now = new Date();

        for (let i = -3; i <= 3; i++) {
            const date = new Date(now.getFullYear(), now.getMonth() + i, 1);

            // For `months` array
            const monthLabel = date.toLocaleString('default', {month: 'short'}).toUpperCase();
            const yearLabel = date.getFullYear().toString().slice(-2);
            const label = `${monthLabel} ${yearLabel}`;
            months.push({label, value: label});

            // For `calendarList` array
            const monthName = date.toLocaleString('default', {month: 'long'});
            const year = date.getFullYear();
            const weeks = this.getWeeksForMonth(year, date.getMonth());
            calendarList.push({month: monthName, year, weeks});
        }

        const selectedMonthDate = new Date();
        const selectedMonthLabel = selectedMonthDate.toLocaleString('default', {month: 'short'}).toUpperCase();
        const selectedYearLabel = selectedMonthDate.getFullYear().toString().slice(-2);
        const selectedMonth = `${selectedMonthLabel} ${selectedYearLabel}`;

        const currentMonthIndex = calendarList.findIndex(m => m.month === new Date().toLocaleString('default', {month: 'long'})) + 1;

        return {months, calendarList, selectedMonth, currentMonthIndex};
    }

    private getWeeksForMonth(year: number, month: number): string[] {
        const weeks: string[] = [];
        const firstDate = new Date(year, month, 1);
        const lastDate = new Date(year, month + 1, 0);
        const numDays = lastDate.getDate();
        const monthShort = firstDate.toLocaleString('default', {month: 'short'});
        const format = (day: number) => day.toString().padStart(2, '0');

        let start = 1;
        while (start <= numDays) {
            let end = start + 6;
            if (end > numDays) {
                end = numDays;
            }
            weeks.push(`${monthShort} ${format(start)} - ${format(end)}`);
            start = end + 1;
        }
        return weeks;
    }
}
