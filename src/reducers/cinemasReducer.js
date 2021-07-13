import { GET_INFO_BY_PARENT_CINEMAS_REQUEST, GET_INFO_BY_PARENT_CINEMAS_SUCCESS, GET_PARENT_CINEMAS_REQUEST, GET_PARENT_CINEMAS_SUCCESS } from "../constants/cinemas";

const initialState={
    parentCinemas: null,
    isLoading: false,
    cinemasBySystem: null,
}

function cinemasReducer (state = initialState, action) {
    switch (action.type) {
        case GET_PARENT_CINEMAS_REQUEST:
            return {...state, isLoading: true, parentCinemas: null}
        case GET_PARENT_CINEMAS_SUCCESS:
            return {...state, isLoading: false, parentCinemas: action.payload.data}
        case GET_INFO_BY_PARENT_CINEMAS_REQUEST:
            return {...state,isLoading: true, cinemasBySystem: null}
        case GET_INFO_BY_PARENT_CINEMAS_SUCCESS:
            return {...state, isLoading: false, cinemasBySystem: action.payload.data}
        default:
            return state;
    }
}
export default cinemasReducer;