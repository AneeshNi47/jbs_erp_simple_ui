import { GET_CLIENT,GET_CLIENTS,ADD_CLIENT,UPDATE_CLIENT } from "../actions/types";

const initialState = {
  clients: [],
  client: {},
};

function clientsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CLIENTS:
      return {
        ...state,
        clients: action.payload,
      };
    case GET_CLIENT:
      return {
        ...state,
        client: action.payload,
      };
    case ADD_CLIENT:
      return {
        ...state,
        clients: [...state.clients, action.payload],
      };
    case UPDATE_CLIENT:
      let updatedItems = [...state.clients];
      for (let i = 0; i < updatedItems.length; i++) {
        if (updatedItems[i].id === action.payload.id) {
          updatedItems[i] = action.payload;
          break;
        }
      }
      return {
        ...state,
        clients: updatedItems,
      };

    default:
      return state;
  }
}

export default clientsReducer;
