import { Goal } from '../models/Goal';
import { GoalRepository } from '../repositories/GoalRepository';

export class GetGoalsUseCase {
  constructor(private goalRepository: GoalRepository) {}

  async execute(): Promise<Goal[]> {
    return this.goalRepository.getGoals();
  }
}
