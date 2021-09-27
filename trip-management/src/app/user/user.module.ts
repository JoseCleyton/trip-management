import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderModule } from './../header/header.module';
import { PaginatorModule } from './../paginator/paginator.module';
import { PageHeaderModule } from './../page-header/page-header.module';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DumbUserComponent } from './dumb-user/dumb-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DialogViewModule } from '../shared/components/ui/dialog-view/dialog-view.module';
import { NgxMaskModule } from 'ngx-mask';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    UserComponent,
    DumbUserComponent,
    EditUserComponent,
    DeleteUserComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatCardModule,
    HeaderModule,
    PaginatorModule,
    MatMenuModule,
    DialogViewModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    NgxMaskModule.forRoot(),
    PageHeaderModule,
    MatBottomSheetModule,
    MatIconModule,
    MatSelectModule,
  ],
})
export class UserModule {}
