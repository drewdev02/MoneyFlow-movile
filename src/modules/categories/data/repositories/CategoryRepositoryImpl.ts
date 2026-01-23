import { injectable } from 'inversify';
import { Category } from '../../domain/models/Category';
import { CategoryRepository } from '../../domain/repositories/CategoryRepository';

@injectable()
export class CategoryRepositoryImpl extends CategoryRepository {
  async getCategories(): Promise<Category[]> {
    return [
      { id: '1', name: 'Supermarket', icon: 'cart', color: '#FF5722' },
      { id: '2', name: 'Clothing', icon: 'shirt', color: '#4D81F7' },
      { id: '3', name: 'House', icon: 'home', color: '#9BA1A6' },
      { id: '4', name: 'Entertainment', icon: 'umbrella', color: '#E91E63' },
      { id: '5', name: 'Transport', icon: 'car', color: '#2196F3' },
      { id: '6', name: 'Gifts', icon: 'gift', color: '#FF7043' },
      { id: '7', name: 'Travel', icon: 'airplane', color: '#5C6BC0' },
      { id: '8', name: 'Education', icon: 'school', color: '#4CAF50' },
      { id: '9', name: 'Food', icon: 'apple', color: '#F44336' },
      { id: '10', name: 'Work', icon: 'briefcase', color: '#9C27B0' },
      { id: '11', name: 'Electronics', icon: 'flash', color: '#FF9800' },
      { id: '12', name: 'Sport', icon: 'fitness', color: '#8BC34A' },
      { id: '13', name: 'Restaurant', icon: 'restaurant', color: '#FF5252' },
      { id: '14', name: 'Health', icon: 'heart-pulse', color: '#4DB6AC' },
      { id: '15', name: 'Communications', icon: 'tv', color: '#FFB74D' },
    ];
  }
}
