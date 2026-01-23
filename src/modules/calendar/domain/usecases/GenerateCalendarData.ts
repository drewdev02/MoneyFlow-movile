import { CalendarInfo, MonthData, MonthOption } from '../models/CalendarInfo';

export class GenerateCalendarData {
    execute(): CalendarInfo {
        const months: MonthOption[] = [];
        const calendarList: MonthData[] = [];
        const now = new Date();

        // Generate data for 7 months: current +/- 3
        for (let i = -3; i <= 3; i++) {
            const date = new Date(now.getFullYear(), now.getMonth() + i, 1);

            // For `months` array selection
            const monthLabel = date.toLocaleString('default', {month: 'short'}).toUpperCase();
            const yearLabel = date.getFullYear().toString().slice(-2);
            const label = `${monthLabel} ${yearLabel}`;
            months.push({label, value: label});

            // For `calendarList` array (Main content)
            const monthName = date.toLocaleString('default', {month: 'long'});
            const year = date.getFullYear();
            const days = this.getDaysForMonth(year, date.getMonth());
            calendarList.push({month: monthName, year, days});
        }

        const selectedMonthDate = new Date();
        const selectedMonthLabel = selectedMonthDate.toLocaleString('default', {month: 'short'}).toUpperCase();
        const selectedYearLabel = selectedMonthDate.getFullYear().toString().slice(-2);
        const selectedMonth = `${selectedMonthLabel} ${selectedYearLabel}`;

        const currentMonthIndex = calendarList.findIndex(m => m.month === new Date().toLocaleString('default', {month: 'long'}));

        return {months, calendarList, selectedMonth, currentMonthIndex: currentMonthIndex !== -1 ? currentMonthIndex : 3};
    }

    private getDaysForMonth(year: number, month: number): import('../models/CalendarInfo').DayData[] {
        const days: import('../models/CalendarInfo').DayData[] = [];
        const numDays = new Date(year, month + 1, 0).getDate();

        for (let day = 1; day <= numDays; day++) {
            const date = new Date(year, month, day);
            const transactions = this.generateMockTransactions(date);
            
            // Format label: "Jan 20 Tuesday"
            const monthShort = date.toLocaleString('default', {month: 'short'});
            const dayNum = date.getDate().toString().padStart(2, '0');
            const weekday = date.toLocaleString('default', {weekday: 'long'});
            const label = `${monthShort} ${dayNum} ${weekday}`;

            const dayBalance = transactions.reduce((acc, curr) => {
                return curr.type === 'income' ? acc + curr.amount : acc - curr.amount;
            }, 0);

            days.push({
                date,
                label,
                transactions,
                dayBalance
            });
        }
        // Reverse to show latest dates first? Usually calendars go 1->30. 
        // But the design often shows lists. Let's keep 1->30 for now, or maybe the user wants reverse? 
        // The image shows "Jan 20", "Jan 21", "Jan 22"... ascending order.
        return days;
    }

    private generateMockTransactions(date: Date): import('../models/CalendarInfo').Transaction[] {
        // Randomly generate some transactions for specific days to verify UI
        const transactions: import('../models/CalendarInfo').Transaction[] = [];
        const day = date.getDate();
        
        // Mock data logic (just for visual verification as per screenshots)
        if (day % 2 === 0) {
           transactions.push({
               id: `exp-${date.getTime()}-1`,
               type: 'expense',
               amount: 5.00,
               category: 'Food',
               description: 'Galletas',
               isPaid: true,
               paymentMethod: 'Cash'
           });
        }

        if (day % 5 === 0) {
             transactions.push({
               id: `exp-${date.getTime()}-2`,
               type: 'expense',
               amount: 10.00,
               category: 'Transport',
               description: 'Transport',
               isPaid: true,
               paymentMethod: 'Cash'
           });
        }
        
         if (day % 7 === 0) {
            transactions.push({
                id: `exp-${date.getTime()}-3`,
                type: 'expense',
                amount: 50.00,
                category: 'Shopping',
                description: 'Supermarket',
                isPaid: true,
                paymentMethod: 'Card'
            });
        }

        if (day === 15 || day === 30) {
            transactions.push({
                id: `inc-${date.getTime()}-1`,
                type: 'income',
                amount: 1800.00,
                category: 'Salary',
                description: 'Salary',
                isPaid: true
            });
        }

         if (day === 10) {
            transactions.push({
                id: `exp-${date.getTime()}-4`,
                type: 'expense',
                amount: 250.00,
                category: 'Housing',
                description: 'House',
                isPaid: false
            });
        }

        return transactions;
    }
}
