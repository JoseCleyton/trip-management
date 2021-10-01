import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DeleteComponent } from './delete.component';

@NgModule({
  declarations: [DeleteComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [DeleteComponent],
})
export class DeleteModule {}
