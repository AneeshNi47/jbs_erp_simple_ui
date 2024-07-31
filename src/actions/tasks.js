import axios from "axios";
import { GET_TASKS, ADD_TASK, DELETE_TASK, UPDATE_TASK } from "./types";
import { createMessage, returnErrors } from "./messages";

import { tokenConfig } from "./auth";

export const getTasks = (statusFilter) => (dispatch, getState) => {
  var url =
    statusFilter === null
      ? "/api/tasks/"
      : `/api/tasks/?status=${statusFilter}`;

  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_TASKS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addTask = (task) => (dispatch, getState) => {
  axios
    .post(`/api/tasks/`, task, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ itemAdded: `Task Successfully Added` }));
      dispatch({
        type: ADD_TASK,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateTask = (taskId, task) => (dispatch, getState) => {
  axios
    .put(`/api/tasks/${taskId}/`, task, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ itemUpdated: `$Task Successfully Updated` }));
      dispatch({
        type: UPDATE_TASK,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
