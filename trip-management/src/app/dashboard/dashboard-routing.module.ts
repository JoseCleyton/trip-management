import { DashboardAdmComponent } from './adm/dashboard-adm/dashboard-adm.component';
import { DashboardTechnicianComponent } from './technician/dashboard-technician/dashboard-technician.component';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'technician', component: DashboardTechnicianComponent },
      { path: 'adm', component: DashboardAdmComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
