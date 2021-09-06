import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LogoutComponent } from '../shared/components/ui/logout/logout.component';
import { ChangePasswordComponent } from '../shared/components/ui/change-password/change-password.component';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  public url = '';
  public isAdmin = false;

  public subscription: Subscription = new Subscription();
  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('isAdmin') === 'A' ? true : false;
    this.url = this.router.url;
    this.subscribeToUrl();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private subscribeToUrl() {
    this.subscription.add(
      this.router.events.subscribe((url: any) => (this.url = url.url))
    );
  }

  public logout() {
    this.dialog.open(LogoutComponent);
  }

  public changePassword() {
    this.dialog.open(ChangePasswordComponent, {
      width: '600px',
      data: {
        type: 'admin',
      },
    });
  }
}
