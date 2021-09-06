import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { merge, of } from 'rxjs';
import { delay, mergeMap, withLatestFrom } from 'rxjs/operators';
import { AppState } from '..';
import * as actions from './alert.actions';
import * as selectors from './alert.selectors';

@Injectable()
export class AlertEffects {
  constructor(private actions$: Actions, private store$: Store<AppState>) {}

  @Effect()
  addAlert = this.actions$.pipe(
    ofType<actions.AddAlert>(actions.AlertActionsTypes.ADD_ALERT),
    withLatestFrom(this.store$.pipe(select(selectors.selectAlerts))),
    mergeMap(([action, alerts]) => {
      const id = Math.random();
      const error = alerts.find(
        (error) => error.message === action.payload.message
      );
      if (error) {
        return of();
      }
      return merge(
        of(
          new actions.AddAlertSuccess({
            id: id,
            type: action.payload.type,
            message: action.payload.message,
          })
        ),
        of(new actions.RemoveAlert(id)).pipe(delay(6000))
      );
    })
  );
}
