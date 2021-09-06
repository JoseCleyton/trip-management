import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { LoginService } from 'src/app/shared/service/login/login.service';
import * as actions from './login.actions';
@Injectable()
export class LoginEffects {
  constructor(private actions$: Actions, private loginService: LoginService) {}

  @Effect()
  login = this.actions$.pipe(
    ofType<actions.Login>(actions.LoginActionsTypes.LOGIN),
    switchMap((action) =>
      this.loginService.authenticate(action.payload).pipe(
        map((response) => {
          return new actions.LoginSuccess(response);
        })
      )
    )
  );
}
