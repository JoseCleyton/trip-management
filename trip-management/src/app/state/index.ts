import { ActionReducerMap } from '@ngrx/store';
import * as login from './login';
import * as alert from './alert';
import * as church from './church';
import * as user from './user';
import * as customerService from './customer-service';
import * as fromTithing from './tithing';
import * as christian from './christian';
export interface AppState {
  login: login.reducer.LoginState;
  alert: alert.reducer.AlertState;
  church: church.reducer.ChurchState;
  user: user.reducer.UserState;
  fromTithing: fromTithing.reducer.TithingState;
  customerService: customerService.reducer.CustomerServiceState;
  christian: christian.reducer.ChristianState;
}

export const reducers: ActionReducerMap<AppState> = {
  login: login.reducer.loginReducer,
  alert: alert.reducer.alertReducer,
  church: church.reducer.churchReducer,
  user: user.reducer.userReducer,
  fromTithing: fromTithing.reducer.tithingReducer,
  customerService: customerService.reducer.customerServiceReducer,
  christian: christian.reducer.christianReducer,
};

export const effects: Array<any> = [
  login.effects,
  alert.effects,
  church.effects,
  user.effects,
  fromTithing.effects,
  customerService.effects,
  christian.effects,
];

export const initialState = {
  login: login.reducer.initialState,
  alert: alert.reducer.initialState,
  church: church.reducer.initialState,
  user: user.reducer.initialState,
  fromTithing: fromTithing.reducer.initialState,
  customerService: customerService.reducer.initialState,
  christian: christian.reducer.initialState,
};
