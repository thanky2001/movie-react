import { CHANGE_USER_REQUEST, CHANGE_USER_SUCCESS, CURRENT_USER_FAILURE, CURRENT_USER_REQUEST, CURRENT_USER_SUCCESS } from "../constants/user";




const initialState={
    currentUser:null,
    isLoading: false,
    errorGetUser: null,
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
        default:
            return state;
    }
}
export default userReducer