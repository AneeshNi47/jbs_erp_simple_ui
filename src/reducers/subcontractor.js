import {
  ADD_SUBCONTRACTOR,
  GET_SUBCONTRACTORS,
  GET_SUBCONTRACTOR,
  DELETE_SUBCONTRACTOR,
  UPDATE_SUBCONTRACTOR,
  GET_SUBCONTRACTOR_INVOICE,
  GET_SUBCONTRACTOR_INVOICES,
  ADD_SUBCONTRACTOR_INVOICE,
} from "../actions/types";

const initialState = {
  subcontractors: [],
  subcontractor: {},
  subcontractor_invoices: [],
  subcontractor_invoice: {}
};

function subcontractorsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SUBCONTRACTOR:
      return {
        ...state,
        subcontractors: action.payload,
      };
    case GET_SUBCONTRACTOR_INVOICES:
      return {
        ...state,
        subcontractor_invoices: action.payload,
      };
    case GET_SUBCONTRACTORS:
      return {
        ...state,
        subcontractors: action.payload,
      };
    case GET_SUBCONTRACTOR_INVOICE:
      return {
        ...state,
        subcontractor_invoice: action.payload,
      };
    case ADD_SUBCONTRACTOR:
      return {
        ...state,
        subcontractors: [...state.subcontractors, action.payload],
      };
    case ADD_SUBCONTRACTOR_INVOICE:
      return {
        ...state,
        subcontractor_invoice: [...state.subcontractor_invoice, action.payload],
      };
    case UPDATE_SUBCONTRACTOR:
      let updatedItems = [...state.subcontractors];
      for (let i = 0; i < updatedItems.length; i++) {
        if (updatedItems[i].id === action.payload.id) {
          updatedItems[i] = action.payload;
          break;
        }
      }
      return {
        ...state,
        subcontractors: updatedItems,
      };

    default:
      return state;
  }
}

export default subcontractorsReducer;
