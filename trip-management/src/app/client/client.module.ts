import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderModule } from './../header/header.module';
import { PaginatorModule } from './../paginator/paginator.module';
import { PageHeaderModule } from './../page-header/page-header.module';
import { ClientComponent } from './client.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { DumbClientComponent } from './dumb-client/dumb-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';

@NgModule({
  declarations: [ClientComponent, DumbClientComponent, EditClientComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    PageHeaderModule,
    PaginatorModule,
    HeaderModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class ClientModule {}
