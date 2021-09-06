import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state';

export const selectAlert = (state: AppState) => state.alert;

export const selectAlerts = createSelector(
  selectAlert,
  (state) => state.alerts
);
