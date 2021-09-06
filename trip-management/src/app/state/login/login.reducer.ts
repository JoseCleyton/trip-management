import { LoginActions, LoginActionsTypes } from './login.actions';

export interface LoginState {
  credentials: {
    token: string;
    isAdmin: boolean;
    login: string;
  };
}

export const initialState: LoginState = {
  credentials: undefined,
};

export function loginReducer(
  state = initialState,
  action: LoginActions
): LoginState {
  switch (action.type) {
    case LoginActionsTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        credentials: {
          token: action.payload.token,
          isAdmin: action.payload.admin,
          login: action.payload.login,
        },
      };
    }
    case LoginActionsTypes.LOGOUT: {
      return {
        ...state,
        credentials: initialState.credentials,
      };
    }
    default:
      return state;
  }
}
