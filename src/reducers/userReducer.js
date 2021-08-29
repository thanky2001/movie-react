import { LOGOUT_USER } from "../constants/auth";
import { ADD_USER_SUCCESS, CHANGE_USER_REQUEST, CHANGE_USER_SUCCESS, CURRENT_USER_FAILURE, CURRENT_USER_REQUEST, CURRENT_USER_SUCCESS, DELETE_USER_SUCCESS, GET_LIST_TYPE_USER_REQUEST, GET_LIST_TYPE_USER_SUCCESS, GET_LIST_USER_REQUEST, GET_LIST_USER_SUCCESS, UPDATE_USER_SUCCESS } from "../constants/user";




const initialState={
    currentUser:null,
    isLoading: false,
    errorGetUser: null,
    listUser: null,
    typeUser: null,
    isReload: false,
};
function userReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_USER_REQUEST:
            return {...state, isLoading:true}
        case CHANGE_USER_SUCCESS:
            return {...state, isLoading:false, currentUser: action.payload.data}
        case CURRENT_USER_REQUEST:
            return {...state, isLoading:true}
        case CURRENT_USER_SUCCESS:
            return {...state, isLoading:false, currentUser: action.payload.data}
        case CURRENT_USER_FAILURE:
            return {...state, isLoading:false, errorGetUser: action.payload.error}
        case GET_LIST_USER_REQUEST:
            return {...state, isLoading: true, listUser: null};
        case GET_LIST_USER_SUCCESS:
            return {...state, isLoading: false, listUser: action.payload.data};
        case GET_LIST_TYPE_USER_REQUEST:
            return {...state, isLoading: true};
        case ADD_USER_SUCCESS: 
            return {...state, isReload: !state.isReload};
        case UPDATE_USER_SUCCESS: 
            return {...state, isReload: !state.isReload};
        case DELETE_USER_SUCCESS: 
            return {...state, isReload: !state.isReload};
        case GET_LIST_TYPE_USER_SUCCESS:
            return {...state, isLoading: false, typeUser: action.payload.data};
        case LOGOUT_USER:
            return {...state, isLoading: false, currentUser: null};
        default:
            return state;
    }
}
export default userReducer