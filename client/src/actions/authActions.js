import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, STATE_LOADING } from "./types";

export const loginadmin = userData => dispatch => {
  dispatch(setStateLoading());
  axios.post("/admin/login", userData).then(res => {
    if (res.data.message) {
      dispatch({
        type: GET_ERRORS,
        payload: res.data.message
      });
    } else {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decodeed = jwt_decode(token);
      dispatch(setCurrentUser(decodeed));
    }
  });
};

export const logoutadmin = () => dispatch => {
  localStorage.removeItem("jwtToken");
  const decodeed = {};
  setAuthToken();
  dispatch(setCurrentUser(decodeed));
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
export const setStateLoading = () => {
  return {
    type: STATE_LOADING
  };
};
