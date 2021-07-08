import axiosClient from "../services/axiosClient";
import {CURRENT_USER_REQUEST, CURRENT_USER_FAILURE, CURRENT_USER_SUCCESS, CHANGE_USER_REQUEST, CHANGE_USER_SUCCESS} from "../constants/user"
import {login} from'./auth';
import Swal from "sweetalert2";


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
export function changeUserInfo(values,oldPass) {
    return async (dispatch)=>{
        dispatch({
            type: CHANGE_USER_REQUEST,
        });
        try {
            const {data} = await axiosClient.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", values);
            dispatch({
                type: CHANGE_USER_SUCCESS,
                payload: {data}
            })
            let log = {
                taiKhoan: data.taiKhoan,
                matKhau: data.matKhau,
            }
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Đổi thông tin thành công',
                showConfirmButton: false,
                timer: 1000
            })
            if (data.matKhau !== oldPass) {
                dispatch(login(log))
            }
        } catch (error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: error.response.data,
                showConfirmButton: false,
                timer: 1000
            })
        }
    }
}