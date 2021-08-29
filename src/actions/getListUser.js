import { GET_LIST_USER_REQUEST, GET_LIST_USER_SUCCESS } from "../constants/user"
import axiosClient from "../services/axiosClient"


export function getListUser(rowsPerPage, page, search) {
    return async(dispatch) => {
        dispatch({
            type: GET_LIST_USER_REQUEST
        })
        try {
            let {data} = await axiosClient.get(`/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP14${search && search !=='' ? `&tuKhoa=${search}` : ''}&soTrang=${page}&soPhanTuTrenTrang=${rowsPerPage}`);
            dispatch({
                type: GET_LIST_USER_SUCCESS,
                payload: {data}
            })
        } catch (error) {
            console.log(error);
        }
    }
}