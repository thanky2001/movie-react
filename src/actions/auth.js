import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_USER } from '../constants/auth';
import authAPI from '../services/authAPI';

export function login(values){
    return async(dispatch) =>{
        dispatch({ 
            type: LOGIN_REQUEST
        });
        try {
            const {data} = await authAPI.login(values);
            localStorage.setItem("userInfo", JSON.stringify(data));
            dispatch({ 
                type: LOGIN_SUCCESS, 
                payload: {data}
            });
        } catch (error) {
            dispatch({ 
                type: LOGIN_FAILURE,
                payload: {error: error.response.data},
            });
            
        }
    };
}
export function logOut() {
    return (dispatch)=>{
        dispatch({
            type: LOGOUT_USER
        })
    }
}