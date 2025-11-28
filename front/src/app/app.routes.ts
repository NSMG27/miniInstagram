import { Routes } from '@angular/router';
import { authGuard } from './Core/Guards/Auth/auth-guard';

export const routes: Routes = [
    {
        path: '', 
        loadChildren: () => import('./login/routes')
    },
    {
        path: 'login', 
        loadChildren: () => import('./login/routes')
    },
    {
        path: 'dashboard',
        title: 'Dashboard | Mini Instagram',
        loadChildren: () => import('./dashboard/routes'), 
        canActivate: [authGuard]
    },
    {
        path: 'register', 
        loadChildren: () => import('./register/routes')
    },
    {
        path: '**',
        loadComponent: () =>
            import('./page-not-found/page-not-found').then((m) => m.PageNotFound),
    }
];
