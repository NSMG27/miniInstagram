import { Routes } from '@angular/router';
import { authGuard } from './Core/Guards/Auth/auth-guard';

export const routes: Routes = [
     /*{
            path: '',
            loadComponent: () => import('./index/index.component').then((m) => m.IndexComponent)
        },*/
        {
            path: 'login', 
            loadChildren: () => import('./login/routes')
        },
        {
            path: 'dashboard',
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
        },
];
