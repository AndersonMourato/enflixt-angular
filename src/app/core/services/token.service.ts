import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private KEY: string = "key"

  constructor() { }

  setToken(token: string) {
    sessionStorage.setItem(this.KEY, token)
  }

  getToken(): string {
    return sessionStorage.getItem(this.KEY) ?? ""
  }

  isToken(): boolean {
    return !!sessionStorage.getItem(this.KEY);
  }

  cleanToken() {
    sessionStorage.removeItem(this.KEY)
  }
}
