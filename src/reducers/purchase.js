import {
  ADD_PURCHASE, UPDATE_PURCHASE, GET_PURCHASE, GET_PURCHASES,
  ADD_MISC_PURCHASE, UPDATE_MISC_PURCHASE, GET_MISC_PURCHASE, GET_MISC_PURCHASES
} from "../actions/types";

const initialState = {
  purchases: [],
  purchase: {},
  misc_purchases: [],
  misc_purchase: {}
};

function purchasesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MISC_PURCHASES:
      return {
        ...state,
        misc_purchases: action.payload,
      };
    case GET_MISC_PURCHASE:
      return {
        ...state,
        misc_purchase: action.payload,
      };
    case ADD_MISC_PURCHASE:
      return {
        ...state,
        misc_purchases: [...state.misc_purchases, action.payload],
      };
    case UPDATE_MISC_PURCHASE:
      let updatedMiscItems = [...state.purchases];
      for (let i = 0; i < updatedMiscItems.length; i++) {
        if (updatedMiscItems[i].id === action.payload.id) {
          updatedMiscItems[i] = action.payload;
          break;
        }
      }
      return {
        ...state,
        misc_purchases: updatedMiscItems,
      };

    case GET_PURCHASES:
      return {
        ...state,
        purchases: action.payload,
      };
    case GET_PURCHASE:
      return {
        ...state,
        purchase: action.payload,
      };
    case ADD_PURCHASE:
      return {
        ...state,
        purchases: [...state.purchases, action.payload],
      };
    case UPDATE_PURCHASE:
      let updatedItems = [...state.purchases];
      for (let i = 0; i < updatedItems.length; i++) {
        if (updatedItems[i].id === action.payload.id) {
          updatedItems[i] = action.payload;
          break;
        }
      }
      return {
        ...state,
        purchases: updatedItems,
      };

    default:
      return state;
  }
}

export default purchasesReducer;
