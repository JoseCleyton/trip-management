import { PaginatorModule } from './../paginator/paginator.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderModule } from './../header/header.module';
import { PageHeaderModule } from './../page-header/page-header.module';
import { TechnicianComponent } from './technician.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnicianRoutingModule } from './technician-routing.module';
import { DeleteTechnicianComponent } from './delete-technician/delete-technician.component';
import { DumbTechnicianComponent } from './dumb-technician/dumb-technician.component';
import { EditTechnicianComponent } from './edit-technician/edit-technician.component';

@NgModule({
  declarations: [
    TechnicianComponent,
    DumbTechnicianComponent,
    EditTechnicianComponent,
    DeleteTechnicianComponent,
  ],
  imports: [
    CommonModule,
    TechnicianRoutingModule,
    PageHeaderModule,
    HeaderModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    PaginatorModule,
  ],
})
export class TechnicianModule {}
