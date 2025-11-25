import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtHelperService {
  decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }

  getTokenExpiration(token: string): number {
    const decoded = this.decodeToken(token);
    return decoded?.exp ? decoded.exp * 1000 : 0;
  }

  isTokenExpired(token: string): boolean {
    return Date.now() > this.getTokenExpiration(token);
  }
}
