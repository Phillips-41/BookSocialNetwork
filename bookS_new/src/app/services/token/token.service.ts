import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  set token(token:string){
    console.log('Setting token:', token);
    localStorage.setItem('token',token);
  }
  get token(): string | null {
    return localStorage.getItem('token');
  }

  isTokenNotValid(): boolean {
    return !this.isTokenValid();
  }

  private isTokenValid() {
    const token = this.token;
    if (!token) {
      return false;
    }
    const jwtHelper = new JwtHelperService();
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }
}
