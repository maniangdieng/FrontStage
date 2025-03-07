import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { RoleGuard } from './guards/role.guard'; // Import du guard

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Route par défaut
  { path: 'home', component: HomeComponent }, // Route pour /home
  {
    path: 'authentification',
    loadComponent: () => import('./page/authentification/authentification.component')
      .then(m => m.AuthentificationComponent)
  },
  {
    path: 'dashboard-per',
    loadComponent: () => import('./page/dashboard-per/dashboard-per.component')
      .then(m => m.DashboardPerComponent),
    canActivate: [RoleGuard] // Protection avec RoleGuard
  },
  {
    path: 'dashboard-drc',
    loadComponent: () => import('./page/dashboard-drc/dashboard-drc.component')
      .then(m => m.DashboardDrcComponent),
    canActivate: [RoleGuard] // Protection avec RoleGuard
  },
  {
    path: 'dashboard-drh',
    loadComponent: () => import('./page/dashboard-drh/dashboard-drh.component')
      .then(m => m.DashboardDrhComponent),
    canActivate: [RoleGuard] // Protection avec RoleGuard
  },
  {
    path: 'dashboard-dfc',
    loadComponent: () => import('./page/dashboard-dfc/dashboard-dfc.component')
      .then(m => m.DashboardDfcComponent),
    canActivate: [RoleGuard] // Protection avec RoleGuard
  },
  {
    path: 'unauthorized', // Page en cas d'accès refusé
    loadComponent: () => import('./page/unauthorized/unauthorized.component')
      .then(m => m.UnauthorizedComponent)
  }
];
