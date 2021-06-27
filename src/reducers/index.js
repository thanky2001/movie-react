import { combineReducers } from "redux";
import authReducer from "./authReducer"

const rootReducer = combineReducers({
    //Khai báo store con
    authReducer,

});
export default rootReducer;