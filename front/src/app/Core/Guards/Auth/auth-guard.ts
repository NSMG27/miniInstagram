import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { UserSessionService } from '../../Services/UserSession/user-session.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userSession = inject(UserSessionService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // 🌐 SSR → siempre permitir (no existe localStorage aquí)
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  // 🔐 Validar solo si hay token (expiración la valida el interceptor)
  const token = userSession.token;

  if (!token) {
    return router.createUrlTree(
      ['/login'],
      { queryParams: { returnUrl: state.url } }
    );
  }

  return true;
};
