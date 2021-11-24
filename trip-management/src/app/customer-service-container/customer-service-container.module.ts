import { CustomerServiceContainerComponent } from './customer-service.component';
import { CustomerServiceComponent } from './customer-service/customer-service.component';
import { MatSelectModule } from '@angular/material/select';
import { EditCustomerServiceComponent } from './edit-customer-service/edit-customer-service.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { PaginatorModule } from '../paginator/paginator.module';
import { PageHeaderModule } from '../page-header/page-header.module';
import { HeaderModule } from '../header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CustomerServiceComponentRoutingModule } from './customer-service-container-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { DialogViewModule } from '../shared/components/ui/dialog-view/dialog-view.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskModule } from 'ngx-mask';
import { datePipeFormatPipe } from '../shared/pipes/datePipeTransform';
import { PipeModule } from '../shared/pipes/pipe.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DumbCustomerComponent } from './dumb-customer/dumb-customer.component';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CustomerServiceDetailsComponent } from './customer-service-details/customer-service-details.component';

@NgModule({
  declarations: [
    CustomerServiceComponent,
    CustomerServiceContainerComponent,
    DumbCustomerComponent,
    EditCustomerServiceComponent,
    CustomerServiceDetailsComponent
  ],
  imports: [
    CommonModule,
    CustomerServiceComponentRoutingModule,
    PaginatorModule,
    HeaderModule,
    PageHeaderModule,
    MatMenuModule,
    MatDialogModule,
    MatIconModule,
    DialogViewModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgxMaskModule.forRoot(),
    PipeModule,
    MatCheckboxModule,
    PageHeaderModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressBarModule,
  ],
  exports: [CustomerServiceContainerComponent],
  providers: [datePipeFormatPipe, DatePipe],
})
export class CustomerServiceContainerModule {}
