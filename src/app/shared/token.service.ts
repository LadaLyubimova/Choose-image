import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token!:string;
  constructor() { }

  getToken() {
    if (this.token) {
      return this.token;
    }
    else throw new Error("Token not set");
  }

  setToken(token: string) {
    this.token = token;
  }
}

