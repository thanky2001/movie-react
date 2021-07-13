import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import moviesReducer from "./moviesReducer";
import cinemasReducer from "./cinemasReducer";

const rootReducer = combineReducers({
    //Khai báo store con
    authReducer,
    userReducer,
    moviesReducer,
    cinemasReducer,


});
export default rootReducer;