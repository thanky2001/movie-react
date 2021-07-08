import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import moviesReducer from "./moviesReducer";

const rootReducer = combineReducers({
    //Khai báo store con
    authReducer,
    userReducer,
    moviesReducer,


});
export default rootReducer;