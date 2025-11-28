// post-id.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export const postIdGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const postId = route.paramMap.get('post');
  
  // Validar formato de ID (ejemplo: solo alfanuméricos, guiones y guiones bajos)
  const isValidId = postId && /^[a-zA-Z0-9-_]+$/.test(postId);
  
  if (!isValidId) {
    // Navega a la ruta 404 específica
    router.parseUrl('/dashboard/404-not-found');
    return false;
  }
  
  return true;
};