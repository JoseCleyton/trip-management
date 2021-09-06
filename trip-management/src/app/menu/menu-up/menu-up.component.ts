import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChangePasswordComponent } from 'src/app/shared/components/ui/change-password/change-password.component';
import { LogoutComponent } from 'src/app/shared/components/ui/logout/logout.component';

@Component({
  selector: 'app-menu-up',
  templateUrl: './menu-up.component.html',
  styleUrls: ['./menu-up.component.scss']
})
export class MenuUpComponent implements OnInit {
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
