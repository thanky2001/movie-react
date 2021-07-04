import axiosClient from "../services/axiosClient";
import {CURRENT_USER_REQUEST, CURRENT_USER_FAILURE, CURRENT_USER_SUCCESS, CHANGE_USER_REQUEST, CHANGE_USER_SUCCESS, CHANGE_USER_FAILURE} from "../constants/user"



export function getCurrentUser(values) {
    return async (dispatch)=>{
        dispatch({
            type: CURRENT_USER_REQUEST,
        });
        try {
            const {data} = await axiosClient.post("/QuanLyNguoiDung/ThongTinTaiKhoan", values);
            dispatch({
                type: CURRENT_USER_SUCCESS,
                payload: {data},
            })
        } catch (error) {
            dispatch({
                type: CURRENT_USER_FAILURE,
                payload: {error: error.response.data},
            })
        }
    }
}
export function changeUserInfo(values) {
    return async (dispatch)=>{
        dispatch({
            type: CHANGE_USER_REQUEST,
        });
        try {
            const {data} = await axiosClient.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", values);
            dispatch({
                type: CHANGE_USER_SUCCESS,
                payload: {data},
            })
        } catch (error) {
            dispatch({
                type: CHANGE_USER_FAILURE,
                payload: {error: error.response.data},
            })
        }
    }
}