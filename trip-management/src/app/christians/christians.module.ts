import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { PaginatorModule } from './../paginator/paginator.module';
import { PageHeaderModule } from './../page-header/page-header.module';
import { HeaderModule } from './../header/header.module';
import { ChristiansComponent } from './christians.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ChristiansRoutingModule } from './christians-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { DialogViewModule } from '../shared/components/ui/dialog-view/dialog-view.module';
import { PayTithingComponent } from './pay-tithing/pay-tithing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AddChristianComponent } from './add-christian/add-christian.component';
import { NgxMaskModule } from 'ngx-mask';
import { EditChristianComponent } from './edit-christian/edit-christian.component';
import { DeleteChristianComponent } from './delete-christian/delete-christian.component';
import { datePipeFormatPipe } from '../shared/pipes/datePipeTransform';
import { PipeModule } from '../shared/pipes/pipe.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
  declarations: [
    ChristiansComponent,
    PayTithingComponent,
    AddChristianComponent,
    EditChristianComponent,
    DeleteChristianComponent,
  ],
  imports: [
    CommonModule,
    ChristiansRoutingModule,
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
  ],
  exports: [ChristiansComponent],
  providers: [datePipeFormatPipe, DatePipe],
})
export class ChristiansModule {}
