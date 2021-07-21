import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import moviesReducer from "./moviesReducer";
import cinemasReducer from "./cinemasReducer";
import newsReducer from "./newsReducer";

const rootReducer = combineReducers({
    //Khai báo store con
    authReducer,
    userReducer,
    moviesReducer,
    cinemasReducer,
    newsReducer


});
export default rootReducer;