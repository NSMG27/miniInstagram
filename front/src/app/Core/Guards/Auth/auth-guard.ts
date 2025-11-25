import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/Auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // 🚀 En SSR NO bloqueamos, dejamos continuar
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  // 🚀 En navegador SÍ verificamos token
  if (!authService.isAuthenticated()) {
    return router.createUrlTree(
      ['/login'],
      { queryParams: { returnUrl: state.url } }
    );
  }

  return true;
};
