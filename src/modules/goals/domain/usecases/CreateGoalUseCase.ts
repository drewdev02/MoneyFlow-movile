import { Goal } from '../models/Goal';
import { GoalRepository } from '../repositories/GoalRepository';

export class CreateGoalUseCase {
  constructor(private goalRepository: GoalRepository) {}

  async execute(goal: Omit<Goal, 'id'>): Promise<void> {
    return this.goalRepository.createGoal(goal);
  }
}
