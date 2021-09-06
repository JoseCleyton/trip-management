import { Action } from '@ngrx/store';
import { Christian } from 'src/app/shared/model/christian.model';
import { PageInfo } from 'src/app/shared/model/page-info.model';
import { Pageable } from 'src/app/shared/model/pageable.model';

export enum ChristianActionsTypes {
  GET_QUANTITY_CHRISTIANS = '[Christian] Get Quantity Christian',
  GET_QUANTITY_CHRISTIANS_SUCCESS = '[Christian] Get Quantity Christian Success',

  LIST_CHRISTIANS = '[Christian] List Christians',
  LIST_CHRISTIAN_SUCCES = '[Christian] List Christians Success',

  FIND_BY_CHRISTIANS = '[Christian] Find By Id Christian',
  FIND_BY_CHRISTIAN_SUCCES = '[Christian] Find By Id Christian Success',

  ADD_CHRISTIAN = '[Christian] Add Christian',
  ADD_CHRISTIAN_SUCCES = '[Christian] Add Christian Success',

  SELECT_CHRISTIAN = '[Christian] Select Christian',

  DELET_CHRISTIAN = '[Christian] Delete Christian',
  DELETE_CHRISTIAN_SUCCES = '[Christian] Delete Christian Success',

  EDIT_CHRISTIAN = '[Christian] Edit Christian',
  EDIT_CHRISTIAN_SUCCES = '[Christian] Edit Christian Success',
}

export class ListChristians implements Action {
  readonly type = ChristianActionsTypes.LIST_CHRISTIANS;
  constructor(public filters: any, public pageable: Pageable) {}
}
export class ListChristiansSuccess implements Action {
  readonly type = ChristianActionsTypes.LIST_CHRISTIAN_SUCCES;
  constructor(
    public filters: any,
    public pageable: Pageable,
    public pageInfo: PageInfo,
    public payload: any
  ) {}
}

export class FindByIdChristians implements Action {
  readonly type = ChristianActionsTypes.FIND_BY_CHRISTIANS;
  constructor(public id: string) {}
}
export class FindByIdChristiansSuccess implements Action {
  readonly type = ChristianActionsTypes.FIND_BY_CHRISTIAN_SUCCES;
  constructor(public payload: any) {}
}
export class AddChristian implements Action {
  readonly type = ChristianActionsTypes.ADD_CHRISTIAN;
  constructor(public christian: Christian) {}
}
export class AddChurchSuccess implements Action {
  readonly type = ChristianActionsTypes.ADD_CHRISTIAN_SUCCES;
  constructor(public payload: Christian) {}
}
export class SelectChristian implements Action {
  readonly type = ChristianActionsTypes.SELECT_CHRISTIAN;
  constructor(public christian: Christian) {}
}
export class DeleteChristian implements Action {
  readonly type = ChristianActionsTypes.DELET_CHRISTIAN;
  constructor(public id: number) {}
}
export class DeleteChristianSucces implements Action {
  readonly type = ChristianActionsTypes.DELETE_CHRISTIAN_SUCCES;
  constructor(public id: number) {}
}
export class EditChristian implements Action {
  readonly type = ChristianActionsTypes.EDIT_CHRISTIAN;
  constructor(public christian: Christian) {}
}
export class EditChristianSucces implements Action {
  readonly type = ChristianActionsTypes.EDIT_CHRISTIAN_SUCCES;
  constructor(public payload: Christian) {}
}
export class GetQuantityChristians implements Action {
  readonly type = ChristianActionsTypes.GET_QUANTITY_CHRISTIANS;
  constructor() {}
}
export class GetQuantityChristiansSucces implements Action {
  readonly type = ChristianActionsTypes.GET_QUANTITY_CHRISTIANS_SUCCESS;
  constructor(public payload: any) {}
}
export type ChristianActions =
  | ListChristians
  | ListChristiansSuccess
  | FindByIdChristians
  | FindByIdChristiansSuccess
  | AddChristian
  | AddChurchSuccess
  | SelectChristian
  | DeleteChristian
  | DeleteChristianSucces
  | EditChristian
  | EditChristianSucces
  | GetQuantityChristians
  | GetQuantityChristiansSucces;
