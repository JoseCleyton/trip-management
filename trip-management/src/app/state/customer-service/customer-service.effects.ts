import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppState } from '..';
import * as actions from './customer-service.actions';
import * as fromAlert from '../alert';
import { EMPTY } from 'rxjs';
import { CustomerServiceService } from 'src/app/shared/service/customer-service/customer-service.service';

@Injectable()
export class CustomerServiceEffects {
  constructor(
    private actions$: Actions,
    private customerServiceService: CustomerServiceService,
    private store$: Store<AppState>
  ) {}

  @Effect()
  listChristians$ = this.actions$.pipe(
    ofType<actions.ListCustomerServices>(
      actions.CustomerServiceActionsTypes.LIST_CUSTOMERS_SERVICE
    ),
    switchMap((action) =>
      this.customerServiceService
        .listCustomersService(action.filters, action.pageable)
        .pipe(
          map(
            (response) => {
              return new actions.ListCustomerServicesSuccess(
                { ...action.filters },
                { ...action.pageable },
                {
                  totalElements: response.totalElements,
                  totalPages: response.totalPages,
                },
                response.content
              );
            },
            catchError((error) => {
              new fromAlert.actions.AddAlert({
                type: 'error',
                message: error.message,
              });
              return EMPTY;
            })
          )
        )
    )
  );

  @Effect()
  findByIdChristian$ = this.actions$.pipe(
    ofType<actions.FindByIdCustomerServices>(
      actions.CustomerServiceActionsTypes.FIND_BY_ID_CUSTOMER_SERVICE
    ),
    switchMap((action) =>
      this.customerServiceService.findByIdCustomerService(action.id).pipe(
        map(
          (response) => {
            return new actions.FindByIdCustomerServicesSuccess(response);
          },
          catchError((error) => {
            new fromAlert.actions.AddAlert({
              type: 'error',
              message: error.message,
            });
            return EMPTY;
          })
        )
      )
    )
  );

  @Effect()
  getQuantityChristians$ = this.actions$.pipe(
    ofType<actions.GetQuantityCustomerServices>(
      actions.CustomerServiceActionsTypes.GET_QUANTITY_CUSTOMERS_SERVICE
    ),
    switchMap(() =>
      this.customerServiceService.getQuantityCustomersService().pipe(
        map(
          (response) => {
            return new actions.GetQuantityCustomerServicesSucces(response);
          },
          catchError((error) => {
            new fromAlert.actions.AddAlert({
              type: 'error',
              message: error.message,
            });
            return EMPTY;
          })
        )
      )
    )
  );
  @Effect()
  addChristian$ = this.actions$.pipe(
    ofType<actions.AddCustomerService>(
      actions.CustomerServiceActionsTypes.ADD_CUSTOMER_SERVICE
    ),
    switchMap((action) =>
      this.customerServiceService
        .addCustomerService(action.customerService)
        .pipe(
          map(
            (response) => {
              this.store$.dispatch(
                new fromAlert.actions.AddAlert({
                  type: 'success',
                  message: 'Dizimista cadastrado com sucesso',
                })
              );
              return new actions.AddCustomerServiceSuccess(response);
            },
            catchError((error) => {
              new fromAlert.actions.AddAlert({
                type: 'error',
                message: error.message,
              });
              return EMPTY;
            })
          )
        )
    )
  );
  @Effect()
  deleteChristian$ = this.actions$.pipe(
    ofType<actions.DeleteCustomerService>(
      actions.CustomerServiceActionsTypes.DELETE_CUSTOMER_SERVICE
    ),
    switchMap((action) =>
      this.customerServiceService.deleteCustomerService(action.id).pipe(
        map(
          () => {
            this.store$.dispatch(
              new fromAlert.actions.AddAlert({
                type: 'success',
                message: 'Dizimista deletado com sucesso',
              })
            );
            return new actions.DeleteCustomerServiceSucces(action.id);
          },
          catchError((error) => {
            new fromAlert.actions.AddAlert({
              type: 'error',
              message: error.message,
            });
            return EMPTY;
          })
        )
      )
    )
  );
  @Effect()
  editChristian$ = this.actions$.pipe(
    ofType<actions.EditCustomerService>(
      actions.CustomerServiceActionsTypes.EDIT_CUSTOMER_SERVICE
    ),
    switchMap((action) =>
      this.customerServiceService
        .editCustomerService(action.customerService)
        .pipe(
          map(
            (response) => {
              this.store$.dispatch(
                new fromAlert.actions.AddAlert({
                  type: 'success',
                  message: 'Dizimista editado com sucesso',
                })
              );
              return new actions.EditCustomerServiceSucces(response);
            },
            catchError((error) => {
              new fromAlert.actions.AddAlert({
                type: 'error',
                message: error.message,
              });
              return EMPTY;
            })
          )
        )
    )
  );
}
