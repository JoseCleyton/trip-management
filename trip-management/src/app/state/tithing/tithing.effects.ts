import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppState } from '..';
import * as actions from './tithing.actions';
import * as fromAlert from '../alert';
import { EMPTY } from 'rxjs';
import { TithingService } from 'src/app/shared/service/tithing/tithing.service';

@Injectable()
export class ChristianEffects {
  constructor(
    private actions$: Actions,
    private tithingService: TithingService,
    private store$: Store<AppState>
  ) {}

  @Effect()
  fetchLatestRecords$ = this.actions$.pipe(
    ofType<actions.FetchLatestRecords>(
      actions.TithingActionsTypes.FETCH_LATEST_RECORDS
    ),
    switchMap(() =>
      this.tithingService.fetchLatestRecords().pipe(
        map(
          (response) => {
            return new actions.FetchLatestRecordsSuccess(response);
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
  listTithingsAdm$ = this.actions$.pipe(
    ofType<actions.ListTithingsAdm>(
      actions.TithingActionsTypes.LIST_TITHINGS_ADM
    ),
    switchMap((action) =>
      this.tithingService
        .listTithingsAdm(action.idChurch, action.startDate, action.endDate)
        .pipe(
          map(
            (response) => {
              return new actions.ListTithingsAdmSuccess(
                { startDate: action.startDate, endDate: action.endDate },
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
  listTithings$ = this.actions$.pipe(
    ofType<actions.ListTithings>(actions.TithingActionsTypes.LIST_TITHINGS),
    switchMap((action) =>
      this.tithingService.listTithings(action.startDate, action.endDate).pipe(
        map(
          (response) => {
            return new actions.ListTithingsSuccess(
              { startDate: action.startDate, endDate: action.endDate },
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
  getTotal$ = this.actions$.pipe(
    ofType<actions.GetTotal>(actions.TithingActionsTypes.GET_TOTAL),
    switchMap(() =>
      this.tithingService.getTotal().pipe(
        map(
          (response) => {
            return new actions.GetTotalSucces(response);
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
  retrieveTotal$ = this.actions$.pipe(
    ofType<actions.RetrieveTotal>(actions.TithingActionsTypes.RETRIEVE_TOTAL),
    switchMap(() =>
      this.tithingService.retrieveTotal().pipe(
        map(
          (response) => {
            return new actions.RetrieveTotalSucces(response);
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
  getTotalByChurch$ = this.actions$.pipe(
    ofType<actions.GetTotalByChurch>(
      actions.TithingActionsTypes.GET_TOTAL_BY_CHURCH
    ),
    switchMap((action) =>
      this.tithingService.getTotalByChurch(action.idChurch).pipe(
        map(
          (response) => {
            return new actions.GetTotalByChurchSucces(response);
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
  addTithing$ = this.actions$.pipe(
    ofType<actions.AddTithing>(actions.TithingActionsTypes.ADD_TITHING),
    switchMap((action) =>
      this.tithingService.addTithing(action.tithing).pipe(
        map(
          (response) => {
            this.store$.dispatch(
              new fromAlert.actions.AddAlert({
                type: 'success',
                message: 'Dízimo pago com sucesso',
              })
            );
            return new actions.AddTithingSuccess(response);
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
