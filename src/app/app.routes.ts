import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { LoginComponent } from './features/login/login.component';
import { ROUTE_URL } from './core/constants/router.constant';
import { AppPublicLayout } from './layouts/public/public-layout';

export const routes: Routes = [
  {
    path: ROUTE_URL.LOGIN,
    component: AppPublicLayout,
    canActivate: [GuestGuard],
    children: [
      {
        path: '',
        component: LoginComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
