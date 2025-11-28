import { Routes } from '@angular/router';
import { authGuard } from '../Core/Guards/Auth/auth-guard';
import { sessionGuard } from '../Core/Guards/Session/session-guard';
import { postIdGuard } from '../Core/Guards/PostId/post-id-guard';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard').then((m) => m.Dashboard),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../Components/feed/feed')
            .then(m => m.Feed)
            .catch(err => {
              console.error('Error loading Feed', err);
              return null;
            }),
      },
      {
        path: 'inicio',
        loadComponent: () =>
          import('../Components/feed/feed')
            .then(m => m.Feed)
            .catch(err => {
              console.error('Error loading Feed', err);
              return null;
            }),
      },
      {
        path: ':username',
        canActivate: [sessionGuard, postIdGuard],
        loadChildren: () => import('../profile/routes')
      },
      // 404 interno del dashboard
      {
        path: '**',
        loadComponent: () =>
          import('../page-not-found/page-not-found')
            .then(m => m.PageNotFound)
            .catch(err => {
              console.error('Error loading page-not-found', err);
              return null;
            }),
      }
    ],
  },
] as Routes;