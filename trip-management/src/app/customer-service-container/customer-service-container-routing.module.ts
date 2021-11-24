import { CustomerServiceDetailsComponent } from './customer-service-details/customer-service-details.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerServiceContainerComponent } from './customer-service.component';
import { CustomerServiceComponent } from './customer-service/customer-service.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerServiceContainerComponent,
    children: [
      { path: '', component: CustomerServiceComponent },
      { path: 'details', component: CustomerServiceDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerServiceComponentRoutingModule {}
