import { GET_LIST_TYPE_USER_REQUEST, GET_LIST_TYPE_USER_SUCCESS } from "../constants/user";
import axiosClient from "../services/axiosClient";

export function getListTypeUser() {
    return async(dispatch) =>{
        dispatch({
            type: GET_LIST_TYPE_USER_REQUEST,
        })
        try {
            const {data} = await axiosClient.get('/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung');
            dispatch({
                type: GET_LIST_TYPE_USER_SUCCESS,
                payload: {data}
            })
        } catch (error) {
            console.log(error);
        }
    }
}