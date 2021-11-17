import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state';

export const selectCustomerService = (state: AppState) => state.customerService;

export const selectCustomersServices = createSelector(
  selectCustomerService,
  (state) => state.customersService
);

export const selectSelectedCustomerService = createSelector(
  selectCustomerService,
  (state) => state.selectedCustomerService
);

export const selectQuantityCustomerServices = createSelector(
  selectCustomerService,
  (state) => state.quantityCustomerServices
);

export const selectPageable = createSelector(
  selectCustomerService,
  (state) => state.pageable
);
export const selectPageInfo = createSelector(
  selectCustomerService,
  (state) => state.pageInfo
);
export const selectFilters = createSelector(
  selectCustomerService,
  (state) => state.filters
);
