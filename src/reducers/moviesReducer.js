import {
    ADD_LIST_MOVIE_BY_PARENT_CINEMA,
    ADD_LIST_MOVIE_BY_PARENT_CINEMA_ERROR,
    GET_SHOWTIME_FILM_FAILURE,
    GET_SHOWTIME_FILM_REQUEST,
    GET_SHOWTIME_FILM_SUCCESS
} from "../constants/cinemas";
import {
    ADD_FILM_SUCCESS,
    DELETE_FILM_SUCCESS,
    EDIT_FILM_SUCCESS,
    GET_MOVIES_BY_DATE_FAILURE,
    GET_MOVIES_BY_DATE_REQUEST,
    GET_MOVIES_BY_DATE_SUCCESS,
    GET_MOVIES_LIST_FAILURE,
    GET_MOVIES_LIST_REQUEST,
    GET_MOVIES_LIST_SUCCESS,
    GET_PAGING_LIST_MOVIES_REQUEST,
    GET_PAGING_LIST_MOVIES_SUCCESS
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
    listMovies: null, 
    isReload: false,
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
        case GET_SHOWTIME_FILM_REQUEST:
            return {...state, detailFilm: null}
        case GET_SHOWTIME_FILM_SUCCESS:
            return {...state, isLoading: false, detailFilm: action.payload.data}
        case GET_SHOWTIME_FILM_FAILURE:
            return {...state, detailFilm: null}
        case GET_PAGING_LIST_MOVIES_REQUEST:
            return {...state, isLoading: true};
        case GET_PAGING_LIST_MOVIES_SUCCESS:
            return {...state, isLoading: false, listMovies: action.payload.data};
        case ADD_FILM_SUCCESS:
            return {...state, isReload: !state.isReload};
        case EDIT_FILM_SUCCESS:
            return {...state, isReload: !state.isReload};
        case DELETE_FILM_SUCCESS:
            return {...state, isReload: !state.isReload};
        default:
            return state
    }
}
export default moviesReducer;