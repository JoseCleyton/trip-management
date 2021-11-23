import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { LoginFirebaseService } from 'src/app/shared/service/login/login-firebase';
import * as actions from './login.actions';
@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private loginServiceFirebase: LoginFirebaseService
  ) {}

  // @Effect()
  // login = this.actions$.pipe(
  //   ofType<actions.Login>(actions.LoginActionsTypes.LOGIN),
  //   switchMap((action) =>
  //     this.loginService.authenticate(action.payload).pipe(
  //       map((response) => {
  //         return new actions.LoginSuccess(response);
  //       })
  //     )
  //   )
  // );
  @Effect()
  loginWithFirebase$ = this.actions$.pipe(
    ofType<actions.Login>(actions.LoginActionsTypes.LOGIN),
    switchMap((action) =>
      this.loginServiceFirebase
        .signIn(action.payload.login, action.payload.password)
        .pipe(
          map((response) => {
            return new actions.LoginSuccess(response);
          })
        )
    )
  );

  // createLoginWithFirebase$ = this.actions$.pipe(
  //   ofType<actions.CreateLogin>(actions.LoginActionsTypes.CREATE_LOGIN),
  //   switchMap((action) =>
  //     this.loginServiceFirebase
  //       .signUp(action.payload.email, action.payload.password)
  //       .then((response) => {
  //         return new actions.CreateLoginSuccess(response);
  //       })
  //   )
  // );
}
