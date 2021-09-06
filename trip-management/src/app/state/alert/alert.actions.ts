import { Action } from '@ngrx/store';

export enum AlertActionsTypes {
  ADD_ALERT = '[Alert] Add Alert',
  ADD_ALERT_SUCCESS = '[Alert] Add Alert Success',
  RESET_ALERT = '[ALERT] Reset Alert',
  REMOVE_ALERT = '[Alert] Remove Alert',
}

export class AddAlert implements Action {
  readonly type = AlertActionsTypes.ADD_ALERT;
  constructor(public payload: any) {}
}
export class AddAlertSuccess implements Action {
  readonly type = AlertActionsTypes.ADD_ALERT_SUCCESS;
  constructor(public payload: any) {}
}
export class ResetAlert implements Action {
  readonly type = AlertActionsTypes.RESET_ALERT;
  constructor() {}
}
export class RemoveAlert implements Action {
  readonly type = AlertActionsTypes.REMOVE_ALERT;
  constructor(public id: number) {}
}

export type AlertActions =
  | ResetAlert
  | AddAlert
  | AddAlertSuccess
  | RemoveAlert;
