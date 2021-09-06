import { ActionReducerMap } from '@ngrx/store';
import * as login from './login';
import * as alert from './alert';
import * as church from './church';
import * as christian from './christian';
import * as fromTithing from './tithing'
export interface AppState {
  login: login.reducer.LoginState;
  alert: alert.reducer.AlertState;
  church: church.reducer.ChurchState;
  christian: christian.reducer.ChristianState;
  fromTithing: fromTithing.reducer.TithingState
}

export const reducers: ActionReducerMap<AppState> = {
  login: login.reducer.loginReducer,
  alert: alert.reducer.alertReducer,
  church: church.reducer.churchReducer,
  christian: christian.reducer.christianReducer,
  fromTithing: fromTithing.reducer.tithingReducer
};

export const effects: Array<any> = [
  login.effects,
  alert.effects,
  church.effects,
  christian.effects,
  fromTithing.effects
];

export const initialState = {
  login: login.reducer.initialState,
  alert: alert.reducer.initialState,
  church: church.reducer.initialState,
  christian: christian.reducer.initialState,
  fromTithing: fromTithing.reducer.initialState
};
