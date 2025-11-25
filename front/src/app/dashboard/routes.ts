import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard').then((m) => m.Dashboard),
    title: 'Dashboard | Mini Instagram',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../Components/dashboard-index/dashboard-index').then(m => m.DashboardIndex).catch((err) => {
            console.error('Error loading DashboardIndexcomponent', err);
            return null;
          }),
      },
      {
        path: '**',
        loadComponent: () =>
          import('../page-not-found/page-not-found').then(
            (m) => m.PageNotFound
          ),
      }
    ],
  },
] as Routes;