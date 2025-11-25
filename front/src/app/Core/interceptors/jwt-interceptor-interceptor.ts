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

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../Services/Auth/auth.service';

export const jwtInterceptorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // 🚨 En SSR NO tocar la request (no hay token, ni localStorage)
  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  // 🚀 En navegador sí usamos el token
  const token = authService.getToken();
  let authReq = req;

  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {

      // 🚨 En SSR NO navegar
      if (!isPlatformBrowser(platformId)) {
        return throwError(() => error);
      }

      if (error.status === 401) {
        authService.logout();
        router.navigateByUrl('/login');
      }

      return throwError(() => error);
    })
  );
};
