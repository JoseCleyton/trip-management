import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state';

export const selectTithing = (state: AppState) => state.fromTithing;

export const selectTotal = createSelector(
  selectTithing,
  (state) => state.total
);

export const selectTithings = createSelector(
  selectTithing,
  (state) => state.tithings
);

export const selectPageInfo = createSelector(
  selectTithing,
  (state) => state.pageInfo
);