import { FeatureComponent } from './feature.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: FeatureComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'client',
        loadChildren: () =>
          import('../client/client.module').then((m) => m.ClientModule),
      },
      {
        path: 'customer-service',
        loadChildren: () =>
          import('../customer-service/customer-service.module').then(
            (m) => m.CustomerServiceModule
          ),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('../user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'technician',
        loadChildren: () =>
          import('../technician/technician.module').then(
            (m) => m.TechnicianModule
          ),
      },
      {
        path: 'cost-center',
        loadChildren: () =>
          import('../cost-center/cost-center.module').then(
            (m) => m.CostCenterModule
          ),
      },
      {
        path: 'report',
        loadChildren: () =>
          import('../report/report.module').then((m) => m.ReportModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}
