import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { DumbUserComponent } from './dumb-user/dumb-user.component';
import { PaginatorModule } from '../paginator/paginator.module';
import { HeaderModule } from '../header/header.module';
import { PageHeaderModule } from '../page-header/page-header.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogViewModule } from '../shared/components/ui/dialog-view/dialog-view.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskModule } from 'ngx-mask';
import { PipeModule } from '../shared/pipes/pipe.module';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    UserComponent,
    EditUserComponent,
    DeleteUserComponent,
    DumbUserComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CommonModule,
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
})
export class UserModule {}
