import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_USER, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "../constants/auth";

const userInfo = localStorage.getItem("userInfo") ?
JSON.parse(localStorage.getItem("userInfo")) :
null;

const initialState={
    userInfo,
    isLoading: false,
    errorLog: null,
    errorRegister: null,
};

function authReducer (state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {...state, isLoading: true, errorRegister: null, errorLog: null};
        case LOGIN_SUCCESS:
            return {...state, isLoading: false, errorRegister: null, userInfo:  action.payload.data};
        case LOGIN_FAILURE:
            return {...state, isLoading: false, errorRegister: null, errorLog: action.payload.error};
        case REGISTER_REQUEST:
            return {...state, isLoading: true, errorLog: null, errorRegister: null};
        case REGISTER_SUCCESS:
            return {...state, isLoading: false, errorLog: null, userInfo:  action.payload.data};
        case REGISTER_FAILURE:
            return {...state, isLoading: false, errorLog: null, errorRegister: action.payload.error};
        case LOGOUT_USER:
        localStorage.removeItem("userInfo");
        return {...state, isLoading: false, userInfo: null};
        default:
            return state;
    }
}
export default authReducer;