import { ADD_PROJECT,UPDATE_PROJECT,GET_PROJECT, GET_PROJECTS } from "../actions/types";

const initialState = {
  projects: [],
  project: {},
};

function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case GET_PROJECT:
      return {
        ...state,
        project: action.payload,
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case UPDATE_PROJECT:
      let updatedItems = [...state.projects];
      for (let i = 0; i < updatedItems.length; i++) {
        if (updatedItems[i].id === action.payload.id) {
          updatedItems[i] = action.payload;
          break;
        }
      }
      return {
        ...state,
        projects: updatedItems,
      };

    default:
      return state;
  }
}

export default projectsReducer;
