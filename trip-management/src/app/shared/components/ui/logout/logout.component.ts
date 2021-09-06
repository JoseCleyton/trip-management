import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/shared/service/login/login.service';
import { AppState } from 'src/app/state';
import * as fromLogin from '../../../../state/login';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit, OnDestroy {
  public subscription: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<LogoutComponent>,
    private store$: Store<AppState>,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  public logout() {
    this.closeDialog();
    this.loginService.logout();
    this.store$.dispatch(new fromLogin.actions.Logout());
  }
}
