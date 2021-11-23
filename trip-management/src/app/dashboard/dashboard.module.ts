import { HeaderModule } from './../header/header.module';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatCardModule } from '@angular/material/card';
import { ChartsModule } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { DashboardTechnicianComponent } from './technician/dashboard-technician/dashboard-technician.component';
import { DashboardAdmComponent } from './adm/dashboard-adm/dashboard-adm.component';
import { DashboardAdmDumbComponent } from './adm/dashboard-adm-dumb/dashboard-adm-dumb.component';
import { DashboardTechDumbComponent } from './technician/dashboard-tech-dumb/dashboard-tech-dumb.component';

@NgModule({
  declarations: [DashboardComponent, DashboardTechnicianComponent, DashboardAdmComponent, DashboardAdmDumbComponent, DashboardTechDumbComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    ChartsModule,
    HeaderModule,
    MatIconModule,
  ],
})
export class DashboardModule {}
