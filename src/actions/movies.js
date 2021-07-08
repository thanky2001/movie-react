import { GET_MOVIES_BY_DATE_FAILURE, GET_MOVIES_BY_DATE_REQUEST, GET_MOVIES_BY_DATE_SUCCESS, GET_MOVIES_LIST_FAILURE, GET_MOVIES_LIST_REQUEST, GET_MOVIES_LIST_SUCCESS } from "../constants/movies"
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
            const {data} = await axiosClient.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=GP01${search}`);
            const date = formatDate2(new Date(),-5);
            const dateUpComming = formatDate2(new Date(), 1);
            const listFilmsNow = data.filter((film)=>{
                return (
                    (+(new Date(film.ngayKhoiChieu)) <= +(new Date()))
                    && (+(new Date(film.ngayKhoiChieu)) >= +(new Date(date)))
                )
            })
            const listFilmsUpComming =data.filter((film)=>{
                return (
                    (+(new Date(film.ngayKhoiChieu)) > +(new Date()))
                    && (+(new Date(film.ngayKhoiChieu)) <= +(new Date(dateUpComming)))
                )
            })
            let pageCountNow = Math.ceil(listFilmsNow.length / 8);
            let pageCountUpComming = Math.ceil(listFilmsUpComming.length / 8);
            dispatch({
                type: GET_MOVIES_LIST_SUCCESS,
                payload: {listFilmsNow,pageCountNow, pageCountUpComming}
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