import { ADD_LiST_DAY_HOMTOOLS_FAILURE, ADD_LiST_DAY_HOMTOOLS_SUCCESS } from "../constants/movies"
import { splitDateString, splitString } from "../utils/format";

export function getDayHomeTools(film,idCn, idSystem) {
    let listDay = [];
    let showtimeByCinema = film && film.filter(f=>f.maHeThongRap === idSystem);
    showtimeByCinema = showtimeByCinema.length && showtimeByCinema[0].cumRapChieu.filter(f=>f.maCumRap === idCn);
    if (showtimeByCinema.length && showtimeByCinema[0].lichChieuPhim.length) {
        for (let i = 0; i < showtimeByCinema[0].lichChieuPhim.length; i++) {
            const element = splitDateString(showtimeByCinema[0].lichChieuPhim[i].ngayChieuGioChieu)[0];
            const e = splitString(element);
            const date = [e[2],e[1],e[0]].join('-');
            // if (+new Date(element) >= +new Date()) {
                if (listDay.length) {
                    let index = listDay.findIndex(d=>d===date)
                    if (index === -1) {
                        listDay.push(date);
                    }
                }else{
                    listDay.push(date);
                }
            // }
        }
    }
    if (listDay.length && showtimeByCinema.length) {
        return (dispatch)=>{
            dispatch({
                type: ADD_LiST_DAY_HOMTOOLS_SUCCESS,
                payload: {listDay, showtimeByCinema: showtimeByCinema[0]}
            })
        }
    }else{
        return (dispatch)=>{
            dispatch({
                type: ADD_LiST_DAY_HOMTOOLS_FAILURE,
            })
        }
    }
    
}