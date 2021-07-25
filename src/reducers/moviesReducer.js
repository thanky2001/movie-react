import {
    ADD_LIST_MOVIE_BY_PARENT_CINEMA,
    ADD_LIST_MOVIE_BY_PARENT_CINEMA_ERROR
} from "../constants/cinemas";
import {
    GET_MOVIES_BY_DATE_FAILURE,
    GET_MOVIES_BY_DATE_REQUEST,
    GET_MOVIES_BY_DATE_SUCCESS,
    GET_MOVIES_DETAIL_PAGE_REQUEST,
    GET_MOVIES_DETAIL_PAGE_SUCCESS,
    GET_MOVIES_LIST_FAILURE,
    GET_MOVIES_LIST_REQUEST,
    GET_MOVIES_LIST_SUCCESS
} from "../constants/movies";



const initialState = {
    ListMoviesByParentCinemas: null,
    listMoviesByDate: null,
    isLoading: false,
    errorlistMoviesByDate: null,
    listFilmsNow: null,
    pageCountNow: 1,
    pageCountUpComming: 1,
    errorListFilm: null,
    detailFilm: null,
};

function moviesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MOVIES_BY_DATE_REQUEST:
            return {
                ...state, isLoading: true, errorlistMoviesByDate: null, listMoviesByDate: null
            };
        case GET_MOVIES_BY_DATE_SUCCESS:
            return {
                ...state, isLoading: false, errorlistMoviesByDate: null, listMoviesByDate: action.payload.data
            };
        case GET_MOVIES_BY_DATE_FAILURE:
            return {
                ...state, isLoading: false, listMoviesByDate: null, errorlistMoviesByDate: action.payload.error
            };
        case GET_MOVIES_LIST_REQUEST:
            return {
                ...state, isLoading: true, listFilms: null, errorListFilm: null
            };
        case GET_MOVIES_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                    errorListFilm: null,
                    listFilmsNow: action.payload.listFilmsNow,
                    pageCountNow: action.payload.pageCountNow,
                    pageCountUpComming: action.payload.pageCountUpComming,
            };
        case GET_MOVIES_LIST_FAILURE:
            return {
                ...state, isLoading: false, listFilms: null, errorListFilm: action.payload.error
            };
        case ADD_LIST_MOVIE_BY_PARENT_CINEMA:
            return {
                ...state, ListMoviesByParentCinemas: action.payload.data
            };
        case ADD_LIST_MOVIE_BY_PARENT_CINEMA_ERROR:
            return {
                ...state, ListMoviesByParentCinemas: null
            };
        case GET_MOVIES_DETAIL_PAGE_REQUEST:
            return {
                ...state, isLoading:true
            };
        case GET_MOVIES_DETAIL_PAGE_SUCCESS:
            return {
                ...state, detailFilm: action.payload.data,isLoading: false
            };
        default:
            return state
    }
}
export default moviesReducer;