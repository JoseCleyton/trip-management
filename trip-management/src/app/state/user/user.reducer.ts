import { User } from 'src/app/shared/model/user.model';
import { PageInfo } from 'src/app/shared/model/page-info.model';
import { Pageable } from 'src/app/shared/model/pageable.model';
import { UserActions, UserActionsTypes } from './user.actions';

export interface UserState {
  filters: any;
  pageable: Pageable;
  pageInfo: PageInfo;
  users: User[];
  selectedUser: User;
  quantityUsers: number;
}

export const initialState: UserState = {
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
    totalElements: undefined,
    totalPages: undefined,
  },
  users: [],
  selectedUser: undefined,
  quantityUsers: 0,
};

export function userReducer(
  state = initialState,
  action: UserActions
): UserState {
  switch (action.type) {
    case UserActionsTypes.LIST_USERS_SUCCESS: {
      return {
        ...state,
        filters: { ...action.filters },
        pageable: { ...action.pageable },
        pageInfo: { ...action.pageInfo },
        users: action.payload.map((user) => {
          user.profile.description =
            user.profile.id === '1'
              ? 'ADMINISTRADOR'
              : user.profile.id === '2'
              ? 'TECNICO'
              : user.profile.id === '3'
              ? 'SECRETARIO'
              : '';
          return user;
        }),
      };
    }
    case UserActionsTypes.FIND_BY_ID_USER_SUCCESS: {
      state.users = [];
      return {
        ...state,
        filters: {
          id: action.payload.id,
          name: state.filters.name,
          monthOfBirthday: state.filters.monthOfBirthday,
        },
        users: [action.payload],
        pageInfo: {
          totalElements: 1,
          totalPages: 1,
        },
      };
    }

    case UserActionsTypes.ADD_USER_SUCCESS: {
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    }
    case UserActionsTypes.SELECT_USER: {
      return {
        ...state,
        selectedUser: action.user,
      };
    }
    case UserActionsTypes.DELETE_USER_SUCCESS: {
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    }
    case UserActionsTypes.EDIT_USER_SUCCESS: {
      const usersAux = state.users.filter(
        (user) => user.id !== action.payload.id
      );

      return {
        ...state,
        users: [...usersAux, action.payload],
      };
    }
    case UserActionsTypes.GET_QUANTITY_USERS_SUCCESS: {
      return {
        ...state,
        quantityUsers: action.payload,
      };
    }
    default:
      return state;
  }
}
