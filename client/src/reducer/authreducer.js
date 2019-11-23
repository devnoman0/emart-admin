import { SET_CURRENT_USER, STATE_LOADING } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  stateLoading: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
        // stateLoading: false
      };
    case STATE_LOADING:
      return {
        ...state,
        stateLoading: true
      };
    default:
      return state;
  }
}
