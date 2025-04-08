import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';




export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },


  
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  

  
  { path: 'dashboard', component: DashboardComponent },

  
  { path: 'events', loadChildren: () => import('./event/event.module').then(m => m.EventModule) },
];

  