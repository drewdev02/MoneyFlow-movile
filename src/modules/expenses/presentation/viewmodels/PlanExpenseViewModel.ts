import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { CreateExpenseUseCase } from '../../domain/usecases/CreateExpenseUseCase';

@injectable()
export class PlanExpenseViewModel {
  category = 'Supermarket';
  amount = '';
  currency = 'USD';
  date = new Date();
  time = '';
  name = '';
  isPaid = true;
  loading = false;
  isMoreExpanded = false;

  notes = '';
  repeat = 'Does not repeat';
  remind = 'Don’t remind';
  goalOrDebt = '';
  color = '#2C2C2E';
  iconColor = '#FF5722';
  isIncome = false;

  constructor(
   private createExpenseUseCase: CreateExpenseUseCase
  ) {
    makeAutoObservable(this);
    const now = new Date();
    this.time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  }

  toggleMore() {
    this.isMoreExpanded = !this.isMoreExpanded;
  }

  setNotes(notes: string) {
    this.notes = notes;
  }

  setRepeat(repeat: string) {
    this.repeat = repeat;
  }

  setRemind(remind: string) {
    this.remind = remind;
  }

  setGoalOrDebt(goal: string) {
    this.goalOrDebt = goal;
  }

  setColor(color: string) {
    this.color = color;
  }

  setIconColor(color: string) {
    this.iconColor = color;
  }

  setIsIncome(isIncome: boolean) {
    this.isIncome = isIncome;
  }

  setCategory(category: string) {
    this.category = category;
  }

  setAmount(amount: string) {
    this.amount = amount;
  }

  setCurrency(currency: string) {
    this.currency = currency;
  }

  setDate(date: Date) {
    this.date = date;
  }

  setTime(time: string) {
    this.time = time;
  }

  setName(name: string) {
    this.name = name;
  }

  setIsPaid(isPaid: boolean) {
    this.isPaid = isPaid;
  }

  async createExpense() {
    this.loading = true;
    try {
      await this.createExpenseUseCase.execute({
        category: this.category,
        amount: parseFloat(this.amount) || 0,
        currency: this.currency,
        date: this.date,
        time: this.time,
        name: this.name,
        isPaid: this.isPaid,
      });
      // Navigation would be handled by the screen
      return true;
    } catch (error) {
      console.error('Error creating expense:', error);
      return false;
    } finally {
      this.loading = false;
    }
  }

  get formattedDate() {
    return this.date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}
