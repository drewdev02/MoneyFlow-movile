import { authModule } from "@/modules/auth/di/auth.module";
import { balanceModule } from "@/modules/balance/di/balance.module";
import { calendarModule } from "@/modules/calendar/di/calendar.module";
import { categoriesModule } from "@/modules/categories/di/categories.module";
import { expensesModule } from "@/modules/expenses/di/expenses.module";
import { goalsModule } from "@/modules/goals/di/goals.module";
import { incomeModule } from "@/modules/income/di/income.module";
import { profileModule } from "@/modules/profile/di/profile.module";
import { transactionsModule } from "@/modules/transactions/di/transactions.module";
import { bindingScopeValues, Container } from 'inversify';
import { axiosClient, HttpClient } from "../http";
import { Database, drizzleDb } from "../db";

export const container = new Container({
    defaultScope: bindingScopeValues.Singleton,
    autobind: true
});
container.bind<HttpClient>(HttpClient).toConstantValue(axiosClient)
container.bind<Database>(Database).toConstantValue(drizzleDb)
container.loadSync(authModule, balanceModule, calendarModule, categoriesModule, expensesModule, goalsModule, incomeModule, profileModule, transactionsModule);
