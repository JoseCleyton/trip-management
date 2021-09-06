import { Church } from 'src/app/shared/model/church.model';
import { PageInfo } from 'src/app/shared/model/page-info.model';
import { Pageable } from 'src/app/shared/model/pageable.model';
import { ChurchActions, ChurchActionsTypes } from './church.actions';

export interface ChurchState {
  filters: any;
  pageable: Pageable;
  pageInfo: PageInfo;
  quantity: number;
  churchs: Church[];
  selectedChurch: Church;
}

export const initialState: ChurchState = {
  filters: {
    name: '',
  },
  pageable: {
    direction: 'ASC',
    size: 5,
    page: 0,
    sort: 'name',
  },
  pageInfo: {
    totalElements: undefined,
    totalPages: undefined,
  },
  quantity: 0,
  churchs: [],
  selectedChurch: undefined,
};

export function churchReducer(
  state = initialState,
  action: ChurchActions
): ChurchState {
  switch (action.type) {
    case ChurchActionsTypes.GET_QUANTITY_SUCCESS: {
      return {
        ...state,
        quantity: action.payload,
      };
    }
    case ChurchActionsTypes.LIST_CHURCHS_SUCCES: {
      return {
        ...state,
        filters: { ...action.filters },
        pageable: { ...action.pageable },
        pageInfo: { ...action.pageInfo },
        churchs: action.payload,
      };
    }
    case ChurchActionsTypes.LIST_ALL_CHURCHS_SUCCES: {
      return {
        ...state,
        churchs: action.payload,
      };
    }
    case ChurchActionsTypes.ADD_CHURCH_SUCCES: {
      return {
        ...state,
        churchs: [...state.churchs, action.payload],
      };
    }
    case ChurchActionsTypes.SELECT_CHURCH: {
      return {
        ...state,
        selectedChurch: action.church,
      };
    }
    case ChurchActionsTypes.DELETE_CHURCH_SUCCES: {
      return {
        ...state,
        churchs: state.churchs.filter((church) => church.id !== action.id),
      };
    }
    case ChurchActionsTypes.EDIT_CHURCH_SUCCES: {
      const churchsAux = state.churchs.filter(
        (church) => church.id !== action.payload.id
      );

      return {
        ...state,
        churchs: [...churchsAux, action.payload],
      };
    }
    default:
      return state;
  }
}
