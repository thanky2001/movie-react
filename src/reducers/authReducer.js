import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../constants/auth";

const userInfo = localStorage.getItem("userInfo") ?
JSON.parse(localStorage.getItem("userInfo")) :
null;

const initialState={
    userInfo,
    isLoading: false,
    errors: null,
};

function authReducer (state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {...state, isLoading: true, errors: null};
        case LOGIN_SUCCESS:
            return {...state, isLoading: false, userInfo:  action.payload.data};
        case LOGIN_FAILURE:
            return {...state, isLoading: false, errors: action.payload.error};
        default:
            return state;
    }
}
export default authReducer;