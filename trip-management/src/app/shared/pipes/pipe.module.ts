import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PhoneCustomPipe } from './phone-custom.pipe';
@NgModule({
  declarations: [PhoneCustomPipe],
  imports: [CommonModule],
  exports: [PhoneCustomPipe],
})
export class PipeModule {}