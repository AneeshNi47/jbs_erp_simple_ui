import { GET_COMPANY_USER, GET_COMPANY_USERS, ADD_COMPANY_USER, UPDATE_COMPANY_USER } from "../actions/types";

const initialState = {
    companyUsers: [],
    companyUser: {},
};

function companyUsersReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COMPANY_USERS:
            return {
                ...state,
                companyUsers: action.payload,
            };
        case GET_COMPANY_USER:
            return {
                ...state,
                companyUser: action.payload,
            };
        case ADD_COMPANY_USER:
            return {
                ...state,
                companyUsers: [...state.companyUsers, action.payload],
            };
        case UPDATE_COMPANY_USER:
            let updatedItems = [...state.companyUsers];
            for (let i = 0; i < updatedItems.length; i++) {
                if (updatedItems[i].id === action.payload.id) {
                    updatedItems[i] = action.payload;
                    break;
                }
            }
            return {
                ...state,
                companyUsers: updatedItems,
            };

        default:
            return state;
    }
}

export default companyUsersReducer;
