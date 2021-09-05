import {ADD_LIST_MOVIE_BY_PARENT_CINEMA, ADD_LIST_MOVIE_BY_PARENT_CINEMA_ERROR, GET_PARENT_CINEMAS_REQUEST, GET_PARENT_CINEMAS_SUCCESS} from "../constants/cinemas"
import axiosClient from "../services/axiosClient";


export function getParentCinemas() {
    return async (dispatch)=>{
        dispatch({
            type: GET_PARENT_CINEMAS_REQUEST
        })
        try {
            const {data} = await axiosClient.get(`/QuanLyRap/LayThongTinHeThongRap`);
            dispatch({
                type: GET_PARENT_CINEMAS_SUCCESS,
                payload: {data}
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export function addListMoviesByParentCinemas(value, date='2019-01-09') {
    let data = [];
    if (value) {
        for (let i = 0; i < value.length; i++) {
            const element = value[i];
            const a = element.lstLichChieuTheoPhim.filter((lst)=>{
                return (
                    new Date(lst.ngayChieuGioChieu).getDate() === new Date(date).getDate() &&
                    new Date(lst.ngayChieuGioChieu).getMonth() === (new Date(date).getMonth()) &&
                    new Date(lst.ngayChieuGioChieu).getFullYear() === new Date(date).getFullYear()
                )
            })
            if(a.length){
                const e = {...element, lstLichChieuTheoPhim: a}
                data.push(e);
            }
        }
    }
    if (data.length) {
        return (dispatch)=>{
            dispatch({
                type: ADD_LIST_MOVIE_BY_PARENT_CINEMA,
                payload: {data}
            })
        }
    }else{
        return (dispatch)=>{
            dispatch({
                type: ADD_LIST_MOVIE_BY_PARENT_CINEMA_ERROR,
            })
        }
    }
}
