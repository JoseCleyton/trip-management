import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppState } from '..';
import * as actions from './customer-service.actions';
import * as fromAlert from '../alert';
import { EMPTY } from 'rxjs';
import { CustomerServiceFirebaseService } from 'src/app/shared/service/customer-service/customer-service-firebase';

@Injectable()
export class CustomerServiceEffects {
  constructor(
    private actions$: Actions,
    private customerServiceService: CustomerServiceFirebaseService,
    private store$: Store<AppState>
  ) {}

  @Effect()
  listCustomerService$ = this.actions$.pipe(
    ofType<actions.ListCustomerServices>(
      actions.CustomerServiceActionsTypes.LIST_CUSTOMERS_SERVICE
    ),
    switchMap((action) =>
      this.customerServiceService
        .findAll()
        .valueChanges()
        .pipe(
          map(
            (response) => {
              return new actions.ListCustomerServicesSuccess(
                { ...action.filters },
                { ...action.pageable },
                {
                  totalElements: response.length,
                  totalPages: response.length / 5,
                },
                response
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
  findByIdCustomerService$ = this.actions$.pipe(
    ofType<actions.FindByIdCustomerServices>(
      actions.CustomerServiceActionsTypes.FIND_BY_ID_CUSTOMER_SERVICE
    ),
    switchMap((action) =>
      this.customerServiceService
        .findById(action.id)
        .snapshotChanges()
        .pipe(
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

  // @Effect()
  // getQuantityChristians$ = this.actions$.pipe(
  //   ofType<actions.GetQuantityCustomerServices>(
  //     actions.CustomerServiceActionsTypes.GET_QUANTITY_CUSTOMERS_SERVICE
  //   ),
  //   switchMap(() =>
  //     this.customerServiceService.getQuantityCustomersService().pipe(
  //       map(
  //         (response) => {
  //           return new actions.GetQuantityCustomerServicesSucces(response);
  //         },
  //         catchError((error) => {
  //           new fromAlert.actions.AddAlert({
  //             type: 'error',
  //             message: error.message,
  //           });
  //           return EMPTY;
  //         })
  //       )
  //     )
  //   )
  // );

  @Effect()
  addCustomerService$ = this.actions$.pipe(
    ofType<actions.AddCustomerService>(
      actions.CustomerServiceActionsTypes.ADD_CUSTOMER_SERVICE
    ),
    switchMap((action) =>
      this.customerServiceService.add(action.customerService).then(
        (response) => {
          this.store$.dispatch(
            new fromAlert.actions.AddAlert({
              type: 'success',
              message: 'Chamado aberto com sucesso',
            })
          );
          return new actions.AddCustomerServiceSuccess(response.val());
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
  );

  @Effect()
  deleteCustomerService$ = this.actions$.pipe(
    ofType<actions.DeleteCustomerService>(
      actions.CustomerServiceActionsTypes.DELETE_CUSTOMER_SERVICE
    ),
    switchMap((action) =>
      this.customerServiceService.delete(action.id).then(
        () => {
          this.store$.dispatch(
            new fromAlert.actions.AddAlert({
              type: 'success',
              message: 'Chamado deletado com sucesso',
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
  );

  @Effect()
  editCustomerService$ = this.actions$.pipe(
    ofType<actions.EditCustomerService>(
      actions.CustomerServiceActionsTypes.EDIT_CUSTOMER_SERVICE
    ),
    switchMap((action) =>
      this.customerServiceService
        .edit(action.customerService)
        .then(
          (response) => {
            this.store$.dispatch(
              new fromAlert.actions.AddAlert({
                type: 'success',
                message: 'Chamado editado com sucesso',
              })
            );
            return new actions.EditCustomerServiceSucces(action.customerService);
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
  );
}
