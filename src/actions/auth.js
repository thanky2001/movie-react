import Swal from 'sweetalert2';
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_USER, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from '../constants/auth';
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
export function register(value){
    return async(dispatch)=>{
        dispatch({
            type: REGISTER_REQUEST,
        });
        try {
            const {data} = await authAPI.register(value);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Đăng ký thành công',
                showConfirmButton: false,
                timer: 1000
            })
            setTimeout(() => {
                localStorage.setItem("userInfo", JSON.stringify(data));
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: {data},
                });
            }, 1000);
        } catch (error) {
            dispatch({
                type: REGISTER_FAILURE,
                payload: {error: error.response.data},
            })
        }
    }
}
export function logOut() {
    return (dispatch)=>{
        dispatch({
            type: LOGOUT_USER
        })
    }
}