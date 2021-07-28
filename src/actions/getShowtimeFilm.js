import { ADD_SHOWTIME_FILM_BY_SYSTEM_FAILURE, ADD_SHOWTIME_FILM_BY_SYSTEM_SUCCESS, GET_SHOWTIME_FILM_REQUEST, GET_SHOWTIME_FILM_SUCCESS } from "../constants/cinemas";
import axiosClient from "../services/axiosClient";


export function getShowtimeFilm(idFilm) {
    return async (dispatch)=>{
        dispatch({
            type: GET_SHOWTIME_FILM_REQUEST
        })
        try {
            const {data} = await axiosClient.get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${idFilm}`);
            dispatch({
                type: GET_SHOWTIME_FILM_SUCCESS,
                payload: {data},
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export function addShowtimeFilmBySystem(value, idSt, date) {
    let data = value.filter(htr => htr.maHeThongRap === idSt)[0] && value.filter(htr => htr.maHeThongRap === idSt)[0];
    let listStFilm = {};
    let cumRapChieu = [];
    if (data && data.cumRapChieu.length) {
        for (let i = 0; i < data.cumRapChieu.length; i++) {
            const element = data.cumRapChieu[i];
            const a = element.lichChieuPhim.length && element.lichChieuPhim.filter((lst)=>{
                return (
                    new Date(lst.ngayChieuGioChieu).getDate() === new Date(date).getDate() &&
                    new Date(lst.ngayChieuGioChieu).getMonth() === (new Date(date).getMonth()) &&
                    new Date(lst.ngayChieuGioChieu).getFullYear() === new Date(date).getFullYear()
                )
            })
            if (a.length) {
                const e = {...element, lichChieuPhim: a}
                cumRapChieu.push(e);
            }
        }
        listStFilm = {...data, cumRapChieu: cumRapChieu};
    }
    if (cumRapChieu.length) {
        return (dispatch)=>{
            dispatch({
                type: ADD_SHOWTIME_FILM_BY_SYSTEM_SUCCESS,
                payload: {listStFilm}
            })
        }
    }else{
        return (dispatch)=>{
            dispatch({
                type: ADD_SHOWTIME_FILM_BY_SYSTEM_FAILURE
            })
        }
    }

}