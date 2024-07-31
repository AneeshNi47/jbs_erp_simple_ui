import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { BASE_URL } from "./types";

import { tokenConfig } from "./auth";

export const getItems = (type, itemName, filterName, filterValue) => (dispatch, getState) => {

  var url =
    filterValue === null
      ? `${BASE_URL}/api/${itemName}`
      : `${BASE_URL}/api/${itemName}?${filterName}=${filterValue}`;

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: type,
        payload: res.data.results,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = (type, itemName, addObjectData) => (dispatch, getState) => {
  axios
    .post(`${BASE_URL}/api/${itemName}/`, addObjectData, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ itemAdded: `${itemName} Successfully Added` }));
      dispatch({
        type: type,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateItem = (type, itemName, itemId, updateItemData) => (dispatch, getState) => {
  axios
    .put(`${BASE_URL} /api/${itemName}/${itemId}/`, updateItemData, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ itemUpdated: `${itemName} Successfully Updated` }));
      dispatch({
        type: type,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
