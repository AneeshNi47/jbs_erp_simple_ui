import { ADD_LABOUR, UPDATE_LABOUR, GET_LABOUR, GET_LABOURS } from "../actions/types";

const initialState = {
  labours: [],
  labour: {},
};

function laboursReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LABOURS:
      return {
        ...state,
        labours: action.payload,
      };
    case GET_LABOUR:
      return {
        ...state,
        labour: action.payload,
      };
    case ADD_LABOUR:
      return {
        ...state,
        labours: [...state.labours, action.payload],
      };
    case UPDATE_LABOUR:
      let updatedItems = [...state.labours];
      for (let i = 0; i < updatedItems.length; i++) {
        if (updatedItems[i].id === action.payload.id) {
          updatedItems[i] = action.payload;
          break;
        }
      }
      return {
        ...state,
        labours: updatedItems,
      };

    default:
      return state;
  }
}

export default laboursReducer;
