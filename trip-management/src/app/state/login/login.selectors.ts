import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state';

export const selectLogin = (state: AppState) => state.login;

export const selectCredentials = createSelector(
  selectLogin,
  (state) => state.credentials
);
