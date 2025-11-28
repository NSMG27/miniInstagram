import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./profile').then((m) => m.Profile),
    children: [
      {
        path: '',
        loadChildren: () => import('../../app/Components/profile/routes')
      },
      {
        path: 'edit',
        loadChildren: () => import('../edit-profile/routes')
      },
      {
        path: './archive/stories',
        loadComponent: () =>
          import('../profile/profile')
            .then(m => m.Profile)
            .catch(err => {
              console.error('Error loading Perfil', err);
              return null;
            }),
      },
      // 404 interno del dashboard
      {
        path: './**',
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