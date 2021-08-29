import axiosClient from "../services/axiosClient";
import {CURRENT_USER_REQUEST, CURRENT_USER_FAILURE, CURRENT_USER_SUCCESS, CHANGE_USER_REQUEST, CHANGE_USER_SUCCESS, ADD_USER_SUCCESS, UPDATE_USER_SUCCESS, DELETE_USER_SUCCESS} from "../constants/user"
import {login} from'./auth';
import { toast } from "react-toastify";
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
export function addUser(values,callback) {
    return async (dispatch)=>{
        try {
            await axiosClient.post("/QuanLyNguoiDung/ThemNguoiDung", values);
            dispatch({
                type: ADD_USER_SUCCESS,
            })
            callback()
            return toast.success('Thêm thành công.')
        } catch (error) {
            return toast.error(error.response.data)
        }
    }
}
export function updateUser(values, callback) {
    return async (dispatch)=>{
        try {
            await axiosClient.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", values);
            dispatch({
                type: UPDATE_USER_SUCCESS,
            });
            callback()
            return toast.success('Cập nhật thành công.')
        } catch (error) {
            dispatch({
                type: DELETE_USER_SUCCESS,
            });
            return toast.error(error.response.data)
        }
    }
}
export function deleteUser(account) {
    return async (dispatch)=>{
        try {
            await axiosClient.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${account}`);
            dispatch({
                type: DELETE_USER_SUCCESS,
            });
            return toast.success('Xóa thành công.')
        } catch (error) {
            dispatch({
                type: DELETE_USER_SUCCESS,
            });
            return toast.error(error.response.data)
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
                text: 'Đổi thông tin thành công',
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
                text: error.response.data,
                showConfirmButton: false,
                timer: 1000
            })
        }
    }
}