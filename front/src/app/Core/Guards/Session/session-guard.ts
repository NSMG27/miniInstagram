import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { UserSessionService } from '../../Services/UserSession/user-session.service';

export const sessionGuard: CanActivateFn = (route, state) => {
  const session = inject(UserSessionService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // 🚀 En SSR no se evalúa localStorage → dejar pasar
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const username = session.username;

  if (!username) {
    return router.createUrlTree(['/dashboard']);
  }

  return true;
};
