import { ADD_TASK, GET_TASK, GET_TASKS, UPDATE_TASK } from "../actions/types";

const initialState = {
  tasks: [],
  task: {},
};

function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case GET_TASK:
      return {
        ...state,
        task: action.payload,
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case UPDATE_TASK:
      let updatedItems = [...state.tasks];
      for (let i = 0; i < updatedItems.length; i++) {
        if (updatedItems[i].id === action.payload.id) {
          updatedItems[i] = action.payload;
          break;
        }
      }
      return {
        ...state,
        tasks: updatedItems,
      };

    default:
      return state;
  }
}

export default tasksReducer;
