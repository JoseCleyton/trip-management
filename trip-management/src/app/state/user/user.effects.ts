import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppState } from '..';
import * as actions from './user.actions';
import * as fromAlert from '../alert';
import { EMPTY } from 'rxjs';
import { UserService } from 'src/app/shared/service/user/user.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store$: Store<AppState>
  ) {}

  @Effect()
  listChristians$ = this.actions$.pipe(
    ofType<actions.ListUsers>(actions.UserActionsTypes.LIST_USERS),
    switchMap((action) =>
      this.userService.listUsers(action.filters, action.pageable).pipe(
        map(
          (response) => {
            return new actions.ListUsersSuccess(
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
    ofType<actions.FindByIdUsers>(actions.UserActionsTypes.FIND_BY_ID_USER),
    switchMap((action) =>
      this.userService.findByIdUser(action.id).pipe(
        map(
          (response) => {
            return new actions.FindByIdUsersSuccess(response);
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
    ofType<actions.GetQuantityUsers>(
      actions.UserActionsTypes.GET_QUANTITY_USERS
    ),
    switchMap(() =>
      this.userService.getQuantityUsers().pipe(
        map(
          (response) => {
            return new actions.GetQuantityUsersSucces(response);
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
    ofType<actions.AddUser>(actions.UserActionsTypes.ADD_USER),
    switchMap((action) =>
      this.userService.addUser(action.user).pipe(
        map(
          (response) => {
            this.store$.dispatch(
              new fromAlert.actions.AddAlert({
                type: 'success',
                message: 'Dizimista cadastrado com sucesso',
              })
            );
            return new actions.AddUserSuccess(response);
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
    ofType<actions.DeleteUser>(actions.UserActionsTypes.DELETE_USER),
    switchMap((action) =>
      this.userService.deleteUser(action.id).pipe(
        map(
          () => {
            this.store$.dispatch(
              new fromAlert.actions.AddAlert({
                type: 'success',
                message: 'Dizimista deletado com sucesso',
              })
            );
            return new actions.DeleteUserSucces(action.id);
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
    ofType<actions.EditUser>(actions.UserActionsTypes.EDIT_USER),
    switchMap((action) =>
      this.userService.editUser(action.user).pipe(
        map(
          (response) => {
            this.store$.dispatch(
              new fromAlert.actions.AddAlert({
                type: 'success',
                message: 'Dizimista editado com sucesso',
              })
            );
            return new actions.EditUserSucces(response);
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
