import { PageInfo } from 'src/app/shared/model/page-info.model';
import { Pageable } from 'src/app/shared/model/pageable.model';
import { Client } from 'src/app/shared/model/client.model';
import { ClientActions, ClientActionsTypes } from './client.actions';

export interface ClientState {
  filters: any;
  pageable: Pageable;
  pageInfo: PageInfo;
  clients: Client[];
  selectedClient: Client;
}

export const initialState: ClientState = {
  filters: {
    id: '',
    name: '',
    monthOfBirthday: 0,
  },
  pageable: {
    direction: 'ASC',
    size: 5,
    page: 0,
    sort: 'id',
  },
  pageInfo: {
    totalElements: null,
    totalPages: null,
  },
  clients: [],
  selectedClient: null,
};

export function clientReducer(
  state = initialState,
  action: ClientActions
): ClientState {
  switch (action.type) {
    case ClientActionsTypes.LIST_CLIENTS_SUCCESS: {
      return {
        ...state,
        filters: { ...action.filters },
        pageable: { ...action.pageable },
        pageInfo: { ...action.pageInfo },
        clients: action.payload,
      };
    }

    case ClientActionsTypes.ADD_CLIENT_SUCCESS: {
      return {
        ...state,
        clients: [...state.clients, action.payload],
      };
    }
    case ClientActionsTypes.SELECT_CLIENT: {
      return {
        ...state,
        selectedClient: action.client,
      };
    }
    case ClientActionsTypes.DELETE_CLIENT_SUCCESS: {
      return {
        ...state,
        clients: state.clients.filter((client) => client.id !== action.id),
      };
    }
    case ClientActionsTypes.EDIT_CLIENT_SUCCESS: {
      const clientsAux = state.clients.filter(
        (client) => client.id !== action.payload.id
      );

      return {
        ...state,
        clients: [...clientsAux, action.payload],
      };
    }
    default:
      return state;
  }
}
