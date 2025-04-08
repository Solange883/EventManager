import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardRoutes } from './dashboard.routes';
import { DashboardComponent } from './dashboard/dashboard.component';



// dashboard.module.ts
@NgModule({
  imports: [
    DashboardComponent,
    CommonModule,
    RouterModule.forChild(DashboardRoutes)
  ],
})

export class DashboardModule { }
