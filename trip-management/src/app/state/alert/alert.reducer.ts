import { AlertActions, AlertActionsTypes } from './alert.actions';

export interface AlertState {
  alerts: any[];
}

export const initialState: AlertState = {
  alerts: [],
};

export function alertReducer(
  state = initialState,
  action: AlertActions
): AlertState {
  switch (action.type) {
    case AlertActionsTypes.ADD_ALERT_SUCCESS: {
      return {
        ...state,
        alerts: [...state.alerts, action.payload],
      };
    }
    case AlertActionsTypes.REMOVE_ALERT: {
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== action.id),
      };
    }
    default:
      return state;
  }
}
