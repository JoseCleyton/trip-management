import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppState } from '..';
import * as actions from './christian.actions';
import * as fromAlert from '../alert';
import { EMPTY } from 'rxjs';
import { ChristianService } from 'src/app/shared/service/christian/christian.service';

@Injectable()
export class ChristianEffects {
  constructor(
    private actions$: Actions,
    private christianService: ChristianService,
    private store$: Store<AppState>
  ) {}

  @Effect()
  listChristians$ = this.actions$.pipe(
    ofType<actions.ListChristians>(
      actions.ChristianActionsTypes.LIST_CHRISTIANS
    ),
    switchMap((action) =>
      this.christianService
        .listChristians(action.filters, action.pageable)
        .pipe(
          map(
            (response) => {
              return new actions.ListChristiansSuccess(
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
    ofType<actions.FindByIdChristians>(
      actions.ChristianActionsTypes.FIND_BY_CHRISTIANS
    ),
    switchMap((action) =>
      this.christianService.findByIdChristian(action.id).pipe(
        map(
          (response) => {
            return new actions.FindByIdChristiansSuccess(response);
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
    ofType<actions.GetQuantityChristians>(
      actions.ChristianActionsTypes.GET_QUANTITY_CHRISTIANS
    ),
    switchMap(() =>
      this.christianService.getQuantityChristians().pipe(
        map(
          (response) => {
            return new actions.GetQuantityChristiansSucces(response);
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
    ofType<actions.AddChristian>(actions.ChristianActionsTypes.ADD_CHRISTIAN),
    switchMap((action) =>
      this.christianService.addChristian(action.christian).pipe(
        map(
          (response) => {
            this.store$.dispatch(
              new fromAlert.actions.AddAlert({
                type: 'success',
                message: 'Dizimista cadastrado com sucesso',
              })
            );
            return new actions.AddChurchSuccess(response);
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
    ofType<actions.DeleteChristian>(
      actions.ChristianActionsTypes.DELET_CHRISTIAN
    ),
    switchMap((action) =>
      this.christianService.deleteChristian(action.id).pipe(
        map(
          () => {
            this.store$.dispatch(
              new fromAlert.actions.AddAlert({
                type: 'success',
                message: 'Dizimista deletado com sucesso',
              })
            );
            return new actions.DeleteChristianSucces(action.id);
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
    ofType<actions.EditChristian>(actions.ChristianActionsTypes.EDIT_CHRISTIAN),
    switchMap((action) =>
      this.christianService.editChristian(action.christian).pipe(
        map(
          (response) => {
            this.store$.dispatch(
              new fromAlert.actions.AddAlert({
                type: 'success',
                message: 'Dizimista editado com sucesso',
              })
            );
            return new actions.EditChristianSucces(response);
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
