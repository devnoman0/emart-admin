import { combineReducers } from "redux";
import authReducer from "./authreducer";
import errorReducer from "./errorreducer";
import brandReducer from "./brandreducer";
import categoryReducer from "./categoryreducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  brand: brandReducer,
  categories: categoryReducer
});
