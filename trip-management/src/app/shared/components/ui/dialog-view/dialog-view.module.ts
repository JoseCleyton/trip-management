import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DialogViewComponent } from './dialog-view.component';
import { MatButtonModule } from '@angular/material/button';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';

@NgModule({
  declarations: [DialogViewComponent],
  imports: [CommonModule, MatButtonModule, PipeModule],
  exports: [DialogViewComponent],
  providers: [DatePipe],
})
export class DialogViewModule {}
