import { PaginatorModule } from './../paginator/paginator.module';
import { PageHeaderModule } from './../page-header/page-header.module';
import { HeaderModule } from './../header/header.module';
import { MatCardModule } from '@angular/material/card';
import { ChurchComponent } from './church.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChurchRoutingModule } from './church-routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { DialogViewModule } from '../shared/components/ui/dialog-view/dialog-view.module';
import { AddChurchComponent } from './add-church/add-church.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DeleteChurchComponent } from './delete-church/delete-church.component';
import { EditChurchComponent } from './edit-church/edit-church.component';
import { NgxMaskModule } from 'ngx-mask';
import { ChangePasswordModule } from '../shared/components/ui/change-password/change-password.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { RulePasswordComponent } from '../shared/components/ui/rule-password/rule-password.component';
@NgModule({
  declarations: [
    ChurchComponent,
    AddChurchComponent,
    DeleteChurchComponent,
    EditChurchComponent,
    RulePasswordComponent
  ],
  imports: [
    CommonModule,
    ChurchRoutingModule,
    MatCardModule,
    HeaderModule,
    PageHeaderModule,
    PaginatorModule,
    MatMenuModule,
    MatIconModule,
    DialogViewModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    NgxMaskModule.forRoot(),
    PageHeaderModule,
    ChangePasswordModule,
    MatBottomSheetModule,
    MatIconModule
  ],
})
export class ChurchModule {}
