import { MenuComponent } from './../menu/menu.component';
import { FeatureComponent } from './feature.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { LogoutModule } from '../shared/components/ui/logout/logout.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuUpComponent } from '../menu/menu-up/menu-up.component';

@NgModule({
  declarations: [FeatureComponent, MenuComponent, MenuUpComponent],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    MatDialogModule,
    LogoutModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
  ],
})
export class FeatureModule {}
