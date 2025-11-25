import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./register').then((m) => m.Register),
      title: 'Registro | Mini Instagram',
  },
] as Routes;