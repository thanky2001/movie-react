import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    //Khai báo store con
    authReducer,
    userReducer


});
export default rootReducer;