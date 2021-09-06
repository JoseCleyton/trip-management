import { Action } from '@ngrx/store';

export enum LoginActionsTypes {
  LOGIN = '[Login] Login',
  LOGIN_SUCCESS = '[Login] Login Success',
  LOGIN_ERROR = '[Login] Login Error',

  LOGOUT = '[Login] Logout',
}

export class Login implements Action {
  readonly type = LoginActionsTypes.LOGIN;
  constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
  readonly type = LoginActionsTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = LoginActionsTypes.LOGOUT;
  constructor() {}
}

export type LoginActions = Login | LoginSuccess | Logout;
