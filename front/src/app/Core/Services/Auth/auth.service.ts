import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Auth, LoginResponse } from '../../../interfaces/auth.interface';
import { UserSessionService } from '../UserSession/user-session.service';
import { ErrorHandlerService } from '../ErrorHandler/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private userSessionService = inject(UserSessionService);
  private errorHandler = inject(ErrorHandlerService);

  private readonly loginUrl = environment.apiUrl + '/login';

  /**
   * Login con manejo de errores centralizado
   */
  login(credentials: Auth): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(this.loginUrl, credentials).pipe(
      map(response => {

        if (isPlatformBrowser(this.platformId)) {
          // Guardar token JWT
          this.userSessionService.token = response.data.token;
        }

        return response;
      }),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  getToken(): string | null {
    return this.userSessionService.token;
  }

  isAuthenticated(): boolean {
    return !!this.userSessionService.token;
  }

  logout(): void {
    this.userSessionService.clearSession();
  }
}
