// Caso de uso mock para registro
export interface SignUpParams {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export class SignUpUseCase {
  async execute(params: SignUpParams): Promise<void> {
    // Simula validación y espera
    await new Promise((res) => setTimeout(res, 800));
    if (!params.name || !params.email || !params.password || !params.repeatPassword) {
      throw new Error('All fields are required');
    }
    if (params.password !== params.repeatPassword) {
      throw new Error('Passwords do not match');
    }
    if (!params.email.includes('@')) {
      throw new Error('Invalid email');
    }
    // Mock: éxito
    return;
  }
}
