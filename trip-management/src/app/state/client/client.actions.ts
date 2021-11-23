import { Action } from '@ngrx/store';
import { Client } from 'src/app/shared/model/client.model';
import { PageInfo } from 'src/app/shared/model/page-info.model';
import { Pageable } from 'src/app/shared/model/pageable.model';

export enum ClientActionsTypes {
  LIST_CLIENTS = '[Client] List Clients',
  LIST_CLIENTS_SUCCESS = '[Client] List Clients Success',

  ADD_CLIENT = '[Client] Add Client',
  ADD_CLIENT_SUCCESS = '[Client] Add Client Success',

  SELECT_CLIENT = '[Client] Select Client',

  DELETE_CLIENT = '[Client] Delete Client',
  DELETE_CLIENT_SUCCESS = '[Client] Delete Client Success',

  EDIT_CLIENT = '[Client] Edit Client',
  EDIT_CLIENT_SUCCESS = '[Client] Edit Client Success',
}

export class ListClients implements Action {
  readonly type = ClientActionsTypes.LIST_CLIENTS;
  constructor(public filters: any, public pageable: Pageable) {}
}
export class ListClientsSuccess implements Action {
  readonly type = ClientActionsTypes.LIST_CLIENTS_SUCCESS;
  constructor(
    public filters: any,
    public pageable: Pageable,
    public pageInfo: PageInfo,
    public payload: Client[]
  ) {}
}

export class AddClient implements Action {
  readonly type = ClientActionsTypes.ADD_CLIENT;
  constructor(public client: Client) {}
}
export class AddClientSuccess implements Action {
  readonly type = ClientActionsTypes.ADD_CLIENT_SUCCESS;
  constructor(public payload: Client) {}
}
export class SelectClient implements Action {
  readonly type = ClientActionsTypes.SELECT_CLIENT;
  constructor(public client: Client) {}
}
export class DeleteClient implements Action {
  readonly type = ClientActionsTypes.DELETE_CLIENT;
  constructor(public id: string) {}
}
export class DeleteClientSucces implements Action {
  readonly type = ClientActionsTypes.DELETE_CLIENT_SUCCESS;
  constructor(public id: string) {}
}
export class EditClient implements Action {
  readonly type = ClientActionsTypes.EDIT_CLIENT;
  constructor(public client: Client) {}
}
export class EditClientSucces implements Action {
  readonly type = ClientActionsTypes.EDIT_CLIENT_SUCCESS;
  constructor(public payload: Client) {}
}

export type ClientActions =
  | ListClients
  | ListClientsSuccess
  | AddClient
  | AddClientSuccess
  | SelectClient
  | DeleteClient
  | DeleteClientSucces
  | EditClient
  | EditClientSucces;
