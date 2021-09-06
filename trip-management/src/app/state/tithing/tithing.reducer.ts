import { PageInfoDateFilter } from 'src/app/shared/model/page-info-date-filter.model';
import { Tithing } from 'src/app/shared/model/tithing.model';
import { TithingActionsTypes, TithingActions } from './tithing.actions';

export interface TithingState {
  pageInfo: PageInfoDateFilter;
  total: number;
  tithings: Tithing[];
}

export const initialState: TithingState = {
  pageInfo: {
    startDate:
      new Date().getFullYear() + '/0' + (new Date().getMonth() + 1) + '/01',

    endDate:
      new Date().getFullYear() + '/0' + (new Date().getMonth() + 1) + '/05',
  },
  total: 0,
  tithings: [],
};

export function tithingReducer(
  state = initialState,
  action: TithingActions
): TithingState {
  switch (action.type) {
    case TithingActionsTypes.ADD_TITHING_SUCCES: {
      return {
        ...state,
        tithings: [...state.tithings, action.tithing],
      };
    }
    case TithingActionsTypes.GET_TOTAL_SUCCESS: {
      return {
        ...state,
        total: action.payload,
      };
    }
    case TithingActionsTypes.RETRIEVE_TOTAL_SUCCESS: {
      return {
        ...state,
        total: action.payload,
      };
    }
    case TithingActionsTypes.GET_TOTAL_BY_CHURCH_SUCCESS: {
      return {
        ...state,
        total: action.payload,
      };
    }
    case TithingActionsTypes.LIST_TITHINGS_SUCCES: {
      return {
        ...state,
        pageInfo: {
          startDate: action.pageInfo.startDate,
          endDate: action.pageInfo.endDate,
        },
        tithings: action.payload,
      };
    }
    case TithingActionsTypes.LIST_TITHINGS_ADM_SUCCES: {
      return {
        ...state,
        pageInfo: {
          startDate: action.pageInfo.startDate,
          endDate: action.pageInfo.endDate,
        },
        tithings: action.payload,
      };
    }
    case TithingActionsTypes.FETCH_LATEST_RECORDS_SUCCES: {
      return {
        ...state,
        pageInfo: state.pageInfo,
        tithings: action.payload,
      };
    }
    default:
      return state;
  }
}
