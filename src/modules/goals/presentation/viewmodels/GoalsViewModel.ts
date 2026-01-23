import { makeAutoObservable, runInAction } from 'mobx';
import { Goal } from '../../domain/models/Goal';
import { GetGoalsUseCase } from '../../domain/usecases/GetGoalsUseCase';

export type GoalTab = 'GOALS' | 'BORROWED' | 'LENT';

export class GoalsViewModel {
  selectedTab: GoalTab = 'GOALS';
  goals: Goal[] = [];
  borrowedCount = 1;
  lentCount = 0;
  totalLeft = -25.0;
  fulfilledGoals = '0/1';
  loading = false;

  constructor(private getGoalsUseCase: GetGoalsUseCase) {
    makeAutoObservable(this);
    this.loadGoals();
  }

  setSelectedTab(tab: GoalTab) {
    this.selectedTab = tab;
  }

  async loadGoals() {
    this.loading = true;
    try {
      const result = await this.getGoalsUseCase.execute();
      runInAction(() => {
        this.goals = result;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.error('Failed to load goals', error);
    }
  }

  get actualValue() {
    return -50.00;
  }
}
