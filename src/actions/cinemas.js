import {ADD_LIST_MOVIE_BY_PARENT_CINEMA, ADD_LIST_MOVIE_BY_PARENT_CINEMA_ERROR, GET_LIST_CINEMAS_BY_SYSTEM_REQUEST, GET_LIST_CINEMAS_BY_SYSTEM_SUCCESS, GET_PARENT_CINEMAS_REQUEST, GET_PARENT_CINEMAS_SUCCESS} from "../constants/cinemas"
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
            console.log(error.payload.data);
        }
    }
}
export function getListCinemasBySystem(idSt) {
    return async (dispatch)=>{
        dispatch({
            type: GET_LIST_CINEMAS_BY_SYSTEM_REQUEST
        })
        if (idSt !== '0') {
            try {
                const {data} = await axiosClient.get(`/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${idSt}`);
                dispatch({
                    type: GET_LIST_CINEMAS_BY_SYSTEM_SUCCESS,
                    payload: {data}
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
}
export function addListMoviesByParentCinemas(value, date = new Date(), idFilm) {
    let data = [];
    if (value) {
        value = idFilm ? value.filter(vl=> vl.maPhim === idFilm) : value;
        for (let i = 0; i < value.length; i++) {
            let element = value[i];
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
        };
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
