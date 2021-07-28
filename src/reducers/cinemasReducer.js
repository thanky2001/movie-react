import {ADD_SHOWTIME_FILM_BY_SYSTEM_FAILURE, ADD_SHOWTIME_FILM_BY_SYSTEM_SUCCESS, GET_PARENT_CINEMAS_REQUEST, GET_PARENT_CINEMAS_SUCCESS, GET_SHOWTIME_BY_PARENT_CINEMAS_REQUEST, GET_SHOWTIME_BY_PARENT_CINEMAS_SUCCESS} from "../constants/cinemas";

const initialState={
    parentCinemas: null,
    isLoading: false,
    showtimeBySystem: null,
    listStFilm: null,
}

function cinemasReducer (state = initialState, action) {
    switch (action.type) {
        case GET_PARENT_CINEMAS_REQUEST:
            return {...state, isLoading: true, parentCinemas: null}
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
        default:
            return state;
    }
}
export default cinemasReducer;