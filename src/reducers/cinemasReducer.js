import {GET_PARENT_CINEMAS_REQUEST, GET_PARENT_CINEMAS_SUCCESS, GET_SHOWTIME_BY_PARENT_CINEMAS_REQUEST, GET_SHOWTIME_BY_PARENT_CINEMAS_SUCCESS } from "../constants/cinemas";

const initialState={
    parentCinemas: null,
    isLoading: false,
    showtimeBySystem: null,
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
        default:
            return state;
    }
}
export default cinemasReducer;