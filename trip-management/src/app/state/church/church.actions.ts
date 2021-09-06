import { Action } from '@ngrx/store';
import { Church } from 'src/app/shared/model/church.model';
import { PageInfo } from 'src/app/shared/model/page-info.model';
import { Pageable } from 'src/app/shared/model/pageable.model';

export enum ChurchActionsTypes {
  GET_QUANTITY = '[Church] Get Quantity',
  GET_QUANTITY_SUCCESS = '[Church] Get Quantity Success',

  LIST_CHURCHS = '[Church] List Churchs',
  LIST_CHURCHS_SUCCES = '[Church] List Churchs Success',

  LIST_ALL_CHURCHS = '[Church] List All Churchs',
  LIST_ALL_CHURCHS_SUCCES = '[Church] List All Churchs Success',

  ADD_CHURCH = '[Church] Add Church',
  ADD_CHURCH_SUCCES = '[Church] Add Church Success',

  SELECT_CHURCH = '[Church] Select Church',

  DELET_CHURCH = '[Church] Delete Church',
  DELETE_CHURCH_SUCCES = '[Church] Delete Church Success',

  EDIT_CHURCH = '[Church] Edit Church',
  EDIT_CHURCH_SUCCES = '[Church] Edit Church Success',
}

export class GetQuantity implements Action {
  readonly type = ChurchActionsTypes.GET_QUANTITY;
  constructor() {}
}

export class GetQuantitySuccess implements Action {
  readonly type = ChurchActionsTypes.GET_QUANTITY_SUCCESS;
  constructor(public payload: any) {}
}

export class ListChurchs implements Action {
  readonly type = ChurchActionsTypes.LIST_CHURCHS;
  constructor(public filters: any, public pageable: Pageable) {}
}
export class ListChurchsSuccess implements Action {
  readonly type = ChurchActionsTypes.LIST_CHURCHS_SUCCES;
  constructor(
    public filters: any,
    public pageable: Pageable,
    public pageInfo: PageInfo,
    public payload: any
  ) {}
}

export class ListAllChurchs implements Action {
  readonly type = ChurchActionsTypes.LIST_ALL_CHURCHS;
  constructor() {}
}
export class ListAllChurchsSuccess implements Action {
  readonly type = ChurchActionsTypes.LIST_ALL_CHURCHS_SUCCES;
  constructor(public payload: any) {}
}

export class AddChurch implements Action {
  readonly type = ChurchActionsTypes.ADD_CHURCH;
  constructor(public church: Church) {}
}
export class AddChurchSuccess implements Action {
  readonly type = ChurchActionsTypes.ADD_CHURCH_SUCCES;
  constructor(public payload: Church) {}
}
export class SelectChurch implements Action {
  readonly type = ChurchActionsTypes.SELECT_CHURCH;
  constructor(public church: Church) {}
}
export class DeleteChurch implements Action {
  readonly type = ChurchActionsTypes.DELET_CHURCH;
  constructor(public id: number) {}
}
export class DeleteChurchSucces implements Action {
  readonly type = ChurchActionsTypes.DELETE_CHURCH_SUCCES;
  constructor(public id: number) {}
}
export class EditChurch implements Action {
  readonly type = ChurchActionsTypes.EDIT_CHURCH;
  constructor(public church: Church) {}
}
export class EditChurchSucces implements Action {
  readonly type = ChurchActionsTypes.EDIT_CHURCH_SUCCES;
  constructor(public payload: Church) {}
}
export type ChurchActions =
  | GetQuantity
  | GetQuantitySuccess
  | ListAllChurchs
  | ListAllChurchsSuccess
  | ListChurchs
  | ListChurchsSuccess
  | AddChurch
  | AddChurchSuccess
  | SelectChurch
  | DeleteChurch
  | DeleteChurchSucces
  | EditChurch
  | EditChurchSucces;
