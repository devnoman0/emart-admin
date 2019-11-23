import axios from "axios";
import {
  GET_ALL_CATEGORY,
  CATEGORY_STATE_LOADING,
  GET_ALL_SUB_CATEGORY,
  GET_ERRORS,
  ADD_CATEGORY,
  ADD_BUTTON_LOADING,
  CLEAR_ERRORS
} from "./types";

export const getAllCategory = () => dispatch => {
  dispatch(setCategoryStateLoading());
  axios.get("/category/").then(res => {
    dispatch({
      type: GET_ALL_CATEGORY,
      payload: res.data
    });
  });
};
export const addCategory = catData => dispatch => {
  dispatch(setAddBtnLoadin());
  axios
    .post("/category/add", catData)
    .then(res => {
      dispatch({
        type: ADD_CATEGORY,
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
        payload: err.response.data.message
      });
      dispatch(setAddBtnLoadin());
    });
};
export const getAllSubCategory = () => dispatch => {
  dispatch(setCategoryStateLoading());
  axios.get("/sub-category").then(res => {
    dispatch({
      type: GET_ALL_SUB_CATEGORY,
      payload: res.data
    });
  });
};

export const setCategoryStateLoading = () => {
  return {
    type: CATEGORY_STATE_LOADING
  };
};
export const setAddBtnLoadin = () => {
  return {
    type: ADD_BUTTON_LOADING
  };
};
