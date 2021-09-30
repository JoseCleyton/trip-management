import { Action } from '@ngrx/store';
import { User } from 'src/app/shared/model/user.model';
import { PageInfo } from 'src/app/shared/model/page-info.model';
import { Pageable } from 'src/app/shared/model/pageable.model';

export enum UserActionsTypes {
  GET_QUANTITY_USERS = '[User] Get Quantity User',
  GET_QUANTITY_USERS_SUCCESS = '[User] Get Quantity User Success',

  LIST_USERS = '[User] List Users',
  LIST_USERS_SUCCESS = '[User] List Users Success',

  FIND_BY_ID_USER = '[User] Find By Id User',
  FIND_BY_ID_USER_SUCCESS = '[User] Find By Id User Success',

  ADD_USER = '[User] Add User',
  ADD_USER_SUCCESS = '[User] Add User Success',

  SELECT_USER = '[User] Select User',

  DELETE_USER = '[User] Delete User',
  DELETE_USER_SUCCESS = '[User] Delete User Success',

  EDIT_USER = '[User] Edit User',
  EDIT_USER_SUCCESS = '[User] Edit User Success',
}

export class ListUsers implements Action {
  readonly type = UserActionsTypes.LIST_USERS;
  constructor(public filters: any, public pageable: Pageable) {}
}
export class ListUsersSuccess implements Action {
  readonly type = UserActionsTypes.LIST_USERS_SUCCESS;
  constructor(
    public filters: any,
    public pageable: Pageable,
    public pageInfo: PageInfo,
    public payload: User[]
  ) {}
}

export class FindByIdUsers implements Action {
  readonly type = UserActionsTypes.FIND_BY_ID_USER;
  constructor(public id: string) {}
}
export class FindByIdUsersSuccess implements Action {
  readonly type = UserActionsTypes.FIND_BY_ID_USER_SUCCESS;
  constructor(public payload: any) {}
}
export class AddUser implements Action {
  readonly type = UserActionsTypes.ADD_USER;
  constructor(public user: User) {}
}
export class AddUserSuccess implements Action {
  readonly type = UserActionsTypes.ADD_USER_SUCCESS;
  constructor(public payload: User) {}
}
export class SelectUser implements Action {
  readonly type = UserActionsTypes.SELECT_USER;
  constructor(public user: User) {}
}
export class DeleteUser implements Action {
  readonly type = UserActionsTypes.DELETE_USER;
  constructor(public id: string) {}
}
export class DeleteUserSucces implements Action {
  readonly type = UserActionsTypes.DELETE_USER_SUCCESS;
  constructor(public id: string) {}
}
export class EditUser implements Action {
  readonly type = UserActionsTypes.EDIT_USER;
  constructor(public user: User) {}
}
export class EditUserSucces implements Action {
  readonly type = UserActionsTypes.EDIT_USER_SUCCESS;
  constructor(public payload: User) {}
}
export class GetQuantityUsers implements Action {
  readonly type = UserActionsTypes.GET_QUANTITY_USERS;
  constructor() {}
}
export class GetQuantityUsersSucces implements Action {
  readonly type = UserActionsTypes.GET_QUANTITY_USERS_SUCCESS;
  constructor(public payload: any) {}
}
export type UserActions =
  | ListUsers
  | ListUsersSuccess
  | FindByIdUsers
  | FindByIdUsersSuccess
  | AddUser
  | AddUserSuccess
  | SelectUser
  | DeleteUser
  | DeleteUserSucces
  | EditUser
  | EditUserSucces
  | GetQuantityUsers
  | GetQuantityUsersSucces;
