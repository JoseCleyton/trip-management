import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LogoutComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [LogoutComponent],
})
export class LogoutModule {}
