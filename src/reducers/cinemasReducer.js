import {ADD_SHOWTIME_FILM_BY_SYSTEM_FAILURE, ADD_SHOWTIME_FILM_BY_SYSTEM_SUCCESS, GET_LIST_CINEMAS_BY_SYSTEM_REQUEST, GET_LIST_CINEMAS_BY_SYSTEM_SUCCESS, GET_PARENT_CINEMAS_REQUEST, GET_PARENT_CINEMAS_SUCCESS, GET_SHOWTIME_BY_PARENT_CINEMAS_REQUEST, GET_SHOWTIME_BY_PARENT_CINEMAS_SUCCESS} from "../constants/cinemas";
import { ADD_LiST_DAY_HOMTOOLS_FAILURE, ADD_LiST_DAY_HOMTOOLS_SUCCESS } from "../constants/movies";

const initialState={
    parentCinemas: null,
    listCinemasBySystem: null,
    isLoading: false,
    showtimeBySystem: null,
    listStFilm: null,
    listDay:null, 
    showtimeByCinema:null,
}

function cinemasReducer (state = initialState, action) {
    switch (action.type) {
        case GET_PARENT_CINEMAS_REQUEST:
            return {...state, isLoading: true}
        case GET_PARENT_CINEMAS_SUCCESS:
            return {...state, isLoading: false, parentCinemas: action.payload.data}
        case GET_SHOWTIME_BY_PARENT_CINEMAS_REQUEST:
            return {...state,isLoading: true, showtimeBySystem: null}
        case GET_SHOWTIME_BY_PARENT_CINEMAS_SUCCESS:
            return {...state, isLoading: false, showtimeBySystem: action.payload.data[0]}
        case ADD_SHOWTIME_FILM_BY_SYSTEM_SUCCESS:
            return {...state, isLoading: false, listStFilm: action.payload.listStFilm}
        case ADD_SHOWTIME_FILM_BY_SYSTEM_FAILURE:
            return {...state, isLoading: false, listStFilm: null}
        case ADD_LiST_DAY_HOMTOOLS_SUCCESS:
            return {...state, isLoading: false, listDay: action.payload.listDay, showtimeByCinema:action.payload.showtimeByCinema}
        case ADD_LiST_DAY_HOMTOOLS_FAILURE:
            return {...state, isLoading: false, showtimeByCinema: null,listDay: null}
        case GET_LIST_CINEMAS_BY_SYSTEM_REQUEST:
            return {...state, listCinemasBySystem: null}
        case GET_LIST_CINEMAS_BY_SYSTEM_SUCCESS:
            return {...state, listCinemasBySystem: action.payload.data}
        default:
            return state;
    }
}
export default cinemasReducer;