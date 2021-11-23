import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state';

export const selectClient = (state: AppState) => state.client;

export const selectClients = createSelector(
  selectClient,
  (state) => state.clients
);

export const selectSelectedClient = createSelector(
  selectClient,
  (state) => state.selectedClient
);

export const selectPageable = createSelector(
  selectClient,
  (state) => state.pageable
);
export const selectPageInfo = createSelector(
  selectClient,
  (state) => state.pageInfo
);

export const selectFilters = createSelector(
  selectClient,
  (state) => state.filters
);
