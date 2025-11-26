import { ResolveFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { ProfileService } from '../../Services/Profile/profile.service';
import { UserSessionService } from '../../Services/UserSession/user-session.service';
import { catchError, of } from 'rxjs';
import { ProfileData } from '../../../interfaces/profile.interface';

export const profileResolver: ResolveFn<ProfileData | null | UrlTree> =
  (route, state) => {

    const username = inject(UserSessionService).username;
    const profileService = inject(ProfileService);
    const router = inject(Router);

    if (!username) {
      return router.createUrlTree(['/login']);
    }

    return profileService.getProfile(username).pipe(
      catchError(() => of(router.createUrlTree(['/login'])))
    );
  };
