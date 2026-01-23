import { Goal } from '../../domain/models/Goal';
import { GoalRepository } from '../../domain/repositories/GoalRepository';

export class GoalRepositoryImpl extends GoalRepository {
  private goals: Goal[] = [
    {
      id: '1',
      name: 'Test',
      targetAmount: 50.0,
      currentAmount: 25.0,
      icon: 'desktop-outline',
      color: '#FF8C00', // Orange as seen in image
      category: 'Electronics',
      date: new Date().toISOString(),
    },
  ];

  async getGoals(): Promise<Goal[]> {
    return this.goals;
  }

  async getBorrowed(): Promise<Goal[]> {
    return [
        {
            id: '2',
            name: 'Borrowed Test',
            targetAmount: 100.0,
            currentAmount: 10.0,
            icon: 'cash-outline',
            color: '#4CAF50',
            category: 'Finance',
            date: new Date().toISOString(),
        }
    ];
  }

  async getLent(): Promise<Goal[]> {
    return [];
  }

  async createGoal(goal: Omit<Goal, 'id'>): Promise<void> {
    const newGoal: Goal = {
        ...goal,
        id: Math.random().toString(36).substr(2, 9),
    };
    this.goals.push(newGoal);
  }
}
