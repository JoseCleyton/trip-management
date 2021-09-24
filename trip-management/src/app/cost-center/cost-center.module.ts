import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CostCenterComponent } from './cost-center.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostCenterRoutingModule } from './cost-center-routing.module';
import { DumbCostCenterComponent } from './dumb-cost-center/dumb-cost-center.component';
import { EditCostCenterComponent } from './edit-cost-center/edit-cost-center.component';
import { DeleteCostCenterComponent } from './delete-cost-center/delete-cost-center.component';
import { PageHeaderModule } from '../page-header/page-header.module';
import { PaginatorModule } from '../paginator/paginator.module';
import { HeaderModule } from '../header/header.module';

@NgModule({
  declarations: [
    CostCenterComponent,
    DumbCostCenterComponent,
    EditCostCenterComponent,
    DeleteCostCenterComponent,
  ],
  imports: [
    CommonModule,
    CostCenterRoutingModule,
    PageHeaderModule,
    PaginatorModule,
    HeaderModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class CostCenterModule {}
