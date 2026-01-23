import { User } from '../../domain/models/User';

export class AuthApi {
  async login(email: string, password: string): Promise<User> {
    // Mock API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (password === 'password') {
          resolve({
            id: '1',
            email,
            name: 'John Doe',
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  }

  async loginWithGoogle(): Promise<User> {
    // Mock Google login
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: '2',
          email: 'google-user@gmail.com',
          name: 'Google User',
          photoUrl: 'https://via.placeholder.com/150',
        });
      }, 1500);
    });
  }
}
