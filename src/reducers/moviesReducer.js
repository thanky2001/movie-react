import { GET_MOVIES_BY_DATE_FAILURE, GET_MOVIES_BY_DATE_REQUEST, GET_MOVIES_BY_DATE_SUCCESS, GET_MOVIES_LIST_FAILURE, GET_MOVIES_LIST_REQUEST, GET_MOVIES_LIST_SUCCESS } from "../constants/movies";



const initialState={
    listMoviesByDate:null,
    isLoading: false,
    errorlistMoviesByDate: null,
    listFilmsNow: null,
    pageCountNow: 1,
    pageCountUpComming: 1,
    errorListFilm: null,
};
function moviesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MOVIES_BY_DATE_REQUEST:
            return {...state,isLoading: true, errorlistMoviesByDate: null, listMoviesByDate:null};
        case GET_MOVIES_BY_DATE_SUCCESS:
            return {...state,isLoading: false, errorlistMoviesByDate: null, listMoviesByDate: action.payload.data};
        case GET_MOVIES_BY_DATE_FAILURE:
            return {...state,isLoading: false, listMoviesByDate:null, errorlistMoviesByDate: action.payload.error};
        case GET_MOVIES_LIST_REQUEST:
            return {...state,isLoading: true, listFilms:null, errorListFilm: null};
        case GET_MOVIES_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false, 
                errorListFilm:null, 
                listFilmsNow: action.payload.listFilmsNow,
                pageCountNow: action.payload.pageCountNow,
                pageCountUpComming: action.payload.pageCountUpComming,
            };
        case GET_MOVIES_LIST_FAILURE:
            return {...state,isLoading: false, listFilms:null, errorListFilm: action.payload.error};
        default:
            return state
    }
}
export default moviesReducer;