export abstract class AppError extends Error {
  constructor(public message: string, public code?: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class AuthError extends AppError {}

export class NetworkError extends AppError {
  constructor(message: string = 'Network error, please try again later') {
    super(message, 'NETWORK_ERROR');
  }
}

export class UnknownError extends AppError {
  constructor(message: string = 'An unknown error occurred') {
    super(message, 'UNKNOWN_ERROR');
  }
}
