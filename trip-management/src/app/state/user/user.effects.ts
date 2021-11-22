import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppState } from '..';
import * as actions from './user.actions';
import * as fromAlert from '../alert';
import { EMPTY } from 'rxjs';
import { UserFirebaseService } from 'src/app/shared/service/user/user-firebase';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserFirebaseService,
    private store$: Store<AppState>
  ) {}

  @Effect()
  listUsers$ = this.actions$.pipe(
    ofType<actions.ListUsers>(actions.UserActionsTypes.LIST_USERS),
    switchMap((action) =>
      // action.filters, action.pageable
      this.userService
        .findAll()
        .pipe(
          map(
            (response) => {
              return new actions.ListUsersSuccess(
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
  findByIdUser$ = this.actions$.pipe(
    ofType<actions.FindByIdUsers>(actions.UserActionsTypes.FIND_BY_ID_USER),
    switchMap((action) =>
      this.userService
        .findById(action.id)
        .snapshotChanges()
        .pipe(
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

  // @Effect()
  // getQuantityUsers$ = this.actions$.pipe(
  //   ofType<actions.GetQuantityUsers>(
  //     actions.UserActionsTypes.GET_QUANTITY_USERS
  //   ),
  //   switchMap(() =>
  //     this.userService.getQuantityUsers().pipe(
  //       map(
  //         (response) => {
  //           return new actions.GetQuantityUsersSucces(response);
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
  addUser$ = this.actions$.pipe(
    ofType<actions.AddUser>(actions.UserActionsTypes.ADD_USER),
    switchMap((action) =>
      this.userService.add(action.user).then(
        (response) => {
          this.store$.dispatch(
            new fromAlert.actions.AddAlert({
              type: 'success',
              message: 'Usuário cadastrado com sucesso',
            })
          );
          return new actions.AddUserSuccess(response.val());
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
    ofType<actions.DeleteUser>(actions.UserActionsTypes.DELETE_USER),
    switchMap((action) =>
      this.userService.delete(action.id).then(
        () => {
          this.store$.dispatch(
            new fromAlert.actions.AddAlert({
              type: 'success',
              message: 'Usuário deletado com sucesso',
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
  );

  @Effect()
  editChristian$ = this.actions$.pipe(
    ofType<actions.EditUser>(actions.UserActionsTypes.EDIT_USER),
    switchMap((action) =>
      this.userService.edit(action.user).then(
        () => {
          this.store$.dispatch(
            new fromAlert.actions.AddAlert({
              type: 'success',
              message: 'Usuário editado com sucesso',
            })
          );
          return new actions.EditUserSucces(action.user);
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
