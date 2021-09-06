import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state';

export const selectChurch = (state: AppState) => state.church;

export const selectQuantity = createSelector(
  selectChurch,
  (state) => state.quantity
);

export const selectChurchs = createSelector(
  selectChurch,
  (state) => state.churchs
);

export const selectSelectedChurch = createSelector(
  selectChurch,
  (state) => state.selectedChurch
);

export const selectPageable = createSelector(
  selectChurch,
  (state) => state.pageable
);

export const selectPageInfo = createSelector(
  selectChurch,
  (state) => state.pageInfo
);

export const selectFilters = createSelector(
  selectChurch,
  (state) => state.filters
);
