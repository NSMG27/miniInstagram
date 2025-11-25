import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Auth, LoginResponse } from '../../../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  private readonly loginUrl = environment.apiUrl + '/login';

  // ✔ Login seguro en SSR (no usa localStorage si no hay navegador)
  login(data: Auth): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, data).pipe(
      map(response => {

        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', response.data.token);
        }

        return response;
      }),
      catchError(err => throwError(() => err))
    );
  }

  // ✔ Token seguro incluso en SSR
  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return localStorage.getItem('token');
  }

  // ✔ isAuthenticated seguro también en SSR
  isAuthenticated(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    return !!localStorage.getItem('token');
  }

  // ✔ logout sin explotar en SSR
  logout(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    localStorage.removeItem('token');
  }
}
