import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./edit-profile').then((m) => m.EditProfile),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../Components/edit-profile/edit-profile')
            .then(m => m.EditProfile)
            .catch(err => {
              console.error('Error loading Feed', err);
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