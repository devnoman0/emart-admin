import axios from "axios";
import {
  GET_ALL_BRANDS,
  BRAND_STATE_LOADING,
  ADD_BRAND__BUTTON_LOADING,
  ADD_BRAND,
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";

export const getAllBrands = () => dispatch => {
  dispatch(setBrandStateLoading());
  axios.get("/brands/").then(res => {
    dispatch({
      type: GET_ALL_BRANDS,
      payload: res.data
    });
  });
};

export const addBrand = catData => dispatch => {
  dispatch(setBrandAddBtnLoadin());
  axios
    .post("/brands/add", catData)
    .then(res => {
      dispatch({
        type: ADD_BRAND,
        payload: res.data
      });
      dispatch({
        type: CLEAR_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch(setBrandAddBtnLoadin());
    });
};

export const setBrandStateLoading = () => {
  return {
    type: BRAND_STATE_LOADING
  };
};

export const setBrandAddBtnLoadin = () => {
  return {
    type: ADD_BRAND__BUTTON_LOADING
  };
};
