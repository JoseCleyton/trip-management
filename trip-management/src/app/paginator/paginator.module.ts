import { MatPaginationIntlService } from './service/matPaginationIntlService.service';
import { PaginatorComponent } from './paginator.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';

@NgModule({
  declarations: [PaginatorComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
  ],
  exports: [PaginatorComponent],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginationIntlService,
    },
  ]
})
export class PaginatorModule { }
