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
import { DeleteClientComponent } from './delete-client/delete-client.component';

@NgModule({
  declarations: [
    ClientComponent,
    DumbClientComponent,
    EditClientComponent,
    DeleteClientComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    PageHeaderModule,
    PaginatorModule,
    HeaderModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
})
export class ClientModule {}
