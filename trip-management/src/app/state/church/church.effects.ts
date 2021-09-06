import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { ChurchService } from 'src/app/shared/service/church/church.service';
import { AppState } from '..';
import * as actions from './church.actions';
import * as fromAlert from '../alert';

@Injectable()
export class ChurchEffects {
  constructor(
    private actions$: Actions,
    private churchService: ChurchService,
    private store$: Store<AppState>
  ) {}

  @Effect()
  getQuantity$ = this.actions$.pipe(
    ofType<actions.GetQuantity>(actions.ChurchActionsTypes.GET_QUANTITY),
    switchMap(() =>
      this.churchService.getChurchQuantity().pipe(
        map((response) => {
          return new actions.GetQuantitySuccess(response);
        })
      )
    )
  );

  @Effect()
  listChurchs$ = this.actions$.pipe(
    ofType<actions.ListChurchs>(actions.ChurchActionsTypes.LIST_CHURCHS),
    switchMap((action) =>
      this.churchService.listChurchs(action.filters, action.pageable).pipe(
        map((response) => {
          return new actions.ListChurchsSuccess(
            { ...action.filters },
            { ...action.pageable },
            {
              totalElements: response.totalElements,
              totalPages: response.totalPages,
            },
            response.content
          );
        })
      )
    )
  );

  @Effect()
  listAllChurchs$ = this.actions$.pipe(
    ofType<actions.ListAllChurchs>(actions.ChurchActionsTypes.LIST_ALL_CHURCHS),
    switchMap(() =>
      this.churchService.listAllChurchs().pipe(
        map((response) => {
          return new actions.ListAllChurchsSuccess(response);
        })
      )
    )
  );

  @Effect()
  addChurch$ = this.actions$.pipe(
    ofType<actions.AddChurch>(actions.ChurchActionsTypes.ADD_CHURCH),
    switchMap((action) =>
      this.churchService.addChurch(action.church).pipe(
        map((response) => {
          this.store$.dispatch(
            new fromAlert.actions.AddAlert({
              type: 'success',
              message: 'Igreja cadastrada com sucesso',
            })
          );
          return new actions.AddChurchSuccess(response);
        })
      )
    )
  );

  @Effect()
  deleteChurch$ = this.actions$.pipe(
    ofType<actions.DeleteChurch>(actions.ChurchActionsTypes.DELET_CHURCH),
    switchMap((action) =>
      this.churchService.deleteChurch(action.id).pipe(
        map(() => {
          this.store$.dispatch(
            new fromAlert.actions.AddAlert({
              type: 'success',
              message: 'Igreja deletada com sucesso',
            })
          );
          return new actions.DeleteChurchSucces(action.id);
        })
      )
    )
  );

  @Effect()
  editChurch$ = this.actions$.pipe(
    ofType<actions.EditChurch>(actions.ChurchActionsTypes.EDIT_CHURCH),
    switchMap((action) =>
      this.churchService.editChurch(action.church).pipe(
        map((response) => {
          this.store$.dispatch(
            new fromAlert.actions.AddAlert({
              type: 'success',
              message: 'Igreja editada com sucesso',
            })
          );
          return new actions.EditChurchSucces(response);
        })
      )
    )
  );
}
