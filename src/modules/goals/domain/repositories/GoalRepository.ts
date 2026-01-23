import { Goal } from '../models/Goal';

export abstract class GoalRepository {
  abstract getGoals(): Promise<Goal[]>;
  abstract getBorrowed(): Promise<Goal[]>;
  abstract getLent(): Promise<Goal[]>;
}
