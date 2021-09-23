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
          import('../church/church.module').then((m) => m.ChurchModule),
      },
      {
        path: 'customer-service',
        loadChildren: () =>
          import('../customer-service/customer-service.module').then((m) => m.CustomerServiceModule),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('../church/church.module').then((m) => m.ChurchModule),
      },
      // {
      //   path: 'technician',
      //   loadChildren: () =>
      //     import('../christians/customer-service.module').then(
      //       (m) => m.ChristiansModule
      //     ),
      // },
      // {
      //   path: 'cost-center',
      //   loadChildren: () =>
      //     import('../christians/customer-service.module').then(
      //       (m) => m.ChristiansModule
      //     ),
      // },
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
export class FeatureRoutingModule { }
