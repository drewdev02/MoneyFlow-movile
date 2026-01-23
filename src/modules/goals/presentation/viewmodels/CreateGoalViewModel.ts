import { router } from 'expo-router';
import { makeAutoObservable } from 'mobx';
import { CreateGoalUseCase } from '../../domain/usecases/CreateGoalUseCase';

export class CreateGoalViewModel {
  name = '';
  notes = '';
  category = 'Supermarket'; // Default as seen in image
  icon = 'cart-outline'; // Default
  color = '#FF8C00'; // Default
  targetAmount = '';
  accumulatedAmount = '';
  addProgress = false;
  date = new Date();
  imageUrl = '';
  
  loading = false;

  constructor(private createGoalUseCase: CreateGoalUseCase) {
    makeAutoObservable(this);
  }

  setName(value: string) { this.name = value; }
  setNotes(value: string) { this.notes = value; }
  setCategory(value: string) { this.category = value; }
  setIcon(value: string) { this.icon = value; }
  setColor(value: string) { this.color = value; }
  setTargetAmount(value: string) { this.targetAmount = value; }
  setAccumulatedAmount(value: string) { this.accumulatedAmount = value; }
  setAddProgress(value: boolean) { this.addProgress = value; }
  setDate(value: Date) { this.date = value; }
  setImageUrl(value: string) { this.imageUrl = value; }

  async create() {
    if (!this.name || !this.targetAmount) return; // Basic validation

    this.loading = true;
    try {
      await this.createGoalUseCase.execute({
        name: this.name,
        notes: this.notes,
        category: this.category,
        icon: this.icon,
        color: this.color,
        targetAmount: parseFloat(this.targetAmount),
        currentAmount: this.addProgress ? parseFloat(this.accumulatedAmount || '0') : 0,
        date: this.date.toISOString(),
        imageUrl: this.imageUrl
      });
      router.back();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }
}
