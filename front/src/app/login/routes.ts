import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./login').then((m) => m.Login),
    title: 'Inicio de sesión | ',
  },
] as Routes;