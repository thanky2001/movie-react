import { toast } from "react-toastify";
import { ADD_FILM_SUCCESS, DELETE_FILM_SUCCESS, EDIT_FILM_SUCCESS, GET_MOVIES_BY_DATE_FAILURE, GET_MOVIES_BY_DATE_REQUEST, GET_MOVIES_BY_DATE_SUCCESS, GET_MOVIES_LIST_FAILURE, GET_MOVIES_LIST_REQUEST, GET_MOVIES_LIST_SUCCESS, GET_PAGING_LIST_MOVIES_REQUEST, GET_PAGING_LIST_MOVIES_SUCCESS } from "../constants/movies"
import axiosClient from "../services/axiosClient";
import { formatDate2 } from "../utils/format";


export function getListMoviesByDate(values,index) {
    return async (dispatch)=>{
        dispatch({
            type: GET_MOVIES_BY_DATE_REQUEST,
        })
        try {
            const {data} = await axiosClient.get(`/QuanLyPhim/LayDanhSachPhimTheoNgay?${values}`);
            dispatch({
                type: GET_MOVIES_BY_DATE_SUCCESS,
                payload: {data, index}
            })
        } catch (error) {
            dispatch({
                type: GET_MOVIES_BY_DATE_FAILURE,
                payload: {error: error.response.data}
            })
        }
    }
}
export function getListMovies(search = '') {
    return async(dispatch)=>{
        dispatch({
            type: GET_MOVIES_LIST_REQUEST,
        })
        try {
            const {data} = await axiosClient.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=GP14${search}`);
            const date = formatDate2(new Date(),-1);
            const dateUpComming = formatDate2(new Date(), 1);
            const listFilmsNow = data.filter((film)=>{
                return (
                    (+(new Date(film.ngayKhoiChieu)) <= +(new Date()))
                    && (+(new Date(film.ngayKhoiChieu)) >= +(new Date(date)))
                )
            })
            const listFilmsUpComming =data.filter((film)=>{
                return (
                    (+(new Date(film.ngayKhoiChieu)) <= +(new Date(dateUpComming)) && (+(new Date(film.ngayKhoiChieu)) > +(new Date())))
                )
            })
            let listFilmsCreateCalendar = listFilmsNow.concat(listFilmsUpComming);
            let pageCountNow = Math.ceil(listFilmsNow.length / 8);
            let pageCountUpComming = Math.ceil(listFilmsUpComming.length / 8);
            dispatch({
                type: GET_MOVIES_LIST_SUCCESS,
                payload: {listFilmsNow, listFilmsCreateCalendar, pageCountNow, pageCountUpComming}
            })
        }
        catch (error){
            dispatch({
                type: GET_MOVIES_LIST_FAILURE,
                payload: {error: error.response.data}
            })
        }
    }
}

export function addFilm(frm, callback) {
    return async (dispatch)=>{
        try {
            await axiosClient.post('/QuanLyPhim/ThemPhimUploadHinh',frm);
            dispatch({
                type: ADD_FILM_SUCCESS
            })
            callback();
            return toast.success('Thêm thành công.')
        } catch (error) {
            return toast.error(error.response.data)
        }
    }
}
export function editFilm(frm, callback) {
    return async (dispatch)=>{
        try {
            await axiosClient.post('/QuanLyPhim/CapNhatPhimUpload',frm);
            dispatch({
                type: EDIT_FILM_SUCCESS
            })
            callback();
            return toast.success('Thêm thành công.')
        } catch (error) {
            return toast.error(error.response.data)
        }
    }
}
export function deleteFilm(idFilm) {
    return async (dispatch)=>{
        try {
            await axiosClient.delete(`/QuanLyPhim/XoaPhim?MaPhim=${idFilm}`);
            dispatch({
                type: DELETE_FILM_SUCCESS,
            });
            return toast.success('Xóa thành công.')
        } catch (error) {
            return toast.error(error.response.data)
        }
    }
}

export function getPagingListMovies(rowsPerPage, page, search) {
    return async(dispatch)=>{
        dispatch({
            type: GET_PAGING_LIST_MOVIES_REQUEST
        })
        try {
            const {data} = await axiosClient.get(`/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP14${search && search !=='' ? `&tenPhim=${search}` : ''}&soTrang=${page}&soPhanTuTrenTrang=${rowsPerPage}`)
            dispatch({
                type: GET_PAGING_LIST_MOVIES_SUCCESS,
                payload: {data}
            })
        } catch (error) {
            console.log(error.response.data)
        }
    }
}