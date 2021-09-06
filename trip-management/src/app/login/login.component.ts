import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../state';
import * as fromLogin from '../state/login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public showPassword = false;

  public formLogin: FormGroup;
  public subscription: Subscription = new Subscription();

  constructor(private store$: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.createFormLogin();
    this.subscribeToToken();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private createFormLogin() {
    this.formLogin = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.min(1)]),
    });
  }

  public authenticate() {
    this.store$.dispatch(
      new fromLogin.actions.Login({
        login: this.formLogin.get('login').value,
        password: this.formLogin.get('password').value,
      })
    );
  }

  public subscribeToToken() {
    this.subscription.add(
      this.store$
        .pipe(select(fromLogin.selectors.selectCredentials))
        .subscribe((state) => {
          if (state) {
            localStorage.setItem('isAdmin', state.isAdmin === true ? 'A' : 'U');
            localStorage.setItem('login', state.login);
            localStorage.setItem('token', state.token);
            this.router.navigateByUrl('feature/dashboard');
          }
        })
    );
  }
}
