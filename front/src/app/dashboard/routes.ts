import { Routes } from '@angular/router';
import { authGuard } from '../Core/Guards/Auth/auth-guard';
import { sessionGuard } from '../Core/Guards/Session/session-guard';
import { profileResolver } from '../Core/Resolver/Profile/profile-resolver';

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
        canActivate: [], // authGuard, sessionGuard
        resolve: {
          //profileData: profileResolver
        },
        loadChildren: () => import('../profile/routes')
      },

      /*{
        path: 'busqueda',
        loadComponent: () =>
          import('../Components/busqueda/busqueda')
            .then(m => m.Busqueda)
            .catch(err => {
              console.error('Error loading Busqueda', err);
              return null;
            }),
      },

      {
        path: 'explorar',
        loadComponent: () =>
          import('../Components/explorar/explorar')
            .then(m => m.Explorar)
            .catch(err => {
              console.error('Error loading Explorar', err);
              return null;
            }),
      },

      {
        path: 'reels',
        loadComponent: () =>
          import('../Components/reels/reels')
            .then(m => m.Reels)
            .catch(err => {
              console.error('Error loading Reels', err);
              return null;
            }),
      },

      {
        path: 'mensajes',
        loadComponent: () =>
          import('../Components/mensajes/mensajes')
            .then(m => m.Mensajes)
            .catch(err => {
              console.error('Error loading Mensajes', err);
              return null;
            }),
      },

      {
        path: 'notificaciones',
        loadComponent: () =>
          import('../Components/notificaciones/notificaciones')
            .then(m => m.Notificaciones)
            .catch(err => {
              console.error('Error loading Notificaciones', err);
              return null;
            }),
      },

      {
        path: 'crear',
        loadComponent: () =>
          import('../Components/crear/crear')
            .then(m => m.Crear)
            .catch(err => {
              console.error('Error loading Crear', err);
              return null;
            }),
      },*/

      

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