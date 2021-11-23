import { User } from './../../shared/model/user.model';
import { LoginActions, LoginActionsTypes } from './login.actions';

export interface LoginState {
  user: User;
  credentials: {
    token: string;
    isAdmin: boolean;
    login: string;
  };
}

export const initialState: LoginState = {
  user: null,
  credentials: null,
};

export function loginReducer(
  state = initialState,
  action: LoginActions
): LoginState {
  switch (action.type) {
    case LoginActionsTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        credentials: {
          token: action.payload.token,
          isAdmin: action.payload.profile.description === 'ADMINISTRADOR',
          login: action.payload.login,
        },
      };
    }
    case LoginActionsTypes.LOGOUT: {
      return {
        ...state,
        credentials: initialState.credentials,
        user: initialState.user,
      };
    }
    default:
      return state;
  }
}
