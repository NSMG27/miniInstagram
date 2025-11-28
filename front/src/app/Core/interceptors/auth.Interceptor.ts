import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserSessionService } from '../Services/UserSession/user-session.service';
import { ErrorHandlerService } from '../Services/ErrorHandler/error-handler.service';
import { JwtHelperService } from '../Services/JwtHelperService/jwt-helper-service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {

  const userSession = inject(UserSessionService);
  const errorHandler = inject(ErrorHandlerService);
  const jwtHelper = inject(JwtHelperService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  const isBrowser = isPlatformBrowser(platformId);

  // SSR → no interceptar
  if (!isBrowser) {
    return next(req);
  }

  // No agregar token ni validar en login
  const isLoginEndpoint = req.url.includes('/login');
  const isRegisterEndpoint = req.url.includes('/register');

  let modifiedReq = req;

  if (!isLoginEndpoint && !isRegisterEndpoint) {
    const token = userSession.token;

    if (token && jwtHelper.isTokenExpired(token)) {
      console.warn('⚠ Token expirado — cerrando sesión.');

      userSession.clearSession();
      router.navigateByUrl('/login');

      // Interrumpe la request con un 401 manual
      throw new HttpErrorResponse({
        status: 401,
        statusText: 'Token expired'
      });
    }

    // ===================================================
    // Agregar token si está vigente
    // ===================================================
    if (token) {
      modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {

      // Manejo de errores 401
      if (error.status === 401) {
        userSession.clearSession();
        router.navigateByUrl('/login');
      }

      return errorHandler.handleError(error);
    })
  );
};
