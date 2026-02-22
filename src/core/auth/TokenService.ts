import { makeAutoObservable } from 'mobx';

export interface ITokenService {
  getToken(): Promise<string | null>;
  setToken(token: string): Promise<void>;
  removeToken(): Promise<void>;
}

export class TokenService implements ITokenService {
  private _token: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async getToken(): Promise<string | null> {
    return this._token;
  }

  async setToken(token: string): Promise<void> {
    this._token = token;
  }

  async removeToken(): Promise<void> {
    this._token = null;
  }
}
