import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { HttpClientModule } from '@angular/common/http';

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
      .then(m => m.DashboardPerComponent)
  },
  {
    path: 'dashboard-drc',
    loadComponent: () => import('./page/dashboard-drc/dashboard-drc.component')
      .then(m => m.DashboardDrcComponent)
  },
  {
    path: 'dashboard-drh',
    loadComponent: () => import('./page/dashboard-drh/dashboard-drh.component')
      .then(m => m.DashboardDrhComponent)
  },
  {
    path: 'dashboard-dfc',
    loadComponent: () => import('./page/dashboard-dfc/dashboard-dfc.component')
      .then(m => m.DashboardDfcComponent)
  },
 
];