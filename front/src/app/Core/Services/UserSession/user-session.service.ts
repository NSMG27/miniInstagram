import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserSessionService {

  private platformId = inject(PLATFORM_ID);
  private _username: string | null = null;

  set username(value: string | null) {
    this._username = value;

    if (!isPlatformBrowser(this.platformId)) return;

    if (value === null) {
      localStorage.removeItem('username');
    } else {
      localStorage.setItem('username', value);
    }
  }

  get username(): string | null {
    // Si ya está en memoria → usa la versión rápida
    if (this._username) return this._username;

    // 🚫 Si NO estamos en navegador → no intentes leer localStorage
    if (!isPlatformBrowser(this.platformId)) return null;

    const saved = localStorage.getItem('username');
    this._username = saved && saved !== '' ? saved : null;
    return this._username;
  }

  clearSession() {
    this._username = null;

    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.removeItem('username');
  }
}
