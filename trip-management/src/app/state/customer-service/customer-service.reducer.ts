import { CustomerService } from 'src/app/shared/model/customer-service.model';
import { PageInfo } from 'src/app/shared/model/page-info.model';
import { Pageable } from 'src/app/shared/model/pageable.model';
import {
  CustomerServiceActions,
  CustomerServiceActionsTypes,
} from './customer-service.actions';

export interface CustomerServiceState {
  filters: any;
  pageable: Pageable;
  pageInfo: PageInfo;
  customersService: CustomerService[];
  selectedCustomerService: CustomerService;
  quantityCustomerServices: number;
}

export const initialState: CustomerServiceState = {
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
  customersService: [],
  selectedCustomerService: undefined,
  quantityCustomerServices: 0,
};

export function customerServiceReducer(
  state = initialState,
  action: CustomerServiceActions
): CustomerServiceState {
  switch (action.type) {
    case CustomerServiceActionsTypes.LIST_CUSTOMERS_SERVICE_SUCCESS: {
      return {
        ...state,
        filters: { ...action.filters },
        pageable: { ...action.pageable },
        pageInfo: { ...action.pageInfo },
        customersService: action.payload,
      };
    }
    case CustomerServiceActionsTypes.FIND_BY_ID_CUSTOMER_SERVICE_SUCCESS: {
      state.customersService = [];
      return {
        ...state,
        filters: {
          id: action.payload.id,
          name: state.filters.name,
          monthOfBirthday: state.filters.monthOfBirthday,
        },
        customersService: [action.payload],
        pageInfo: {
          totalElements: 1,
          totalPages: 1,
        },
      };
    }

    case CustomerServiceActionsTypes.ADD_CUSTOMER_SERVICE_SUCCESS: {
      return {
        ...state,
        customersService: [...state.customersService, action.payload],
      };
    }
    case CustomerServiceActionsTypes.SELECT_CUSTOMER_SERVICE: {
      return {
        ...state,
        selectedCustomerService: action.customerService,
      };
    }
    case CustomerServiceActionsTypes.DELETE_CUSTOMER_SERVICE_SUCCESS: {
      return {
        ...state,
        customersService: state.customersService.filter(
          (customerService) => customerService.id !== action.id
        ),
      };
    }
    case CustomerServiceActionsTypes.EDIT_CUSTOMER_SERVICE_SUCCESS: {
      const customersServiceAux = state.customersService.filter(
        (customerService) => customerService.id !== action.payload.id
      );

      return {
        ...state,
        customersService: [...customersServiceAux, action.payload],
      };
    }
    case CustomerServiceActionsTypes.GET_QUANTITY_CUSTOMERS_SERVICE_SUCCESS: {
      return {
        ...state,
        quantityCustomerServices: action.payload,
      };
    }
    default:
      return state;
  }
}
