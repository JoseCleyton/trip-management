import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state';

export const selectUser = (state: AppState) => state.user;

export const selectUsers = createSelector(selectUser, (state) => state.users);

export const selectSelectedUser = createSelector(
  selectUser,
  (state) => state.selectedUser
);

export const selectQuantityUsers = createSelector(
  selectUser,
  (state) => state.quantityUsers
);

export const selectPageable = createSelector(
  selectUser,
  (state) => state.pageable
);
export const selectPageInfo = createSelector(
  selectUser,
  (state) => state.pageInfo
);
export const selectFilters = createSelector(
  selectUser,
  (state) => state.filters
);
