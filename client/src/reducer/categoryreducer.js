import {
  GET_ALL_CATEGORY,
  CATEGORY_STATE_LOADING,
  GET_ALL_SUB_CATEGORY,
  ADD_CATEGORY,
  ADD_BUTTON_LOADING
} from "../actions/types";

const initialState = {
  categories: [],
  subcategories: [],
  categoriesLoading: false,
  addButtonLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CATEGORY_STATE_LOADING:
      return {
        ...state,
        categoriesLoading: true
      };
    case ADD_BUTTON_LOADING:
      return {
        ...state,
        addButtonLoading: !state.addButtonLoading
      };
    case GET_ALL_CATEGORY:
      return {
        ...state,
        categories: action.payload,
        categoriesLoading: false
      };
    case GET_ALL_SUB_CATEGORY:
      return {
        ...state,
        subcategories: action.payload,
        categoriesLoading: false
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [action.payload, ...state.categories],
        addButtonLoading: false
      };
    default:
      return state;
  }
}
