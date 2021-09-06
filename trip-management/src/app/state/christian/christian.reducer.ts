import { Christian } from 'src/app/shared/model/christian.model';
import { PageInfo } from 'src/app/shared/model/page-info.model';
import { Pageable } from 'src/app/shared/model/pageable.model';
import { ChristianActions, ChristianActionsTypes } from './christian.actions';

export interface ChristianState {
  filters: any;
  pageable: Pageable;
  pageInfo: PageInfo;
  christians: Christian[];
  selectedChristian: Christian;
  quantityChristians: number;
}

export const initialState: ChristianState = {
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
  christians: [],
  selectedChristian: undefined,
  quantityChristians: 0,
};

export function christianReducer(
  state = initialState,
  action: ChristianActions
): ChristianState {
  switch (action.type) {
    case ChristianActionsTypes.LIST_CHRISTIAN_SUCCES: {
      return {
        ...state,
        filters: { ...action.filters },
        pageable: { ...action.pageable },
        pageInfo: { ...action.pageInfo },
        christians: action.payload,
      };
    }
    case ChristianActionsTypes.FIND_BY_CHRISTIAN_SUCCES: {
      state.christians = [];
      return {
        ...state,
        filters: {
          id: action.payload.id,
          name: state.filters.name,
          monthOfBirthday: state.filters.monthOfBirthday,
        },
        christians: [action.payload],
        pageInfo: {
          totalElements: 1,
          totalPages: 1,
        },
      };
    }

    case ChristianActionsTypes.ADD_CHRISTIAN_SUCCES: {
      return {
        ...state,
        christians: [...state.christians, action.payload],
      };
    }
    case ChristianActionsTypes.SELECT_CHRISTIAN: {
      return {
        ...state,
        selectedChristian: action.christian,
      };
    }
    case ChristianActionsTypes.DELETE_CHRISTIAN_SUCCES: {
      return {
        ...state,
        christians: state.christians.filter(
          (christian) => christian.id !== action.id
        ),
      };
    }
    case ChristianActionsTypes.EDIT_CHRISTIAN_SUCCES: {
      const christiansAux = state.christians.filter(
        (christian) => christian.id !== action.payload.id
      );

      return {
        ...state,
        christians: [...christiansAux, action.payload],
      };
    }
    case ChristianActionsTypes.GET_QUANTITY_CHRISTIANS_SUCCESS: {
      return {
        ...state,
        quantityChristians: action.payload,
      };
    }
    default:
      return state;
  }
}
