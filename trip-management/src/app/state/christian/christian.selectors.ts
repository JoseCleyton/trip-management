import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state';

export const selectChristian = (state: AppState) => state.christian;

export const selectChristians = createSelector(
  selectChristian,
  (state) => state.christians
);

export const selectSelectedChristian = createSelector(
  selectChristian,
  (state) => state.selectedChristian
);

export const selectQuantityChristians = createSelector(
  selectChristian,
  (state) => state.quantityChristians
);

export const selectPageable = createSelector(
  selectChristian,
  (state) => state.pageable
);
export const selectPageInfo = createSelector(
  selectChristian,
  (state) => state.pageInfo
);
export const selectFilters = createSelector(
  selectChristian,
  (state) => state.filters
);
