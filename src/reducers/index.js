import { combineReducers } from "redux";
import tasksReducer from "./tasks";
import projectsReducer from "./projects";
import clientsReducer from "./clients";
import purchasesReducer from "./purchase";
import laboursReducer from "./labour";
import subcontractorsReducer from "./subcontractor";
import authReducer from "./auth";
import errors from "./errors";
import companyUsersReducer from "./company_users";
import messages from "./messages";


export default combineReducers({
  tasksReducer: tasksReducer,
  companyUsersReducer: companyUsersReducer,
  projectsReducer: projectsReducer,
  purchasesReducer: purchasesReducer,
  laboursReducer: laboursReducer,
  clientsReducer: clientsReducer,
  subcontractorsReducer: subcontractorsReducer,
  authReducer: authReducer,
  errorReducer: errors,
  messageReducer: messages,
});
