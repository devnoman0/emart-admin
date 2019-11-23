import {
  GET_ALL_BRANDS,
  BRAND_STATE_LOADING,
  ADD_BRAND__BUTTON_LOADING,
  ADD_BRAND
} from "../actions/types";

const initialState = {
  brands: [],
  brandsLoading: false,
  addBrandBtnLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BRAND_STATE_LOADING:
      return {
        ...state,
        brandsLoading: true
      };
    case ADD_BRAND__BUTTON_LOADING:
      return {
        ...state,
        addBrandBtnLoading: !state.addBrandBtnLoading
      };
    case GET_ALL_BRANDS:
      return {
        ...state,
        brands: action.payload,
        brandsLoading: false
      };

    case ADD_BRAND:
      return {
        ...state,
        brands: [action.payload, ...state.categories],
        addBrandBtnLoading: false
      };
    default:
      return state;
  }
}
