import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { JwtHelperService } from '../JwtHelperService/jwt-helper-service';

@Injectable({
  providedIn: 'root',
})
export class UserSessionService {

  private platformId = inject(PLATFORM_ID);
  private jwtHelper = inject(JwtHelperService);

  private _username: string | null = null;
  private _token: string | null = null;

  // ============================================================
  // TOKEN
  // ============================================================
  set token(value: string | null) {
    this._token = value;

    if (!isPlatformBrowser(this.platformId)) return;

    if (value === null) {
      localStorage.removeItem('token');
    } else {
      localStorage.setItem('token', value);
    }
  }

  get token(): string | null {
    if (this._token) return this._token;
    if (!isPlatformBrowser(this.platformId)) return null;

    const saved = localStorage.getItem('token');
    this._token = saved && saved !== '' ? saved : null;
    return this._token;
  }

   // ============================================================
  // 🔥 USER INFO DECODIFICADA DESDE EL TOKEN
  // ============================================================
  get userInfo(): any | null {
    const token = this.token;
    if (!token) return null;

    const decoded = this.jwtHelper.decodeToken(token);
    return decoded ?? null;
  }

  get Id(): string | null {
    return this.userInfo?.sub ?? null;
  }

  get email(): string | null {
    return this.userInfo?.email ?? null;
  }

  get role(): string | null {
    return this.userInfo?.role ?? null;
  }

  get fullUser(): any | null {
    return this.userInfo;
  }

  get username(): string | null {
    return this.userInfo?.username ?? null;
  }

  // ============================================================
  // CLEAR SESSION
  // ============================================================
  clearSession() {
    this._token = null;

    if (!isPlatformBrowser(this.platformId)) return;

    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}
