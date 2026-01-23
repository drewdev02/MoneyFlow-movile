import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { CreateIncomeUseCase } from '../../domain/usecases/CreateIncomeUseCase';

@injectable()
export class PlanIncomeViewModel {
  category = 'Salary';
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
  color = '#1E1F26';
  iconColor = '#4CAF50';
  isIncome = true;

  constructor(
    private createIncomeUseCase: CreateIncomeUseCase
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

  async createIncome() {
    this.loading = true;
    try {
      await this.createIncomeUseCase.execute({
        category: this.category,
        amount: parseFloat(this.amount) || 0,
        currency: this.currency,
        date: this.date,
        time: this.time,
        name: this.name,
        isPaid: this.isPaid,
        notes: this.notes,
        repeat: this.repeat,
        remind: this.remind,
        goalOrDebt: this.goalOrDebt,
      });
      return true;
    } catch (error) {
      console.error('Error creating income:', error);
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
