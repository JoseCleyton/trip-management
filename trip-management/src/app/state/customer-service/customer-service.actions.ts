import { Action } from '@ngrx/store';
import { CustomerService } from 'src/app/shared/model/customer-service.model';
import { PageInfo } from 'src/app/shared/model/page-info.model';
import { Pageable } from 'src/app/shared/model/pageable.model';

export enum CustomerServiceActionsTypes {
  GET_QUANTITY_CUSTOMERS_SERVICE = '[CustomerService] Get Quantity CustomerService',
  GET_QUANTITY_CUSTOMERS_SERVICE_SUCCESS = '[CustomerService] Get Quantity CustomerService Success',

  LIST_CUSTOMERS_SERVICE = '[CustomerService] List CustomerServices',
  LIST_CUSTOMERS_SERVICE_SUCCESS = '[CustomerService] List CustomerServices Success',

  FIND_BY_ID_CUSTOMER_SERVICE = '[CustomerService] Find By Id CustomerService',
  FIND_BY_ID_CUSTOMER_SERVICE_SUCCESS = '[CustomerService] Find By Id CustomerService Success',

  ADD_CUSTOMER_SERVICE = '[CustomerService] Add CustomerService',
  ADD_CUSTOMER_SERVICE_SUCCESS = '[CustomerService] Add CustomerService Success',

  SELECT_CUSTOMER_SERVICE = '[CustomerService] Select CustomerService',

  DELETE_CUSTOMER_SERVICE = '[CustomerService] Delete CustomerService',
  DELETE_CUSTOMER_SERVICE_SUCCESS = '[CustomerService] Delete CustomerService Success',

  EDIT_CUSTOMER_SERVICE = '[CustomerService] Edit CustomerService',
  EDIT_CUSTOMER_SERVICE_SUCCESS = '[CustomerService] Edit CustomerService Success',
}

export class ListCustomerServices implements Action {
  readonly type = CustomerServiceActionsTypes.LIST_CUSTOMERS_SERVICE;
  constructor(public filters: any, public pageable: Pageable) {}
}
export class ListCustomerServicesSuccess implements Action {
  readonly type = CustomerServiceActionsTypes.LIST_CUSTOMERS_SERVICE_SUCCESS;
  constructor(
    public filters: any,
    public pageable: Pageable,
    public pageInfo: PageInfo,
    public payload: any
  ) {}
}

export class FindByIdCustomerServices implements Action {
  readonly type = CustomerServiceActionsTypes.FIND_BY_ID_CUSTOMER_SERVICE;
  constructor(public id: string) {}
}
export class FindByIdCustomerServicesSuccess implements Action {
  readonly type = CustomerServiceActionsTypes.FIND_BY_ID_CUSTOMER_SERVICE_SUCCESS;
  constructor(public payload: any) {}
}
export class AddCustomerService implements Action {
  readonly type = CustomerServiceActionsTypes.ADD_CUSTOMER_SERVICE;
  constructor(public customerService: CustomerService) {}
}
export class AddCustomerServiceSuccess implements Action {
  readonly type = CustomerServiceActionsTypes.ADD_CUSTOMER_SERVICE_SUCCESS;
  constructor(public payload: CustomerService) {}
}
export class SelectCustomerService implements Action {
  readonly type = CustomerServiceActionsTypes.SELECT_CUSTOMER_SERVICE;
  constructor(public customerService: CustomerService) {}
}
export class DeleteCustomerService implements Action {
  readonly type = CustomerServiceActionsTypes.DELETE_CUSTOMER_SERVICE;
  constructor(public id: number) {}
}
export class DeleteCustomerServiceSucces implements Action {
  readonly type = CustomerServiceActionsTypes.DELETE_CUSTOMER_SERVICE_SUCCESS;
  constructor(public id: number) {}
}
export class EditCustomerService implements Action {
  readonly type = CustomerServiceActionsTypes.EDIT_CUSTOMER_SERVICE;
  constructor(public customerService: CustomerService) {}
}
export class EditCustomerServiceSucces implements Action {
  readonly type = CustomerServiceActionsTypes.EDIT_CUSTOMER_SERVICE_SUCCESS;
  constructor(public payload: CustomerService) {}
}
export class GetQuantityCustomerServices implements Action {
  readonly type = CustomerServiceActionsTypes.GET_QUANTITY_CUSTOMERS_SERVICE;
  constructor() {}
}
export class GetQuantityCustomerServicesSucces implements Action {
  readonly type = CustomerServiceActionsTypes.GET_QUANTITY_CUSTOMERS_SERVICE_SUCCESS;
  constructor(public payload: any) {}
}
export type CustomerServiceActions =
  | ListCustomerServices
  | ListCustomerServicesSuccess
  | FindByIdCustomerServices
  | FindByIdCustomerServicesSuccess
  | AddCustomerService
  | AddCustomerServiceSuccess
  | SelectCustomerService
  | DeleteCustomerService
  | DeleteCustomerServiceSucces
  | EditCustomerService
  | EditCustomerServiceSucces
  | GetQuantityCustomerServices
  | GetQuantityCustomerServicesSucces;
