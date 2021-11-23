import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppState } from '..';
import * as actions from './client.actions';
import * as fromAlert from '../alert';
import { EMPTY } from 'rxjs';
import { ClientFirebaseService } from 'src/app/shared/service/client/client-firebase';

@Injectable()
export class ClientEffects {
  constructor(
    private actions$: Actions,
    private clientService: ClientFirebaseService,
    private store$: Store<AppState>
  ) {}

  @Effect()
  listClients$ = this.actions$.pipe(
    ofType<actions.ListClients>(actions.ClientActionsTypes.LIST_CLIENTS),
    switchMap((action) =>
      // action.filters, action.pageable
      this.clientService.findAll().pipe(
        map(
          (response) => {
            return new actions.ListClientsSuccess(
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
  addClient$ = this.actions$.pipe(
    ofType<actions.AddClient>(actions.ClientActionsTypes.ADD_CLIENT),
    switchMap((action) =>
      this.clientService.add(action.client).then(
        (response) => {
          this.store$.dispatch(
            new fromAlert.actions.AddAlert({
              type: 'success',
              message: 'Cliente cadastrado com sucesso',
            })
          );
          return new actions.AddClientSuccess(response.val());
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
  deleteChristian$ = this.actions$.pipe(
    ofType<actions.DeleteClient>(actions.ClientActionsTypes.DELETE_CLIENT),
    switchMap((action) =>
      this.clientService.delete(action.id).then(
        () => {
          this.store$.dispatch(
            new fromAlert.actions.AddAlert({
              type: 'success',
              message: 'Cliente deletado com sucesso',
            })
          );
          return new actions.DeleteClientSucces(action.id);
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
  editChristian$ = this.actions$.pipe(
    ofType<actions.EditClient>(actions.ClientActionsTypes.EDIT_CLIENT),
    switchMap((action) =>
      this.clientService.edit(action.client).then(
        () => {
          this.store$.dispatch(
            new fromAlert.actions.AddAlert({
              type: 'success',
              message: 'Cliente editado com sucesso',
            })
          );
          return new actions.EditClientSucces(action.client);
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
